import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, X, Receipt } from "lucide-react";
import { TaxEntry, TAX_CATEGORIES, TAX_TYPES } from "./types";
import { generateId, getTodayString } from "./utils";
import { toast } from "sonner";

interface TaxFormProps {
  onAddTax: (tax: TaxEntry) => void;
}

const TaxForm = ({ onAddTax }: TaxFormProps) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [taxType, setTaxType] = useState("");
  const [date, setDate] = useState(getTodayString());
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"paid" | "pending" | "overdue">("paid");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) { toast.error("Enter a valid amount"); return; }
    if (!category) { toast.error("Select a category"); return; }

    const tax: TaxEntry = {
      id: generateId(),
      amount: parseFloat(amount),
      category,
      taxType: taxType || "",
      date,
      description,
      status,
      tags,
      createdAt: new Date().toISOString(),
    };

    onAddTax(tax);
    toast.success(`Tax entry of ₹${parseFloat(amount).toLocaleString()} added`);
    setAmount(""); setCategory(""); setTaxType(""); setDescription(""); setTags([]); setDate(getTodayString());
  };

  return (
    <Card className="border-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
          Add Tax Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">Amount (₹)</Label>
            <Input id="amount" type="number" step="0.01" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="text-2xl font-bold h-14" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Tax Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>{TAX_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Tax Type</Label>
            <Select value={taxType} onValueChange={setTaxType}>
              <SelectTrigger className="h-12"><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>{TAX_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-sm font-medium"><Calendar className="h-4 w-4 text-muted-foreground" /> Date</Label>
            <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="h-12" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <Select value={status} onValueChange={v => setStatus(v as any)}>
              <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
            <Textarea id="description" placeholder="e.g., Q4 advance tax payment" value={description} onChange={e => setDescription(e.target.value)} rows={2} className="resize-none" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Tags (Optional)</Label>
            <div className="flex gap-2">
              <Input placeholder="Add tag" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyPress={e => e.key === "Enter" && (e.preventDefault(), handleAddTag())} className="h-12" />
              <Button type="button" size="icon" variant="outline" onClick={handleAddTag} className="h-12 w-12"><Plus className="h-5 w-5" /></Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1 px-3 py-1">{tag}<button type="button" onClick={() => setTags(tags.filter(t => t !== tag))}><X className="h-3 w-3" /></button></Badge>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full h-14 text-lg font-semibold" size="lg">
            <Plus className="h-5 w-5 mr-2" /> Add Tax Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaxForm;
