import { ExpenseEntry, ExpenseSettings } from "./types";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportToExcel = (expenses: ExpenseEntry[], settings: ExpenseSettings, filename: string = "expense-report") => {
  const data = expenses.map((expense, index) => ({
    "S.No": index + 1,
    "Expense ID": expense.id,
    "Date": format(new Date(expense.date), "dd-MM-yyyy"),
    "Time": expense.time,
    "Category": expense.category,
    "Platform/Shop": expense.platform || "-",
    "Description": expense.description || "-",
    "Amount": expense.amount,
    "Currency": settings.currencySymbol,
    "Payment Method": expense.paymentMethod,
    "Person": expense.person || "-",
    "Tags": expense.tags?.join(", ") || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Set column widths
  worksheet["!cols"] = [
    { wch: 6 },  // S.No
    { wch: 25 }, // Expense ID
    { wch: 12 }, // Date
    { wch: 8 },  // Time
    { wch: 18 }, // Category
    { wch: 20 }, // Platform/Shop
    { wch: 30 }, // Description
    { wch: 12 }, // Amount
    { wch: 8 },  // Currency
    { wch: 15 }, // Payment Method
    { wch: 12 }, // Person
    { wch: 20 }, // Tags
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

  // Add summary sheet
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const summaryData = [
    { "Summary": "Total Expenses", "Value": expenses.length },
    { "Summary": "Total Amount", "Value": `${settings.currencySymbol}${totalAmount.toLocaleString()}` },
    { "Summary": "Date Range", "Value": expenses.length > 0 
      ? `${format(new Date(expenses[expenses.length - 1].date), "dd-MM-yyyy")} to ${format(new Date(expenses[0].date), "dd-MM-yyyy")}`
      : "-" 
    },
    { "Summary": "Generated On", "Value": format(new Date(), "dd-MM-yyyy HH:mm") },
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

  XLSX.writeFile(workbook, `${filename}-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
};

export const exportSingleExpenseToPDF = (expense: ExpenseEntry, settings: ExpenseSettings) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("EXPENSE RECEIPT", 105, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("HealthyPlates Expense Tracker", 105, 30, { align: "center" });
  
  // Reset colors
  doc.setTextColor(0, 0, 0);
  
  // Expense ID box
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(15, 50, 180, 20, 3, 3, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Expense ID:", 20, 62);
  doc.setFont("helvetica", "normal");
  doc.text(expense.id, 55, 62);
  
  // Amount box
  doc.setFillColor(34, 197, 94);
  doc.roundedRect(15, 80, 180, 35, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Amount", 105, 93, { align: "center" });
  doc.setFontSize(28);
  doc.text(`${settings.currencySymbol} ${expense.amount.toLocaleString()}`, 105, 108, { align: "center" });
  
  // Reset colors
  doc.setTextColor(0, 0, 0);
  
  // Details table
  const details = [
    ["Date", format(new Date(expense.date), "dd MMMM yyyy")],
    ["Time", expense.time],
    ["Category", expense.category],
    ["Platform/Shop", expense.platform || "-"],
    ["Payment Method", expense.paymentMethod],
    ["Person", expense.person || "-"],
    ["Description", expense.description || "-"],
    ["Tags", expense.tags?.join(", ") || "-"],
  ];
  
  autoTable(doc, {
    body: details,
    startY: 125,
    theme: "striped",
    styles: {
      fontSize: 11,
      cellPadding: 6,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 50 },
      1: { cellWidth: 130 },
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  // Footer
  const finalY = (doc as any).lastAutoTable?.finalY || 200;
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${format(new Date(), "dd MMM yyyy, HH:mm")}`, 105, finalY + 15, { align: "center" });
  doc.text("HealthyPlates - Track your expenses wisely", 105, finalY + 22, { align: "center" });
  
  doc.save(`expense-${expense.id}.pdf`);
};

export const exportReportToPDF = (
  expenses: ExpenseEntry[], 
  settings: ExpenseSettings,
  dateRange: { from: string; to: string }
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("EXPENSE REPORT", 105, 18, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${format(new Date(dateRange.from), "dd MMM yyyy")} - ${format(new Date(dateRange.to), "dd MMM yyyy")}`, 105, 28, { align: "center" });
  
  // Reset colors
  doc.setTextColor(0, 0, 0);
  
  // Summary
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Summary", 15, 50);
  
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(15, 55, 85, 25, 3, 3, "F");
  doc.roundedRect(110, 55, 85, 25, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Total Expenses", 20, 65);
  doc.setFont("helvetica", "bold");
  doc.text(expenses.length.toString(), 20, 75);
  
  doc.setFont("helvetica", "normal");
  doc.text("Total Amount", 115, 65);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 197, 94);
  doc.text(`${settings.currencySymbol} ${totalAmount.toLocaleString()}`, 115, 75);
  
  doc.setTextColor(0, 0, 0);
  
  // Expenses table
  doc.setFont("helvetica", "bold");
  doc.text("Expense Details", 15, 95);
  
  const tableData = expenses.map((expense, index) => [
    (index + 1).toString(),
    expense.id.substring(0, 15) + "...",
    format(new Date(expense.date), "dd/MM/yy"),
    expense.category.substring(0, 12),
    expense.platform?.substring(0, 12) || "-",
    `${settings.currencySymbol}${expense.amount.toLocaleString()}`,
    expense.paymentMethod.substring(0, 10),
  ]);
  
  autoTable(doc, {
    head: [["#", "ID", "Date", "Category", "Platform", "Amount", "Payment"]],
    body: tableData,
    startY: 100,
    theme: "striped",
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [34, 197, 94],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 35 },
      2: { cellWidth: 22 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
      5: { cellWidth: 28 },
      6: { cellWidth: 25 },
    },
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount} | Generated on ${format(new Date(), "dd MMM yyyy, HH:mm")} | HealthyPlates Expense Tracker`,
      105,
      290,
      { align: "center" }
    );
  }
  
  doc.save(`expense-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const exportBackup = (expenses: ExpenseEntry[], settings: ExpenseSettings) => {
  const backup = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    expenses,
    settings,
  };
  
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `expense-backup-${format(new Date(), "yyyy-MM-dd")}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importBackup = (file: File): Promise<{ expenses: ExpenseEntry[]; settings: ExpenseSettings }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.expenses && data.settings) {
          resolve({ expenses: data.expenses, settings: data.settings });
        } else {
          reject(new Error("Invalid backup file format"));
        }
      } catch (error) {
        reject(new Error("Failed to parse backup file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};
