import { useState, useEffect } from 'react';
import { Search, Clock, Users, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SelfCare = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('self_care_categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      // Fetch procedures with categories
      const { data: proceduresData, error: proceduresError } = await supabase
        .from('self_care_procedures')
        .select(`
          *,
          self_care_categories!inner(*)
        `)
        .order('title');

      if (proceduresError) throw proceduresError;

      setCategories(categoriesData || []);
      setProcedures(proceduresData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load self-care data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           procedure.self_care_categories?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'skin_care': return '✨';
      case 'hair_care': return '💇';
      case 'fitness_care': return '💪';
      case 'health_care': return '🏥';
      default: return '🌿';
    }
  };

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'skin_care': return 'bg-pink-100 text-pink-800';
      case 'hair_care': return 'bg-purple-100 text-purple-800';
      case 'fitness_care': return 'bg-blue-100 text-blue-800';
      case 'health_care': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency?.toLowerCase()) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Self-Care Guide</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover natural self-care procedures for skin, hair, fitness, and overall health. 
            Follow our step-by-step guides for a healthier, more radiant you.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search Procedures</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search self-care procedures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {getCategoryIcon(category.name)} {category.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Category Overview */}
        {selectedCategory === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className="card-health p-6 text-center group hover:scale-105 transition-all duration-200"
              >
                <div className="text-4xl mb-3">{getCategoryIcon(category.name)}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-health transition-colors">
                  {category.description}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {procedures.filter(p => p.self_care_categories?.name === category.name).length} procedures
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Procedures Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card-health p-6 animate-pulse">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProcedures.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProcedures.map((procedure) => (
              <div key={procedure.id} className="card-health p-6 group">
                {procedure.image_url ? (
                  <img 
                    src={procedure.image_url} 
                    alt={procedure.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">
                      {getCategoryIcon(procedure.self_care_categories?.name)}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-health transition-colors flex-1">
                    {procedure.title}
                  </h3>
                  <Badge className={getCategoryColor(procedure.self_care_categories?.name)}>
                    {procedure.self_care_categories?.description}
                  </Badge>
                </div>

                {procedure.description && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {procedure.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {procedure.duration && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-health" />
                      <span className="text-sm text-muted-foreground">{procedure.duration}</span>
                    </div>
                  )}
                  {procedure.frequency && (
                    <Badge className={getFrequencyColor(procedure.frequency)}>
                      {procedure.frequency}
                    </Badge>
                  )}
                </div>

                {/* Ingredients */}
                {procedure.ingredients && procedure.ingredients.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 text-health" />
                      Ingredients Needed
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {procedure.ingredients.map((ingredient: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Steps */}
                {procedure.steps && procedure.steps.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-1 text-health" />
                      Step-by-Step Instructions
                    </h4>
                    <ol className="space-y-2">
                      {procedure.steps.slice(0, 3).map((step: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <span className="bg-health text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                      {procedure.steps.length > 3 && (
                        <li className="text-xs text-muted-foreground italic">
                          ... and {procedure.steps.length - 3} more steps
                        </li>
                      )}
                    </ol>
                  </div>
                )}

                {/* Benefits */}
                {procedure.benefits && procedure.benefits.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {procedure.benefits.slice(0, 3).map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-xs">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Precautions */}
                {procedure.precautions && procedure.precautions.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1 text-orange-500" />
                      Precautions
                    </h4>
                    <ul className="space-y-1">
                      {procedure.precautions.slice(0, 2).map((precaution: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-xs">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="text-muted-foreground">{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No procedures found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCare;