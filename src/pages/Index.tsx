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
      // Fetch blogs for random selection
      const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .limit(20);

      // Fetch foods for random selection
      const { data: foods } = await supabase
        .from('food_timing')
        .select('*')
        .limit(20);

      // Helper function to shuffle and pick random items
      const getRandomItems = <T,>(array: T[], count: number): T[] => {
        const shuffled = [...(array || [])].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };

      // Get 3 random blogs and 2 random foods
      const randomBlogs = getRandomItems(blogs || [], 3);
      const randomFoods = getRandomItems(foods || [], 2);

      const items = [
        ...randomBlogs.map(blog => ({
          id: blog.id,
          title: blog.title,
          image: blog.cover_image_url || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
          category: blog.category || 'Blog',
          link: '/blog'
        })),
        ...randomFoods.map(food => ({
          id: food.id,
          title: food.name,
          image: food.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
          category: food.meal_time,
          link: '/foods'
        }))
      ];

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
