import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { TaxEntry } from "./types";
import { getTodayTotal, getMonthTotal, getYearTotal } from "./utils";

interface TaxHomeProps {
  taxes: TaxEntry[];
}

const TaxHome = ({ taxes }: TaxHomeProps) => {
  const todayTotal = getTodayTotal(taxes);
  const monthTotal = getMonthTotal(taxes);
  const yearTotal = getYearTotal(taxes);
  const pendingTaxes = taxes.filter(t => t.status === "pending");
  const overdueTaxes = taxes.filter(t => t.status === "overdue");

  return (
    <div className="space-y-6">
      {/* Today Summary */}
      <Card className="border-2 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Today's Tax Payments</span>
          </div>
          <span className="text-4xl font-bold tracking-tight">₹{todayTotal.toLocaleString()}</span>

          <div className="mt-5 pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-muted-foreground">This Month</span>
              <p className="text-2xl font-semibold">₹{monthTotal.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">This Year</span>
              <p className="text-2xl font-semibold">₹{yearTotal.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200/50 dark:border-amber-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Pending</span>
            </div>
            <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{pendingTaxes.length}</p>
            <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
              ₹{pendingTaxes.reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border-red-200/50 dark:border-red-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Overdue</span>
            </div>
            <p className="text-3xl font-bold text-red-700 dark:text-red-300">{overdueTaxes.length}</p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">
              ₹{overdueTaxes.reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      {taxes.length > 0 && (
        <Card className="border-2">
          <CardContent className="p-4">
            <h4 className="font-medium flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Tax Payments
            </h4>
            <div className="space-y-2">
              {taxes.slice(0, 5).map(tax => (
                <div key={tax.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium text-sm">{tax.category}</p>
                    <p className="text-xs text-muted-foreground">{tax.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">₹{tax.amount.toLocaleString()}</span>
                    <Badge variant={tax.status === "paid" ? "default" : tax.status === "overdue" ? "destructive" : "secondary"} className="ml-2 text-xs">
                      {tax.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {taxes.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No tax entries yet. Add your first tax payment!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxHome;
