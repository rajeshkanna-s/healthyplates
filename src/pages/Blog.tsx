import { useState, useEffect } from 'react';
import { Search, Calendar, User, Eye, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Blog = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'all',
    'nutrition',
    'fitness',
    'wellness',
    'recipes',
    'mental-health',
    'disease-prevention'
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blog posts.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nutrition': return 'bg-green-100 text-green-800';
      case 'fitness': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-purple-100 text-purple-800';
      case 'recipes': return 'bg-orange-100 text-orange-800';
      case 'mental-health': return 'bg-pink-100 text-pink-800';
      case 'disease-prevention': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Health & Wellness Blog</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest insights on nutrition, fitness, wellness, and healthy living. 
            Discover expert tips and evidence-based advice for your health journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search Articles</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search blog posts..."
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : 
                       category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="card-health overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                {filteredBlogs[0].cover_image_url ? (
                  <img 
                    src={filteredBlogs[0].cover_image_url} 
                    alt={filteredBlogs[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-health flex items-center justify-center">
                    <span className="text-white text-4xl">📰</span>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4 bg-gradient-health text-white">Featured</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                  {filteredBlogs[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {filteredBlogs[0].excerpt || truncateContent(filteredBlogs[0].content)}
                </p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{filteredBlogs[0].author_name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(filteredBlogs[0].created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{filteredBlogs[0].views_count} views</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredBlogs[0].category && (
                    <Badge className={getCategoryColor(filteredBlogs[0].category)}>
                      {filteredBlogs[0].category}
                    </Badge>
                  )}
                  {filteredBlogs[0].tags?.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-health overflow-hidden animate-pulse">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-3 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.slice(1).map((blog) => (
              <article key={blog.id} className="card-health overflow-hidden group hover:scale-105 transition-all duration-200">
                {blog.cover_image_url ? (
                  <img 
                    src={blog.cover_image_url} 
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-subtle flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    {blog.category && (
                      <Badge className={getCategoryColor(blog.category)}>
                        {blog.category}
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span>{blog.views_count}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-health transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {blog.excerpt || truncateContent(blog.content)}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{blog.author_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  </div>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <button className="text-sm text-health hover:text-health/80 font-medium">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : filteredBlogs.length === 1 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Only one post found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria to see more posts.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No blog posts found</h3>
            <p className="text-muted-foreground">We're working on creating amazing content for you.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;