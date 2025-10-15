import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, AlertCircle, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FoodProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('food_products')
        .select(`
          *,
          categories(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error: any) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Product link has been copied to clipboard."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🥗</div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/food-products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b border-border/50 sticky top-0 z-10 backdrop-blur-sm bg-card/80">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/food-products')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print/Save PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Link
              </Button>
            </div>
        </div>
      </div>

      {/* Product Content */}
      <article id="pdf-content" className="max-w-4xl mx-auto px-6 py-12 bg-background">
        {/* Product Image */}
        {product.image_url && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-health-lg">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Category Badge */}
        {product.categories && (
          <div className="mb-6">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-sm px-4 py-1.5">
              {product.categories.name}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
          {product.name}
        </h1>

        {/* Purpose */}
        {product.purpose && (
          <p className="text-2xl text-muted-foreground mb-10 leading-relaxed font-light italic border-l-4 border-primary pl-6 py-2">
            {product.purpose}
          </p>
        )}

        {/* Description */}
        {product.description && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">About</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* Key Ingredients */}
        {product.key_ingredients && product.key_ingredients.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Key Ingredients</h2>
            <div className="flex flex-wrap gap-3">
              {product.key_ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="bg-muted text-foreground px-4 py-2 text-base">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition Facts */}
        {product.nutrition_facts && Object.keys(product.nutrition_facts).length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Nutrition Facts</h2>
            <div className="bg-muted/30 rounded-2xl p-6 space-y-3">
              {product.nutrition_facts.calories && (
                <div className="flex justify-between text-lg border-b border-border pb-2">
                  <span className="font-semibold">Calories:</span>
                  <span className="text-muted-foreground">{product.nutrition_facts.calories}</span>
                </div>
              )}
              {product.nutrition_facts.protein && (
                <div className="flex justify-between text-lg border-b border-border pb-2">
                  <span className="font-semibold">Protein:</span>
                  <span className="text-muted-foreground">{product.nutrition_facts.protein}</span>
                </div>
              )}
              {product.nutrition_facts.carbs && (
                <div className="flex justify-between text-lg border-b border-border pb-2">
                  <span className="font-semibold">Carbs:</span>
                  <span className="text-muted-foreground">{product.nutrition_facts.carbs}</span>
                </div>
              )}
              {product.nutrition_facts.fat && (
                <div className="flex justify-between text-lg border-b border-border pb-2">
                  <span className="font-semibold">Fat:</span>
                  <span className="text-muted-foreground">{product.nutrition_facts.fat}</span>
                </div>
              )}
              {product.nutrition_facts.fiber && (
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Fiber:</span>
                  <span className="text-muted-foreground">{product.nutrition_facts.fiber}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Health Benefits */}
        {product.advantages && product.advantages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Health Benefits</h2>
            <ul className="space-y-4">
              {product.advantages.map((advantage, index) => (
                <li key={index} className="flex items-start text-lg text-muted-foreground">
                  <Heart className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Considerations */}
        {product.disadvantages && product.disadvantages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <AlertCircle className="w-8 h-8 mr-3 text-orange-500" />
              Considerations
            </h2>
            <ul className="space-y-4">
              {product.disadvantages.map((disadvantage, index) => (
                <li key={index} className="flex items-start text-lg text-muted-foreground">
                  <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{disadvantage}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Medicinal Benefits */}
        {product.medicinal_benefits && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Medicinal Benefits</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.medicinal_benefits}
            </p>
          </div>
        )}

        {/* Origin Details */}
        <div className="border-t-2 border-border pt-8 mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.origin && (
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Origin</p>
                <p className="text-lg font-semibold text-foreground">{product.origin}</p>
              </div>
            )}
            {product.region && (
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Region</p>
                <p className="text-lg font-semibold text-foreground">{product.region}</p>
              </div>
            )}
            {product.is_indian !== null && (
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">Indian Origin</p>
                <p className="text-lg font-semibold text-foreground">{product.is_indian ? 'Yes' : 'No'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t-2 border-border">
          <div className="flex items-center justify-between bg-accent/50 rounded-2xl p-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Found this helpful?</h3>
              <p className="text-muted-foreground">Share with others or download as PDF</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handlePrint}
                variant="outline"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print/Save
              </Button>
              <Button
                onClick={handleShare}
                className="bg-gradient-health hover:shadow-health-lg transition-all"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FoodProductDetail;
