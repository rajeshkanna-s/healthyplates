import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/home/HeroSection";
import WhyHealthyPlates from "@/components/home/WhyHealthyPlates";
import LatestBlogs from "@/components/home/LatestBlogs";
import TopProducts from "@/components/home/TopProducts";
import ExploreFoods from "@/components/home/ExploreFoods";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Explore Foods Section */}
      <ExploreFoods />

      {/* Why HealthyPlates */}
      <WhyHealthyPlates />

      {/* Top Products */}
      <TopProducts />

      {/* Latest Blogs */}
      <LatestBlogs />
    </div>
  );
};

export default Index;
