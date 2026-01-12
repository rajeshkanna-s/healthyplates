import { Link } from 'react-router-dom';
import { Leaf, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TopProducts = () => {
  const topProducts = [
    {
      id: 1,
      name: "Organic Almonds",
      category: "Nuts",
      benefits: ["Brain Health", "Heart Health", "Energy Boost"],
      image: "🌰",
      description: "Rich in Vitamin E, healthy fats, and protein for optimal brain function and heart health.",
      medicinalUse: "Improves memory, reduces cholesterol, strengthens bones",
      badge: "badge-proteins"
    },
    {
      id: 2,
      name: "Fresh Spinach",
      category: "Leafy Greens",
      benefits: ["Iron Rich", "Immune Support", "Eye Health"],
      rating: 4.8,
      reviews: 95,
      image: "🥬",
      description: "Packed with iron, folate, and antioxidants to support blood health and immunity.",
      medicinalUse: "Prevents anemia, boosts immunity, improves vision",
      badge: "badge-vegetables"
    },
    {
      id: 3,
      name: "Golden Turmeric",
      category: "Spices",
      benefits: ["Anti-inflammatory", "Immunity", "Joint Health"],
      rating: 4.9,
      reviews: 203,
      image: "🧄",
      description: "Natural anti-inflammatory powerhouse with curcumin for overall wellness.",
      medicinalUse: "Reduces inflammation, heals wounds, boosts immunity",
      badge: "badge-grains"
    },
    {
      id: 4,
      name: "Chia Seeds",
      category: "Seeds",
      benefits: ["Omega-3", "Fiber", "Protein"],
      rating: 4.7,
      reviews: 156,
      image: "🌱",
      description: "Tiny superfood seeds loaded with omega-3 fatty acids and complete protein.",
      medicinalUse: "Improves heart health, aids digestion, sustained energy",
      badge: "badge-proteins"
    },
    {
      id: 5,
      name: "Fresh Blueberries",
      category: "Fruits",
      benefits: ["Antioxidants", "Brain Health", "Anti-aging"],
      rating: 4.8,
      reviews: 89,
      image: "🫐",
      description: "Antioxidant-rich berries that support cognitive function and healthy aging.",
      medicinalUse: "Enhances memory, protects against aging, supports eye health",
      badge: "badge-fruits"
    },
    {
      id: 6,
      name: "Coconut Oil",
      category: "Oils",
      benefits: ["Healthy Fats", "Skin Health", "Metabolism"],
      rating: 4.6,
      reviews: 134,
      image: "🥥",
      description: "Pure, cold-pressed coconut oil with medium-chain triglycerides for quick energy.",
      medicinalUse: "Boosts metabolism, moisturizes skin, antimicrobial properties",
      badge: "badge-grains"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section">Top Food Products This Week</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our most popular and highly-rated natural ingredients, carefully selected for their 
            exceptional health benefits and nutritional value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topProducts.map((product) => (
            <div key={product.id} className="card-product p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl mb-4">{product.image}</div>
                <Badge className={product.badge}>
                  {product.category}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-health transition-colors">
                {product.name}
              </h3>


              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-health" />
                  Key Benefits
                </h4>
                <div className="flex flex-wrap gap-1">
                  {product.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-secondary" />
                  Medicinal Use
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.medicinalUse}
                </p>
              </div>

              <Link to={`/food-products/${product.id}`} className="block">
                <Button className="w-full btn-health">
                  <Leaf className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/food-products">
            <Button variant="outline" className="btn-nutrition border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              Explore All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;