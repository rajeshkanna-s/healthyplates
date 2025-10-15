import { useState, useEffect } from 'react';
import { Search, Calendar, Tag, Share2, ArrowLeft, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Blog = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);

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
      case 'nutrition': return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'fitness': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'wellness': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'recipes': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'mental-health': return 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20';
      case 'disease-prevention': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substr(0, maxLength) + '...';
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = (blog: any) => {
    const url = `${window.location.origin}/blog`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Blog link has been copied to clipboard."
    });
  };

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        {/* Header */}
        <div className="bg-card border-b border-border/50 sticky top-0 z-10 backdrop-blur-sm bg-card/80">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setSelectedBlog(null)}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare(selectedBlog)}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </Button>
          </div>
        </div>

        {/* Blog Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Cover Image */}
          {selectedBlog.cover_image_url && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-health-lg">
              <img 
                src={selectedBlog.cover_image_url} 
                alt={selectedBlog.title}
                className="w-full h-[500px] object-cover"
              />
            </div>
          )}

          {/* Category Badge */}
          {selectedBlog.category && (
            <div className="mb-6">
              <Badge className={`${getCategoryColor(selectedBlog.category)} border text-sm px-4 py-1.5`}>
                {selectedBlog.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
            {selectedBlog.title}
          </h1>

          {/* Excerpt */}
          {selectedBlog.excerpt && (
            <p className="text-2xl text-muted-foreground mb-10 leading-relaxed font-light italic border-l-4 border-primary pl-6 py-2">
              {selectedBlog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-12 pb-8 border-b-2 border-border flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-health flex items-center justify-center text-white font-bold text-xl shadow-health">
                {selectedBlog.author_name?.charAt(0) || 'H'}
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{selectedBlog.author_name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedBlog.created_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {estimateReadTime(selectedBlog.content)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content with Enhanced Typography */}
          <div className="prose prose-xl max-w-none mb-12">
            <div 
              className="text-foreground leading-relaxed space-y-6"
              style={{
                fontSize: '1.125rem',
                lineHeight: '2',
                fontWeight: '400'
              }}
              dangerouslySetInnerHTML={{ 
                __html: selectedBlog.content
                  .split('\n\n')
                  .map(para => `<p class="mb-6">${para.replace(/\n/g, '<br />')}</p>`)
                  .join('') 
              }}
            />
          </div>

          {/* Tags */}
          {selectedBlog.tags && selectedBlog.tags.length > 0 && (
            <div className="border-t-2 border-border pt-8 mt-12">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedBlog.tags.map((tag: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-base px-4 py-2 rounded-full hover:bg-accent transition-colors cursor-pointer border-2"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share Section at Bottom */}
          <div className="mt-16 pt-8 border-t-2 border-border">
            <div className="flex items-center justify-between bg-accent/50 rounded-2xl p-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Enjoyed this article?</h3>
                <p className="text-muted-foreground">Share it with your friends and family</p>
              </div>
              <Button
                onClick={() => handleShare(selectedBlog)}
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
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Health & Wellness Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover expert insights on nutrition, wellness, and healthy living
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-12 border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
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
        </Card>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-56 bg-muted"></div>
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-3 w-20"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-32"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card 
                key={blog.id} 
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50"
                onClick={() => setSelectedBlog(blog)}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  {blog.cover_image_url ? (
                    <img 
                      src={blog.cover_image_url} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-subtle flex items-center justify-center">
                      <span className="text-5xl">📝</span>
                    </div>
                  )}

                  {/* Share Button Overlay */}
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-9 px-3 bg-white/95 hover:bg-white shadow-lg border border-border/50 flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(blog);
                      }}
                    >
                      <Share2 className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">Share</span>
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Author & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-health flex items-center justify-center text-white text-xs font-semibold">
                      {blog.author_name?.charAt(0) || 'H'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">{blog.author_name}</p>
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(blog.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  {blog.category && (
                    <Badge className={`${getCategoryColor(blog.category)} mb-3 border text-xs`}>
                      {blog.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt || truncateContent(blog.content)}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Read Time */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {estimateReadTime(blog.content)}
                    </span>
                    <span className="text-primary font-medium group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No blog posts found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
