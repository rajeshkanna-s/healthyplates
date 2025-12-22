import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Printer, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blog post.",
        variant: "destructive"
      });
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

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

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Blog link has been copied to clipboard."
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded-3xl"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Blog post not found</h2>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b border-border/50 sticky top-0 z-10 backdrop-blur-sm bg-card/80">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print/Save PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Link
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Cover Image */}
        {blog.cover_image_url && (
          <div className="mb-12 rounded-3xl overflow-hidden shadow-health-lg">
            <img 
              src={blog.cover_image_url} 
              alt={blog.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Category Badge */}
        {blog.category && (
          <div className="mb-6">
            <Badge className={`${getCategoryColor(blog.category)} border text-sm px-4 py-1.5`}>
              {blog.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-2xl text-muted-foreground mb-10 leading-relaxed font-light italic border-l-4 border-primary pl-6 py-2">
            {blog.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-6 mb-12 pb-8 border-b-2 border-border flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-health flex items-center justify-center text-white font-bold text-xl shadow-health">
              {blog.author_name?.charAt(0) || 'H'}
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">{blog.author_name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blog.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {estimateReadTime(blog.content)}
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
              __html: blog.content
                .split('\n\n')
                .map(para => `<p class="mb-6">${para.replace(/\n/g, '<br />')}</p>`)
                .join('') 
            }}
          />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="border-t-2 border-border pt-8 mt-12">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag: string, index: number) => (
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
              onClick={handleShare}
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
};

export default BlogDetail;
