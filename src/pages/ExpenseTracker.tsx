import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, Plus, BarChart3, Settings, Receipt,
  AlertCircle
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings as ExpenseSettingsType } from "@/components/expense-tracker/types";
import { getExpenses, saveExpenses, getSettings, saveSettings } from "@/components/expense-tracker/utils";
import { exportBackup } from "@/components/expense-tracker/exportUtils";
import ExpenseHome from "@/components/expense-tracker/ExpenseHome";
import ExpenseForm from "@/components/expense-tracker/ExpenseForm";
import ExpenseReports from "@/components/expense-tracker/ExpenseReports";
import ExpenseSettingsTab from "@/components/expense-tracker/ExpenseSettings";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ExpenseTracker = () => {
  const [activeTab, setActiveTab] = useState<"home" | "add" | "reports" | "settings">("home");
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const [settings, setSettings] = useState<ExpenseSettingsType>(getSettings());
  const [showBackupReminder, setShowBackupReminder] = useState(false);
  
  // Load expenses on mount
  useEffect(() => {
    const storedExpenses = getExpenses();
    setExpenses(storedExpenses);
    
    // Check if backup reminder needed (daily)
    const lastBackup = localStorage.getItem("healthyplates_expense_last_backup");
    const today = new Date().toDateString();
    if (lastBackup !== today && storedExpenses.length > 0) {
      // Show backup reminder after 5 seconds
      const timer = setTimeout(() => {
        setShowBackupReminder(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Show backup reminder when leaving page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (expenses.length > 0) {
        const lastBackup = localStorage.getItem("healthyplates_expense_last_backup");
        const today = new Date().toDateString();
        if (lastBackup !== today) {
          e.preventDefault();
          e.returnValue = "Don't forget to backup your expense data!";
          return e.returnValue;
        }
      }
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [expenses]);
  
  const handleAddExpense = (expense: ExpenseEntry) => {
    const updatedExpenses = [expense, ...expenses];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    setActiveTab("home");
  };
  
  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(e => e.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    toast.success("Expense deleted");
  };
  
  const handleSettingsChange = (newSettings: ExpenseSettingsType) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  const handleExpensesChange = (newExpenses: ExpenseEntry[]) => {
    setExpenses(newExpenses);
    saveExpenses(newExpenses);
  };
  
  const handleBackupNow = () => {
    exportBackup(expenses, settings);
    localStorage.setItem("healthyplates_expense_last_backup", new Date().toDateString());
    setShowBackupReminder(false);
    toast.success("Backup downloaded");
  };
  
  const handleSkipBackup = () => {
    localStorage.setItem("healthyplates_expense_last_backup", new Date().toDateString());
    setShowBackupReminder(false);
  };
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Expense Tracker</h1>
            <p className="text-xs text-primary-foreground/80">Daily Spend Money</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 max-w-lg mx-auto">
        {activeTab === "home" && (
          <ExpenseHome
            expenses={expenses}
            settings={settings}
            onAddExpense={handleAddExpense}
            onSettingsChange={handleSettingsChange}
            onNavigate={(tab) => setActiveTab(tab as "home" | "add" | "reports" | "settings")}
          />
        )}
        
        {activeTab === "add" && (
          <ExpenseForm
            settings={settings}
            onAddExpense={handleAddExpense}
            onNavigate={(tab) => setActiveTab(tab as "home" | "add" | "reports" | "settings")}
          />
        )}
        
        {activeTab === "reports" && (
          <ExpenseReports
            expenses={expenses}
            settings={settings}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
        
        {activeTab === "settings" && (
          <ExpenseSettingsTab
            settings={settings}
            expenses={expenses}
            onSettingsChange={handleSettingsChange}
            onExpensesChange={handleExpensesChange}
          />
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="max-w-lg mx-auto flex justify-around py-2">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          
          <Button
            variant={activeTab === "add" ? "default" : "ghost"}
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab("add")}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Add</span>
          </Button>
          
          <Button
            variant={activeTab === "reports" ? "default" : "ghost"}
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab("reports")}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Reports</span>
          </Button>
          
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
      
      {/* Backup Reminder Dialog */}
      <AlertDialog open={showBackupReminder} onOpenChange={setShowBackupReminder}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Backup Reminder
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your expense data is stored locally on this device. Would you like to download a backup to keep your data safe?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSkipBackup}>Skip Today</AlertDialogCancel>
            <AlertDialogAction onClick={handleBackupNow}>
              Backup Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExpenseTracker;
