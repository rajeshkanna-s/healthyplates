import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('food-products');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selfCareCategories, setSelfCareCategories] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<any[]>([]);
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Data states
  const [foodProducts, setFoodProducts] = useState<any[]>([]);
  const [foodTimings, setFoodTimings] = useState<any[]>([]);
  const [diseaseFoods, setDiseaseFoods] = useState<any[]>([]);
  const [selfCareProcedures, setSelfCareProcedures] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchInitialData = async () => {
    try {
      const [categoriesData, selfCareData, diseasesData] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('self_care_categories').select('*').order('name'),
        supabase.from('diseases').select('*').order('name')
      ]);

      setCategories(categoriesData.data || []);
      setSelfCareCategories(selfCareData.data || []);
      setDiseases(diseasesData.data || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load initial data", variant: "destructive" });
    }
  };

  const fetchTabData = async () => {
    try {
      setLoading(true);
      switch (activeTab) {
        case 'food-products':
          const { data: fpData } = await supabase
            .from('food_products')
            .select('*, categories(*)')
            .order('name');
          setFoodProducts(fpData || []);
          break;
        case 'food-timing':
          const { data: ftData } = await supabase
            .from('food_timing')
            .select('*')
            .order('meal_time');
          setFoodTimings(ftData || []);
          break;
        case 'disease-foods':
          const { data: dfData } = await supabase
            .from('disease_foods')
            .select('*, diseases(*)')
            .order('food_name');
          setDiseaseFoods(dfData || []);
          break;
        case 'self-care':
          const { data: scData } = await supabase
            .from('self_care_procedures')
            .select('*, self_care_categories(*)')
            .order('title');
          setSelfCareProcedures(scData || []);
          break;
        case 'blogs':
          const { data: blogData } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });
          setBlogs(blogData || []);
          break;
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: string, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: arrayValue }));
  };

  const resetForm = () => {
    setFormData({});
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(true);
    setEditingId(item.id);
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let error;
      switch (table) {
        case 'food_products':
          ({ error } = await supabase.from('food_products').delete().eq('id', id));
          break;
        case 'food_timing':
          ({ error } = await supabase.from('food_timing').delete().eq('id', id));
          break;
        case 'disease_foods':
          ({ error } = await supabase.from('disease_foods').delete().eq('id', id));
          break;
        case 'self_care_procedures':
          ({ error } = await supabase.from('self_care_procedures').delete().eq('id', id));
          break;
        case 'blogs':
          ({ error } = await supabase.from('blogs').delete().eq('id', id));
          break;
      }
      if (error) throw error;
      
      toast({ title: "Success", description: "Item deleted successfully" });
      fetchTabData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    try {
      let table = '';
      let data = { ...formData };
      
      switch (activeTab) {
        case 'food-products':
          table = 'food_products';
          break;
        case 'food-timing':
          table = 'food_timing';
          break;
        case 'disease-foods':
          table = 'disease_foods';
          break;
        case 'self-care':
          table = 'self_care_procedures';
          break;
        case 'blogs':
          table = 'blogs';
          break;
      }

      if (isEditing) {
        let error;
        switch (table) {
          case 'food_products':
            ({ error } = await supabase.from('food_products').update(data).eq('id', editingId));
            break;
          case 'food_timing':
            ({ error } = await supabase.from('food_timing').update(data).eq('id', editingId));
            break;
          case 'disease_foods':
            ({ error } = await supabase.from('disease_foods').update(data).eq('id', editingId));
            break;
          case 'self_care_procedures':
            ({ error } = await supabase.from('self_care_procedures').update(data).eq('id', editingId));
            break;
          case 'blogs':
            ({ error } = await supabase.from('blogs').update(data).eq('id', editingId));
            break;
        }
        if (error) throw error;
        toast({ title: "Success", description: "Item updated successfully" });
      } else {
        let error;
        switch (table) {
          case 'food_products':
            ({ error } = await supabase.from('food_products').insert(data));
            break;
          case 'food_timing':
            ({ error } = await supabase.from('food_timing').insert(data));
            break;
          case 'disease_foods':
            ({ error } = await supabase.from('disease_foods').insert(data));
            break;
          case 'self_care_procedures':
            ({ error } = await supabase.from('self_care_procedures').insert(data));
            break;
          case 'blogs':
            ({ error } = await supabase.from('blogs').insert(data));
            break;
        }
        if (error) throw error;
        toast({ title: "Success", description: "Item created successfully" });
      }

      resetForm();
      fetchTabData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const renderFoodProductForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Food product name"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category_id || ''} onValueChange={(value) => handleInputChange('category_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.filter(c => c.type === 'food_product').map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="purpose">Purpose</Label>
        <Textarea
          id="purpose"
          value={formData.purpose || ''}
          onChange={(e) => handleInputChange('purpose', e.target.value)}
          placeholder="Purpose of this food product"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="advantages">Advantages (comma-separated)</Label>
          <Textarea
            id="advantages"
            value={formData.advantages?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('advantages', e.target.value)}
            placeholder="Advantage 1, Advantage 2, Advantage 3"
          />
        </div>
        <div>
          <Label htmlFor="disadvantages">Disadvantages (comma-separated)</Label>
          <Textarea
            id="disadvantages"
            value={formData.disadvantages?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('disadvantages', e.target.value)}
            placeholder="Disadvantage 1, Disadvantage 2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="medicinal_benefits">Medicinal Benefits</Label>
        <Textarea
          id="medicinal_benefits"
          value={formData.medicinal_benefits || ''}
          onChange={(e) => handleInputChange('medicinal_benefits', e.target.value)}
          placeholder="Medicinal benefits description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating || ''}
            onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="origin">Origin</Label>
          <Input
            id="origin"
            value={formData.origin || ''}
            onChange={(e) => handleInputChange('origin', e.target.value)}
            placeholder="Origin location"
          />
        </div>
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="Image URL"
          />
        </div>
      </div>
    </div>
  );

  const renderFoodTimingForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Food Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Food name"
          />
        </div>
        <div>
          <Label htmlFor="meal_time">Meal Time</Label>
          <Select value={formData.meal_time || ''} onValueChange={(value) => handleInputChange('meal_time', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select meal time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="benefits">Benefits</Label>
        <Textarea
          id="benefits"
          value={formData.benefits || ''}
          onChange={(e) => handleInputChange('benefits', e.target.value)}
          placeholder="Benefits of eating this food at this time"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Food description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="how_much">How Much</Label>
          <Input
            id="how_much"
            value={formData.how_much || ''}
            onChange={(e) => handleInputChange('how_much', e.target.value)}
            placeholder="Recommended amount"
          />
        </div>
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="Image URL"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="preparation_tips">Preparation Tips</Label>
        <Textarea
          id="preparation_tips"
          value={formData.preparation_tips || ''}
          onChange={(e) => handleInputChange('preparation_tips', e.target.value)}
          placeholder="Tips for preparation"
        />
      </div>
    </div>
  );

  const renderForm = () => {
    switch (activeTab) {
      case 'food-products':
        return renderFoodProductForm();
      case 'food-timing':
        return renderFoodTimingForm();
      case 'disease-foods':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="disease">Disease</Label>
                <Select value={formData.disease_id || ''} onValueChange={(value) => handleInputChange('disease_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select disease" />
                  </SelectTrigger>
                  <SelectContent>
                    {diseases.map((disease) => (
                      <SelectItem key={disease.id} value={disease.id}>
                        {disease.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="food_name">Food Name</Label>
                <Input
                  id="food_name"
                  value={formData.food_name || ''}
                  onChange={(e) => handleInputChange('food_name', e.target.value)}
                  placeholder="Recommended food"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="benefits">Benefits</Label>
              <Textarea
                id="benefits"
                value={formData.benefits || ''}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                placeholder="Benefits for this disease"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="how_much">How Much</Label>
                <Input
                  id="how_much"
                  value={formData.how_much || ''}
                  onChange={(e) => handleInputChange('how_much', e.target.value)}
                  placeholder="Recommended amount"
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={formData.frequency || ''} onValueChange={(value) => handleInputChange('frequency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="as_needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="preparation_method">Preparation Method</Label>
                <Input
                  id="preparation_method"
                  value={formData.preparation_method || ''}
                  onChange={(e) => handleInputChange('preparation_method', e.target.value)}
                  placeholder="How to prepare"
                />
              </div>
            </div>
          </div>
        );
      // Add more form cases for other tabs...
      default:
        return <div>Form not implemented for this tab yet.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Manage all content for the HealthyPlates website
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="food-products">Food Products</TabsTrigger>
            <TabsTrigger value="food-timing">Food Timing</TabsTrigger>
            <TabsTrigger value="disease-foods">Disease Foods</TabsTrigger>
            <TabsTrigger value="self-care">Self Care</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            {/* Form Section */}
            <div className="card-health p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {isEditing ? 'Edit' : 'Add New'} {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
                <div className="space-x-2">
                  <Button onClick={handleSave} className="btn-health">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  {isEditing && (
                    <Button variant="outline" onClick={resetForm}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              
              {renderForm()}
            </div>

            {/* Data Table */}
            <div className="card-health p-6">
              <h3 className="text-lg font-semibold mb-4">Current Data</h3>
              
              <TabsContent value="food-products" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foodProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Badge>{product.categories?.name}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{product.purpose}</TableCell>
                          <TableCell>{product.rating}</TableCell>
                          <TableCell>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDelete(product.id, 'food_products')}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="food-timing" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Meal Time</TableHead>
                        <TableHead>Benefits</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foodTimings.map((timing) => (
                        <TableRow key={timing.id}>
                          <TableCell className="font-medium">{timing.name}</TableCell>
                          <TableCell>
                            <Badge>{timing.meal_time}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{timing.benefits}</TableCell>
                          <TableCell>
                            <div className="space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(timing)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDelete(timing.id, 'food_timing')}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Add more tab contents for other tables... */}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;