import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { ExpenseEntry, ExpenseSettings } from "./types";
import { DEFAULT_CATEGORIES, PLATFORMS_BY_CATEGORY, PAYMENT_METHODS } from "./data";
import { generateId, getTodayString, getCurrentTimeString } from "./utils";
import { toast } from "sonner";

interface ExpenseFormProps {
  settings: ExpenseSettings;
  onAddExpense: (expense: ExpenseEntry) => void;
  onNavigate: (tab: string) => void;
}

const ExpenseForm = ({ settings, onAddExpense, onNavigate }: ExpenseFormProps) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [date, setDate] = useState(getTodayString());
  const [time, setTime] = useState(getCurrentTimeString());
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [person, setPerson] = useState(settings.familyMembers[0]?.name || "Me");
  
  const allCategories = [
    ...DEFAULT_CATEGORIES,
    ...settings.customCategories.map(c => ({ name: c.name, icon: c.icon || "MoreHorizontal" }))
  ];
  
  const availablePlatforms = category ? (PLATFORMS_BY_CATEGORY[category] || ["Other"]) : [];
  const allPaymentMethods = [...PAYMENT_METHODS, ...settings.customPaymentMethods];
  
  // Reset platform when category changes
  useEffect(() => {
    setPlatform("");
  }, [category]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    const expense: ExpenseEntry = {
      id: generateId(),
      amount: parseFloat(amount),
      category,
      platform: platform || "",
      paymentMethod,
      date,
      time,
      description,
      tags,
      person,
      createdAt: new Date().toISOString(),
    };
    
    onAddExpense(expense);
    toast.success(`Expense of ${settings.currencySymbol}${parseFloat(amount).toLocaleString()} added`);
    
    // Reset form
    setAmount("");
    setCategory("");
    setPlatform("");
    setDescription("");
    setTags([]);
    setDate(getTodayString());
    setTime(getCurrentTimeString());
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({settings.currencySymbol})</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-xl font-semibold"
            />
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Platform/Shop */}
          {category && (
            <div className="space-y-2">
              <Label>Platform / Shop (Optional)</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlatforms.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {allPaymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Person */}
          <div className="space-y-2">
            <Label>Person</Label>
            <Select value={person} onValueChange={setPerson}>
              <SelectTrigger>
                <SelectValue placeholder="Who spent?" />
              </SelectTrigger>
              <SelectContent>
                {settings.familyMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="e.g., Dinner at restaurant, Bus ticket..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add tag (e.g., office, personal)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" size="icon" variant="outline" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
