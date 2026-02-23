export interface TaxEntry {
  id: string;
  amount: number;
  category: string;
  taxType: string;
  date: string;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
  tags: string[];
  createdAt: string;
}

export interface TaxFilters {
  fromDate: string;
  toDate: string;
  category: string;
  taxType: string;
  status: string;
}

export const TAX_CATEGORIES = [
  "Income Tax",
  "GST",
  "Property Tax",
  "Professional Tax",
  "TDS",
  "Advance Tax",
  "Capital Gains Tax",
  "Vehicle Tax",
  "Service Tax",
  "Custom Duty",
  "Other",
];

export const TAX_TYPES = [
  "Federal / Central",
  "State",
  "Local / Municipal",
  "Self-Assessment",
  "Withholding",
  "Other",
];

export const STORAGE_KEY = 'healthyplates_taxes_tracker';
