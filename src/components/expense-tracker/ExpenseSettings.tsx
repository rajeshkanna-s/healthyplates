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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Plus, Trash2, Upload, Download, Users, Wallet, 
  Target, Zap, Settings2, Edit2, CreditCard, Tag, Store
} from "lucide-react";
import { ExpenseEntry, ExpenseSettings, QuickAddTemplate, FamilyMember, CategoryBudget, SavingsGoal } from "./types";
import { CURRENCIES, DEFAULT_CATEGORIES, CATEGORY_ICONS, PAYMENT_METHODS, ALL_PLATFORMS } from "./data";
import { exportBackup, importBackup } from "./exportUtils";
import { saveSettings, generateId, getDefaultSettings } from "./utils";
import { toast } from "sonner";
import HowToUseGuide from "./HowToUseGuide";
import ExpenseFAQ from "./ExpenseFAQ";

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
  const [newQuickAdd, setNewQuickAdd] = useState({ name: "", amount: "", category: "", platform: "", icon: "Coffee", paymentMethod: "UPI" });
  const [editingQuickAdd, setEditingQuickAdd] = useState<QuickAddTemplate | null>(null);
  const [newCategoryBudget, setNewCategoryBudget] = useState({ category: "", budget: "" });
  const [newSavingsGoal, setNewSavingsGoal] = useState({ name: "", target: "", date: "" });
  const [newPaymentMethod, setNewPaymentMethod] = useState("");
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<{ old: string; new: string } | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<{ old: string; new: string } | null>(null);
  const [newPlatform, setNewPlatform] = useState("");
  const [editingPlatform, setEditingPlatform] = useState<{ old: string; new: string } | null>(null);
  
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
      toast.error("Please fill all required fields");
      return;
    }
    const template: QuickAddTemplate = {
      id: generateId(),
      name: newQuickAdd.name,
      amount: parseFloat(newQuickAdd.amount),
      category: newQuickAdd.category,
      platform: newQuickAdd.platform || "",
      icon: newQuickAdd.icon,
    };
    updateSettings({
      quickAddTemplates: [...settings.quickAddTemplates, template],
    });
    setNewQuickAdd({ name: "", amount: "", category: "", platform: "", icon: "Coffee", paymentMethod: "UPI" });
    toast.success("Quick Add template created");
  };

  const handleEditQuickAdd = () => {
    if (!editingQuickAdd) return;
    
    const updated = settings.quickAddTemplates.map(t => 
      t.id === editingQuickAdd.id ? editingQuickAdd : t
    );
    updateSettings({ quickAddTemplates: updated });
    setEditingQuickAdd(null);
    toast.success("Template updated");
  };
  
  const handleRemoveQuickAdd = (id: string) => {
    updateSettings({
      quickAddTemplates: settings.quickAddTemplates.filter(t => t.id !== id),
    });
    toast.success("Template removed");
  };
  
  // Payment Methods
  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.trim()) {
      toast.error("Please enter a payment method name");
      return;
    }
    
    const allMethods = [...PAYMENT_METHODS, ...settings.customPaymentMethods];
    if (allMethods.includes(newPaymentMethod.trim())) {
      toast.error("Payment method already exists");
      return;
    }
    
    updateSettings({
      customPaymentMethods: [...settings.customPaymentMethods, newPaymentMethod.trim()],
    });
    setNewPaymentMethod("");
    toast.success("Payment method added");
  };

  const handleEditPaymentMethod = () => {
    if (!editingPaymentMethod || !editingPaymentMethod.new.trim()) return;
    
    const updated = settings.customPaymentMethods.map(m => 
      m === editingPaymentMethod.old ? editingPaymentMethod.new.trim() : m
    );
    updateSettings({ customPaymentMethods: updated });
    setEditingPaymentMethod(null);
    toast.success("Payment method updated");
  };

  const handleRemovePaymentMethod = (method: string) => {
    updateSettings({
      customPaymentMethods: settings.customPaymentMethods.filter(m => m !== method),
    });
    toast.success("Payment method removed");
  };

  // Custom Categories
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    
    const allCategories = [...DEFAULT_CATEGORIES.map(c => c.name), ...settings.customCategories.map(c => c.name)];
    if (allCategories.includes(newCategory.trim())) {
      toast.error("Category already exists");
      return;
    }
    
    updateSettings({
      customCategories: [...settings.customCategories, { name: newCategory.trim(), icon: "MoreHorizontal" }],
    });
    setNewCategory("");
    toast.success("Category added");
  };

  const handleEditCategory = () => {
    if (!editingCategory || !editingCategory.new.trim()) return;
    
    const updated = settings.customCategories.map(c => 
      c.name === editingCategory.old ? { ...c, name: editingCategory.new.trim() } : c
    );
    updateSettings({ customCategories: updated });
    setEditingCategory(null);
    toast.success("Category updated");
  };

  const handleRemoveCategory = (categoryName: string) => {
    updateSettings({
      customCategories: settings.customCategories.filter(c => c.name !== categoryName),
    });
    toast.success("Category removed");
  };

  // Custom Platforms/Shops
  const handleAddPlatform = () => {
    if (!newPlatform.trim()) {
      toast.error("Please enter a platform/shop name");
      return;
    }
    
    const allPlatforms = [...ALL_PLATFORMS, ...(settings.customPlatforms || [])];
    if (allPlatforms.includes(newPlatform.trim())) {
      toast.error("Platform/Shop already exists");
      return;
    }
    
    updateSettings({
      customPlatforms: [...(settings.customPlatforms || []), newPlatform.trim()],
    });
    setNewPlatform("");
    toast.success("Platform/Shop added");
  };

  const handleEditPlatform = () => {
    if (!editingPlatform || !editingPlatform.new.trim()) return;
    
    const updated = (settings.customPlatforms || []).map(p => 
      p === editingPlatform.old ? editingPlatform.new.trim() : p
    );
    updateSettings({ customPlatforms: updated });
    setEditingPlatform(null);
    toast.success("Platform/Shop updated");
  };

  const handleRemovePlatform = (platform: string) => {
    updateSettings({
      customPlatforms: (settings.customPlatforms || []).filter(p => p !== platform),
    });
    toast.success("Platform/Shop removed");
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

  const allIcons = Object.keys(CATEGORY_ICONS);
  
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {/* Currency & Budget */}
        <AccordionItem value="currency" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Currency & Monthly Budget</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
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
                <SelectTrigger className="h-12">
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
                className="h-12"
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
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Expenses above this amount will be highlighted
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Family Members */}
        <AccordionItem value="members" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Family Members</span>
              <Badge variant="secondary" className="ml-2">{settings.familyMembers.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Member name (Son, Daughter...)"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddMember()}
                className="h-12"
              />
              <Button onClick={handleAddMember} size="icon" className="h-12 w-12">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <span className="font-medium">{member.name}</span>
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
        <AccordionItem value="quickadd" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Quick Add Templates</span>
              <Badge variant="secondary" className="ml-2">{settings.quickAddTemplates.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
              <Input
                placeholder="Template name (e.g., Tea)"
                value={newQuickAdd.name}
                onChange={(e) => setNewQuickAdd({ ...newQuickAdd, name: e.target.value })}
                className="h-12"
              />
              <Input
                type="number"
                placeholder="Amount"
                value={newQuickAdd.amount}
                onChange={(e) => setNewQuickAdd({ ...newQuickAdd, amount: e.target.value })}
                className="h-12"
              />
              <Select 
                value={newQuickAdd.category} 
                onValueChange={(v) => setNewQuickAdd({ ...newQuickAdd, category: v })}
              >
                <SelectTrigger className="h-12">
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
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {allIcons.map((icon) => {
                    const IconComponent = CATEGORY_ICONS[icon];
                    return (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {icon}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select 
                value={newQuickAdd.paymentMethod} 
                onValueChange={(v) => setNewQuickAdd({ ...newQuickAdd, paymentMethod: v })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {[...PAYMENT_METHODS, ...settings.customPaymentMethods].map((method) => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddQuickAdd} className="w-full h-12">
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.quickAddTemplates.map((template) => {
                const IconComponent = CATEGORY_ICONS[template.icon] || Wallet;
                return (
                  <div key={template.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">{template.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {settings.currencySymbol}{template.amount}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => setEditingQuickAdd(template)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveQuickAdd(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Payment Methods */}
        <AccordionItem value="payment" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Payment Methods</span>
              <Badge variant="secondary" className="ml-2">{PAYMENT_METHODS.length + settings.customPaymentMethods.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="New payment method"
                value={newPaymentMethod}
                onChange={(e) => setNewPaymentMethod(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddPaymentMethod()}
                className="h-12"
              />
              <Button onClick={handleAddPaymentMethod} size="icon" className="h-12 w-12">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Default Methods</p>
              {PAYMENT_METHODS.map((method) => (
                <div key={method} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span>{method}</span>
                  <Badge variant="outline" className="text-xs">Default</Badge>
                </div>
              ))}
            </div>

            {settings.customPaymentMethods.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Custom Methods</p>
                {settings.customPaymentMethods.map((method) => (
                  <div key={method} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span className="font-medium">{method}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => setEditingPaymentMethod({ old: method, new: method })}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemovePaymentMethod(method)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Categories */}
        <AccordionItem value="categories" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Categories</span>
              <Badge variant="secondary" className="ml-2">
                {DEFAULT_CATEGORIES.length + settings.customCategories.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                className="h-12"
              />
              <Button onClick={handleAddCategory} size="icon" className="h-12 w-12">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Default Categories</p>
              {DEFAULT_CATEGORIES.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span>{cat.name}</span>
                  <Badge variant="outline" className="text-xs">Default</Badge>
                </div>
              ))}
            </div>

            {settings.customCategories.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Custom Categories</p>
                {settings.customCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span className="font-medium">{cat.name}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => setEditingCategory({ old: cat.name, new: cat.name })}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveCategory(cat.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Platforms / Shops */}
        <AccordionItem value="platforms" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Store className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Platforms / Shops</span>
              <Badge variant="secondary" className="ml-2">
                {ALL_PLATFORMS.length + (settings.customPlatforms?.length || 0)}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="New platform/shop name"
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddPlatform()}
                className="h-12"
              />
              <Button onClick={handleAddPlatform} size="icon" className="h-12 w-12">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Default Platforms</p>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {ALL_PLATFORMS.map((platform) => (
                  <div key={platform} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg text-sm">
                    <span>{platform}</span>
                    <Badge variant="outline" className="text-xs">Default</Badge>
                  </div>
                ))}
              </div>
            </div>

            {(settings.customPlatforms?.length || 0) > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Custom Platforms</p>
                {settings.customPlatforms?.map((platform) => (
                  <div key={platform} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <span className="font-medium">{platform}</span>
                    <div className="flex gap-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => setEditingPlatform({ old: platform, new: platform })}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemovePlatform(platform)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {/* Category Budgets */}
        <AccordionItem value="categorybudgets" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Category Budgets</span>
              <Badge variant="secondary" className="ml-2">{settings.categoryBudgets?.length || 0}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
              <Select 
                value={newCategoryBudget.category} 
                onValueChange={(v) => setNewCategoryBudget({ ...newCategoryBudget, category: v })}
              >
                <SelectTrigger className="h-12">
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
                className="h-12"
              />
              <Button onClick={handleAddCategoryBudget} className="w-full h-12">
                <Plus className="h-4 w-4 mr-2" />
                Set Budget
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.categoryBudgets?.map((budget) => (
                <div key={budget.category} className="flex items-center justify-between p-3 bg-muted rounded-xl">
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
        <AccordionItem value="savings" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Savings Goals</span>
              <Badge variant="secondary" className="ml-2">{settings.savingsGoals?.length || 0}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-3 p-4 bg-muted/50 rounded-xl">
              <Input
                placeholder="Goal name (e.g., Vacation Fund)"
                value={newSavingsGoal.name}
                onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, name: e.target.value })}
                className="h-12"
              />
              <Input
                type="number"
                placeholder={`Target amount (${settings.currencySymbol})`}
                value={newSavingsGoal.target}
                onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, target: e.target.value })}
                className="h-12"
              />
              <Input
                type="date"
                value={newSavingsGoal.date}
                onChange={(e) => setNewSavingsGoal({ ...newSavingsGoal, date: e.target.value })}
                className="h-12"
              />
              <Button onClick={handleAddSavingsGoal} className="w-full h-12">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
            
            <div className="space-y-2">
              {settings.savingsGoals?.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
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
        <AccordionItem value="backup" className="border rounded-xl px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings2 className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Backup & Data</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-3">
              <Button onClick={handleExportBackup} variant="outline" className="w-full h-12">
                <Download className="h-5 w-5 mr-2" />
                Download Backup
              </Button>
              
              <div>
                <Label htmlFor="import-backup" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl hover:bg-muted/50 transition-colors">
                    <Upload className="h-5 w-5" />
                    <span className="font-medium">Import Backup</span>
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
                  <Button variant="destructive" className="w-full h-12">
                    <Trash2 className="h-5 w-5 mr-2" />
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
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                💡 Tip: Download a backup regularly to avoid losing your data!
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* How to Use Guide */}
      <HowToUseGuide />

      {/* FAQ */}
      <ExpenseFAQ />

      {/* Edit Quick Add Dialog */}
      <Dialog open={!!editingQuickAdd} onOpenChange={() => setEditingQuickAdd(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Quick Add Template</DialogTitle>
          </DialogHeader>
          {editingQuickAdd && (
            <div className="space-y-4 py-4">
              <Input
                placeholder="Template name"
                value={editingQuickAdd.name}
                onChange={(e) => setEditingQuickAdd({ ...editingQuickAdd, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={editingQuickAdd.amount}
                onChange={(e) => setEditingQuickAdd({ ...editingQuickAdd, amount: parseFloat(e.target.value) || 0 })}
              />
              <Select 
                value={editingQuickAdd.category} 
                onValueChange={(v) => setEditingQuickAdd({ ...editingQuickAdd, category: v })}
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
                value={editingQuickAdd.icon} 
                onValueChange={(v) => setEditingQuickAdd({ ...editingQuickAdd, icon: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {allIcons.map((icon) => {
                    const IconComponent = CATEGORY_ICONS[icon];
                    return (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {icon}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingQuickAdd(null)}>Cancel</Button>
            <Button onClick={handleEditQuickAdd}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Method Dialog */}
      <Dialog open={!!editingPaymentMethod} onOpenChange={() => setEditingPaymentMethod(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
          </DialogHeader>
          {editingPaymentMethod && (
            <div className="py-4">
              <Input
                placeholder="Payment method name"
                value={editingPaymentMethod.new}
                onChange={(e) => setEditingPaymentMethod({ ...editingPaymentMethod, new: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPaymentMethod(null)}>Cancel</Button>
            <Button onClick={handleEditPaymentMethod}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <div className="py-4">
              <Input
                placeholder="Category name"
                value={editingCategory.new}
                onChange={(e) => setEditingCategory({ ...editingCategory, new: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Platform Dialog */}
      <Dialog open={!!editingPlatform} onOpenChange={() => setEditingPlatform(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Platform / Shop</DialogTitle>
          </DialogHeader>
          {editingPlatform && (
            <div className="py-4">
              <Input
                placeholder="Platform/Shop name"
                value={editingPlatform.new}
                onChange={(e) => setEditingPlatform({ ...editingPlatform, new: e.target.value })}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPlatform(null)}>Cancel</Button>
            <Button onClick={handleEditPlatform}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseSettingsTab;
