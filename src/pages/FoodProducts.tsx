import { useState, useEffect } from 'react';
import { Search, Filter, Star, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FoodProducts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foodProducts, setFoodProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-product p-6 animate-pulse">
                <div className="h-16 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-product p-6 group">
                <div className="flex items-start justify-between mb-4">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-health rounded-lg flex items-center justify-center text-white text-2xl">
                      🥗
                    </div>
                  )}
                  <Badge className={getCategoryBadge(product.categories?.name)}>
                    {product.categories?.name || 'Unknown'}
                  </Badge>
                </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-health transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{product.rating}</span>
              </div>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                <strong>Purpose:</strong> {product.purpose}
              </p>

              {/* Advantages */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Advantages
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {product.advantages.slice(0, 2).map((advantage, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disadvantages */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-orange-500" />
                  Considerations
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {product.disadvantages.slice(0, 2).map((disadvantage, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {disadvantage}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medicinal Benefits */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-health" />
                  Medicinal Benefits
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.medicinalBenefits}
                </p>
              </div>

              <Button className="w-full btn-health">
                View Details
              </Button>
                </div>
              ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
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