import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, AlertTriangle, Clock, ChefHat, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DiseaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [disease, setDisease] = useState<any>(null);
  const [diseaseFoods, setDiseaseFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiseaseData();
  }, [id]);

  const fetchDiseaseData = async () => {
    try {
      setLoading(true);
      
      // Fetch disease info
      const { data: diseaseData, error: diseaseError } = await supabase
        .from('diseases')
        .select('*')
        .eq('id', id)
        .single();

      if (diseaseError) throw diseaseError;
      setDisease(diseaseData);

      // Fetch recommended foods
      const { data: foodsData, error: foodsError } = await supabase
        .from('disease_foods')
        .select('*')
        .eq('disease_id', id);

      if (foodsError) throw foodsError;
      setDiseaseFoods(foodsData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load disease details.",
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
      description: "Disease info link has been copied to clipboard."
    });
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency?.toLowerCase()) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'as_needed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Disease not found</h2>
          <Button onClick={() => navigate('/diseases')}>Back to Diseases</Button>
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
            onClick={() => navigate('/diseases')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Diseases
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

      {/* Disease Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
          {disease.name}
        </h1>

        {/* Description */}
        {disease.description && (
          <p className="text-2xl text-muted-foreground mb-10 leading-relaxed font-light italic border-l-4 border-primary pl-6 py-2">
            {disease.description}
          </p>
        )}

        {/* Symptoms */}
        {disease.symptoms && disease.symptoms.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-2 text-orange-500" />
              Common Symptoms
            </h3>
            <div className="flex flex-wrap gap-3">
              {disease.symptoms.map((symptom: string, index: number) => (
                <Badge key={index} variant="outline" className="text-base px-4 py-2">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Foods */}
        {diseaseFoods.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Recommended Foods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diseaseFoods.map((item) => (
                <div key={item.id} className="card-health p-6">
                  {item.image_url && (
                    <img 
                      src={item.image_url} 
                      alt={item.food_name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold text-foreground">
                      {item.food_name}
                    </h4>
                    {item.frequency && (
                      <Badge className={getFrequencyColor(item.frequency)}>
                        {item.frequency.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-primary" />
                        Benefits
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.benefits}
                      </p>
                    </div>

                    {item.how_much && (
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-primary" />
                          Recommended Amount
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {item.how_much}
                        </p>
                      </div>
                    )}

                    {item.preparation_method && (
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                          <ChefHat className="w-4 h-4 mr-1 text-primary" />
                          Preparation
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {item.preparation_method}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

export default DiseaseDetail;
