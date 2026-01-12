import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FoodProductCardProps {
  id: string;
  name: string;
  description?: string;
  purpose?: string;
  imageUrl?: string;
  category?: string;
  benefits?: string[];
  tags?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

const FoodProductCard = ({
  id,
  name,
  description,
  purpose,
  imageUrl,
  category,
  benefits = [],
  tags = [],
  isNew = false,
  isPopular = false,
}: FoodProductCardProps) => {
  const navigate = useNavigate();

  // Get short description (use purpose or first 100 chars of description)
  const shortDescription = purpose || (description ? description.slice(0, 100) + (description.length > 100 ? '...' : '') : '');

  // Get top 3 benefits
  const topBenefits = benefits.slice(0, 3);

  // Get top 3 tags
  const displayTags = tags.slice(0, 3);

  return (
    <Card 
      className="overflow-hidden hover:shadow-health-lg transition-all duration-300 border border-border/50 hover:border-primary/30 group cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/food-products/${id}`)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-health flex items-center justify-center text-white text-5xl">
            🥗
          </div>
        )}
        
        {/* Category Badge - Top Left */}
        {category && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-card/90 backdrop-blur-sm text-foreground border border-border/50 px-2.5 py-1 text-xs font-medium">
              {category}
            </Badge>
          </div>
        )}
        
        {/* Status Badge - Top Right */}
        {(isNew || isPopular) && (
          <div className="absolute top-3 right-3">
            <Badge className={`px-2.5 py-1 text-xs font-bold ${isNew ? 'bg-green-600 text-white' : 'bg-orange-500 text-white'}`}>
              {isNew ? 'NEW' : 'Popular'}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Short Description */}
        {shortDescription && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {shortDescription}
          </p>
        )}

        {/* Top Benefits */}
        {topBenefits.length > 0 && (
          <div className="mb-4 flex-1">
            <ul className="space-y-1.5">
              {topBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  <span className="line-clamp-1">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {displayTags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Single CTA Button */}
        <Button 
          className="w-full btn-health mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/food-products/${id}`);
          }}
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default FoodProductCard;
