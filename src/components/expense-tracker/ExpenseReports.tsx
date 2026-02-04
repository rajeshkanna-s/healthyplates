import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Download, FileText, FileSpreadsheet, Trash2, Eye, 
  Filter, TrendingUp, Users, PieChart,
  BarChart3, Store
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings, ExpenseFilters } from "./types";
import { DEFAULT_CATEGORIES, ALL_PLATFORMS } from "./data";
import {
  filterExpenses, getCategoryBreakdown, getPersonBreakdown,
  getMonthlyComparison, getDailySpending, getBigExpenses,
  getMonthStartString, getTodayString
} from "./utils";
import { exportToExcel, exportReportToPDF, exportSingleExpenseToPDF } from "./exportUtils";
import { format, parseISO } from "date-fns";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

interface ExpenseReportsProps {
  expenses: ExpenseEntry[];
  settings: ExpenseSettings;
  onDeleteExpense: (id: string) => void;
}

const CHART_COLORS = [
  "#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f97316", "#06b6d4", "#84cc16"
];

const ExpenseReports = ({ expenses, settings, onDeleteExpense }: ExpenseReportsProps) => {
  const [filters, setFilters] = useState<ExpenseFilters>({
    fromDate: getMonthStartString(),
    toDate: getTodayString(),
    category: "all",
    platform: "all",
    paymentMethod: "all",
    person: "all",
  });
  
  const filteredExpenses = useMemo(() => {
    return filterExpenses(expenses, filters).sort((a, b) => 
      new Date(b.date + " " + b.time).getTime() - new Date(a.date + " " + a.time).getTime()
    );
  }, [expenses, filters]);
  
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(filteredExpenses), [filteredExpenses]);
  const personBreakdown = useMemo(() => getPersonBreakdown(filteredExpenses), [filteredExpenses]);
  const monthlyComparison = useMemo(() => getMonthlyComparison(expenses), [expenses]);
  const dailySpending = useMemo(() => getDailySpending(expenses, 30), [expenses]);
  const bigExpenses = useMemo(() => getBigExpenses(filteredExpenses, settings.bigExpenseLimit), [filteredExpenses, settings.bigExpenseLimit]);
  
  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Get ALL unique platforms from ALL expenses (combined Platform/Shop filter)
  const allUniquePlatforms = useMemo(() => {
    const platforms = new Set<string>();
    expenses.forEach(e => {
      if (e.platform) platforms.add(e.platform);
    });
    // Also include all default platforms
    ALL_PLATFORMS.forEach(p => platforms.add(p));
    return Array.from(platforms).sort();
  }, [expenses]);
  
  const allCategories = [
    ...DEFAULT_CATEGORIES,
    ...settings.customCategories.map(c => ({ name: c.name, icon: c.icon || "MoreHorizontal" }))
  ];
  
  const handleExportExcel = () => {
    exportToExcel(filteredExpenses, settings, "expense-report");
  };
  
  const handleExportPDF = () => {
    exportReportToPDF(filteredExpenses, settings, { from: filters.fromDate, to: filters.toDate });
  };
  
  const handleExportSinglePDF = (expense: ExpenseEntry) => {
    exportSingleExpenseToPDF(expense, settings);
  };
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">From Date</Label>
              <Input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="h-10"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">To Date</Label>
              <Input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="h-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Category</Label>
              <Select value={filters.category} onValueChange={(v) => setFilters({ ...filters, category: v })}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium flex items-center gap-1">
                <Store className="h-3 w-3" /> Platform/Shop
              </Label>
              <Select value={filters.platform} onValueChange={(v) => setFilters({ ...filters, platform: v })}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {allUniquePlatforms.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Payment Method</Label>
              <Select value={filters.paymentMethod} onValueChange={(v) => setFilters({ ...filters, paymentMethod: v })}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Person</Label>
              <Select value={filters.person} onValueChange={(v) => setFilters({ ...filters, person: v })}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  {settings.familyMembers.map((m) => (
                    <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-medium">Total Expenses</p>
            <p className="text-3xl font-bold mt-1">{filteredExpenses.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-800/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-medium">Total Amount</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
              {settings.currencySymbol}{totalAmount.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Category Breakdown Pie Chart */}
      {categoryBreakdown.length > 0 && (
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category, percentage }) => `${category.substring(0, 8)}... ${percentage}%`}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={entry.category} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${settings.currencySymbol}${value.toLocaleString()}`}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            
            {/* Category List with Amounts */}
            <div className="mt-4 space-y-2">
              {categoryBreakdown.slice(0, 5).map((item, index) => (
                <div key={item.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    />
                    <span className="truncate max-w-[150px]">{item.category}</span>
                  </div>
                  <span className="font-medium">{settings.currencySymbol}{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Person Breakdown */}
      {personBreakdown.length > 0 && (
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Spending by Person
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personBreakdown.map((item, index) => (
                <div key={item.person} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.person}</span>
                    <span className="font-medium">{settings.currencySymbol}{item.amount.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Monthly Comparison */}
      {monthlyComparison.length > 1 && (
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value: number) => `${settings.currencySymbol}${value.toLocaleString()}`} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Daily Spending Trend */}
      <Card className="border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Last 30 Days Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 8 }} interval={4} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value: number) => `${settings.currencySymbol}${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Big Expenses */}
      {bigExpenses.length > 0 && (
        <Card className="border-2 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-orange-600">
              <TrendingUp className="h-5 w-5" />
              Big Expenses ({settings.currencySymbol}{settings.bigExpenseLimit}+)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bigExpenses.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <div>
                    <p className="font-medium text-sm">{expense.category}</p>
                    <p className="text-xs text-muted-foreground">{format(parseISO(expense.date), "dd MMM yyyy")}</p>
                  </div>
                  <span className="font-bold text-orange-600">{settings.currencySymbol}{expense.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Export Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleExportExcel} variant="outline" className="flex-1 h-12">
          <FileSpreadsheet className="h-5 w-5 mr-2" />
          Excel
        </Button>
        <Button onClick={handleExportPDF} variant="outline" className="flex-1 h-12">
          <FileText className="h-5 w-5 mr-2" />
          PDF Report
        </Button>
      </div>
      
      {/* Expense List */}
      <Card className="border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Expense History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <div className="min-w-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.slice(0, 50).map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="text-xs">
                        {format(parseISO(expense.date), "dd/MM")}
                      </TableCell>
                      <TableCell className="text-sm font-medium">{expense.category}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {expense.platform || "-"}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {settings.currencySymbol}{expense.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Expense Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Amount</span>
                                  <span className="font-bold text-lg">{settings.currencySymbol}{expense.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Category</span>
                                  <span className="font-medium">{expense.category}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Platform</span>
                                  <span>{expense.platform || "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Date</span>
                                  <span>{format(parseISO(expense.date), "dd MMM yyyy")}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Time</span>
                                  <span>{expense.time}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Payment</span>
                                  <span>{expense.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Person</span>
                                  <span>{expense.person}</span>
                                </div>
                                {expense.description && (
                                  <div className="pt-2 border-t">
                                    <span className="text-muted-foreground">Notes:</span>
                                    <p className="mt-1">{expense.description}</p>
                                  </div>
                                )}
                                {expense.tags.length > 0 && (
                                  <div className="flex gap-1 flex-wrap pt-2">
                                    {expense.tags.map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  className="flex-1"
                                  onClick={() => handleExportSinglePDF(expense)}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Export PDF
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDeleteExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseReports;
