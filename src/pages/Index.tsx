import HeroBanner from "@/components/home/HeroBanner";
import WhyHealthyPlates from "@/components/home/WhyHealthyPlates";
import TopProducts from "@/components/home/TopProducts";
import BentoGrid from "@/components/home/BentoGrid";
import HabitTracker from "@/components/home/HabitTracker";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner Slider */}
      <HeroBanner />

      {/* Bento Grid with Blogs, Self Care and Daily Meals */}
      <BentoGrid />

      {/* Why Choose Us + Tools Showcase */}
      <WhyHealthyPlates />

      {/* Daily Health Checklist - Browser Storage Only */}
      <HabitTracker />

      {/* Top Featured Products */}
      <TopProducts />
    </div>
  );
};

export default Index;
