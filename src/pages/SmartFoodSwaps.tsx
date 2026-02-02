import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Star, ArrowRight, Lightbulb, Filter, Heart, 
  RefreshCw, Sparkles, CheckCircle2 
} from "lucide-react";
import { 
  FOOD_SWAPS, SWAP_CATEGORIES, GOAL_FILTERS, QUICK_TIPS,
  type FoodSwap 
} from "@/data/foodSwaps";
import { cn } from "@/lib/utils";

const FAVORITES_KEY = "healthyplates_food_swaps_favorites";

const SmartFoodSwaps = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGoal, setSelectedGoal] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<FoodSwap | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % QUICK_TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = FOOD_SWAPS;

    if (showFavorites) {
      items = items.filter(item => favorites.includes(item.id));
    }

    if (selectedCategory !== "all") {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (selectedGoal !== "all") {
      items = items.filter(item => 
        item.swaps.some(swap => 
          swap.tags.some(tag => tag.includes(selectedGoal))
        )
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.usualItem.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        item.swaps.some(swap => swap.name.toLowerCase().includes(query))
      );
    }

    return items;
  }, [selectedCategory, selectedGoal, searchQuery, showFavorites, favorites]);

  const getGoalColor = (tag: string) => {
    if (tag.includes("weight") || tag.includes("less")) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (tag.includes("energy") || tag.includes("focus")) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    if (tag.includes("digest") || tag.includes("probiotic")) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (tag.includes("protein") || tag.includes("muscle")) return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    if (tag.includes("sugar")) return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-green-700 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">No login required</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Smart Food Swaps
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick, easy upgrades to what you already eat. Select an item you usually have, 
            and we'll show you healthier alternatives with simple explanations.
          </p>
        </div>

        {/* Quick Tip Banner */}
        <Card className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="py-4 flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200 flex-1">
              <strong>Quick Tip:</strong> {QUICK_TIPS[tipIndex]}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTipIndex(prev => (prev + 1) % QUICK_TIPS.length)}
              className="flex-shrink-0"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search foods (e.g., cola, paratha, chips...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by goal" />
                </SelectTrigger>
                <SelectContent>
                  {GOAL_FILTERS.map(goal => (
                    <SelectItem key={goal.id} value={goal.id}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={showFavorites ? "default" : "outline"}
                onClick={() => setShowFavorites(!showFavorites)}
                className={cn(
                  showFavorites && "bg-green-700 hover:bg-green-800"
                )}
              >
                <Heart className={cn("h-4 w-4 mr-2", showFavorites && "fill-current")} />
                Favorites ({favorites.length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
            >
              All Categories
            </TabsTrigger>
            {SWAP_CATEGORIES.map(cat => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Food Items List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mb-3">
              I usually eat/drink... ({filteredItems.length} items)
            </h2>
            
            {filteredItems.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {showFavorites 
                    ? "No favorites yet. Click the star icon on any swap to save it!"
                    : "No items found. Try adjusting your filters."
                  }
                </p>
              </Card>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredItems.map(item => (
                  <Card
                    key={item.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedItem?.id === item.id && "ring-2 ring-green-600 bg-green-50 dark:bg-green-950/20"
                    )}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="py-3 px-4 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.usualItem}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {SWAP_CATEGORIES.find(c => c.id === item.category)?.icon}{" "}
                            {SWAP_CATEGORIES.find(c => c.id === item.category)?.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.swaps.length} swap{item.swaps.length > 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                        >
                          <Star className={cn(
                            "h-4 w-4",
                            favorites.includes(item.id) && "fill-yellow-500 text-yellow-500"
                          )} />
                        </Button>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right: Swap Details */}
          <div className="lg:sticky lg:top-4 h-fit">
            {selectedItem ? (
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardDescription>Instead of...</CardDescription>
                      <CardTitle className="text-xl text-red-600 dark:text-red-400 line-through decoration-2">
                        {selectedItem.usualItem}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(selectedItem.id)}
                    >
                      <Star className={cn(
                        "h-5 w-5",
                        favorites.includes(selectedItem.id) && "fill-yellow-500 text-yellow-500"
                      )} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Try these healthier swaps:
                  </h3>
                  
                  {selectedItem.swaps.map((swap, idx) => (
                    <Card key={idx} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <p className="font-medium text-lg text-foreground mb-2">
                          {swap.name}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          <strong>Why better:</strong> {swap.whyBetter}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {swap.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className={cn("text-xs", getGoalColor(tag))}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground flex flex-wrap gap-1">
                      <strong>Related:</strong>
                      {selectedItem.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-8 text-center bg-muted/30">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="font-semibold text-lg mb-2">Select a food item</h3>
                <p className="text-muted-foreground text-sm">
                  Click on any item from the list to see healthier swap options.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
          <CardContent className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{FOOD_SWAPS.length}</p>
                <p className="text-sm text-muted-foreground">Food Items</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {FOOD_SWAPS.reduce((acc, item) => acc + item.swaps.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Swaps</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{SWAP_CATEGORIES.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">{favorites.length}</p>
                <p className="text-sm text-muted-foreground">Your Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartFoodSwaps;
