import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, TrendingUp, TrendingDown, Wallet,
  CalendarDays, CalendarRange
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings } from "./types";
import { getTodayTotal, getWeekTotal, getMonthTotal, getYearTotal, getCategoryBreakdown } from "./utils";

interface SpendingSummaryProps {
  expenses: ExpenseEntry[];
  settings: ExpenseSettings;
}

const SpendingSummary = ({ expenses, settings }: SpendingSummaryProps) => {
  const todayTotal = getTodayTotal(expenses);
  const weekTotal = getWeekTotal(expenses);
  const monthTotal = getMonthTotal(expenses);
  const yearTotal = getYearTotal(expenses);

  // Get category breakdown for the period
  const getCategoryBreakdownForPeriod = (periodExpenses: ExpenseEntry[]) => {
    const breakdown = getCategoryBreakdown(periodExpenses);
    return breakdown.slice(0, 3);
  };

  // Filter expenses by period
  const todayExpenses = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return expenses.filter(e => e.date === today);
  }, [expenses]);

  const weekExpenses = useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1);
    weekStart.setHours(0, 0, 0, 0);
    
    return expenses.filter(e => new Date(e.date) >= weekStart);
  }, [expenses]);

  const monthExpenses = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return expenses.filter(e => new Date(e.date) >= monthStart);
  }, [expenses]);

  const yearExpenses = useMemo(() => {
    const yearStart = new Date(new Date().getFullYear(), 0, 1);
    return expenses.filter(e => new Date(e.date) >= yearStart);
  }, [expenses]);

  const summaryCards = [
    {
      label: "Today",
      amount: todayTotal,
      icon: Calendar,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      topCategories: getCategoryBreakdownForPeriod(todayExpenses),
    },
    {
      label: "This Week",
      amount: weekTotal,
      icon: CalendarDays,
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      topCategories: getCategoryBreakdownForPeriod(weekExpenses),
    },
    {
      label: "This Month",
      amount: monthTotal,
      icon: CalendarRange,
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      topCategories: getCategoryBreakdownForPeriod(monthExpenses),
    },
    {
      label: "This Year",
      amount: yearTotal,
      icon: Wallet,
      color: "bg-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      topCategories: getCategoryBreakdownForPeriod(yearExpenses),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Spending Overview
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {summaryCards.map((card) => (
          <Card key={card.label} className={`${card.bgColor} border-none`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{card.label}</span>
              </div>
              
              <p className="text-xl font-bold">
                {settings.currencySymbol}{card.amount.toLocaleString()}
              </p>

              {/* Top Categories */}
              {card.topCategories.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-muted-foreground">Top Categories:</p>
                  <div className="flex flex-wrap gap-1">
                    {card.topCategories.map((cat) => (
                      <Badge key={cat.category} variant="secondary" className="text-xs py-0">
                        {cat.category.split(' ')[0]} ({cat.percentage}%)
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpendingSummary;
