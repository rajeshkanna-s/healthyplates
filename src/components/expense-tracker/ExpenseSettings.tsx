import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Plus, Trash2, Upload, Download, Users, Wallet, 
  Target, Zap, Settings2, Save
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings, QuickAddTemplate, FamilyMember, CategoryBudget, SavingsGoal } from "./types";
import { CURRENCIES, DEFAULT_CATEGORIES, CATEGORY_ICONS } from "./data";
import { exportBackup, importBackup } from "./exportUtils";
import { saveSettings, generateId, getDefaultSettings } from "./utils";
import { toast } from "sonner";

interface ExpenseSettingsTabProps {
  settings: ExpenseSettings;
  expenses: ExpenseEntry[];
  onSettingsChange: (settings: ExpenseSettings) => void;
  onExpensesChange: (expenses: ExpenseEntry[]) => void;
}

const ExpenseSettingsTab = ({ 
  settings, 
  expenses, 
  onSettingsChange, 
  onExpensesChange 
}: ExpenseSettingsTabProps) => {
  const [newMemberName, setNewMemberName] = useState("");
  const [newQuickAdd, setNewQuickAdd] = useState({ name: "", amount: "", category: "", icon: "Coffee" });
  const [newCategoryBudget, setNewCategoryBudget] = useState({ category: "", budget: "" });
  const [newSavingsGoal, setNewSavingsGoal] = useState({ name: "", target: "", date: "" });
  
  const updateSettings = (updates: Partial<ExpenseSettings>) => {
    const newSettings = { ...settings, ...updates };
    onSettingsChange(newSettings);
    saveSettings(newSettings);
  };
  
  // Family Members
  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    const newMember: FamilyMember = {
      id: generateId(),
      name: newMemberName.trim(),
    };
    updateSettings({
      familyMembers: [...settings.familyMembers, newMember],
    });
    setNewMemberName("");
    toast.success("Member added");
  };
  
  const handleRemoveMember = (id: string) => {
    updateSettings({
      familyMembers: settings.familyMembers.filter(m => m.id !== id),
    });
    toast.success("Member removed");
  };
  
  // Quick Add Templates
  const handleAddQuickAdd = () => {
    if (!newQuickAdd.name || !newQuickAdd.amount || !newQuickAdd.category) {
      toast.error("Please fill all fields");
      return;
    }
    const template: QuickAddTemplate = {
      id: generateId(),
      name: newQuickAdd.name,
      amount: parseFloat(newQuickAdd.amount),
      category: newQuickAdd.category,
      platform: "",
      icon: newQuickAdd.icon,
    };
    updateSettings({
      quickAddTemplates: [...settings.quickAddTemplates, template],
    });
    setNewQuickAdd({ name: "", amount: "", category: "", icon: "Coffee" });
    toast.success("Quick Add template created");
  };
  
  const handleRemoveQuickAdd = (id: string) => {
    updateSettings({
      quickAddTemplates: settings.quickAddTemplates.filter(t => t.id !== id),
    });
    toast.success("Template removed");
  };
  
  // Category Budgets
  const handleAddCategoryBudget = () => {
    if (!newCategoryBudget.category || !newCategoryBudget.budget) {
      toast.error("Please fill all fields");
      return;
    }
    const budget: CategoryBudget = {
      category: newCategoryBudget.category,
      budget: parseFloat(newCategoryBudget.budget),
    };
    const existingBudgets = settings.categoryBudgets.filter(
      b => b.category !== newCategoryBudget.category
    );
    updateSettings({
      categoryBudgets: [...existingBudgets, budget],
    });
    setNewCategoryBudget({ category: "", budget: "" });
    toast.success("Category budget set");
  };
  
  const handleRemoveCategoryBudget = (category: string) => {
    updateSettings({
      categoryBudgets: settings.categoryBudgets.filter(b => b.category !== category),
    });
    toast.success("Budget removed");
  };
  
  // Savings Goals
  const handleAddSavingsGoal = () => {
    if (!newSavingsGoal.name || !newSavingsGoal.target || !newSavingsGoal.date) {
      toast.error("Please fill all fields");
      return;
    }
    const goal: SavingsGoal = {
      id: generateId(),
      name: newSavingsGoal.name,
      targetAmount: parseFloat(newSavingsGoal.target),
      targetDate: newSavingsGoal.date,
      savedAmount: 0,
    };
    updateSettings({
      savingsGoals: [...(settings.savingsGoals || []), goal],
    });
    setNewSavingsGoal({ name: "", target: "", date: "" });
    toast.success("Savings goal added");
  };
  
  const handleRemoveSavingsGoal = (id: string) => {
    updateSettings({
      savingsGoals: settings.savingsGoals?.filter(g => g.id !== id) || [],
    });
    toast.success("Goal removed");
  };
  
  // Backup
  const handleExportBackup = () => {
    exportBackup(expenses, settings);
    toast.success("Backup downloaded");
  };
  
  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const data = await importBackup(file);
      onExpensesChange(data.expenses);
      onSettingsChange(data.settings);
      saveSettings(data.settings);
      localStorage.setItem("healthyplates_expense_tracker", JSON.stringify(data.expenses));
      toast.success("Backup restored successfully");
    } catch (error) {
      toast.error("Failed to restore backup");
    }
    
    e.target.value = "";
  };
  
  const handleClearAllData = () => {
    onExpensesChange([]);
    onSettingsChange(getDefaultSettings());
    saveSettings(getDefaultSettings());
    localStorage.removeItem("healthyplates_expense_tracker");
    toast.success("All data cleared");
  };
  
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {/* Currency & Budget */}
        <AccordionItem value="currency" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span>Currency & Monthly Budget</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select 
                value={settings.currency} 
                onValueChange={(v) => {
                  const currency = CURRENCIES.find(c => c.code === v);
                  updateSettings({ 
                    currency: v, 
                    currencySymbol: currency?.symbol || "₹" 
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.symbol} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Monthly Budget ({settings.currencySymbol})</Label>
              <Input
                type="number"
                placeholder="0"
                value={settings.monthlyBudget || ""}
                onChange={(e) => updateSettings({ monthlyBudget: parseFloat(e.target.value) || 0 })}
              />
              <p className="text-xs text-muted-foreground">
                Set your monthly spending limit to get alerts
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Big Expense Alert Limit ({settings.currencySymbol})</Label>
              <Input
                type="number"
                placeholder="2000"
                value={settings.bigExpenseLimit || ""}
                onChange={(e) => updateSettings({ bigExpenseLimit: parseFloat(e.target.value) || 2000 })}
              />
              <p className="text-xs text-muted-foreground">
                Expenses above this amount will be highlighted
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Family Members */}
        <AccordionItem value="members" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Family Members</span>
              <Badge variant="secondary" className="ml-2">{settings.familyMembers.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex gap-2">
              <Input
                placeholder="Member name (Mom, Dad, Child...)"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
              <Button onClick={handleAddMember} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span>{member.name}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Quick Add Templates */}
        <AccordionItem value="quickadd" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Quick Add Templates</span>
              <Badge variant="secondary" className="ml-2">{settings.quickAddTemplates.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
              <Input
                placeholder="Template name (e.g., Tea)"
                value={newQuickAdd.name}
                onChange={(e) => setNewQuickAdd({ ...newQuickAdd, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newQuickAdd.amount}
                onChange={(e) => setNewQuickAdd({ ...newQuickAdd, amount: e.target.value })}
              />
              <Select 
                value={newQuickAdd.category} 
                onValueChange={(v) => setNewQuickAdd({ ...newQuickAdd, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={newQuickAdd.icon} 
                onValueChange={(v) => setNewQuickAdd({ ...newQuickAdd, icon: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CATEGORY_ICONS).map((icon) => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddQuickAdd} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.quickAddTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{template.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {settings.currencySymbol}{template.amount}
                    </span>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleRemoveQuickAdd(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Category Budgets */}
        <AccordionItem value="categorybudgets" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Category Budgets</span>
              <Badge variant="secondary" className="ml-2">{settings.categoryBudgets?.length || 0}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
              <Select 
                value={newCategoryBudget.category} 
                onValueChange={(v) => setNewCategoryBudget({ ...newCategoryBudget, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder={`Budget (${settings.currencySymbol})`}
                value={newCategoryBudget.budget}
                onChange={(e) => setNewCategoryBudget({ ...newCategoryBudget, budget: e.target.value })}
              />
              <Button onClick={handleAddCategoryBudget} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Set Budget
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.categoryBudgets?.map((budget) => (
                <div key={budget.category} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{budget.category}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {settings.currencySymbol}{budget.budget.toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleRemoveCategoryBudget(budget.category)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Savings Goals */}
        <AccordionItem value="savings" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Savings Goals</span>
              <Badge variant="secondary" className="ml-2">{settings.savingsGoals?.length || 0}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
              <Input
                placeholder="Goal name (e.g., Vacation Fund)"
                value={newSavingsGoal.name}
                onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder={`Target amount (${settings.currencySymbol})`}
                value={newSavingsGoal.target}
                onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, target: e.target.value })}
              />
              <Input
                type="date"
                value={newSavingsGoal.date}
                onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, date: e.target.value })}
              />
              <Button onClick={handleAddSavingsGoal} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.savingsGoals?.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {settings.currencySymbol}{goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleRemoveSavingsGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Backup & Restore */}
        <AccordionItem value="backup" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              <span>Backup & Data</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <Button onClick={handleExportBackup} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Backup
              </Button>
              
              <div>
                <Label htmlFor="import-backup" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg hover:bg-muted/50 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Import Backup</span>
                  </div>
                </Label>
                <input
                  id="import-backup"
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your expenses and settings. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAllData}>
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                💡 Tip: Download a backup regularly to avoid losing your data!
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ExpenseSettingsTab;
