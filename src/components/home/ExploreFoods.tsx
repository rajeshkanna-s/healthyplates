import { Link } from 'react-router-dom';
import { ArrowRight, Apple, Salad, Cookie, Moon, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExploreFoods = () => {
  const categories = [
    {
      name: "Morning Foods",
      description: "Start your day with nutritious breakfast options",
      icon: Apple,
      href: "/foods?time=morning",
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Afternoon Meals",
      description: "Balanced lunch ideas for sustained energy",
      icon: Salad,
      href: "/foods?time=afternoon",
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Evening Foods",
      description: "Light and healthy evening meal options",
      icon: Moon,
      href: "/foods?time=evening",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Healthy Snacks",
      description: "Nutritious snacking without the guilt",
      icon: Cookie,
      href: "/foods?time=snacks",
      color: "bg-amber-100 text-amber-600",
    },
    {
      name: "Dinner Ideas",
      description: "Delicious and healthy dinner recipes",
      icon: Utensils,
      href: "/foods?time=dinner",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Foods by Time
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what to eat at different times of the day for optimal health and energy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-health-lg transition-all duration-300 bg-card"
            >
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/foods">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Foods
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreFoods;
