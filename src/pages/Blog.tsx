import { useState, useEffect } from 'react';
import { Search, Calendar, User, Tag, Share2, Twitter, Facebook, Linkedin, Copy, ArrowLeft, Clock } from 'lucide-react';
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

  const handleShare = (platform: string, blog: any) => {
    const url = window.location.href;
    const text = `Check out this article: ${blog.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Blog link has been copied to clipboard."
        });
        break;
    }
    setShowShareMenu(null);
  };

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-background">
        {/* Blog Detail View */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedBlog(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <article>
            {/* Cover Image */}
            {selectedBlog.cover_image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={selectedBlog.cover_image_url} 
                  alt={selectedBlog.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            {/* Category Badge */}
            {selectedBlog.category && (
              <Badge className={`${getCategoryColor(selectedBlog.category)} mb-4 border`}>
                {selectedBlog.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {selectedBlog.title}
            </h1>

            {/* Excerpt */}
            {selectedBlog.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed italic">
                {selectedBlog.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-health flex items-center justify-center text-white font-semibold">
                  {selectedBlog.author_name?.charAt(0) || 'H'}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedBlog.author_name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(selectedBlog.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {estimateReadTime(selectedBlog.content)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleShare('twitter', selectedBlog)}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleShare('facebook', selectedBlog)}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleShare('linkedin', selectedBlog)}
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleShare('copy', selectedBlog)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none text-foreground mb-8"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content.replace(/\n/g, '<br />') }}
            />

            {/* Tags */}
            {selectedBlog.tags && selectedBlog.tags.length > 0 && (
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
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
                    <div className="relative">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 bg-background/90 hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowShareMenu(showShareMenu === blog.id ? null : blog.id);
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>

                      {/* Share Menu */}
                      {showShareMenu === blog.id && (
                        <div className="absolute top-10 right-0 bg-card border border-border rounded-lg shadow-lg p-2 flex gap-1 z-10"
                             onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare('twitter', blog);
                            }}
                          >
                            <Twitter className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare('facebook', blog);
                            }}
                          >
                            <Facebook className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare('linkedin', blog);
                            }}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare('copy', blog);
                            }}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
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
