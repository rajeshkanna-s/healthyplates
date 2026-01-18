import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface BentoItem {
  id: string;
  title: string;
  image: string;
  excerpt?: string;
  category: string;
  type: "blog" | "selfcare";
  link: string;
}

const BentoGrid = () => {
  const [items, setItems] = useState<BentoItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(items.length / 5));
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  const fetchContent = async () => {
    try {
      // Fetch blogs
      const { data: blogs } = await supabase
        .from("blogs")
        .select("id, title, cover_image_url, excerpt, category")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(10);

      // Fetch self care procedures with categories
      const { data: selfCare } = await supabase
        .from("self_care_procedures")
        .select("id, title, image_url, description, category_id, self_care_categories(name)")
        .order("created_at", { ascending: false })
        .limit(10);

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

      // Interleave blogs and self care items
      const combined: BentoItem[] = [];
      const maxLen = Math.max(blogItems.length, selfCareItems.length);
      for (let i = 0; i < maxLen; i++) {
        if (blogItems[i]) combined.push(blogItems[i]);
        if (selfCareItems[i]) combined.push(selfCareItems[i]);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`bg-muted animate-pulse rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2" : ""
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

  // Get current slide items (5 items per slide for bento layout)
  const startIdx = currentSlide * 5;
  const currentItems = items.slice(startIdx, startIdx + 5);

  // Fill remaining slots if less than 5 items
  while (currentItems.length < 5 && items.length > 0) {
    currentItems.push(items[currentItems.length % items.length]);
  }

  const totalSlides = Math.ceil(items.length / 5);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-section">Discover Wellness</h2>
        <p className="text-muted-foreground">
          Explore our latest blogs and self-care practices
        </p>
      </div>

      <div className="relative">
        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
          {/* Large Feature Card - First item */}
          {currentItems[0] && (
            <Link
              to={currentItems[0].link}
              className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl shadow-health-lg"
            >
              <img
                src={currentItems[0].image}
                alt={currentItems[0].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className={currentItems[0].type === "blog" ? "bg-health text-white" : "bg-accent text-accent-foreground"}>
                  {currentItems[0].type === "blog" ? (
                    <><Sparkles className="w-3 h-3 mr-1" /> Blog</>
                  ) : (
                    <><Heart className="w-3 h-3 mr-1" /> Self Care</>
                  )}
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-3 leading-tight line-clamp-2">
                  {currentItems[0].title}
                </h3>
                {currentItems[0].excerpt && (
                  <p className="text-white/80 text-sm mt-2 line-clamp-2 hidden md:block">
                    {currentItems[0].excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Smaller Cards */}
          {currentItems.slice(1, 5).map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={item.link}
              className="group relative overflow-hidden rounded-2xl shadow-health"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${item.type === "blog" ? "bg-health/90 text-white" : "bg-accent/90 text-accent-foreground"}`}
                >
                  {item.type === "blog" ? "Blog" : "Self Care"}
                </Badge>
                <h4 className="text-sm md:text-base font-semibold text-white mt-2 leading-tight line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
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
