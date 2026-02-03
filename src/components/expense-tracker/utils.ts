import { ExpenseEntry, ExpenseSettings, ExpenseFilters, STORAGE_KEY, SETTINGS_KEY } from "./types";
import { DEFAULT_QUICK_ADD_TEMPLATES, DEFAULT_FAMILY_MEMBERS } from "./data";
import { format, startOfMonth, startOfWeek, endOfWeek, startOfYear, isWithinInterval, parseISO } from "date-fns";

// Generate unique ID
export const generateId = (): string => {
  return `EXP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// Storage functions
export const getExpenses = (): ExpenseEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveExpenses = (expenses: ExpenseEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const getSettings = (): ExpenseSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultSettings();
};

export const getDefaultSettings = (): ExpenseSettings => ({
  currency: "INR",
  currencySymbol: "₹",
  monthlyBudget: 0,
  categoryBudgets: [],
  familyMembers: DEFAULT_FAMILY_MEMBERS,
  quickAddTemplates: DEFAULT_QUICK_ADD_TEMPLATES,
  customCategories: [],
  customPaymentMethods: [],
  bigExpenseLimit: 2000,
  savingsGoals: [],
  dayNotes: [],
});

export const saveSettings = (settings: ExpenseSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Date helpers
export const getTodayString = (): string => format(new Date(), "yyyy-MM-dd");
export const getCurrentTimeString = (): string => format(new Date(), "HH:mm");
export const getMonthStartString = (): string => format(startOfMonth(new Date()), "yyyy-MM-dd");

// Filter expenses
export const filterExpenses = (expenses: ExpenseEntry[], filters: ExpenseFilters): ExpenseEntry[] => {
  return expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    const fromDate = filters.fromDate ? parseISO(filters.fromDate) : null;
    const toDate = filters.toDate ? parseISO(filters.toDate) : null;

    // Date filter
    if (fromDate && toDate) {
      if (!isWithinInterval(expenseDate, { start: fromDate, end: toDate })) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== "all" && expense.category !== filters.category) {
      return false;
    }

    // Platform filter
    if (filters.platform && filters.platform !== "all" && expense.platform !== filters.platform) {
      return false;
    }

    // Payment method filter
    if (filters.paymentMethod && filters.paymentMethod !== "all" && expense.paymentMethod !== filters.paymentMethod) {
      return false;
    }

    // Person filter
    if (filters.person && filters.person !== "all" && expense.person !== filters.person) {
      return false;
    }

    return true;
  });
};

// Calculate totals
export const getTodayTotal = (expenses: ExpenseEntry[]): number => {
  const today = getTodayString();
  return expenses
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);
};

export const getWeekTotal = (expenses: ExpenseEntry[]): number => {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  
  return expenses
    .filter(e => {
      const date = parseISO(e.date);
      return isWithinInterval(date, { start: weekStart, end: weekEnd });
    })
    .reduce((sum, e) => sum + e.amount, 0);
};

export const getMonthTotal = (expenses: ExpenseEntry[]): number => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  
  return expenses
    .filter(e => {
      const date = parseISO(e.date);
      return date >= monthStart && date <= now;
    })
    .reduce((sum, e) => sum + e.amount, 0);
};

export const getYearTotal = (expenses: ExpenseEntry[]): number => {
  const now = new Date();
  const yearStart = startOfYear(now);
  
  return expenses
    .filter(e => {
      const date = parseISO(e.date);
      return date >= yearStart && date <= now;
    })
    .reduce((sum, e) => sum + e.amount, 0);
};

// Category breakdown
export const getCategoryBreakdown = (expenses: ExpenseEntry[]): { category: string; amount: number; percentage: number }[] => {
  const totals: Record<string, number> = {};
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  expenses.forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });
  
  return Object.entries(totals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

// Person breakdown
export const getPersonBreakdown = (expenses: ExpenseEntry[]): { person: string; amount: number; percentage: number }[] => {
  const totals: Record<string, number> = {};
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  expenses.forEach(e => {
    if (e.person) {
      totals[e.person] = (totals[e.person] || 0) + e.amount;
    }
  });
  
  return Object.entries(totals)
    .map(([person, amount]) => ({
      person,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

// Monthly comparison
export const getMonthlyComparison = (expenses: ExpenseEntry[]): { month: string; amount: number }[] => {
  const monthlyTotals: Record<string, number> = {};
  
  expenses.forEach(e => {
    const month = format(parseISO(e.date), "MMM yyyy");
    monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
  });
  
  return Object.entries(monthlyTotals)
    .map(([month, amount]) => ({ month, amount }))
    .slice(-6);
};

// No-spend days
export const getNoSpendDays = (expenses: ExpenseEntry[], year: number, month: number): number => {
  const daysWithSpending = new Set<string>();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  expenses.forEach(e => {
    const date = parseISO(e.date);
    if (date.getFullYear() === year && date.getMonth() === month) {
      daysWithSpending.add(e.date);
    }
  });
  
  const today = new Date();
  const currentDay = today.getFullYear() === year && today.getMonth() === month 
    ? today.getDate() 
    : daysInMonth;
  
  return currentDay - daysWithSpending.size;
};

// Big expenses
export const getBigExpenses = (expenses: ExpenseEntry[], limit: number): ExpenseEntry[] => {
  return expenses.filter(e => e.amount >= limit).sort((a, b) => b.amount - a.amount);
};

// Budget status color
export const getBudgetColor = (spent: number, budget: number): string => {
  if (budget <= 0) return "text-muted-foreground";
  const percentage = (spent / budget) * 100;
  if (percentage >= 100) return "text-red-500";
  if (percentage >= 80) return "text-orange-500";
  return "text-green-500";
};

export const getBudgetBgColor = (spent: number, budget: number): string => {
  if (budget <= 0) return "bg-muted";
  const percentage = (spent / budget) * 100;
  if (percentage >= 100) return "bg-red-100 dark:bg-red-900/30";
  if (percentage >= 80) return "bg-orange-100 dark:bg-orange-900/30";
  return "bg-green-100 dark:bg-green-900/30";
};

// Daily spending for trends
export const getDailySpending = (expenses: ExpenseEntry[], days: number = 30): { date: string; amount: number }[] => {
  const dailyTotals: Record<string, number> = {};
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = format(date, "yyyy-MM-dd");
    dailyTotals[dateStr] = 0;
  }
  
  expenses.forEach(e => {
    if (dailyTotals.hasOwnProperty(e.date)) {
      dailyTotals[e.date] += e.amount;
    }
  });
  
  return Object.entries(dailyTotals).map(([date, amount]) => ({
    date: format(parseISO(date), "dd MMM"),
    amount,
  }));
};

// Get suggestions for cutting expenses
export const getCuttingSuggestions = (expenses: ExpenseEntry[]): string[] => {
  const breakdown = getCategoryBreakdown(expenses);
  const suggestions: string[] = [];
  
  if (breakdown.length >= 2) {
    const top = breakdown[0];
    if (top.percentage >= 30) {
      suggestions.push(`Your top spending category is ${top.category} (${top.percentage}%). Try reducing it by 10% next month.`);
    }
  }
  
  const entertainment = breakdown.find(b => 
    b.category.toLowerCase().includes('entertainment') || 
    b.category.toLowerCase().includes('cinema') ||
    b.category.toLowerCase().includes('movies')
  );
  if (entertainment && entertainment.percentage >= 15) {
    suggestions.push(`Entertainment spending is ${entertainment.percentage}% of total. Consider free alternatives.`);
  }
  
  const food = breakdown.find(b => b.category.toLowerCase().includes('food'));
  if (food && food.percentage >= 25) {
    suggestions.push(`Food spending is ${food.percentage}% of total. Cooking at home can save up to 40%.`);
  }
  
  return suggestions;
};
