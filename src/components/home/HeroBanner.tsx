import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroHealthyFoods from '@/assets/hero-healthy-foods.jpg';
import healthyBreakfast from '@/assets/healthy-breakfast.jpg';
import nutsSeeds from '@/assets/nuts-seeds.jpg';
import leafyGreens from '@/assets/leafy-greens.jpg';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroHealthyFoods,
      title: "Discover the Power of Healthy Eating",
      subtitle: "Transform your life with nutritious foods and smart eating habits",
      cta: "Explore Foods",
      link: "/food-products"
    },
    {
      image: healthyBreakfast,
      title: "Start Your Day with Nutritious Breakfast",
      subtitle: "Fuel your morning with energy-boosting, healthy breakfast options",
      cta: "Morning Foods",
      link: "/foods"
    },
    {
      image: nutsSeeds,
      title: "Unlock Nature's Superfoods",
      subtitle: "Discover the incredible health benefits of nuts, seeds, and natural ingredients",
      cta: "Food Products",
      link: "/food-products"
    },
    {
      image: leafyGreens,
      title: "Fresh Greens for Optimal Health",
      subtitle: "Learn about the amazing benefits of leafy vegetables and natural remedies",
      cta: "Disease Guide",
      link: "/diseases"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float pointer-events-none hidden lg:block" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 animate-fade-in-up">
              <Leaf className="w-4 h-4 text-green-400" />
              Eat Smart, Live Healthy
            </div>

            {/* Title */}
            <h1
              key={`title-${currentSlide}`}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight animate-fade-in-up"
            >
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${currentSlide}`}
              className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl animate-fade-in-up"
              style={{ animationDelay: '0.15s' }}
            >
              {slides[currentSlide].subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to={slides[currentSlide].link}>
                <Button className="btn-hero group">
                  {slides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white px-6 py-4 rounded-xl text-lg backdrop-blur-sm">
                  Read Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 border border-white/10 hover:border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 border border-white/10 hover:border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2.5 bg-white shadow-lg'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;