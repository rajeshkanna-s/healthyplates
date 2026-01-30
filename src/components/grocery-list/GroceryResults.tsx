import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart,
  Printer,
  Copy,
  Check,
  ChefHat,
  Clock,
  AlertTriangle,
  RefreshCw,
  Wheat,
  Bean,
  Carrot,
  Apple,
  Egg,
  Milk,
  Droplets,
  Flame,
  Gift,
  IndianRupee,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { GeneratedList, GroceryGroup, GeneratedGroceryItem, UserPreferences } from './types';
import { groupItemsByCategory, formatQuantity, groupOrder } from './generateGroceryList';
import { toast } from 'sonner';

interface GroceryResultsProps {
  list: GeneratedList;
  preferences: UserPreferences;
  onReset: () => void;
}

const groupIcons: Record<GroceryGroup, React.ReactNode> = {
  'Grains & Flours': <Wheat className="w-5 h-5" />,
  'Pulses & Legumes': <Bean className="w-5 h-5" />,
  'Vegetables': <Carrot className="w-5 h-5" />,
  'Fruits': <Apple className="w-5 h-5" />,
  'Protein Sources': <Egg className="w-5 h-5" />,
  'Dairy': <Milk className="w-5 h-5" />,
  'Healthy Fats': <Droplets className="w-5 h-5" />,
  'Spices & Basics': <Flame className="w-5 h-5" />,
  'Optional Add-Ons': <Gift className="w-5 h-5" />,
};

const groupColors: Record<GroceryGroup, string> = {
  'Grains & Flours': 'bg-amber-500/10 text-amber-700 border-amber-500/30',
  'Pulses & Legumes': 'bg-orange-500/10 text-orange-700 border-orange-500/30',
  'Vegetables': 'bg-green-500/10 text-green-700 border-green-500/30',
  'Fruits': 'bg-pink-500/10 text-pink-700 border-pink-500/30',
  'Protein Sources': 'bg-red-500/10 text-red-700 border-red-500/30',
  'Dairy': 'bg-blue-500/10 text-blue-700 border-blue-500/30',
  'Healthy Fats': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30',
  'Spices & Basics': 'bg-purple-500/10 text-purple-700 border-purple-500/30',
  'Optional Add-Ons': 'bg-teal-500/10 text-teal-700 border-teal-500/30',
};

