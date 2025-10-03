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

  const renderBlogForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
        <CardDescription>Manage blog posts for your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Blog Title *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="Blog category"
            />
          </div>
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

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('tags', e.target.value)}
            placeholder="health, nutrition, wellness"
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

  const renderForm = () => {
    switch (activeTab) {
      case 'food-products':
        return renderFoodProductForm();
      case 'blogs':
        return renderBlogForm();
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Form for {activeTab} coming soon...</p>
            </CardContent>
          </Card>
        );
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

                {/* Placeholder for other tabs */}
                <TabsContent value="food-timing" className="mt-0">
                  <p className="text-muted-foreground">Food timing data management coming soon...</p>
                </TabsContent>
                <TabsContent value="disease-foods" className="mt-0">
                  <p className="text-muted-foreground">Disease foods data management coming soon...</p>
                </TabsContent>
                <TabsContent value="self-care" className="mt-0">
                  <p className="text-muted-foreground">Self care data management coming soon...</p>
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