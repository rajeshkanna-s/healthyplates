import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import FoodProductCard from '@/components/ui/FoodProductCard';

const TopProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('food_products')
        .select(`
          *,
          categories(*)
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback static data if no products in DB
  const fallbackProducts = [
    {
      id: '1',
      name: "Organic Almonds",
      purpose: "Rich in Vitamin E, healthy fats, and protein for optimal brain function.",
      advantages: ["Supports heart health", "Good source of protein", "Helps manage blood sugar"],
      key_ingredients: ["High protein", "Healthy fats", "Vegan"],
      categories: { name: "Nuts" },
    },
    {
      id: '2',
      name: "Fresh Spinach",
      purpose: "Packed with iron, folate, and antioxidants to support blood health.",
      advantages: ["Iron rich", "Immune support", "Improves vision"],
      key_ingredients: ["Iron", "Folate", "Antioxidants"],
      categories: { name: "Leafy Greens" },
    },
    {
      id: '3',
      name: "Golden Turmeric",
      purpose: "Natural anti-inflammatory powerhouse with curcumin for wellness.",
      advantages: ["Reduces inflammation", "Boosts immunity", "Heals wounds"],
      key_ingredients: ["Curcumin", "Anti-inflammatory"],
      categories: { name: "Spices" },
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top Food Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most popular and highly-rated natural ingredients, carefully selected for their 
            exceptional health benefits and nutritional value.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <FoodProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                purpose={product.purpose}
                imageUrl={product.image_url}
                category={product.categories?.name}
                benefits={product.advantages || []}
                tags={product.key_ingredients || []}
                isNew={true}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/food-products">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Explore All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;