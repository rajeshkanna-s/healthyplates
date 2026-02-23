import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, PieChart, BarChart3, Trash2 } from "lucide-react";
import { DebtEntry, DEBT_CATEGORIES, DebtFilters } from "./types";
import { filterDebts, getCategoryBreakdown, getMonthlyComparison, getMonthStartString, getTodayString } from "./utils";
import { format, parseISO } from "date-fns";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CHART_COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

interface DebtReportsProps {
  debts: DebtEntry[];
  onDeleteDebt: (id: string) => void;
}

const DebtReports = ({ debts, onDeleteDebt }: DebtReportsProps) => {
  const [filters, setFilters] = useState<DebtFilters>({
    fromDate: getMonthStartString(),
    toDate: getTodayString(),
    category: "all",
    status: "all",
  });

  const filteredDebts = useMemo(() =>
    filterDebts(debts, filters).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [debts, filters]
  );

  const categoryBreakdown = useMemo(() => getCategoryBreakdown(filteredDebts), [filteredDebts]);
  const monthlyComparison = useMemo(() => getMonthlyComparison(debts), [debts]);
  const totalAmount = filteredDebts.reduce((sum, d) => sum + d.amount, 0);
  const totalPaid = filteredDebts.reduce((sum, d) => sum + d.paidAmount, 0);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><Filter className="h-4 w-4 text-primary" /></div>
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-xs font-medium">From Date</Label><Input type="date" value={filters.fromDate} onChange={e => setFilters({...filters, fromDate: e.target.value})} className="h-10" /></div>
            <div className="space-y-1"><Label className="text-xs font-medium">To Date</Label><Input type="date" value={filters.toDate} onChange={e => setFilters({...filters, toDate: e.target.value})} className="h-10" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Category</Label>
              <Select value={filters.category} onValueChange={v => setFilters({...filters, category: v})}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem>{DEBT_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Status</Label>
              <Select value={filters.status} onValueChange={v => setFilters({...filters, status: v})}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="partially_paid">Partially Paid</SelectItem><SelectItem value="paid_off">Paid Off</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 border-red-200/50 dark:border-red-800/50"><CardContent className="p-4"><p className="text-xs text-muted-foreground font-medium">Total Debt</p><p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">₹{totalAmount.toLocaleString()}</p></CardContent></Card>
        <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-800/50"><CardContent className="p-4"><p className="text-xs text-muted-foreground font-medium">Total Paid</p><p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">₹{totalPaid.toLocaleString()}</p></CardContent></Card>
      </div>

      {/* Pie Chart */}
      {categoryBreakdown.length > 0 && (
        <Card className="border-2">
          <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><PieChart className="h-5 w-5 text-primary" /> By Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie><Pie data={categoryBreakdown} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} label={({ category, percentage }) => `${category.substring(0, 10)} ${percentage}%`}>
                  {categoryBreakdown.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie><Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} /></RechartsPie>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Chart */}
      {monthlyComparison.length > 1 && (
        <Card className="border-2">
          <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Monthly Comparison</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} /><Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card className="border-2">
        <CardHeader className="pb-2"><CardTitle className="text-lg">Debt History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <div className="min-w-[550px]">
              <Table>
                <TableHeader><TableRow><TableHead className="w-[80px]">Date</TableHead><TableHead>Category</TableHead><TableHead>Lender</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="w-[60px]">Del</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filteredDebts.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No entries found</TableCell></TableRow>
                  ) : filteredDebts.map(debt => (
                    <TableRow key={debt.id}>
                      <TableCell className="text-xs">{format(parseISO(debt.date), "dd MMM")}</TableCell>
                      <TableCell className="text-sm font-medium">{debt.category}</TableCell>
                      <TableCell className="text-sm">{debt.lender || "—"}</TableCell>
                      <TableCell><Badge variant={debt.status === "paid_off" ? "default" : debt.status === "active" ? "destructive" : "secondary"} className="text-xs">{debt.status.replace("_", " ")}</Badge></TableCell>
                      <TableCell className="text-right font-bold">₹{debt.amount.toLocaleString()}</TableCell>
                      <TableCell><Button size="icon" variant="ghost" onClick={() => onDeleteDebt(debt.id)} className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtReports;
