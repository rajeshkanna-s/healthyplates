import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Clock, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('food_timing')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setFood(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load food details.",
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
      description: "Food item link has been copied to clipboard."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Food not found</h2>
          <Button onClick={() => navigate('/foods')}>Back to Foods</Button>
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
            onClick={() => navigate('/foods')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Foods
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

      {/* Food Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Food Image */}
        {food.image_url && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-health-lg">
            <img 
              src={food.image_url} 
              alt={food.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
          {food.name}
        </h1>

        {/* Meal Time Badge */}
        <div className="mb-10">
          <span className="inline-flex items-center bg-gradient-health text-white px-6 py-2 rounded-full text-lg font-medium">
            {food.meal_time.charAt(0).toUpperCase() + food.meal_time.slice(1)} Meal
          </span>
        </div>

        {/* Benefits */}
        {food.benefits && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Heart className="w-7 h-7 mr-2 text-primary" />
              Health Benefits
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{food.benefits}</p>
          </div>
        )}

        {/* Description */}
        {food.description && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Sparkles className="w-7 h-7 mr-2 text-primary" />
              Description
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{food.description}</p>
          </div>
        )}

        {/* Recommended Amount */}
        {food.how_much && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Clock className="w-7 h-7 mr-2 text-primary" />
              Recommended Amount
            </h3>
            <p className="text-lg text-muted-foreground">{food.how_much}</p>
          </div>
        )}

        {/* Preparation Tips */}
        {food.preparation_tips && (
          <div className="mb-12 bg-accent/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">💡 Preparation Tips</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{food.preparation_tips}</p>
          </div>
        )}

        {/* Share Section at Bottom */}
        <div className="mt-16 pt-8 border-t-2 border-border">
          <div className="flex items-center justify-between bg-accent/50 rounded-2xl p-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Find this helpful?</h3>
              <p className="text-muted-foreground">Share it with your friends and family</p>
            </div>
            <Button
              onClick={handleShare}
              className="bg-gradient-health hover:shadow-health-lg transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default FoodDetail;
