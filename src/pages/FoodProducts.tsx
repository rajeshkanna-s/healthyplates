import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Heart, AlertCircle, CheckCircle, X, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FoodProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foodProducts, setFoodProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('type', 'food_product')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch food products
      const { data: productsData, error: productsError } = await supabase
        .from('food_products')
        .select(`
          *,
          categories(*)
        `)
        .order('name');

      if (productsError) throw productsError;

      setCategories([{ id: 'all', name: 'All Categories' }, ...(categoriesData || [])]);
      setFoodProducts(productsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load food products data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  const filteredProducts = foodProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categories?.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (categoryName: string) => {
    switch (categoryName?.toLowerCase()) {
      case 'fruits': return 'badge-fruits';
      case 'vegetables': return 'badge-vegetables';
      case 'nuts & seeds': return 'badge-proteins';
      case 'spices': return 'badge-grains';
      case 'grains': return 'badge-grains';
      case 'oils': return 'badge-grains';
      default: return 'badge-grains';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Food Products Database</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive database of natural ingredients, their benefits, and medicinal properties. 
            Make informed choices for your health and wellness journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search food products, benefits, or uses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-0 animate-pulse">
                <div className="flex flex-col md:flex-row gap-0">
                  <div className="w-full md:w-64 h-48 bg-muted"></div>
                  <div className="flex-1 p-6">
                    <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-20 bg-muted rounded"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="p-0 hover:shadow-health-lg transition-all duration-300 border border-border/50 hover:border-primary/30 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row relative">
                  {/* Product Image */}
                  <div 
                    className="w-full md:w-64 h-64 md:h-auto relative overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => navigate(`/food-products/${product.id}`)}
                  >
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-health flex items-center justify-center text-white text-6xl">
                        🥗
                      </div>
                    )}
                    {/* NEW Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-600 text-white px-3 py-1 text-xs font-bold">
                        NEW
                      </Badge>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Header with Title and Add Now button */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.purpose}
                        </p>
                      </div>
                      <Button 
                        className="btn-health ml-4 flex-shrink-0"
                        onClick={() => navigate(`/food-products/${product.id}`)}
                      >
                        Full View
                      </Button>
                    </div>

                    {/* Key Ingredients Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Key Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-muted text-foreground px-3 py-1">
                          {product.categories?.name || 'Natural'}
                        </Badge>
                        {product.origin && (
                          <Badge variant="secondary" className="bg-muted text-foreground px-3 py-1">
                            {product.origin}
                          </Badge>
                        )}
                        {product.region && (
                          <Badge variant="secondary" className="bg-muted text-foreground px-3 py-1">
                            {product.region}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Top Benefits Section */}
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Top Benefits
                      </h4>
                      <ul className="space-y-1.5">
                        {product.advantages?.slice(0, 3).map((advantage, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                            <span>{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Info */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Package className="w-3 h-3 mr-1" />
                          Category: {product.categories?.name || 'N/A'}
                        </span>
                        {product.is_indian && (
                          <Badge variant="outline" className="text-xs">
                            Indian Origin
                          </Badge>
                        )}
                      </div>
                      <button
                        onClick={() => navigate(`/food-products/${product.id}`)}
                        className="text-primary hover:text-primary-dark font-medium hover:underline"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Detail Dialog */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProduct && (
              <div className="space-y-6">
                {/* Product Header */}
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{selectedProduct.name}</h1>
                </div>

                {/* Product Image */}
                {selectedProduct.image_url && (
                  <div className="w-full max-w-md">
                    <img 
                      src={selectedProduct.image_url} 
                      alt={selectedProduct.name}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                {selectedProduct.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                  </div>
                )}

                {/* Key Ingredients */}
                {selectedProduct.key_ingredients && selectedProduct.key_ingredients.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.key_ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="secondary" className="bg-muted text-foreground px-3 py-1.5">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nutrition Facts */}
                {selectedProduct.nutrition_facts && Object.keys(selectedProduct.nutrition_facts).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Nutrition Facts (per serving)</h3>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                      {selectedProduct.nutrition_facts.calories && (
                        <div className="flex justify-between">
                          <span className="font-medium">Calories:</span>
                          <span className="text-muted-foreground">{selectedProduct.nutrition_facts.calories}</span>
                        </div>
                      )}
                      {selectedProduct.nutrition_facts.protein && (
                        <div className="flex justify-between">
                          <span className="font-medium">Protein:</span>
                          <span className="text-muted-foreground">{selectedProduct.nutrition_facts.protein}</span>
                        </div>
                      )}
                      {selectedProduct.nutrition_facts.carbs && (
                        <div className="flex justify-between">
                          <span className="font-medium">Carbs:</span>
                          <span className="text-muted-foreground">{selectedProduct.nutrition_facts.carbs}</span>
                        </div>
                      )}
                      {selectedProduct.nutrition_facts.fat && (
                        <div className="flex justify-between">
                          <span className="font-medium">Fat:</span>
                          <span className="text-muted-foreground">{selectedProduct.nutrition_facts.fat}</span>
                        </div>
                      )}
                      {selectedProduct.nutrition_facts.fiber && (
                        <div className="flex justify-between">
                          <span className="font-medium">Fiber:</span>
                          <span className="text-muted-foreground">{selectedProduct.nutrition_facts.fiber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Health Benefits (Advantages) */}
                {selectedProduct.advantages && selectedProduct.advantages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Health Benefits</h3>
                    <ul className="space-y-2">
                      {selectedProduct.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start text-muted-foreground">
                          <Heart className="w-5 h-5 mr-2 mt-0.5 text-primary flex-shrink-0" />
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Considerations */}
                {selectedProduct.disadvantages && selectedProduct.disadvantages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                      Considerations
                    </h3>
                    <ul className="space-y-2">
                      {selectedProduct.disadvantages.map((disadvantage, index) => (
                        <li key={index} className="flex items-start text-muted-foreground">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Medicinal Benefits */}
                {selectedProduct.medicinal_benefits && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Medicinal Benefits</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.medicinal_benefits}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodProducts;