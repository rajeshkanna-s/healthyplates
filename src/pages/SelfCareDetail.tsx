import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SelfCareDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [procedure, setProcedure] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProcedure();
  }, [id]);

  const fetchProcedure = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('self_care_procedures')
        .select('*, self_care_categories(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProcedure(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load procedure details.",
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
      description: "Procedure link has been copied to clipboard."
    });
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

  if (!procedure) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Procedure not found</h2>
          <Button onClick={() => navigate('/self-care')}>Back to Self-Care</Button>
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
            onClick={() => navigate('/self-care')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Self-Care
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

      {/* Procedure Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Procedure Image */}
        {procedure.image_url && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-health-lg">
            <img 
              src={procedure.image_url} 
              alt={procedure.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Category Badge */}
        {procedure.self_care_categories && (
          <div className="mb-6">
            <Badge className="bg-gradient-health text-white text-sm px-4 py-1.5">
              {procedure.self_care_categories.name}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
          {procedure.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-6 mb-10 pb-8 border-b-2 border-border flex-wrap text-muted-foreground">
          {procedure.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-base">{procedure.duration}</span>
            </div>
          )}
          {procedure.frequency && (
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-base">Frequency: {procedure.frequency}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {procedure.description && (
          <div className="mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed">{procedure.description}</p>
          </div>
        )}

        {/* Ingredients */}
        {procedure.ingredients && procedure.ingredients.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2">
              {procedure.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-lg text-muted-foreground">{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps */}
        {procedure.steps && procedure.steps.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Steps</h3>
            <ol className="list-decimal list-inside space-y-4">
              {procedure.steps.map((step: string, index: number) => (
                <li key={index} className="text-lg text-muted-foreground leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Benefits */}
        {procedure.benefits && procedure.benefits.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Benefits</h3>
            <ul className="space-y-3">
              {procedure.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start text-lg text-muted-foreground">
                  <Heart className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Precautions */}
        {procedure.precautions && procedure.precautions.length > 0 && (
          <div className="mb-12 bg-orange-50 dark:bg-orange-950/20 rounded-2xl p-6">
            <h3 className="text-2xl font-semibold text-orange-600 mb-4">Precautions</h3>
            <ul className="list-disc list-inside space-y-2">
              {procedure.precautions.map((precaution: string, index: number) => (
                <li key={index} className="text-lg text-muted-foreground">{precaution}</li>
              ))}
            </ul>
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

export default SelfCareDetail;
