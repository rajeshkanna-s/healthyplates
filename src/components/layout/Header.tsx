import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/assets/HPLogo.png";

interface NavItem {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
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

  // Grouped navigation for overflow menu
  const overflowNavigation: NavItem[] = [
    {
      name: "Challenges",
      children: [
        { name: "HealthyPlates Challenges", href: "/challenges" },
        { name: "Calisthenics Challenge", href: "/calisthenics-challenge" },
        { name: "Personality Match", href: "/personality-match" },
        { name: "Wishes Creator", href: "/ValentineDay" },
      ],
    },
    {
      name: "Tracker",
      children: [
        { name: "Daily Mood Tracker", href: "/mood-tracker" },
        { name: "Sleep Tracking", href: "/sleep-tracker" },
        { name: "Goal Tracker", href: "/goal-tracker" },
        { name: "Expense Tracker", href: "/expense-tracker" },
        { name: "Taxes Tracker", href: "/taxes-tracker" },
        { name: "Debt Tracker", href: "/debt-tracker" },
        { name: "Bookshelf Tracker", href: "/bookshelf-tracker" },
        { name: "Weekly Planner", href: "/weekly-planner" },
        { name: "Habit Tracker", href: "/habit-tracker" },
        { name: "Create Vision Board", href: "/vision-board" },
        { name: "Discover Your Path", href: "/discover-your-path" },
        { name: "Goal Chooser", href: "/goal-chooser" },
      ],
    },
    { name: "DMF", href: "/diseases" },
    { name: "BMI Calculator", href: "/bmi-calculator" },
    { name: "Calorie Calculator", href: "/calorie-calculator" },
    { name: "Macro Calculator", href: "/macro-calculator" },
    { name: "Smart Food Swaps", href: "/smart-food-swaps" },
    { name: "HealthyPlate Builder", href: "/healthy-plate-builder" },
    { name: "Mindfulness", href: "/mindfulness" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Full mobile navigation with grouping
  const mobileNavigation: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Diet Planner", href: "/diet-planner" },
    { name: "Grocery List", href: "/grocery-list" },
    { name: "Food Items", href: "/food-products" },
    { name: "Daily Meals", href: "/foods" },
    { name: "Self-Care", href: "/self-care" },
    { name: "Know Your Body", href: "/body-explorer" },
    {
      name: "Challenges",
      children: [
        { name: "HealthyPlates Challenges", href: "/challenges" },
        { name: "Calisthenics Challenge", href: "/calisthenics-challenge" },
        { name: "Personality Match", href: "/personality-match" },
        { name: "Wishes Creator", href: "/ValentineDay" },
      ],
    },
    {
      name: "Tracker",
      children: [
        { name: "Daily Mood Tracker", href: "/mood-tracker" },
        { name: "Sleep Tracking", href: "/sleep-tracker" },
        { name: "Goal Tracker", href: "/goal-tracker" },
        { name: "Expense Tracker", href: "/expense-tracker" },
        { name: "Taxes Tracker", href: "/taxes-tracker" },
        { name: "Debt Tracker", href: "/debt-tracker" },
        { name: "Bookshelf Tracker", href: "/bookshelf-tracker" },
        { name: "Weekly Planner", href: "/weekly-planner" },
        { name: "Habit Tracker", href: "/habit-tracker" },
        { name: "Create Vision Board", href: "/vision-board" },
        { name: "Discover Your Path", href: "/discover-your-path" },
        { name: "Goal Chooser", href: "/goal-chooser" },
      ],
    },
    { name: "DMF", href: "/diseases" },
    { name: "BMI Calculator", href: "/bmi-calculator" },
    { name: "Calorie Calculator", href: "/calorie-calculator" },
    { name: "Macro Calculator", href: "/macro-calculator" },
    { name: "Smart Food Swaps", href: "/smart-food-swaps" },
    { name: "HealthyPlate Builder", href: "/healthy-plate-builder" },
    { name: "Mindfulness", href: "/mindfulness" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
    setMobileOpenSubmenu(null);
  };

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
                <ScrollArea className="h-[calc(100vh-100px)] mt-6">
                  <nav className="flex flex-col space-y-2 pr-4">
                    {overflowNavigation.map((item) =>
                      item.children ? (
                        <Collapsible
                          key={item.name}
                          open={openSubmenu === item.name}
                          onOpenChange={(open) =>
                            setOpenSubmenu(open ? item.name : null)
                          }
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                            {item.name}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                openSubmenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 mt-1 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.href}
                                onClick={() => setIsDesktopMenuOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  isActive(child.href)
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                }`}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href!}
                          onClick={() => setIsDesktopMenuOpen(false)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive(item.href!)
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </nav>
                </ScrollArea>
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

        {/* Mobile Navigation with Scroll and Submenus */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <ScrollArea className="h-[calc(100vh-150px)] max-h-[500px]">
              <nav className="flex flex-col space-y-1 pr-4">
                {mobileNavigation.map((item) =>
                  item.children ? (
                    <Collapsible
                      key={item.name}
                      open={mobileOpenSubmenu === item.name}
                      onOpenChange={(open) =>
                        setMobileOpenSubmenu(open ? item.name : null)
                      }
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            mobileOpenSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={handleMobileNavClick}
                            className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive(child.href)
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href!}
                      onClick={handleMobileNavClick}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href!)
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </nav>
            </ScrollArea>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
