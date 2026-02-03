import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  TrendingUp, TrendingDown, AlertTriangle, Wallet, 
  Calendar, Target, Lightbulb, Save
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings, QuickAddTemplate, DayNote } from "./types";
import { CATEGORY_ICONS } from "./data";
import {
  getTodayTotal, getMonthTotal, getBudgetColor, getBudgetBgColor,
  generateId, getTodayString, getCurrentTimeString, getNoSpendDays,
  getCuttingSuggestions, getExpenses, saveExpenses, saveSettings
} from "./utils";
import { toast } from "sonner";

interface ExpenseHomeProps {
  expenses: ExpenseEntry[];
  settings: ExpenseSettings;
  onAddExpense: (expense: ExpenseEntry) => void;
  onSettingsChange: (settings: ExpenseSettings) => void;
  onNavigate: (tab: string) => void;
}

const ExpenseHome = ({ expenses, settings, onAddExpense, onSettingsChange, onNavigate }: ExpenseHomeProps) => {
  const [dayNote, setDayNote] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  
  const todayTotal = getTodayTotal(expenses);
  const monthTotal = getMonthTotal(expenses);
  const budgetPercentage = settings.monthlyBudget > 0 
    ? Math.round((monthTotal / settings.monthlyBudget) * 100) 
    : 0;
  
  const now = new Date();
  const noSpendDays = getNoSpendDays(expenses, now.getFullYear(), now.getMonth());
  const suggestions = getCuttingSuggestions(expenses);
  
  // Load day note
  useEffect(() => {
    const today = getTodayString();
    const existingNote = settings.dayNotes?.find(n => n.date === today);
    if (existingNote) {
      setDayNote(existingNote.note);
    }
  }, [settings.dayNotes]);
  
  const handleQuickAdd = (template: QuickAddTemplate) => {
    const expense: ExpenseEntry = {
      id: generateId(),
      amount: template.amount,
      category: template.category,
      platform: template.platform,
      paymentMethod: "UPI",
      date: getTodayString(),
      time: getCurrentTimeString(),
      description: template.name,
      tags: [],
      person: settings.familyMembers[0]?.name || "Me",
      createdAt: new Date().toISOString(),
    };
    
    onAddExpense(expense);
    toast.success(`Added ${template.name} - ${settings.currencySymbol}${template.amount}`);
  };
  
  const handleSaveDayNote = () => {
    const today = getTodayString();
    const updatedNotes = settings.dayNotes?.filter(n => n.date !== today) || [];
    if (dayNote.trim()) {
      updatedNotes.push({ date: today, note: dayNote.trim() });
    }
    
    const updatedSettings = { ...settings, dayNotes: updatedNotes };
    onSettingsChange(updatedSettings);
    saveSettings(updatedSettings);
    setEditingNote(false);
    toast.success("Day note saved");
  };
  
  const getBudgetStatusColor = () => {
    if (settings.monthlyBudget <= 0) return "bg-muted";
    if (budgetPercentage >= 100) return "bg-red-500";
    if (budgetPercentage >= 80) return "bg-orange-500";
    return "bg-green-500";
  };
  
  const getBudgetStatusBg = () => {
    if (settings.monthlyBudget <= 0) return "bg-muted/50";
    if (budgetPercentage >= 100) return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    if (budgetPercentage >= 80) return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
    return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
  };
  
  return (
    <div className="space-y-6">
      {/* Daily Summary Banner */}
      <Card className={`border-2 ${getBudgetStatusBg()}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Today you spent</span>
            {budgetPercentage >= 80 && settings.monthlyBudget > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {budgetPercentage >= 100 ? "Over Budget!" : "Near Budget"}
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{settings.currencySymbol}{todayTotal.toLocaleString()}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">This month so far</span>
              {settings.monthlyBudget > 0 && (
                <span className={getBudgetColor(monthTotal, settings.monthlyBudget)}>
                  {budgetPercentage}% of budget
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-semibold">{settings.currencySymbol}{monthTotal.toLocaleString()}</span>
              {settings.monthlyBudget > 0 && (
                <span className="text-sm text-muted-foreground">
                  / {settings.currencySymbol}{settings.monthlyBudget.toLocaleString()}
                </span>
              )}
            </div>
            
            {settings.monthlyBudget > 0 && (
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${getBudgetStatusColor()}`}
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Add Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Quick Add</h3>
          <span className="text-xs text-muted-foreground">One-tap expense</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {settings.quickAddTemplates.slice(0, 6).map((template) => {
            const IconComponent = CATEGORY_ICONS[template.icon] || Wallet;
            return (
              <Card 
                key={template.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleQuickAdd(template)}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium truncate">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{settings.currencySymbol}{template.amount}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-medium">No-Spend Days</span>
            </div>
            <p className="text-2xl font-bold">{noSpendDays}</p>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">Avg Daily</span>
            </div>
            <p className="text-2xl font-bold">
              {settings.currencySymbol}
              {Math.round(monthTotal / Math.max(new Date().getDate(), 1)).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Day Note */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              Today's Note
            </h4>
            {!editingNote && dayNote && (
              <Button size="sm" variant="ghost" onClick={() => setEditingNote(true)}>
                Edit
              </Button>
            )}
          </div>
          
          {editingNote || !dayNote ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Why was today's spending high? (e.g., Family outing, Travel day)"
                value={dayNote}
                onChange={(e) => setDayNote(e.target.value)}
                rows={2}
              />
              <Button size="sm" onClick={handleSaveDayNote}>
                <Save className="h-4 w-4 mr-1" />
                Save Note
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{dayNote}</p>
          )}
        </CardContent>
      </Card>
      
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              Where Can You Cut?
            </h4>
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* Budget Warning */}
      {settings.monthlyBudget > 0 && budgetPercentage >= 80 && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-700 dark:text-red-400">Budget Alert</h4>
                <p className="text-sm text-red-600 dark:text-red-300">
                  {budgetPercentage >= 100 
                    ? `You've exceeded your monthly budget by ${settings.currencySymbol}${(monthTotal - settings.monthlyBudget).toLocaleString()}!`
                    : `You've used ${budgetPercentage}% of your budget. Only ${settings.currencySymbol}${(settings.monthlyBudget - monthTotal).toLocaleString()} remaining.`
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseHome;
