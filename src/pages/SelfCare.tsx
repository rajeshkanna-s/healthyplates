import { useState, useEffect } from 'react';
import { Search, Sparkles, Heart, Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const SelfCare = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('skin-care');
  const [procedures, setProcedures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'skin-care', label: 'Skin Care', icon: Sparkles, color: 'text-pink-500' },
    { value: 'hair-care', label: 'Hair Care', icon: Heart, color: 'text-purple-500' },
    { value: 'fitness-care', label: 'Fitness Care', icon: Dumbbell, color: 'text-blue-500' }
  ];

  useEffect(() => {
    fetchProcedures();
  }, [selectedCategory]);

  const fetchProcedures = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('self_care_procedures')
        .select('*, self_care_categories(*)')
        .order('title');

      if (error) throw error;

      // Filter by category
      const filtered = (data || []).filter((proc: any) => {
        const categoryName = proc.self_care_categories?.name?.toLowerCase() || '';
        return categoryName.includes(selectedCategory.replace('-', ' '));
      });

      setProcedures(filtered);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load self-care procedures.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProcedures = procedures.filter(proc =>
    proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proc.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : Sparkles;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Self-Care Procedures</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover natural and effective self-care routines for your skin, hair, and fitness goals. 
            Take control of your wellness journey with our expert-curated procedures.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="flex items-center gap-2 py-4"
                >
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  <span>{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
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
        </div>

        {/* Procedures Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-health overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProcedures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProcedures.map((procedure) => {
              const Icon = getCategoryIcon(selectedCategory);
              return (
                <article key={procedure.id} className="card-health overflow-hidden group hover:scale-105 transition-all duration-200">
                  {procedure.image_url ? (
                    <img
                      src={procedure.image_url}
                      alt={procedure.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-health flex items-center justify-center">
                      <Icon className="h-16 w-16 text-white" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-gradient-health text-white">
                        {procedure.self_care_categories?.name || selectedCategory}
                      </Badge>
                      {procedure.duration && (
                        <span className="text-xs text-muted-foreground">
                          ⏱️ {procedure.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-health transition-colors">
                      {procedure.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {procedure.description}
                    </p>

                    {procedure.benefits && procedure.benefits.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-foreground mb-2">Key Benefits:</h4>
                        <div className="flex flex-wrap gap-1">
                          {procedure.benefits.slice(0, 3).map((benefit: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {procedure.frequency && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Frequency:</strong> {procedure.frequency}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧘</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No procedures found</h3>
            <p className="text-muted-foreground">Try adjusting your search or select a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCare;
