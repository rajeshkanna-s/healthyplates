import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import healthyBreakfast from '@/assets/healthy-breakfast.jpg';
import nutsSeeds from '@/assets/nuts-seeds.jpg';
import leafyGreens from '@/assets/leafy-greens.jpg';

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Best Morning Foods for a Healthy Start",
      excerpt: "Discover the perfect breakfast foods that will energize your day and boost your metabolism naturally.",
      image: healthyBreakfast,
      category: "Breakfast",
      date: "March 15, 2024",
      readTime: "5 min read",
      author: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Nuts and Seeds",
      excerpt: "Unlock the incredible health benefits of nature's powerhouse foods - nuts and seeds for optimal nutrition.",
      image: nutsSeeds,
      category: "Nutrition",
      date: "March 12, 2024",
      readTime: "7 min read",
      author: "Mark Williams"
    },
    {
      id: 3,
      title: "Leafy Greens: Nature's Multivitamins",
      excerpt: "Explore how leafy vegetables can transform your health and provide essential nutrients for your body.",
      image: leafyGreens,
      category: "Vegetables",
      date: "March 10, 2024",
      readTime: "6 min read",
      author: "Dr. Emily Chen"
    }
  ];

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'breakfast':
        return 'badge-fruits';
      case 'nutrition':
        return 'badge-proteins';
      case 'vegetables':
        return 'badge-vegetables';
      default:
        return 'badge-grains';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section">Latest Health Insights</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest research, tips, and insights from our health and nutrition experts. 
            Discover evidence-based information to enhance your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="card-product p-0 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryBadge(blog.category)}>
                    {blog.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-health transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    By {blog.author}
                  </span>
                  <Link to={`/blog/${blog.id}`}>
                    <Button variant="ghost" size="sm" className="text-health hover:text-health/80 p-0 h-auto">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button className="btn-health">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;