export default function GroceryResults({ list, preferences, onReset }: GroceryResultsProps) {
  const [copied, setCopied] = useState(false);
  const groupedItems = groupItemsByCategory(list.items);
  
  const totalItems = list.items.filter(item => !item.isExcluded).length;

  const handleCopyToClipboard = () => {
    let text = `🛒 Smart Grocery List\n`;
    text += `${preferences.cuisine} Indian | ${preferences.diet} | ${preferences.budget} Budget | ${preferences.duration} Days\n`;
    text += `For ${preferences.peopleCount} ${preferences.peopleCount === 1 ? 'person' : 'people'}\n\n`;
    
    groupOrder.forEach(group => {
      const items = groupedItems[group];
      if (items.length > 0) {
        text += `📦 ${group}\n`;
        items.forEach(item => {
          text += `  • ${item.name} - ${formatQuantity(item.scaledQuantity, item.unit)}\n`;
        });
        text += '\n';
      }
    });

    text += `\n💰 Estimated Cost: ${list.estimatedCost.currency}${list.estimatedCost.min} - ${list.estimatedCost.currency}${list.estimatedCost.max}\n`;
    
    text += `\n🍳 Meal Ideas:\n`;
    text += `Breakfast (${list.recipes.breakfast.length}): ${list.recipes.breakfast.slice(0, 3).join(', ')}\n`;
    text += `Lunch (${list.recipes.lunch.length}): ${list.recipes.lunch.slice(0, 3).join(', ')}\n`;
    text += `Dinner (${list.recipes.dinner.length}): ${list.recipes.dinner.slice(0, 3).join(', ')}\n`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Grocery list copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <Card className="border-health/20 bg-gradient-to-br from-health/5 via-background to-background print:shadow-none">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-health">
              <ShoppingCart className="w-6 h-6" />
              Your Smart Grocery List
            </CardTitle>
            <div className="flex gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-1" />
                Print
              </Button>
              <Button variant="ghost" size="sm" onClick={onReset}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-health/10 text-health border-health/30">
              {preferences.cuisine} Indian
            </Badge>
            <Badge variant="outline" className={preferences.diet === 'Veg' ? 'bg-green-500/10 text-green-700 border-green-500/30' : 'bg-orange-500/10 text-orange-700 border-orange-500/30'}>
              {preferences.diet === 'Veg' ? '🥬' : '🍗'} {preferences.diet}
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/30">
              {preferences.budget} Budget
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-500/30">
              {preferences.duration} Days
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/30">
              {preferences.peopleCount} {preferences.peopleCount === 1 ? 'Person' : 'People'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-health">{totalItems}</p>
              <p className="text-xs text-muted-foreground">Total Items</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-health flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
                {list.estimatedCost.min}-{list.estimatedCost.max}
              </p>
              <p className="text-xs text-muted-foreground">Estimated Cost</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-health">{list.recipes.breakfast.length + list.recipes.lunch.length + list.recipes.dinner.length}</p>
              <p className="text-xs text-muted-foreground">Meal Ideas</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-health">{list.storageTips.length}</p>
              <p className="text-xs text-muted-foreground">Storage Tips</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="groceries" className="w-full">
        <TabsList className="grid w-full grid-cols-4 print:hidden">
          <TabsTrigger value="groceries">🛒 Groceries</TabsTrigger>
          <TabsTrigger value="recipes">🍳 Recipes</TabsTrigger>
          <TabsTrigger value="tips">💡 Tips</TabsTrigger>
          <TabsTrigger value="substitutes">🔄 Substitutes</TabsTrigger>
        </TabsList>

        {/* Groceries Tab */}
        <TabsContent value="groceries" className="space-y-4">
          {groupOrder.map(group => {
            const items = groupedItems[group];
            if (items.length === 0) return null;
            
            return (
              <Card key={group} className={`border ${groupColors[group].split(' ')[2]}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`flex items-center gap-2 text-lg ${groupColors[group].split(' ')[1]}`}>
                    {groupIcons[group]}
                    {group}
                    <Badge variant="outline" className="ml-auto">{items.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <span className="font-medium">{item.name}</span>
                          {item.useWithin && (
                            <span className="ml-2 text-xs text-amber-600">
                              (Use in {item.useWithin})
                            </span>
                          )}
                        </div>
                        <Badge variant="secondary" className="ml-2 font-mono">
                          {formatQuantity(item.scaledQuantity, item.unit)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Recipes Tab */}
        <TabsContent value="recipes" className="space-y-4">
          <Card className="border-health/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-health">
                <ChefHat className="w-5 h-5" />
                Based on this list, you can make:
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Breakfast */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-white">☀️ Breakfast</Badge>
                  <span className="text-sm text-muted-foreground">
                    {list.recipes.breakfast.length} ideas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.recipes.breakfast.map((recipe, index) => (
                    <Badge key={index} variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500/30">
                      {recipe}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Lunch */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">🍽️ Lunch</Badge>
                  <span className="text-sm text-muted-foreground">
                    {list.recipes.lunch.length} ideas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.recipes.lunch.map((recipe, index) => (
                    <Badge key={index} variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
                      {recipe}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Dinner */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 text-white">🌙 Dinner</Badge>
                  <span className="text-sm text-muted-foreground">
                    {list.recipes.dinner.length} ideas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.recipes.dinner.map((recipe, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/30">
                      {recipe}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Snacks */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-pink-500 text-white">🍪 Snacks</Badge>
                  <span className="text-sm text-muted-foreground">
                    {list.recipes.snacks.length} ideas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.recipes.snacks.map((recipe, index) => (
                    <Badge key={index} variant="outline" className="bg-pink-500/10 text-pink-700 border-pink-500/30">
                      {recipe}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-4">
          <Card className="border-health/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-health">
                <Clock className="w-5 h-5" />
                Storage Tips (Use First to Reduce Waste)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* High Priority */}
                {list.storageTips.filter(t => t.priority === 'high').length > 0 && (
                  <div className="space-y-2">
                    <Badge className="bg-red-500 text-white">🔴 Use First (1-2 days)</Badge>
                    <div className="grid gap-2">
                      {list.storageTips.filter(t => t.priority === 'high').map((tip, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-red-500/10">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700">{tip.item}</p>
                            <p className="text-sm text-muted-foreground">{tip.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medium Priority */}
                {list.storageTips.filter(t => t.priority === 'medium').length > 0 && (
                  <div className="space-y-2">
                    <Badge className="bg-amber-500 text-white">🟡 Use Within Week</Badge>
                    <div className="grid gap-2">
                      {list.storageTips.filter(t => t.priority === 'medium').map((tip, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10">
                          <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-amber-700">{tip.item}</p>
                            <p className="text-sm text-muted-foreground">{tip.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Low Priority */}
                {list.storageTips.filter(t => t.priority === 'low').length > 0 && (
                  <div className="space-y-2">
                    <Badge className="bg-green-500 text-white">🟢 Long Shelf Life</Badge>
                    <div className="grid gap-2">
                      {list.storageTips.filter(t => t.priority === 'low').map((tip, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-green-500/10">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-green-700">{tip.item}</p>
                            <p className="text-sm text-muted-foreground">{tip.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Substitutes Tab */}
        <TabsContent value="substitutes" className="space-y-4">
          <Card className="border-health/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-health">
                <RefreshCw className="w-5 h-5" />
                Smart Substitutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {list.substitutions.length > 0 ? (
                <div className="space-y-3">
                  {list.substitutions.map((sub, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge variant="outline" className="bg-muted">
                        {sub.original}
                      </Badge>
                      <span className="text-muted-foreground">→</span>
                      <Badge className="bg-health/20 text-health border-health/30">
                        {sub.substitute}
                      </Badge>
                      <span className="text-sm text-muted-foreground ml-auto hidden sm:block">
                        {sub.reason}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No substitutions needed for your current selection.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
