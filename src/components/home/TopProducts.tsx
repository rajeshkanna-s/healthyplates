import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface FoodProduct {
  id: string;
  name: string;
  description: string | null;
  purpose: string;
  image_url: string | null;
  advantages: string[] | null;
  medicinal_benefits: string | null;
  category_id: string | null;
  categories?: { name: string } | null;
}

const TopProducts = () => {
  const [products, setProducts] = useState<FoodProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('food_products')
        .select('id, name, description, purpose, image_url, advantages, medicinal_benefits, category_id, categories(name)')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadgeClass = (categoryName: string | undefined) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('fruit')) return 'badge-fruits';
    if (name.includes('vegetable') || name.includes('leafy')) return 'badge-vegetables';
    if (name.includes('spice') || name.includes('herb')) return 'badge-grains';
    if (name.includes('nut') || name.includes('seed')) return 'badge-proteins';
    if (name.includes('grain')) return 'badge-grains';
    return 'badge-proteins';
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section">Top Food Products This Week</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our most popular and highly-rated natural ingredients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-product p-6 animate-pulse">
                <div className="h-12 w-12 bg-muted rounded-full mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full mb-4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section">Top Food Products This Week</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most popular and highly-rated natural ingredients, carefully selected for their 
            exceptional health benefits and nutritional value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const categoryName = product.categories?.name;
            const benefits = product.advantages?.slice(0, 3) || [];
            
            return (
              <div key={product.id} className="card-product p-6 group">
                <div className="flex items-start justify-between mb-4">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="text-4xl">🍃</div>
                  )}
                  <Badge className={getCategoryBadgeClass(categoryName)}>
                    {categoryName || 'Food'}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-health transition-colors">
                  {product.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                  {product.description || product.purpose}
                </p>

                {benefits.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-health" />
                      Key Benefits
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.medicinal_benefits && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-1 text-secondary" />
                      Medicinal Use
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {product.medicinal_benefits}
                    </p>
                  </div>
                )}

                <Link to={`/food-products/${product.id}`} className="block">
                  <Button className="w-full btn-health">
                    <Leaf className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/food-products">
            <Button variant="outline" className="btn-nutrition border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              Explore All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;