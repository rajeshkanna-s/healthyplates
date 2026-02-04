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

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "add", label: "Add", icon: Plus },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-lg mx-auto p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Expense Tracker</h1>
              <p className="text-xs text-primary-foreground/80">Track your daily spending</p>
            </div>
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
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around py-2 px-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`flex-1 flex flex-col items-center gap-1 h-auto py-3 relative transition-all ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
                  )}
                  <tab.icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Backup Reminder Dialog */}
      <AlertDialog open={showBackupReminder} onOpenChange={setShowBackupReminder}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              Backup Reminder
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
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
