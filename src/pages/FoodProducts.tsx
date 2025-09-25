import { useState } from 'react';
import { Search, Filter, Star, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FoodProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'nuts', label: 'Nuts & Seeds' },
    { value: 'spices', label: 'Spices' },
    { value: 'grains', label: 'Grains' },
    { value: 'oils', label: 'Oils' },
  ];

  const foodProducts = [
    {
      id: 1,
      name: "Almonds",
      category: "nuts",
      image: "🌰",
      purpose: "Improves memory and provides energy",
      advantages: ["Rich in Vitamin E", "High protein content", "Good source of healthy fats", "Supports heart health"],
      disadvantages: ["Can cause allergies in some people", "High in calories", "May cause digestive issues if consumed in excess"],
      medicinalBenefits: "Boosts brain health, helps in heart health, strengthens bones, improves skin health",
      rating: 4.9,
      origin: "Mediterranean region"
    },
    {
      id: 2,
      name: "Spinach",
      category: "vegetables",
      image: "🥬",
      purpose: "Rich in iron and supports blood circulation",
      advantages: ["High in iron and folate", "Rich in antioxidants", "Low in calories", "Supports eye health"],
      disadvantages: ["Contains oxalates", "May interfere with blood thinners", "Can cause kidney stones in sensitive individuals"],
      medicinalBenefits: "Prevents anemia, boosts immunity, improves vision, supports bone health",
      rating: 4.8,
      origin: "Central and Western Asia"
    },
    {
      id: 3,
      name: "Mango",
      category: "fruits",
      image: "🥭",
      purpose: "Provides vitamins and natural sweetness",
      advantages: ["Rich in Vitamin C", "Good source of fiber", "Contains antioxidants", "Supports immune system"],
      disadvantages: ["High in natural sugars", "May cause allergic reactions", "Can spike blood sugar levels"],
      medicinalBenefits: "Boosts immunity, improves digestion, supports eye health, enhances skin health",
      rating: 4.7,
      origin: "South Asia"
    },
    {
      id: 4,
      name: "Turmeric",
      category: "spices",
      image: "🧄",
      purpose: "Natural anti-inflammatory and immunity booster",
      advantages: ["Strong anti-inflammatory properties", "Rich in curcumin", "Antioxidant effects", "Supports joint health"],
      disadvantages: ["May interact with medications", "Can cause stomach upset", "May increase bleeding risk"],
      medicinalBenefits: "Reduces inflammation, heals wounds, boosts immunity, supports liver health",
      rating: 4.9,
      origin: "Southeast Asia"
    },
    {
      id: 5,
      name: "Quinoa",
      category: "grains",
      image: "🌾",
      purpose: "Complete protein source and gluten-free grain",
      advantages: ["Complete protein profile", "Gluten-free", "High in fiber", "Rich in minerals"],
      disadvantages: ["Contains saponins", "May cause digestive issues", "Higher cost than regular grains"],
      medicinalBenefits: "Supports muscle building, aids digestion, helps control blood sugar, supports heart health",
      rating: 4.6,
      origin: "Andes Mountains"
    },
    {
      id: 6,
      name: "Coconut Oil",
      category: "oils",
      image: "🥥",
      purpose: "Healthy cooking oil with antimicrobial properties",
      advantages: ["Contains MCTs", "Antimicrobial properties", "Stable at high temperatures", "Supports metabolism"],
      disadvantages: ["High in saturated fat", "May raise cholesterol", "High in calories"],
      medicinalBenefits: "Boosts metabolism, moisturizes skin, supports brain health, has antimicrobial effects",
      rating: 4.5,
      origin: "Tropical regions"
    }
  ];

  const filteredProducts = foodProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'fruits': return 'badge-fruits';
      case 'vegetables': return 'badge-vegetables';
      case 'nuts': return 'badge-proteins';
      case 'spices': return 'badge-grains';
      case 'grains': return 'badge-grains';
      case 'oils': return 'badge-grains';
      default: return 'badge-grains';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-6">Food Products Database</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive database of natural ingredients, their benefits, and medicinal properties. 
            Make informed choices for your health and wellness journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-2xl shadow-health p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search food products, benefits, or uses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card-product p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{product.image}</div>
                <Badge className={getCategoryBadge(product.category)}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-health transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{product.rating}</span>
              </div>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                <strong>Purpose:</strong> {product.purpose}
              </p>

              {/* Advantages */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Advantages
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {product.advantages.slice(0, 2).map((advantage, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disadvantages */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1 text-orange-500" />
                  Considerations
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {product.disadvantages.slice(0, 2).map((disadvantage, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {disadvantage}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medicinal Benefits */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-health" />
                  Medicinal Benefits
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.medicinalBenefits}
                </p>
              </div>

              <Button className="w-full btn-health">
                View Details
              </Button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodProducts;