import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Heart, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface BentoItem {
  id: string;
  title: string;
  image: string;
  excerpt?: string;
  category: string;
  type: "blog" | "selfcare" | "meal";
  link: string;
}

const ITEMS_PER_SLIDE = 5;

const BentoGrid = () => {
  const [items, setItems] = useState<BentoItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalSlides = useMemo(() => Math.ceil(items.length / ITEMS_PER_SLIDE), [items.length]);

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length, totalSlides]);

  const fetchContent = async () => {
    try {
      // Fetch blogs
      const { data: blogs } = await supabase
        .from("blogs")
        .select("id, title, cover_image_url, excerpt, category")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(20);

      // Fetch self care procedures with categories (Skin Care, Hair Care, Fitness Care, etc.)
      const { data: selfCare } = await supabase
        .from("self_care_procedures")
        .select("id, title, image_url, description, category_id, self_care_categories(name)")
        .order("created_at", { ascending: false })
        .limit(20);

      // Fetch meal suggestions for variety
      const { data: meals } = await supabase
        .from("meal_suggestions")
        .select("id, meal_name, goal, diet_type, meal_time")
        .limit(15);

      const blogItems: BentoItem[] = (blogs || []).map((blog) => ({
        id: blog.id,
        title: blog.title,
        image: blog.cover_image_url || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
        excerpt: blog.excerpt || "",
        category: blog.category || "Health",
        type: "blog",
        link: `/blog/${blog.id}`,
      }));

      const selfCareItems: BentoItem[] = (selfCare || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        image: item.image_url || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        excerpt: item.description || "",
        category: item.self_care_categories?.name || "Self Care",
        type: "selfcare",
        link: `/self-care/${item.id}`,
      }));

      // Meal images based on meal type
      const mealImages: Record<string, string> = {
        breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800",
        lunch: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        dinner: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
      };

      const mealItems: BentoItem[] = (meals || []).map((meal: any) => ({
        id: meal.id,
        title: meal.meal_name,
        image: mealImages[meal.meal_time] || mealImages.lunch,
        excerpt: `${meal.diet_type === 'veg' ? '🥗 Vegetarian' : '🍗 Non-Veg'} • ${meal.goal.replace('_', ' ')}`,
        category: meal.meal_time.charAt(0).toUpperCase() + meal.meal_time.slice(1),
        type: "meal",
        link: "/#meals",
      }));

      // Interleave all content types for variety
      const combined: BentoItem[] = [];
      const maxLen = Math.max(blogItems.length, selfCareItems.length, mealItems.length);
      for (let i = 0; i < maxLen; i++) {
        if (blogItems[i]) combined.push(blogItems[i]);
        if (selfCareItems[i]) combined.push(selfCareItems[i]);
        if (mealItems[i]) combined.push(mealItems[i]);
      }

      setItems(combined);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(items.length / 5)) % Math.ceil(items.length / 5));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / 5));
  };

  if (loading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[500px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`bg-muted animate-pulse rounded-2xl ${
                i === 0 ? "col-span-1 md:col-span-1 row-span-2" : ""
              }`}
            />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  // Get current slide items (12 items per slide for expanded bento layout)
  const startIdx = currentSlide * ITEMS_PER_SLIDE;
  const currentItems = items.slice(startIdx, startIdx + ITEMS_PER_SLIDE);

  // Fill remaining slots if less than 5 items
  while (currentItems.length < ITEMS_PER_SLIDE && items.length > 0) {
    currentItems.push(items[currentItems.length % items.length]);
  }

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "blog": return "bg-health text-white";
      case "selfcare": return "bg-accent text-accent-foreground";
      case "meal": return "bg-orange-500 text-white";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog": return <Sparkles className="w-3 h-3 mr-1" />;
      case "selfcare": return <Heart className="w-3 h-3 mr-1" />;
      case "meal": return <Utensils className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "blog": return "Blog";
      case "selfcare": return "Self Care";
      case "meal": return "Meal";
      default: return type;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-section">Discover Wellness</h2>
        <p className="text-muted-foreground">
          Explore blogs, self-care tips, and healthy meal ideas
        </p>
      </div>

      <div className="relative">
        {/* Bento Grid - 5 items per slide */}
        {/* Mobile: Big card on top (full width), 4 small cards below (2x2) */}
        {/* Desktop: Big card on left (row-span-2), 4 small cards on right (2x2) */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
          {/* Large Feature Card - First item */}
          {currentItems[0] && (
            <Link
              to={currentItems[0].link}
              className="h-[280px] md:h-auto md:row-span-2 group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={currentItems[0].image}
                alt={currentItems[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <Badge className={getBadgeStyle(currentItems[0].type)}>
                  {getTypeIcon(currentItems[0].type)}
                  {getTypeLabel(currentItems[0].type)}
                </Badge>
                <h3 className="text-lg md:text-xl font-bold text-white mt-2 leading-tight line-clamp-2">
                  {currentItems[0].title}
                </h3>
                {currentItems[0].excerpt && (
                  <p className="text-white/80 text-sm mt-1 line-clamp-2 hidden md:block">
                    {currentItems[0].excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Small Cards Container - 2x2 grid on mobile, flows naturally on desktop */}
          <div className="grid grid-cols-2 gap-4 md:contents">

          {/* Cards 2-5 */}
          {currentItems.slice(1, 5).map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={item.link}
              className="h-[180px] md:h-[220px] group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Badge className={`text-xs ${getBadgeStyle(item.type)}`}>
                  {getTypeLabel(item.type)}
                </Badge>
                <h4 className="text-sm font-semibold text-white mt-1 leading-tight line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-health w-8"
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link to="/blog">
          <Button variant="outline" className="group">
            View All Blogs
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link to="/self-care">
          <Button variant="outline" className="group">
            Explore Self Care
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BentoGrid;
