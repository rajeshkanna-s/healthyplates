import { useState, useEffect } from 'react';
import { Search, Heart, AlertTriangle, Clock, ChefHat } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Diseases = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseases, setDiseases] = useState<any[]>([]);
  const [diseaseFoods, setDiseaseFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFoods, setLoadingFoods] = useState(false);

  useEffect(() => {
    fetchDiseases();
  }, []);

  useEffect(() => {
    if (selectedDisease) {
      fetchDiseaseFoods();
    } else {
      setDiseaseFoods([]);
    }
  }, [selectedDisease]);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('diseases')
        .select('*')
        .order('name');

      if (error) throw error;
      setDiseases(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load diseases data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDiseaseFoods = async () => {
    if (!selectedDisease) return;
    
    try {
      setLoadingFoods(true);
      const { data, error } = await supabase
        .from('disease_foods')
        .select(`
          *,
          diseases!inner(*)
        `)
        .eq('disease_id', selectedDisease);

      if (error) throw error;
      setDiseaseFoods(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load recommended foods.",
        variant: "destructive"
      });
    } finally {
      setLoadingFoods(false);
    }
  };

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDiseaseData = diseases.find(d => d.id === selectedDisease);

  const getFrequencyColor = (frequency: string) => {
    switch (frequency?.toLowerCase()) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'as_needed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Disease Management with Foods</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover foods that can help manage various health conditions. Learn about nutritional approaches to support your wellness journey.
          </p>
        </div>

        {/* Search and Disease Selection */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search Diseases</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for diseases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Disease</label>
              <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a disease to see recommended foods" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDiseases.map((disease) => (
                    <SelectItem key={disease.id} value={disease.id}>
                      {disease.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Disease Information */}
        {selectedDiseaseData && (
          <div className="card-health p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-health p-3 rounded-lg shadow-health-glow">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {selectedDiseaseData.name}
                </h2>
                {selectedDiseaseData.description && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {selectedDiseaseData.description}
                  </p>
                )}
                {selectedDiseaseData.symptoms && selectedDiseaseData.symptoms.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1 text-yellow-500" />
                      Common Symptoms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDiseaseData.symptoms.map((symptom: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recommended Foods */}
        {selectedDisease && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Recommended Foods for {selectedDiseaseData?.name}
            </h2>

            {loadingFoods ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-health p-6 animate-pulse">
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-4"></div>
                    <div className="h-2 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : diseaseFoods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diseaseFoods.map((item) => (
                  <div key={item.id} className="card-health p-6 group hover:scale-105 transition-all duration-200">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.food_name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-health transition-colors">
                        {item.food_name}
                      </h3>
                      {item.frequency && (
                        <Badge className={getFrequencyColor(item.frequency)}>
                          {item.frequency.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                          <Heart className="w-4 h-4 mr-1 text-health" />
                          Benefits
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.benefits}
                        </p>
                      </div>

                      {item.how_much && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-health" />
                            Recommended Amount
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.how_much}
                          </p>
                        </div>
                      )}

                      {item.preparation_method && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                            <ChefHat className="w-4 h-4 mr-1 text-health" />
                            Preparation
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.preparation_method}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍎</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground">
                  Food recommendations for {selectedDiseaseData?.name} are being compiled by our nutrition experts.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Disease List (when no disease selected) */}
        {!selectedDisease && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Available Health Conditions
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-health p-6 animate-pulse">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiseases.map((disease) => (
                  <button
                    key={disease.id}
                    onClick={() => setSelectedDisease(disease.id)}
                    className="card-health p-6 text-left group hover:scale-105 transition-all duration-200"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-health transition-colors">
                      {disease.name}
                    </h3>
                    {disease.description && (
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {disease.description}
                      </p>
                    )}
                    <div className="text-sm text-health font-medium">
                      View Food Recommendations →
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Diseases;