import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import WhyHealthyPlates from '@/components/home/WhyHealthyPlates';
import LatestBlogs from '@/components/home/LatestBlogs';
import TopProducts from '@/components/home/TopProducts';
import FeaturedCarousel from '@/components/home/FeaturedCarousel';

const Index = () => {
  const [carouselItems, setCarouselItems] = useState<any[]>([]);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      // Fetch top 5 blog posts
      const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('views_count', { ascending: false })
        .limit(5);

      // Fetch top 5 food items
      const { data: foods } = await supabase
        .from('food_timing')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const items = [
        ...(blogs || []).map(blog => ({
          id: blog.id,
          title: blog.title,
          image: blog.cover_image_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
          category: blog.category || 'Blog',
          link: '/blog'
        })),
        ...(foods || []).map(food => ({
          id: food.id,
          title: food.name,
          image: food.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
          category: food.meal_time,
          link: '/foods'
        }))
      ].slice(0, 5);

      setCarouselItems(items);
    } catch (error) {
      console.error('Error fetching featured content:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Featured Carousel Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-section">Featured Content</h2>
          <p className="text-muted-foreground">Discover our top blog posts and healthy foods</p>
        </div>
        <FeaturedCarousel items={carouselItems} />
      </section>

      <WhyHealthyPlates />
      <TopProducts />
      <LatestBlogs />
    </div>
  );
};

export default Index;
