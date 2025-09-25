import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Image, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import type { User } from '@supabase/supabase-js';

const DataEntry = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('food-products');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
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
    // Check authentication
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setAuthLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
    if (!user) {
      toast({ 
        title: "Authentication Required", 
        description: "Please sign in to add or edit data", 
        variant: "destructive" 
      });
      return;
    }

    try {
      let table = '';
      let data = { ...formData };
      
      // Remove timestamps and id for inserts
      if (!isEditing) {
        delete data.id;
        delete data.created_at;
        delete data.updated_at;
      }
      
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
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Food Product' : 'Add New Food Product'}</CardTitle>
        <CardDescription>Manage food products in your database</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter food product name"
              required
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
          <Label htmlFor="purpose">Purpose *</Label>
          <Textarea
            id="purpose"
            value={formData.purpose || ''}
            onChange={(e) => handleInputChange('purpose', e.target.value)}
            placeholder="Describe the purpose and benefits of this food product"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="advantages">Advantages (comma-separated)</Label>
            <Textarea
              id="advantages"
              value={formData.advantages?.join(', ') || ''}
              onChange={(e) => handleArrayInputChange('advantages', e.target.value)}
              placeholder="High in fiber, Rich in vitamins, Antioxidant properties"
            />
          </div>
          <div>
            <Label htmlFor="disadvantages">Disadvantages (comma-separated)</Label>
            <Textarea
              id="disadvantages"
              value={formData.disadvantages?.join(', ') || ''}
              onChange={(e) => handleArrayInputChange('disadvantages', e.target.value)}
              placeholder="High in calories, May cause allergies"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="medicinal_benefits">Medicinal Benefits</Label>
          <Textarea
            id="medicinal_benefits"
            value={formData.medicinal_benefits || ''}
            onChange={(e) => handleInputChange('medicinal_benefits', e.target.value)}
            placeholder="Describe any medicinal properties or health benefits"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              placeholder="e.g., India, Mediterranean"
            />
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              value={formData.region || ''}
              onChange={(e) => handleInputChange('region', e.target.value)}
              placeholder="Specific region"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_indian"
              checked={formData.is_indian || false}
              onCheckedChange={(checked) => handleInputChange('is_indian', checked)}
            />
            <Label htmlFor="is_indian">Indian Origin</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Save'}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderFoodTimingForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Food Timing' : 'Add New Food Timing'}</CardTitle>
        <CardDescription>Manage foods by optimal eating times</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Food Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter food name"
              required
            />
          </div>
          <div>
            <Label htmlFor="meal_time">Meal Time *</Label>
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
          <Label htmlFor="benefits">Benefits *</Label>
          <Textarea
            id="benefits"
            value={formData.benefits || ''}
            onChange={(e) => handleInputChange('benefits', e.target.value)}
            placeholder="Describe the benefits of eating this food at this time"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Additional description about the food"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="how_much">Recommended Amount</Label>
            <Input
              id="how_much"
              value={formData.how_much || ''}
              onChange={(e) => handleInputChange('how_much', e.target.value)}
              placeholder="e.g., 1 cup, 100g, 2 pieces"
            />
          </div>
          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url || ''}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="preparation_tips">Preparation Tips</Label>
          <Textarea
            id="preparation_tips"
            value={formData.preparation_tips || ''}
            onChange={(e) => handleInputChange('preparation_tips', e.target.value)}
            placeholder="Tips for preparing this food"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Save'}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDiseaseFoodForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Disease-Specific Food' : 'Add Disease-Specific Food'}</CardTitle>
        <CardDescription>Manage foods recommended for specific diseases</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="disease">Disease *</Label>
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
            <Label htmlFor="food_name">Food Name *</Label>
            <Input
              id="food_name"
              value={formData.food_name || ''}
              onChange={(e) => handleInputChange('food_name', e.target.value)}
              placeholder="Enter recommended food"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="benefits">Benefits *</Label>
          <Textarea
            id="benefits"
            value={formData.benefits || ''}
            onChange={(e) => handleInputChange('benefits', e.target.value)}
            placeholder="Explain how this food helps with the disease"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="how_much">Recommended Amount</Label>
            <Input
              id="how_much"
              value={formData.how_much || ''}
              onChange={(e) => handleInputChange('how_much', e.target.value)}
              placeholder="e.g., 1 cup daily, 50g"
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
                <SelectItem value="twice_daily">Twice Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="preparation_method">Preparation Method</Label>
            <Input
              id="preparation_method"
              value={formData.preparation_method || ''}
              onChange={(e) => handleInputChange('preparation_method', e.target.value)}
              placeholder="How to prepare/consume"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Save'}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSelfCareForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Self-Care Procedure' : 'Add Self-Care Procedure'}</CardTitle>
        <CardDescription>Manage self-care procedures and wellness tips</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter procedure title"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category_id || ''} onValueChange={(value) => handleInputChange('category_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {selfCareCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the procedure"
          />
        </div>

        <div>
          <Label htmlFor="steps">Steps (comma-separated) *</Label>
          <Textarea
            id="steps"
            value={formData.steps?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('steps', e.target.value)}
            placeholder="Step 1, Step 2, Step 3"
            required
          />
        </div>

        <div>
          <Label htmlFor="ingredients">Ingredients/Materials (comma-separated)</Label>
          <Textarea
            id="ingredients"
            value={formData.ingredients?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('ingredients', e.target.value)}
            placeholder="Ingredient 1, Ingredient 2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration || ''}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="e.g., 15 minutes, 30 seconds"
            />
          </div>
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Input
              id="frequency"
              value={formData.frequency || ''}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
              placeholder="e.g., Daily, Twice a week"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="benefits">Benefits (comma-separated)</Label>
          <Textarea
            id="benefits"
            value={formData.benefits?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('benefits', e.target.value)}
            placeholder="Benefit 1, Benefit 2"
          />
        </div>

        <div>
          <Label htmlFor="precautions">Precautions (comma-separated)</Label>
          <Textarea
            id="precautions"
            value={formData.precautions?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('precautions', e.target.value)}
            placeholder="Precaution 1, Precaution 2"
          />
        </div>

        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Save'}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderBlogForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
        <CardDescription>Upload and manage blog articles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt || ''}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            placeholder="Brief description of the blog post"
          />
        </div>

        <div>
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={formData.content || ''}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Write your blog content here..."
            className="min-h-[200px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category || ''} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
                <SelectItem value="recipes">Recipes</SelectItem>
                <SelectItem value="tips">Tips</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status || 'published'} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('tags', e.target.value)}
            placeholder="health, nutrition, wellness"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author_name">Author Name</Label>
            <Input
              id="author_name"
              value={formData.author_name || 'HealthyPlates Team'}
              onChange={(e) => handleInputChange('author_name', e.target.value)}
              placeholder="Author name"
            />
          </div>
          <div>
            <Label htmlFor="cover_image_url">Cover Image URL</Label>
            <Input
              id="cover_image_url"
              value={formData.cover_image_url || ''}
              onChange={(e) => handleInputChange('cover_image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Publish'}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDataTable = () => {
    const currentData = {
      'food-products': foodProducts,
      'food-timing': foodTimings,
      'disease-foods': diseaseFoods,
      'self-care': selfCareProcedures,
      'blogs': blogs
    }[activeTab] || [];

    if (loading) {
      return <div className="text-center py-8">Loading...</div>;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Existing Data</CardTitle>
          <CardDescription>Manage your existing {activeTab.replace('-', ' ')} data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {activeTab === 'food-products' && (
                    <>
                      <TableHead>Name</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  )}
                  {activeTab === 'food-timing' && (
                    <>
                      <TableHead>Name</TableHead>
                      <TableHead>Meal Time</TableHead>
                      <TableHead>Benefits</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  )}
                  {activeTab === 'disease-foods' && (
                    <>
                      <TableHead>Food Name</TableHead>
                      <TableHead>Disease</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  )}
                  {activeTab === 'self-care' && (
                    <>
                      <TableHead>Title</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  )}
                  {activeTab === 'blogs' && (
                    <>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Actions</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item) => (
                  <TableRow key={item.id}>
                    {activeTab === 'food-products' && (
                      <>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.purpose}</TableCell>
                        <TableCell>
                          {item.rating && <Badge variant="outline">{item.rating}/5</Badge>}
                        </TableCell>
                        <TableCell>{item.origin || '-'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id, 'food_products')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 'food-timing' && (
                      <>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{item.meal_time}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{item.benefits}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id, 'food_timing')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 'disease-foods' && (
                      <>
                        <TableCell className="font-medium">{item.food_name}</TableCell>
                        <TableCell>{item.diseases?.name || '-'}</TableCell>
                        <TableCell>
                          {item.frequency && <Badge variant="outline">{item.frequency}</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id, 'disease_foods')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 'self-care' && (
                      <>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.duration || '-'}</TableCell>
                        <TableCell>{item.frequency || '-'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id, 'self_care_procedures')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                    {activeTab === 'blogs' && (
                      <>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          {item.category && <Badge variant="secondary">{item.category}</Badge>}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'published' ? 'default' : 'outline'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.author_name}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id, 'blogs')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'food-products':
        return renderFoodProductForm();
      case 'food-timing':
        return renderFoodTimingForm();
      case 'disease-foods':
        return renderDiseaseFoodForm();
      case 'self-care':
        return renderSelfCareForm();
      case 'blogs':
        return renderBlogForm();
      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-4">
                <p className="font-medium">Authentication Required</p>
                <p>You need to be signed in to access the data entry portal. Please sign in with your account to manage content.</p>
                <Button onClick={() => window.location.href = '/auth'} className="mt-4">
                  Go to Sign In
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Data Entry Portal</h1>
          <p className="text-muted-foreground">
            Manage all your website content from this comprehensive data entry interface.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Badge variant="outline" className="text-green-600">
              Signed in as {user.email}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="food-products">Food Products</TabsTrigger>
            <TabsTrigger value="food-timing">Food Timing</TabsTrigger>
            <TabsTrigger value="disease-foods">Disease Foods</TabsTrigger>
            <TabsTrigger value="self-care">Self-Care</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              {renderForm()}
            </div>
            <div>
              {renderDataTable()}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DataEntry;