import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/assets/HPLogo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const location = useLocation();

  // Main navigation items shown in header
  const mainNavigation = [
    { name: "Home", href: "/" },
    { name: "Diet Planner", href: "/diet-planner" },
    { name: "Grocery List", href: "/grocery-list" },
    { name: "Food Items", href: "/food-products" },
    { name: "Daily Meals", href: "/foods" },
    { name: "Self-Care", href: "/self-care" },
    { name: "Know Your Body", href: "/body-explorer" },
  ];

  // Items in the overflow menu (3-dash)
  const overflowNavigation = [
    { name: "Challenges", href: "/challenges" },
    { name: "DMF", href: "/diseases" },
    { name: "BMI Calculator", href: "/bmi-calculator" },
    { name: "Calorie Calculator", href: "/calorie-calculator" },
    { name: "Macro Calculator", href: "/macro-calculator" },
    { name: "Calisthenics Challenge", href: "/calisthenics-challenge" },
    { name: "Personality Match", href: "/personality-match" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // All items for mobile menu
  const allNavigation = [...mainNavigation, ...overflowNavigation];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 shadow-health">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex justify-between items-center h-16"
          style={{ height: "5rem" }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={Logo}
              alt="HP Logo"
              className="object-contain"
              style={{ width: "6rem", height: "4rem" }}
            />

            <div>
              <h1 className="text-xl font-bold text-foreground">
                HealthyPlates
              </h1>
              <p className="text-xs text-muted-foreground">
                Eat Smart, Live Healthy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex space-x-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop 3-dash menu */}
            <Sheet open={isDesktopMenuOpen} onOpenChange={setIsDesktopMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 ml-2 bg-green-700 hover:bg-green-800 text-white rounded-md"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle>More Options</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2 mt-6">
                  {overflowNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsDesktopMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 p-0 bg-green-700 hover:bg-green-800 text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-2">
              {allNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
