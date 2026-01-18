import WhyHealthyPlates from "@/components/home/WhyHealthyPlates";
import TopProducts from "@/components/home/TopProducts";
import BentoGrid from "@/components/home/BentoGrid";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Bento Grid with Blogs and Self Care */}
      <BentoGrid />

      <WhyHealthyPlates />
      <TopProducts />
    </div>
  );
};

export default Index;
