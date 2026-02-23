import { TaxEntry, TaxFilters, STORAGE_KEY } from "./types";
import { format, startOfMonth, startOfYear, parseISO, isWithinInterval } from "date-fns";

export const generateId = (): string =>
  `TAX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

export const getTaxes = (): TaxEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTaxes = (taxes: TaxEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taxes));
};

export const getTodayString = (): string => format(new Date(), "yyyy-MM-dd");
export const getMonthStartString = (): string => format(startOfMonth(new Date()), "yyyy-MM-dd");

export const filterTaxes = (taxes: TaxEntry[], filters: TaxFilters): TaxEntry[] => {
  return taxes.filter(tax => {
    const taxDate = parseISO(tax.date);
    const fromDate = filters.fromDate ? parseISO(filters.fromDate) : null;
    const toDate = filters.toDate ? parseISO(filters.toDate) : null;

    if (fromDate && toDate && !isWithinInterval(taxDate, { start: fromDate, end: toDate })) return false;
    if (filters.category && filters.category !== "all" && tax.category !== filters.category) return false;
    if (filters.taxType && filters.taxType !== "all" && tax.taxType !== filters.taxType) return false;
    if (filters.status && filters.status !== "all" && tax.status !== filters.status) return false;

    return true;
  });
};

export const getTodayTotal = (taxes: TaxEntry[]): number => {
  const today = getTodayString();
  return taxes.filter(t => t.date === today).reduce((sum, t) => sum + t.amount, 0);
};

export const getMonthTotal = (taxes: TaxEntry[]): number => {
  const monthStart = startOfMonth(new Date());
  return taxes.filter(t => parseISO(t.date) >= monthStart).reduce((sum, t) => sum + t.amount, 0);
};

export const getYearTotal = (taxes: TaxEntry[]): number => {
  const yearStart = startOfYear(new Date());
  return taxes.filter(t => parseISO(t.date) >= yearStart).reduce((sum, t) => sum + t.amount, 0);
};

export const getCategoryBreakdown = (taxes: TaxEntry[]) => {
  const totals: Record<string, number> = {};
  const total = taxes.reduce((sum, t) => sum + t.amount, 0);
  taxes.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });
  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount, percentage: total > 0 ? Math.round((amount / total) * 100) : 0 }))
    .sort((a, b) => b.amount - a.amount);
};

export const getMonthlyComparison = (taxes: TaxEntry[]) => {
  const monthlyTotals: Record<string, number> = {};
  taxes.forEach(t => {
    const month = format(parseISO(t.date), "MMM yyyy");
    monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount;
  });
  return Object.entries(monthlyTotals).map(([month, amount]) => ({ month, amount })).slice(-6);
};
