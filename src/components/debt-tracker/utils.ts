import { DebtEntry, DebtFilters, STORAGE_KEY } from "./types";
import { format, startOfMonth, parseISO, isWithinInterval } from "date-fns";

export const generateId = (): string =>
  `DEBT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

export const getDebts = (): DebtEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveDebts = (debts: DebtEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
};

export const getTodayString = (): string => format(new Date(), "yyyy-MM-dd");
export const getMonthStartString = (): string => format(startOfMonth(new Date()), "yyyy-MM-dd");

export const filterDebts = (debts: DebtEntry[], filters: DebtFilters): DebtEntry[] => {
  return debts.filter(debt => {
    const debtDate = parseISO(debt.date);
    const fromDate = filters.fromDate ? parseISO(filters.fromDate) : null;
    const toDate = filters.toDate ? parseISO(filters.toDate) : null;

    if (fromDate && toDate && !isWithinInterval(debtDate, { start: fromDate, end: toDate })) return false;
    if (filters.category && filters.category !== "all" && debt.category !== filters.category) return false;
    if (filters.status && filters.status !== "all" && debt.status !== filters.status) return false;

    return true;
  });
};

export const getTotalDebt = (debts: DebtEntry[]): number =>
  debts.filter(d => d.status !== "paid_off").reduce((sum, d) => sum + (d.amount - d.paidAmount), 0);

export const getTotalPaid = (debts: DebtEntry[]): number =>
  debts.reduce((sum, d) => sum + d.paidAmount, 0);

export const getCategoryBreakdown = (debts: DebtEntry[]) => {
  const totals: Record<string, number> = {};
  const total = debts.reduce((sum, d) => sum + d.amount, 0);
  debts.forEach(d => { totals[d.category] = (totals[d.category] || 0) + d.amount; });
  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount, percentage: total > 0 ? Math.round((amount / total) * 100) : 0 }))
    .sort((a, b) => b.amount - a.amount);
};

export const getMonthlyComparison = (debts: DebtEntry[]) => {
  const monthlyTotals: Record<string, number> = {};
  debts.forEach(d => {
    const month = format(parseISO(d.date), "MMM yyyy");
    monthlyTotals[month] = (monthlyTotals[month] || 0) + d.amount;
  });
  return Object.entries(monthlyTotals).map(([month, amount]) => ({ month, amount })).slice(-6);
};
