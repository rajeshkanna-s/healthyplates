import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, AlertCircle } from 'lucide-react';
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

const Admin = () => {
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
    // Check if admin is logged in from localStorage
    const adminLoggedIn = localStorage.getItem('admin_logged_in');
    if (adminLoggedIn === 'true') {
      setUser({ email: 'durbinyarul@gmail.com' } as any);
    }
    setAuthLoading(false);
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
    // Clean the data for editing - remove nested objects and keep only IDs
    const cleanedData = { ...item };
    
    // Remove nested objects that come from joins
    delete cleanedData.categories;
    delete cleanedData.diseases;
    delete cleanedData.self_care_categories;
    
    setFormData(cleanedData);
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
      
      // Clean up data - remove any nested objects and timestamps
      delete data.categories;
      delete data.diseases;
      delete data.self_care_categories;
      delete data.created_at;
      delete data.updated_at;
      
      // Remove id for inserts
      if (!isEditing) {
        delete data.id;
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
        let updatedRows: any[] | null = null;
        switch (table) {
          case 'food_products': {
            const { data: u, error: e } = await supabase.from('food_products').update(data).eq('id', editingId).select();
            updatedRows = u; error = e; break; }
          case 'food_timing': {
            const { data: u, error: e } = await supabase.from('food_timing').update(data).eq('id', editingId).select();
            updatedRows = u; error = e; break; }
          case 'disease_foods': {
            const { data: u, error: e } = await supabase.from('disease_foods').update(data).eq('id', editingId).select();
            updatedRows = u; error = e; break; }
          case 'self_care_procedures': {
            const { data: u, error: e } = await supabase.from('self_care_procedures').update(data).eq('id', editingId).select();
            updatedRows = u; error = e; break; }
          case 'blogs': {
            const { data: u, error: e } = await supabase.from('blogs').update(data).eq('id', editingId).select();
            updatedRows = u; error = e; break; }
        }
        if (error) throw error;
        if (!updatedRows || updatedRows.length === 0) {
          throw new Error('Update failed due to permissions. Please ensure you are authenticated.');
        }
        toast({ title: "Success", description: "Item updated successfully" });
      } else {
        let error;
        let insertedRows: any[] | null = null;
        switch (table) {
          case 'food_products': {
            const { data: i, error: e } = await supabase.from('food_products').insert(data).select();
            insertedRows = i; error = e; break; }
          case 'food_timing': {
            const { data: i, error: e } = await supabase.from('food_timing').insert(data).select();
            insertedRows = i; error = e; break; }
          case 'disease_foods': {
            const { data: i, error: e } = await supabase.from('disease_foods').insert(data).select();
            insertedRows = i; error = e; break; }
          case 'self_care_procedures': {
            const { data: i, error: e } = await supabase.from('self_care_procedures').insert(data).select();
            insertedRows = i; error = e; break; }
          case 'blogs': {
            const { data: i, error: e } = await supabase.from('blogs').insert(data).select();
            insertedRows = i; error = e; break; }
        }
        if (error) throw error;
        if (!insertedRows || insertedRows.length === 0) {
          throw new Error('Create failed due to permissions. Please ensure you are authenticated.');
        }
        toast({ title: "Success", description: "Item created successfully" });
      }

      resetForm();
      fetchTabData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const renderFoodProductForm = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{isEditing ? 'Edit Food Product' : 'Add New Food Product'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="name" className="text-xs">Product Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Fresh Spinach"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="category" className="text-xs">Category</Label>
            <Select value={formData.category_id || ''} onValueChange={(value) => handleInputChange('category_id', value)}>
              <SelectTrigger className="h-9 text-sm">
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
          <Label htmlFor="purpose" className="text-xs">Purpose *</Label>
          <Textarea
            id="purpose"
            value={formData.purpose || ''}
            onChange={(e) => handleInputChange('purpose', e.target.value)}
            placeholder="Main purpose and health benefits"
            className="min-h-[70px] text-sm"
          />
        </div>

        <div>
          <Label htmlFor="medicinal_benefits" className="text-xs">Medicinal Benefits</Label>
          <Textarea
            id="medicinal_benefits"
            value={formData.medicinal_benefits || ''}
            onChange={(e) => handleInputChange('medicinal_benefits', e.target.value)}
            placeholder="Medicinal properties"
            className="min-h-[60px] text-sm"
          />
        </div>

        <div>
          <Label htmlFor="image_url" className="text-xs">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="h-9 text-sm"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1 h-9 text-sm">
            <Save className="w-3 h-3 mr-1" />
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button variant="outline" onClick={resetForm} className="flex-1 h-9 text-sm">
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderBlogForm = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="title" className="text-xs">Blog Title *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Benefits of Green Tea"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="category" className="text-xs">Category</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Nutrition"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt" className="text-xs">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt || ''}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            placeholder="Brief summary"
            className="min-h-[60px] text-sm"
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-xs">Full Content *</Label>
          <Textarea
            id="content"
            value={formData.content || ''}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Complete blog content"
            className="min-h-[150px] text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="author_name" className="text-xs">Author Name</Label>
            <Input
              id="author_name"
              value={formData.author_name || 'HealthyPlates Team'}
              onChange={(e) => handleInputChange('author_name', e.target.value)}
              placeholder="Author name"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="cover_image_url" className="text-xs">Cover Image URL</Label>
            <Input
              id="cover_image_url"
              value={formData.cover_image_url || ''}
              onChange={(e) => handleInputChange('cover_image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1 h-9 text-sm">
            <Save className="w-3 h-3 mr-1" />
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button variant="outline" onClick={resetForm} className="flex-1 h-9 text-sm">
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderFoodTimingForm = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{isEditing ? 'Edit Food' : 'Add New Food'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="name" className="text-xs">Food Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter food name"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="meal_time" className="text-xs">Meal Time *</Label>
            <Select value={formData.meal_time || ''} onValueChange={(value) => handleInputChange('meal_time', value)}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select meal time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="benefits" className="text-xs">Benefits *</Label>
          <Textarea
            id="benefits"
            value={formData.benefits || ''}
            onChange={(e) => handleInputChange('benefits', e.target.value)}
            placeholder="Health benefits"
            className="min-h-[70px] text-sm"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-xs">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Detailed description"
            className="min-h-[60px] text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="how_much" className="text-xs">How Much</Label>
            <Input
              id="how_much"
              value={formData.how_much || ''}
              onChange={(e) => handleInputChange('how_much', e.target.value)}
              placeholder="e.g., 1 cup, 50g"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="preparation_tips" className="text-xs">Preparation Tips</Label>
            <Input
              id="preparation_tips"
              value={formData.preparation_tips || ''}
              onChange={(e) => handleInputChange('preparation_tips', e.target.value)}
              placeholder="Quick tips"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image_url" className="text-xs">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="h-9 text-sm"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1 h-9 text-sm">
            <Save className="w-3 h-3 mr-1" />
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button variant="outline" onClick={resetForm} className="flex-1 h-9 text-sm">
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDiseaseFoodForm = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{isEditing ? 'Edit Disease Food' : 'Add New Disease Food'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="food_name" className="text-xs">Food Name *</Label>
            <Input
              id="food_name"
              value={formData.food_name || ''}
              onChange={(e) => handleInputChange('food_name', e.target.value)}
              placeholder="Enter food name"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="disease_id" className="text-xs">Disease *</Label>
            <Select value={formData.disease_id || ''} onValueChange={(value) => handleInputChange('disease_id', value)}>
              <SelectTrigger className="h-9 text-sm">
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
        </div>
        
        <div>
          <Label htmlFor="benefits" className="text-xs">Benefits *</Label>
          <Textarea
            id="benefits"
            value={formData.benefits || ''}
            onChange={(e) => handleInputChange('benefits', e.target.value)}
            placeholder="How this food helps"
            className="min-h-[70px] text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="how_much" className="text-xs">How Much</Label>
            <Input
              id="how_much"
              value={formData.how_much || ''}
              onChange={(e) => handleInputChange('how_much', e.target.value)}
              placeholder="Recommended quantity"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="frequency" className="text-xs">Frequency</Label>
            <Input
              id="frequency"
              value={formData.frequency || ''}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
              placeholder="How often"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="preparation_method" className="text-xs">Preparation Method</Label>
          <Textarea
            id="preparation_method"
            value={formData.preparation_method || ''}
            onChange={(e) => handleInputChange('preparation_method', e.target.value)}
            placeholder="How to prepare"
            className="min-h-[60px] text-sm"
          />
        </div>

        <div>
          <Label htmlFor="image_url" className="text-xs">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="h-9 text-sm"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1 h-9 text-sm">
            <Save className="w-3 h-3 mr-1" />
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button variant="outline" onClick={resetForm} className="flex-1 h-9 text-sm">
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSelfCareForm = () => (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{isEditing ? 'Edit Self Care Procedure' : 'Add New Self Care Procedure'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="title" className="text-xs">Title *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Procedure title"
              className="h-9 text-sm"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="category_id" className="text-xs">Category *</Label>
            <Select value={formData.category_id || ''} onValueChange={(value) => handleInputChange('category_id', value)}>
              <SelectTrigger className="h-9 text-sm">
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
          <Label htmlFor="description" className="text-xs">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description"
            className="min-h-[60px] text-sm"
          />
        </div>

        <div>
          <Label htmlFor="steps" className="text-xs">Steps (comma-separated) *</Label>
          <Textarea
            id="steps"
            value={formData.steps?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('steps', e.target.value)}
            placeholder="Step 1, Step 2, Step 3"
            className="min-h-[70px] text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label htmlFor="benefits" className="text-xs">Benefits (comma-separated)</Label>
            <Textarea
              id="benefits"
              value={formData.benefits?.join(', ') || ''}
              onChange={(e) => handleArrayInputChange('benefits', e.target.value)}
              placeholder="Benefit 1, Benefit 2"
              className="min-h-[60px] text-sm"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="ingredients" className="text-xs">Ingredients (comma-separated)</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients?.join(', ') || ''}
              onChange={(e) => handleArrayInputChange('ingredients', e.target.value)}
              placeholder="Ingredient 1, Ingredient 2"
              className="min-h-[60px] text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="duration" className="text-xs">Duration</Label>
            <Input
              id="duration"
              value={formData.duration || ''}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="30 minutes"
              className="h-9 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="frequency" className="text-xs">Frequency</Label>
            <Input
              id="frequency"
              value={formData.frequency || ''}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
              placeholder="Daily"
              className="h-9 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="image_url" className="text-xs">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url || ''}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              placeholder="Image URL"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="precautions" className="text-xs">Precautions (comma-separated)</Label>
          <Textarea
            id="precautions"
            value={formData.precautions?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('precautions', e.target.value)}
            placeholder="Precaution 1, Precaution 2"
            className="min-h-[60px] text-sm"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1 h-9 text-sm">
            <Save className="w-3 h-3 mr-1" />
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button variant="outline" onClick={resetForm} className="flex-1 h-9 text-sm">
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              You need to be logged in as an admin to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/auth'} className="w-full">
              Go to Admin Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'} 
              className="w-full mt-2"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Manage all content and data</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="food-products">Food Products</TabsTrigger>
            <TabsTrigger value="food-timing">Food Timing</TabsTrigger>
            <TabsTrigger value="disease-foods">Disease Foods</TabsTrigger>
            <TabsTrigger value="self-care">Self Care</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>

          <div className="mt-8 space-y-8">
            {/* Form Section */}
            {renderForm()}

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Data</CardTitle>
                <CardDescription>View and manage existing records</CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="food-products" className="mt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Purpose</TableHead>
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

                <TabsContent value="blogs" className="mt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogs.map((blog) => (
                          <TableRow key={blog.id}>
                            <TableCell className="font-medium">{blog.title}</TableCell>
                            <TableCell>
                              <Badge>{blog.category}</Badge>
                            </TableCell>
                            <TableCell>{blog.author_name}</TableCell>
                            <TableCell>
                              <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                                {blog.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleDelete(blog.id, 'blogs')}
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
                        {foodTimings.map((food) => (
                          <TableRow key={food.id}>
                            <TableCell className="font-medium">{food.name}</TableCell>
                            <TableCell>
                              <Badge>{food.meal_time}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{food.benefits}</TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(food)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleDelete(food.id, 'food_timing')}
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

                <TabsContent value="disease-foods" className="mt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Food Name</TableHead>
                          <TableHead>Disease</TableHead>
                          <TableHead>Benefits</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {diseaseFoods.map((food) => (
                          <TableRow key={food.id}>
                            <TableCell className="font-medium">{food.food_name}</TableCell>
                            <TableCell>
                              <Badge>{food.diseases?.name}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{food.benefits}</TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(food)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleDelete(food.id, 'disease_foods')}
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

                <TabsContent value="self-care" className="mt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selfCareProcedures.map((procedure) => (
                          <TableRow key={procedure.id}>
                            <TableCell className="font-medium">{procedure.title}</TableCell>
                            <TableCell>
                              <Badge>{procedure.self_care_categories?.name}</Badge>
                            </TableCell>
                            <TableCell>{procedure.duration}</TableCell>
                            <TableCell>{procedure.frequency}</TableCell>
                            <TableCell>
                              <div className="space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(procedure)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleDelete(procedure.id, 'self_care_procedures')}
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
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;