import { useState, useEffect } from 'react';
import { Search, Calendar, Tag, Share2, ArrowLeft, Clock, Printer, User, BookOpen, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DOMPurify from 'isomorphic-dompurify';

const Blog = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

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
      case 'nutrition': return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      case 'fitness': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30';
      case 'wellness': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30';
      case 'recipes': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30';
      case 'mental-health': return 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/30';
      case 'disease-prevention': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30';
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

  const handlePrint = () => {
    window.print();
  };

  // Individual Blog Post View
  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-background">
        {/* Sticky Header */}
        <div className="bg-card/95 border-b border-border sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBlog(null)}
              className="hover:bg-accent gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare(selectedBlog)}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Cover Image */}
          {selectedBlog.cover_image_url && (
            <div className="mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={selectedBlog.cover_image_url} 
                alt={selectedBlog.title}
                className="w-full h-[250px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          )}

          {/* Category Badge */}
          {selectedBlog.category && (
            <div className="mb-4 sm:mb-6">
              <Badge className={`${getCategoryColor(selectedBlog.category)} border text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5`}>
                {selectedBlog.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
            {selectedBlog.title}
          </h1>

          {/* Excerpt */}
          {selectedBlog.excerpt && (
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed font-light italic border-l-4 border-primary pl-4 sm:pl-6 py-2">
              {selectedBlog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm sm:text-base shadow-lg">
                {selectedBlog.author_name?.charAt(0) || 'H'}
              </div>
              <div>
                <p className="text-sm sm:text-base font-semibold text-foreground">{selectedBlog.author_name}</p>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {formatDate(selectedBlog.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {estimateReadTime(selectedBlog.content)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
            <div 
              className="text-foreground leading-relaxed space-y-4 sm:space-y-6 text-base sm:text-lg"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(
                  selectedBlog.content
                    .split('\n\n')
                    .map((para: string) => `<p class="mb-4 sm:mb-6">${para.replace(/\n/g, '<br />')}</p>`)
                    .join('')
                )
              }}
            />
          </div>

          {/* Tags */}
          {selectedBlog.tags && selectedBlog.tags.length > 0 && (
            <div className="border-t border-border pt-6 sm:pt-8 mt-8 sm:mt-12">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedBlog.tags.map((tag: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-sm px-3 py-1.5 rounded-full hover:bg-accent transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-accent/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">Enjoyed this article?</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Share it with your friends and family</p>
              </div>
              <Button
                onClick={() => handleShare(selectedBlog)}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
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

  // Blog Listing View
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Health & Wellness Insights
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
              Expert Health <span className="text-primary">Articles</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover evidence-based insights on nutrition, wellness, and healthy living from our expert contributors
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-8 sm:mt-12 max-w-3xl mx-auto">
            <Card className="p-4 sm:p-6 border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 sm:pl-11 h-11 sm:h-12 text-base"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px] h-11 sm:h-12">
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
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8 text-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base"><strong className="text-foreground">{blogs.length}</strong> Articles</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base"><strong className="text-foreground">{categories.length - 1}</strong> Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-border/50">
                  <Skeleton className="h-48 sm:h-56 w-full" />
                  <div className="p-5 sm:p-6 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex justify-between pt-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBlogs.map((blog, index) => (
                <Card 
                  key={blog.id} 
                  className={`overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 bg-card ${
                    index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                  onClick={() => setSelectedBlog(blog)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    {blog.cover_image_url ? (
                      <img 
                        src={blog.cover_image_url} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge on Image */}
                    {blog.category && (
                      <div className="absolute top-3 left-3">
                        <Badge className={`${getCategoryColor(blog.category)} border text-xs font-medium shadow-sm`}>
                          {blog.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      </div>
                    )}

                    {/* Share Button */}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(blog);
                      }}
                    >
                      <Share2 className="w-4 h-4 text-foreground" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {blog.excerpt || truncateContent(blog.content)}
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {blog.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs px-2 py-0.5 bg-muted/50">
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5 bg-muted/50">
                            +{blog.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-xs font-semibold">
                          {blog.author_name?.charAt(0) || 'H'}
                        </div>
                        <div className="text-xs">
                          <p className="font-medium text-foreground truncate max-w-[100px]">{blog.author_name}</p>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(blog.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {estimateReadTime(blog.content)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-24">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
