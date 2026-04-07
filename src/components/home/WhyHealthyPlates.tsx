import { Heart, Shield, Brain, Zap, Activity, Calculator, Flame, User, Target, Dumbbell, Repeat, Salad, Trophy, BarChart3, Moon, ListChecks, BookOpen, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DailyMealSuggestion from './DailyMealSuggestion';

const WhyHealthyPlates = () => {
  const features = [
    {
      icon: Heart,
      title: "Heart Health Focus",
      description: "Discover foods that promote cardiovascular health and reduce heart disease risk."
    },
    {
      icon: Shield,
      title: "Immune System Support",
      description: "Strengthen your body's natural defenses with immune-boosting foods."
    },
    {
      icon: Brain,
      title: "Brain Power Enhancement",
      description: "Optimize cognitive function and mental clarity through brain-healthy foods."
    },
    {
      icon: Zap,
      title: "Energy & Vitality",
      description: "Boost your energy levels naturally with sustained energy foods."
    }
  ];

  const tools = [
    {
      icon: ClipboardCheck,
      title: "Diet Planner",
      description: "Personalized meal plans with weekly schedules & PDF export",
      link: "/diet-planner",
      color: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50 dark:bg-green-950/30",
      emoji: "🥗"
    },
    {
      icon: Activity,
      title: "Body Explorer",
      description: "Interactive 3D anatomy guide to understand your organs",
      link: "/body-explorer",
      color: "from-purple-500 to-violet-600",
      bgLight: "bg-purple-50 dark:bg-purple-950/30",
      emoji: "🫀"
    },
    {
      icon: Calculator,
      title: "BMI Calculator",
      description: "Calculate Body Mass Index with metric & imperial support",
      link: "/bmi-calculator",
      color: "from-blue-500 to-cyan-600",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      emoji: "⚖️"
    },
    {
      icon: Flame,
      title: "Calorie Counter",
      description: "Track daily caloric needs based on your goals & activity",
      link: "/calorie-calculator",
      color: "from-orange-500 to-amber-600",
      bgLight: "bg-orange-50 dark:bg-orange-950/30",
      emoji: "🔥"
    },
    {
      icon: BarChart3,
      title: "Macro Calculator",
      description: "Optimize protein, carbs & fat ratios for your goals",
      link: "/macro-calculator",
      color: "from-teal-500 to-cyan-600",
      bgLight: "bg-teal-50 dark:bg-teal-950/30",
      emoji: "📊"
    },
    {
      icon: Dumbbell,
      title: "Calisthenics Challenge",
      description: "30-day bodyweight fitness challenges with tracking",
      link: "/calisthenics-challenge",
      color: "from-red-500 to-rose-600",
      bgLight: "bg-red-50 dark:bg-red-950/30",
      emoji: "💪"
    },
    {
      icon: Repeat,
      title: "Smart Food Swaps",
      description: "Discover healthier alternatives to your favorite foods",
      link: "/smart-food-swaps",
      color: "from-lime-500 to-green-600",
      bgLight: "bg-lime-50 dark:bg-lime-950/30",
      emoji: "🔄"
    },
    {
      icon: Salad,
      title: "Plate Builder",
      description: "Visual plate builder for balanced, nutritious meals",
      link: "/healthy-plate-builder",
      color: "from-emerald-500 to-green-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      emoji: "🍽️"
    },
    {
      icon: Trophy,
      title: "Health Challenges",
      description: "Daily & weekly wellness challenges to build habits",
      link: "/challenges",
      color: "from-amber-500 to-yellow-600",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      emoji: "🏆"
    },
    {
      icon: Moon,
      title: "Sleep Tracker",
      description: "Monitor sleep patterns and improve your rest quality",
      link: "/sleep-tracker",
      color: "from-indigo-500 to-blue-600",
      bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
      emoji: "😴"
    },
    {
      icon: Target,
      title: "Goal Tracker",
      description: "Set and track your health & fitness goals visually",
      link: "/goal-tracker",
      color: "from-pink-500 to-rose-600",
      bgLight: "bg-pink-50 dark:bg-pink-950/30",
      emoji: "🎯"
    },
    {
      icon: BookOpen,
      title: "Mindfulness",
      description: "Guided meditation & breathing exercises for calm",
      link: "/mindfulness",
      color: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50 dark:bg-violet-950/30",
      emoji: "🧘"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose HealthyPlates - Feature Cards */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            Why Choose Us
          </div>
          <h2 className="text-section">Why Choose HealthyPlates?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted companion for healthy living. Science-backed nutrition information 
            to help you make informed decisions about your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-health-lift p-8 text-center group">
              <div className="bg-gradient-health p-4 rounded-2xl w-16 h-16 mx-auto mb-6 shadow-health group-hover:shadow-health-glow transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Daily Meal Suggestion Widget */}
        <DailyMealSuggestion />

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="bg-card p-8 rounded-2xl shadow-health-lg border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join 10,000+ Health Enthusiasts
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the power of healthy eating with our comprehensive database of nutritional information, 
              meal planning guides, and personalized health recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Food Items Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Health Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Disease Guides</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Explore Our Tools — Compact Grid ===== */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              Free Health Tools
            </div>
            <h2 className="text-section">Explore Our Health Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive calculators, trackers, and planners — all free and designed to support your wellness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="group block"
              >
                <div className={`${tool.bgLight} rounded-2xl p-5 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow text-xl`}>
                      {tool.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors text-sm">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pl-16">
                    Try Now
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHealthyPlates;