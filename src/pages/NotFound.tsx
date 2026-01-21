import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Decorative Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-health/10 flex items-center justify-center">
            <Search className="w-12 h-12 text-health" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-health mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or may have been moved. 
          Let's get you back on track to healthy eating!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-health hover:bg-health-dark">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/food-products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Food Items
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/foods" className="text-health hover:underline">Daily Meals</Link>
            <Link to="/diseases" className="text-health hover:underline">Diseases</Link>
            <Link to="/self-care" className="text-health hover:underline">Self-Care</Link>
            <Link to="/blog" className="text-health hover:underline">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
