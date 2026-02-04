import WhyHealthyPlates from "@/components/home/WhyHealthyPlates";
import TopProducts from "@/components/home/TopProducts";
import BentoGrid from "@/components/home/BentoGrid";
import HabitTracker from "@/components/home/HabitTracker";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Bento Grid with Blogs, Self Care and Daily Meals */}
      <BentoGrid />

      {/* Daily Health Checklist - Browser Storage Only */}
      <HabitTracker />

      <WhyHealthyPlates />
      <TopProducts />
    </div>
  );
};

export default Index;
