export interface ExpenseEntry {
  id: string;
  amount: number;
  category: string;
  platform: string;
  paymentMethod: string;
  date: string;
  time: string;
  description: string;
  tags: string[];
  person: string;
  createdAt: string;
}

export interface QuickAddTemplate {
  id: string;
  name: string;
  amount: number;
  category: string;
  platform: string;
  icon: string;
}

export interface FamilyMember {
  id: string;
  name: string;
}

export interface CategoryBudget {
  category: string;
  budget: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  savedAmount: number;
}

export interface DayNote {
  date: string;
  note: string;
}

export interface ExpenseSettings {
  currency: string;
  currencySymbol: string;
  monthlyBudget: number;
  categoryBudgets: CategoryBudget[];
  familyMembers: FamilyMember[];
  quickAddTemplates: QuickAddTemplate[];
  customCategories: { name: string; icon: string }[];
  customPaymentMethods: string[];
  bigExpenseLimit: number;
  savingsGoals: SavingsGoal[];
  dayNotes: DayNote[];
}

export interface ExpenseFilters {
  fromDate: string;
  toDate: string;
  category: string;
  platform: string;
  paymentMethod: string;
  person: string;
}

export const STORAGE_KEY = 'healthyplates_expense_tracker';
export const SETTINGS_KEY = 'healthyplates_expense_settings';
