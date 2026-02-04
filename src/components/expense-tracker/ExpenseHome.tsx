import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  TrendingUp, AlertTriangle, Wallet, 
  Calendar, Target, Lightbulb, Save, Sparkles
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings, QuickAddTemplate, DayNote } from "./types";
import { CATEGORY_ICONS } from "./data";
import {
  getTodayTotal, getMonthTotal, getBudgetColor,
  generateId, getTodayString, getCurrentTimeString, getNoSpendDays,
  getCuttingSuggestions, saveSettings
} from "./utils";
import SpendingSummary from "./SpendingSummary";
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
    if (budgetPercentage >= 100) return "bg-destructive";
    if (budgetPercentage >= 80) return "bg-orange-500";
    return "bg-green-500";
  };
  
  const getBudgetStatusBg = () => {
    if (settings.monthlyBudget <= 0) return "bg-muted/50";
    if (budgetPercentage >= 100) return "bg-destructive/10 border-destructive/20";
    if (budgetPercentage >= 80) return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
    return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
  };
  
  return (
    <div className="space-y-6">
      {/* Daily Summary Banner */}
      <Card className={`border-2 ${getBudgetStatusBg()} overflow-hidden`}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Today's Spending</span>
            </div>
            {budgetPercentage >= 80 && settings.monthlyBudget > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {budgetPercentage >= 100 ? "Over Budget!" : "Near Budget"}
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">{settings.currencySymbol}{todayTotal.toLocaleString()}</span>
          </div>
          
          <div className="mt-5 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Monthly Total</span>
              {settings.monthlyBudget > 0 && (
                <span className={getBudgetColor(monthTotal, settings.monthlyBudget)}>
                  {budgetPercentage}% of budget
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold">{settings.currencySymbol}{monthTotal.toLocaleString()}</span>
              {settings.monthlyBudget > 0 && (
                <span className="text-sm text-muted-foreground">
                  / {settings.currencySymbol}{settings.monthlyBudget.toLocaleString()}
                </span>
              )}
            </div>
            
            {settings.monthlyBudget > 0 && (
              <div className="mt-3 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all rounded-full ${getBudgetStatusColor()}`}
                  style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Add Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Add
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate("settings")}
            className="text-xs"
          >
            Customize
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {settings.quickAddTemplates.slice(0, 6).map((template) => {
            const IconComponent = CATEGORY_ICONS[template.icon] || Wallet;
            return (
              <Card 
                key={template.id}
                className="cursor-pointer hover:border-primary hover:shadow-md transition-all active:scale-95"
                onClick={() => handleQuickAdd(template)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium truncate">{template.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{settings.currencySymbol}{template.amount}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Spending Summary - Day/Week/Month/Year */}
      <SpendingSummary expenses={expenses} settings={settings} />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-200/50 dark:border-green-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
              <Target className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">No-Spend Days</span>
            </div>
            <p className="text-3xl font-bold text-green-700 dark:text-green-300">{noSpendDays}</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">this month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Avg Daily</span>
            </div>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              {settings.currencySymbol}
              {Math.round(monthTotal / Math.max(new Date().getDate(), 1)).toLocaleString()}
            </p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">this month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Day Note */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              Today's Note
            </h4>
            {!editingNote && dayNote && (
              <Button size="sm" variant="ghost" onClick={() => setEditingNote(true)}>
                Edit
              </Button>
            )}
          </div>
          
          {editingNote || !dayNote ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Why was today's spending high? (e.g., Family outing, Travel day)"
                value={dayNote}
                onChange={(e) => setDayNote(e.target.value)}
                rows={2}
                className="resize-none"
              />
              <Button size="sm" onClick={handleSaveDayNote} className="gap-2">
                <Save className="h-4 w-4" />
                Save Note
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{dayNote}</p>
          )}
        </CardContent>
      </Card>
      
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/50 dark:border-blue-800/50">
          <CardContent className="p-4">
            <h4 className="font-medium flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Where Can You Cut?
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* Budget Warning */}
      {settings.monthlyBudget > 0 && budgetPercentage >= 80 && (
        <Card className="bg-gradient-to-r from-destructive/10 to-red-50 dark:from-destructive/20 dark:to-red-900/10 border-destructive/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-destructive/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-semibold text-destructive">Budget Alert</h4>
                <p className="text-sm text-destructive/80 mt-1">
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
