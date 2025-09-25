import HeroBanner from '@/components/home/HeroBanner';
import WhyHealthyPlates from '@/components/home/WhyHealthyPlates';
import LatestBlogs from '@/components/home/LatestBlogs';
import TopProducts from '@/components/home/TopProducts';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <WhyHealthyPlates />
      <TopProducts />
      <LatestBlogs />
    </div>
  );
};

export default Index;
