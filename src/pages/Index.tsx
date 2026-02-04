import WhyHealthyPlates from "@/components/home/WhyHealthyPlates";
import TopProducts from "@/components/home/TopProducts";
import BentoGrid from "@/components/home/BentoGrid";
import HabitTracker from "@/components/home/HabitTracker";
import DailyMealSuggestion from "@/components/home/DailyMealSuggestion";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Bento Grid with Blogs and Self Care */}
      <BentoGrid />

      {/* Daily Health Checklist - Browser Storage Only */}
      <HabitTracker />

      {/* Daily Meal Suggestions */}
      <DailyMealSuggestion />

      <WhyHealthyPlates />
      <TopProducts />
    </div>
  );
};

export default Index;
