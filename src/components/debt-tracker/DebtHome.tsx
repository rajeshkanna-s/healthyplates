import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingDown, CheckCircle, AlertTriangle } from "lucide-react";
import { DebtEntry } from "./types";
import { getTotalDebt, getTotalPaid } from "./utils";

interface DebtHomeProps {
  debts: DebtEntry[];
}

const DebtHome = ({ debts }: DebtHomeProps) => {
  const totalDebt = getTotalDebt(debts);
  const totalPaid = getTotalPaid(debts);
  const activeDebts = debts.filter(d => d.status === "active");
  const paidOff = debts.filter(d => d.status === "paid_off");
  const totalOriginal = debts.reduce((s, d) => s + d.amount, 0);
  const paidPercent = totalOriginal > 0 ? Math.round((totalPaid / totalOriginal) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Outstanding Debt */}
      <Card className="border-2 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Outstanding Debt</span>
          </div>
          <span className="text-4xl font-bold tracking-tight text-red-600 dark:text-red-400">₹{totalDebt.toLocaleString()}</span>

          <div className="mt-5 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="text-green-600 font-medium">{paidPercent}% repaid</span>
            </div>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">₹{totalPaid.toLocaleString()}</p>
            {totalOriginal > 0 && (
              <div className="mt-3 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all rounded-full" style={{ width: `${Math.min(paidPercent, 100)}%` }} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-200/50 dark:border-orange-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Active</span>
            </div>
            <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{activeDebts.length}</p>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">debts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Paid Off</span>
            </div>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">{paidOff.length}</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Debts */}
      {debts.length > 0 && (
        <Card className="border-2">
          <CardContent className="p-4">
            <h4 className="font-medium flex items-center gap-2 mb-3">
              <Wallet className="h-5 w-5 text-primary" />
              Recent Debts
            </h4>
            <div className="space-y-2">
              {debts.slice(0, 5).map(debt => (
                <div key={debt.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium text-sm">{debt.category}</p>
                    <p className="text-xs text-muted-foreground">{debt.lender || "—"} • {debt.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">₹{debt.amount.toLocaleString()}</span>
                    <Badge variant={debt.status === "paid_off" ? "default" : debt.status === "active" ? "destructive" : "secondary"} className="ml-2 text-xs">
                      {debt.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {debts.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            <Wallet className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No debts recorded yet. Add your first debt entry!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DebtHome;
