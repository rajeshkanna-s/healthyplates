import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, Minus, Trash2, Save, RotateCcw, Utensils, 
  Flame, Beef, Wheat, Droplets, AlertCircle, CheckCircle2,
  ChevronDown, ChevronUp, Search, Leaf, Egg
} from "lucide-react";
import { cn } from "@/lib/utils";
import foodsData from "@/data/foods.json";

interface FoodItem {
  id: number;
  n: string;
  cat: string;
  serv: string;
  g: number;
  k: number;
  p: number;
  c: number;
  f: number;
  v: boolean;
}

interface PlateItem extends FoodItem {
  quantity: number;
}

const CATEGORY_CONFIG = {
  grain: { label: "Grains & Staples", icon: "🍚", color: "bg-amber-100 dark:bg-amber-900/30" },
  protein: { label: "Protein", icon: "🍗", color: "bg-red-100 dark:bg-red-900/30" },
  veg_cooked: { label: "Cooked Veggies", icon: "🥘", color: "bg-green-100 dark:bg-green-900/30" },
  veg_raw: { label: "Raw Salads", icon: "🥗", color: "bg-emerald-100 dark:bg-emerald-900/30" },
  fruit: { label: "Fruits", icon: "🍎", color: "bg-pink-100 dark:bg-pink-900/30" },
  dairy: { label: "Dairy", icon: "🥛", color: "bg-blue-100 dark:bg-blue-900/30" },
  fat_nuts: { label: "Fats & Nuts", icon: "🥜", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  mixed_main: { label: "Complete Meals", icon: "🍱", color: "bg-purple-100 dark:bg-purple-900/30" },
  snack: { label: "Snacks & Sweets", icon: "🍪", color: "bg-orange-100 dark:bg-orange-900/30" },
  beverage: { label: "Beverages", icon: "🥤", color: "bg-cyan-100 dark:bg-cyan-900/30" },
};

const SAVED_PLATES_KEY = "healthyplates_plate_builder_saved";
const RECENT_PLATES_KEY = "healthyplates_plate_builder_recent";

const HealthyPlateBuilder = () => {
  const [plate, setPlate] = useState<PlateItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("grain");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [savedPlates, setSavedPlates] = useState<{ name: string; items: PlateItem[] }[]>([]);
  const [showSavedPlates, setShowSavedPlates] = useState(false);
  const [plateName, setPlateName] = useState("");

  const foods = foodsData as FoodItem[];

  // Load saved plates
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_PLATES_KEY);
    if (saved) setSavedPlates(JSON.parse(saved));
  }, []);

  // Filter foods by category and search
  const filteredFoods = useMemo(() => {
    let items = foods.filter(f => f.cat === selectedCategory);
    
    if (vegOnly) {
      items = items.filter(f => f.v);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(f => f.n.toLowerCase().includes(query));
    }
    
    return items;
  }, [foods, selectedCategory, vegOnly, searchQuery]);

  // Calculate totals
  const totals = useMemo(() => {
    const total = plate.reduce(
      (acc, item) => ({
        k: acc.k + item.k * item.quantity,
        p: acc.p + item.p * item.quantity,
        c: acc.c + item.c * item.quantity,
        f: acc.f + item.f * item.quantity,
      }),
      { k: 0, p: 0, c: 0, f: 0 }
    );

    const totalCals = total.k || 1;
    const proteinPct = ((total.p * 4) / totalCals) * 100;
    const carbsPct = ((total.c * 4) / totalCals) * 100;
    const fatPct = ((total.f * 9) / totalCals) * 100;

    const hasVeg = plate.some(item => 
      item.cat === "veg_cooked" || item.cat === "veg_raw" || item.cat === "fruit"
    );

    return { ...total, proteinPct, carbsPct, fatPct, hasVeg };
  }, [plate]);

  // Calculate verdict
  const verdict = useMemo(() => {
    if (plate.length === 0) return null;

    const { k, proteinPct, carbsPct, fatPct, hasVeg } = totals;

    if (k < 300) return { type: "light", label: "Very Light Meal", color: "text-blue-600", icon: "💨" };
    if (k > 800) return { type: "heavy", label: "Very Heavy Meal", color: "text-red-600", icon: "⚠️" };
    if (fatPct > 35) return { type: "high-fat", label: "High Fat", color: "text-orange-600", icon: "🧈" };
    if (carbsPct > 65) return { type: "high-carbs", label: "High Carbs", color: "text-yellow-600", icon: "🍞" };
    if (proteinPct < 15) return { type: "low-protein", label: "Low Protein", color: "text-purple-600", icon: "💪" };
    
    if (proteinPct >= 15 && proteinPct <= 30 && 
        fatPct >= 20 && fatPct <= 35 && 
        carbsPct >= 40 && carbsPct <= 65 && 
        hasVeg) {
      return { type: "balanced", label: "Balanced Plate! 🎉", color: "text-green-600", icon: "✅" };
    }

    return { type: "ok", label: "Decent Plate", color: "text-foreground", icon: "👍" };
  }, [plate, totals]);

  const addToPlate = (food: FoodItem) => {
    const existing = plate.find(p => p.id === food.id);
    if (existing) {
      setPlate(plate.map(p => 
        p.id === food.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setPlate([...plate, { ...food, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setPlate(plate.map(p => {
      if (p.id === id) {
        const newQty = p.quantity + delta;
        return newQty > 0 ? { ...p, quantity: newQty } : p;
      }
      return p;
    }).filter(p => p.quantity > 0));
  };

  const removeFromPlate = (id: number) => {
    setPlate(plate.filter(p => p.id !== id));
  };

  const clearPlate = () => {
    setPlate([]);
  };

  const savePlate = () => {
    if (!plateName.trim() || plate.length === 0) return;
    
    const newSaved = [...savedPlates, { name: plateName, items: plate }];
    setSavedPlates(newSaved);
    localStorage.setItem(SAVED_PLATES_KEY, JSON.stringify(newSaved));
    setPlateName("");
  };

  const loadPlate = (items: PlateItem[]) => {
    setPlate(items);
    setShowSavedPlates(false);
  };

  const deleteSavedPlate = (index: number) => {
    const newSaved = savedPlates.filter((_, i) => i !== index);
    setSavedPlates(newSaved);
    localStorage.setItem(SAVED_PLATES_KEY, JSON.stringify(newSaved));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Utensils className="h-5 w-5 text-green-700 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Visual Plate Builder</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            HealthyPlate Builder
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build your meal visually. Add foods to your plate and get instant feedback on calories, 
            macros, and overall balance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Food Selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* Category Tabs */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search foods..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="veg-only" className="flex items-center gap-2 cursor-pointer">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Veg Only</span>
                    </Label>
                    <Switch
                      id="veg-only"
                      checked={vegOnly}
                      onCheckedChange={setVegOnly}
                    />
                  </div>
                </div>

                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-4">
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="text-xs data-[state=active]:bg-green-700 data-[state=active]:text-white"
                      >
                        <span className="mr-1">{config.icon}</span>
                        <span className="hidden sm:inline">{config.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                    {filteredFoods.map(food => (
                      <Card 
                        key={food.id} 
                        className={cn(
                          "cursor-pointer hover:shadow-md transition-all",
                          CATEGORY_CONFIG[food.cat as keyof typeof CATEGORY_CONFIG]?.color
                        )}
                        onClick={() => addToPlate(food)}
                      >
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate flex items-center gap-1">
                              {food.n}
                              {!food.v && <Egg className="h-3 w-3 text-orange-500" />}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{food.serv}</p>
                            <div className="flex gap-2 text-xs mt-1">
                              <span className="text-orange-600">{food.k} kcal</span>
                              <span className="text-blue-600">P: {food.p}g</span>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" className="flex-shrink-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredFoods.length === 0 && (
                      <p className="text-center text-muted-foreground col-span-2 py-8">
                        No foods found in this category.
                      </p>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right: Current Plate */}
          <div className="space-y-4">
            {/* Plate Summary */}
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    🍽️ Your Plate
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearPlate} disabled={plate.length === 0}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plate.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Click on foods to add them to your plate
                  </p>
                ) : (
                  <>
                    {/* Plate Items */}
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {plate.map(item => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.n}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.k * item.quantity} kcal
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button 
                              size="icon" 
                              variant="outline" 
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 text-destructive"
                              onClick={() => removeFromPlate(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="border-t pt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2">
                          <Flame className="h-4 w-4 mx-auto text-orange-600 mb-1" />
                          <p className="text-lg font-bold">{Math.round(totals.k)}</p>
                          <p className="text-xs text-muted-foreground">Calories</p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                          <Beef className="h-4 w-4 mx-auto text-blue-600 mb-1" />
                          <p className="text-lg font-bold">{Math.round(totals.p)}g</p>
                          <p className="text-xs text-muted-foreground">Protein</p>
                        </div>
                        <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-2">
                          <Wheat className="h-4 w-4 mx-auto text-amber-600 mb-1" />
                          <p className="text-lg font-bold">{Math.round(totals.c)}g</p>
                          <p className="text-xs text-muted-foreground">Carbs</p>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2">
                          <Droplets className="h-4 w-4 mx-auto text-yellow-600 mb-1" />
                          <p className="text-lg font-bold">{Math.round(totals.f)}g</p>
                          <p className="text-xs text-muted-foreground">Fat</p>
                        </div>
                      </div>

                      {/* Macro Bars */}
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Protein</span>
                            <span>{Math.round(totals.proteinPct)}%</span>
                          </div>
                          <Progress 
                            value={Math.min(totals.proteinPct, 100)} 
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Carbs</span>
                            <span>{Math.round(totals.carbsPct)}%</span>
                          </div>
                          <Progress 
                            value={Math.min(totals.carbsPct, 100)} 
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Fat</span>
                            <span>{Math.round(totals.fatPct)}%</span>
                          </div>
                          <Progress 
                            value={Math.min(totals.fatPct, 100)} 
                            className="h-2"
                          />
                        </div>
                      </div>

                      {/* Verdict */}
                      {verdict && (
                        <Card className={cn(
                          "text-center p-3",
                          verdict.type === "balanced" && "bg-green-100 dark:bg-green-900/30 border-green-300",
                          verdict.type === "high-fat" && "bg-orange-100 dark:bg-orange-900/30 border-orange-300",
                          verdict.type === "high-carbs" && "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300",
                          verdict.type === "low-protein" && "bg-purple-100 dark:bg-purple-900/30 border-purple-300",
                          verdict.type === "heavy" && "bg-red-100 dark:bg-red-900/30 border-red-300",
                          verdict.type === "light" && "bg-blue-100 dark:bg-blue-900/30 border-blue-300"
                        )}>
                          <p className="text-2xl mb-1">{verdict.icon}</p>
                          <p className={cn("font-semibold", verdict.color)}>
                            {verdict.label}
                          </p>
                          {!totals.hasVeg && plate.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Add some veggies or fruits!
                            </p>
                          )}
                        </Card>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Save Plate */}
            {plate.length > 0 && (
              <Card>
                <CardContent className="pt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Name your plate..."
                      value={plateName}
                      onChange={(e) => setPlateName(e.target.value)}
                    />
                    <Button 
                      onClick={savePlate}
                      disabled={!plateName.trim()}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Saved Plates */}
            {savedPlates.length > 0 && (
              <Card>
                <CardHeader 
                  className="pb-2 cursor-pointer"
                  onClick={() => setShowSavedPlates(!showSavedPlates)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">
                      Saved Plates ({savedPlates.length})
                    </CardTitle>
                    {showSavedPlates ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </CardHeader>
                {showSavedPlates && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {savedPlates.map((saved, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-muted/50"
                        >
                          <div 
                            className="flex-1 cursor-pointer"
                            onClick={() => loadPlate(saved.items)}
                          >
                            <p className="text-sm font-medium">{saved.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {saved.items.length} items
                            </p>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-6 w-6 text-destructive"
                            onClick={() => deleteSavedPlate(idx)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Balanced Plate Tips
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Aim for 15-30% calories from protein</li>
                  <li>• Include at least one vegetable or fruit</li>
                  <li>• Keep fat under 35% of total calories</li>
                  <li>• 300-800 kcal is typical for a main meal</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
          <CardContent className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{foods.length}</p>
                <p className="text-sm text-muted-foreground">Foods Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{Object.keys(CATEGORY_CONFIG).length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{plate.length}</p>
                <p className="text-sm text-muted-foreground">Items on Plate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{savedPlates.length}</p>
                <p className="text-sm text-muted-foreground">Saved Plates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthyPlateBuilder;
