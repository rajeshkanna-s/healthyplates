import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, Plus, Check, Trash2, Star, 
  Sparkles, Trophy, ChevronDown, ChevronUp,
  Heart, Dumbbell, BookOpen, Wallet, Users, Plane
} from "lucide-react";
import { toast } from "sonner";

interface VisionGoal {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

const CATEGORIES = [
  { id: "health", name: "Health & Fitness", icon: Heart, color: "text-red-500" },
  { id: "fitness", name: "Exercise", icon: Dumbbell, color: "text-orange-500" },
  { id: "learning", name: "Learning", icon: BookOpen, color: "text-blue-500" },
  { id: "finance", name: "Finance", icon: Wallet, color: "text-green-500" },
  { id: "relationships", name: "Relationships", icon: Users, color: "text-pink-500" },
  { id: "travel", name: "Travel", icon: Plane, color: "text-purple-500" },
];

const STORAGE_KEY = "healthyplates_vision_board";

const VisionBoard = () => {
  const [goals, setGoals] = useState<VisionGoal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("health");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Filter to current year goals only
      const currentYearGoals = parsed.filter((g: VisionGoal) => 
        new Date(g.createdAt).getFullYear() === currentYear
      );
      setGoals(currentYearGoals);
    }
  }, [currentYear]);

  const saveGoals = (newGoals: VisionGoal[]) => {
    setGoals(newGoals);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
  };

  const handleAddGoal = () => {
    if (!newGoal.trim()) {
      toast.error("Please enter a goal");
      return;
    }

    const goal: VisionGoal = {
      id: `goal_${Date.now()}`,
      text: newGoal.trim(),
      category: selectedCategory,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    saveGoals([...goals, goal]);
    setNewGoal("");
    setShowAddForm(false);
    toast.success("Goal added to your vision board!");
  };

  const toggleGoal = (id: string) => {
    const updated = goals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    saveGoals(updated);
    
    const goal = goals.find(g => g.id === id);
    if (goal && !goal.completed) {
      toast.success("🎉 Goal completed! Great job!");
    }
  };

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter(g => g.id !== id));
    toast.success("Goal removed");
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progressPercentage = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  const getCategoryIcon = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) return Target;
    return category.icon;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category?.color || "text-primary";
  };

  const displayedGoals = isExpanded ? goals : goals.slice(0, 4);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Card className="overflow-hidden border-2 border-dashed border-primary/20 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Vision Board {currentYear}
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </CardTitle>
                <p className="text-sm text-muted-foreground">Your goals for this year</p>
              </div>
            </div>
            
            <Button 
              size="sm" 
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Goal</span>
            </Button>
          </div>

          {/* Progress Bar */}
          {goals.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  {completedCount} / {goals.length} completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add Goal Form */}
          {showAddForm && (
            <div className="p-4 bg-muted/50 rounded-xl space-y-3">
              <Input
                placeholder="What's your goal for this year?"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddGoal()}
              />
              
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <cat.icon className="h-3 w-3 mr-1" />
                    {cat.name}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddGoal} className="flex-1">
                  Add Goal
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Goals Grid */}
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No goals yet for {currentYear}</p>
              <p className="text-sm text-muted-foreground">Start adding your vision board goals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayedGoals.map((goal) => {
                const IconComponent = getCategoryIcon(goal.category);
                return (
                  <div
                    key={goal.id}
                    className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                      goal.completed 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        goal.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-muted-foreground/30 hover:border-primary'
                      }`}
                    >
                      {goal.completed && <Check className="h-4 w-4" />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {goal.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <IconComponent className={`h-3 w-3 ${getCategoryColor(goal.category)}`} />
                        <span className="text-xs text-muted-foreground">
                          {CATEGORIES.find(c => c.id === goal.category)?.name}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More/Less Button */}
          {goals.length > 4 && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show All ({goals.length - 4} more)
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default VisionBoard;
