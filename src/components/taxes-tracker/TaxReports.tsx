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
import { TaxEntry, TAX_CATEGORIES, TAX_TYPES, TaxFilters } from "./types";
import { filterTaxes, getCategoryBreakdown, getMonthlyComparison, getMonthStartString, getTodayString } from "./utils";
import { format, parseISO } from "date-fns";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CHART_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

interface TaxReportsProps {
  taxes: TaxEntry[];
  onDeleteTax: (id: string) => void;
}

const TaxReports = ({ taxes, onDeleteTax }: TaxReportsProps) => {
  const [filters, setFilters] = useState<TaxFilters>({
    fromDate: getMonthStartString(),
    toDate: getTodayString(),
    category: "all",
    taxType: "all",
    status: "all",
  });

  const filteredTaxes = useMemo(() =>
    filterTaxes(taxes, filters).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [taxes, filters]
  );

  const categoryBreakdown = useMemo(() => getCategoryBreakdown(filteredTaxes), [filteredTaxes]);
  const monthlyComparison = useMemo(() => getMonthlyComparison(taxes), [taxes]);
  const totalAmount = filteredTaxes.reduce((sum, t) => sum + t.amount, 0);

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
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Category</Label>
              <Select value={filters.category} onValueChange={v => setFilters({...filters, category: v})}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem>{TAX_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Type</Label>
              <Select value={filters.taxType} onValueChange={v => setFilters({...filters, taxType: v})}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem>{TAX_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium">Status</Label>
              <Select value={filters.status} onValueChange={v => setFilters({...filters, status: v})}><SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"><CardContent className="p-4"><p className="text-xs text-muted-foreground font-medium">Total Entries</p><p className="text-3xl font-bold mt-1">{filteredTaxes.length}</p></CardContent></Card>
        <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-800/50"><CardContent className="p-4"><p className="text-xs text-muted-foreground font-medium">Total Amount</p><p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">₹{totalAmount.toLocaleString()}</p></CardContent></Card>
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
        <CardHeader className="pb-2"><CardTitle className="text-lg">Tax History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <div className="min-w-[500px]">
              <Table>
                <TableHeader><TableRow><TableHead className="w-[80px]">Date</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="w-[60px]">Del</TableHead></TableRow></TableHeader>
                <TableBody>
                  {filteredTaxes.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No entries found</TableCell></TableRow>
                  ) : filteredTaxes.map(tax => (
                    <TableRow key={tax.id}>
                      <TableCell className="text-xs">{format(parseISO(tax.date), "dd MMM")}</TableCell>
                      <TableCell className="text-sm font-medium">{tax.category}</TableCell>
                      <TableCell><Badge variant={tax.status === "paid" ? "default" : tax.status === "overdue" ? "destructive" : "secondary"} className="text-xs">{tax.status}</Badge></TableCell>
                      <TableCell className="text-right font-bold">₹{tax.amount.toLocaleString()}</TableCell>
                      <TableCell><Button size="icon" variant="ghost" onClick={() => onDeleteTax(tax.id)} className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></TableCell>
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

export default TaxReports;
