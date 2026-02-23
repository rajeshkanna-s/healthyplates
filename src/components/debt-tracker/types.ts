export interface DebtEntry {
  id: string;
  amount: number;
  category: string;
  lender: string;
  date: string;
  dueDate: string;
  description: string;
  status: 'active' | 'partially_paid' | 'paid_off';
  paidAmount: number;
  interestRate: number;
  tags: string[];
  createdAt: string;
}

export interface DebtFilters {
  fromDate: string;
  toDate: string;
  category: string;
  status: string;
}

export const DEBT_CATEGORIES = [
  "Personal Loan",
  "Home Loan",
  "Car Loan",
  "Education Loan",
  "Credit Card",
  "Business Loan",
  "Gold Loan",
  "Bike Loan",
  "Medical Loan",
  "Friend / Family",
  "Other",
];

export const STORAGE_KEY = 'healthyplates_debt_tracker';
