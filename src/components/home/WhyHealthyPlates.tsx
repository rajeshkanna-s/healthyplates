import { Heart, Shield, Brain, Zap, Activity, Calculator, Flame, User, Target, Dumbbell, Repeat, Salad, Trophy, BarChart3, Moon, ListChecks, BookOpen, ClipboardCheck } from 'lucide-react';
import DailyMealSuggestion from './DailyMealSuggestion';

const WhyHealthyPlates = () => {
  const features = [
    {
      icon: Heart,
      title: "Heart Health Focus",
      description: "Discover foods that promote cardiovascular health and reduce heart disease risk with our evidence-based nutrition guidance."
    },
    {
      icon: Shield,
      title: "Immune System Support",
      description: "Strengthen your body's natural defenses with immune-boosting foods and scientifically-backed nutrition recommendations."
    },
    {
      icon: Brain,
      title: "Brain Power Enhancement",
      description: "Optimize cognitive function and mental clarity through brain-healthy foods and smart nutritional choices."
    },
    {
      icon: Zap,
      title: "Energy & Vitality",
      description: "Boost your energy levels naturally with foods that provide sustained energy and combat fatigue effectively."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section">Why Choose HealthyPlates?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted companion for healthy living. We provide comprehensive, science-backed nutrition information 
            to help you make informed decisions about your health and wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-health p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-health p-4 rounded-2xl w-16 h-16 mx-auto mb-6 shadow-health group-hover:shadow-health-glow transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Daily Meal Suggestion Widget - Placed before Join section */}
        <DailyMealSuggestion />

        <div className="mt-16 text-center">
          <div className="bg-card p-8 rounded-2xl shadow-health-lg border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join 10,000+ Health Enthusiasts
            </h3>
            <p className="text-muted-foreground mb-6">
              Discover the power of healthy eating with our comprehensive database of nutritional information, 
              meal planning guides, and personalized health recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-health mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Food Items Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-nutrition mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Health Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-health mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Disease Guides</div>
              </div>
            </div>
          </div>
        </div>

        {/* Diet Planner Promotion Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-1 rounded-3xl shadow-2xl">
            <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Zap className="w-4 h-4" />
                    FREE Diet Planner Available!
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Get Your Personalized <span className="text-green-600">Diet Plan</span> Today!
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                    Create customized meal plans for your health goals. Whether you want to lose weight, 
                    gain muscle, or manage health conditions - our Diet Planner has you covered with 
                    weekly meal schedules, shopping lists, and downloadable PDF guides.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-green-600" />
                      Personalized for Men & Women
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-green-600" />
                      Health Condition Based Plans
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-green-600" />
                      Weekly Shopping Lists
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-green-600" />
                      Free PDF Download
                    </li>
                  </ul>
                  <a href="/diet-planner">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                      Create Your Diet Plan Now
                      <Zap className="w-5 h-5" />
                    </button>
                  </a>
                </div>

                {/* Visual Element */}
                <div className="hidden lg:block relative">
                  <div className="w-72 h-72 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-4">🥗</div>
                      <div className="text-2xl font-bold text-green-600 mb-2">Healthy Eating</div>
                      <div className="text-sm text-muted-foreground">Made Simple</div>
                    </div>
                  </div>
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-green-200 dark:border-green-800">
                    <span className="text-green-600 font-bold text-sm">100% Free</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="text-emerald-600 font-bold text-sm">PDF Export</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Organs Explorer Promotion */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Activity className="w-4 h-4" />
                  Interactive Body Explorer
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Explore <span className="text-purple-600">Internal Organs</span> Interactively!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Discover how your internal organs work! Click on any organ to learn about its function, 
                  health tips, and the foods that support it. An educational journey through human anatomy.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    10+ Major Organs
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    Interactive Zoom View
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    Health & Nutrition Info
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-purple-600" />
                    Visual Learning Experience
                  </li>
                </ul>
                <a href="/internal-organs">
                  <button className="bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Explore Internal Organs
                    <Activity className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🫀</div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">Human Anatomy</div>
                    <div className="text-sm text-muted-foreground">Interactive Explorer</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-purple-200 dark:border-purple-800">
                  <span className="text-purple-600 font-bold text-sm">Click & Learn</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-violet-200 dark:border-violet-800">
                  <span className="text-violet-600 font-bold text-sm">Zoom View</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Parts Diagrams Promotion */}
        <div className="mt-12 bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <User className="w-4 h-4" />
                  Anatomy Diagrams
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Learn <span className="text-cyan-600">Body Parts</span> with Labeled Diagrams!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Study the human body with detailed, labeled diagrams showing both internal organs 
                  and external body parts. Perfect for health education and understanding your body better.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-cyan-600" />
                    Internal Organ Diagrams
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-cyan-600" />
                    External Body Parts
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-cyan-600" />
                    Labeled Illustrations
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-cyan-600" />
                    Educational Content
                  </li>
                </ul>
                <a href="/body-parts">
                  <button className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    View Body Diagrams
                    <User className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🧍</div>
                    <div className="text-2xl font-bold text-cyan-600 mb-2">Body Parts</div>
                    <div className="text-sm text-muted-foreground">Detailed Labels</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-cyan-200 dark:border-cyan-800">
                  <span className="text-cyan-600 font-bold text-sm">Visual Guide</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-teal-200 dark:border-teal-800">
                  <span className="text-teal-600 font-bold text-sm">Learn Anatomy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BMI Calculator Promotion */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Calculator className="w-4 h-4" />
                  FREE BMI Calculator
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Calculate Your <span className="text-orange-600">BMI</span> Instantly!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Know your Body Mass Index in seconds! Our BMI calculator supports both metric and imperial 
                  units, provides color-coded results, and gives personalized health recommendations.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-600" />
                    Metric & Imperial Units
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-600" />
                    Color-Coded Results
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-600" />
                    Health Category Guide
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-600" />
                    Instant Calculation
                  </li>
                </ul>
                <a href="/bmi-calculator">
                  <button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Calculate Your BMI Now
                    <Calculator className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">⚖️</div>
                    <div className="text-2xl font-bold text-orange-600 mb-2">BMI Calculator</div>
                    <div className="text-sm text-muted-foreground">Know Your Health</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-orange-200 dark:border-orange-800">
                  <span className="text-orange-600 font-bold text-sm">100% Free</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-amber-200 dark:border-amber-800">
                  <span className="text-amber-600 font-bold text-sm">Instant Result</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Calorie Calculator Promotion */}
        <div className="mt-12 bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Flame className="w-4 h-4" />
                  FREE Calorie Calculator
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Know Your <span className="text-rose-600">Daily Calories</span> Need!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Calculate your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure) 
                  using the Mifflin-St Jeor formula. Get personalized calorie targets based on your activity level.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    BMR Calculation
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    TDEE Estimation
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    Activity Level Based
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    Weight Goal Support
                  </li>
                </ul>
                <a href="/calorie-calculator">
                  <button className="bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Calculate Daily Calories
                    <Flame className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🔥</div>
                    <div className="text-2xl font-bold text-rose-600 mb-2">Calorie Calculator</div>
                    <div className="text-sm text-muted-foreground">BMR & TDEE</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-rose-200 dark:border-rose-800">
                  <span className="text-rose-600 font-bold text-sm">100% Free</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-pink-200 dark:border-pink-800">
                  <span className="text-pink-600 font-bold text-sm">Science-Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Calculator Promotion */}
        <div className="mt-12 bg-gradient-to-r from-lime-600 via-green-500 to-emerald-600 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-600 dark:text-lime-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Target className="w-4 h-4" />
                  FREE Macro Calculator
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Calculate Your <span className="text-lime-600">Daily Macros</span> Now!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Get personalized macronutrient targets based on your fitness goals! Whether you want to 
                  lose fat, maintain weight, or gain muscle - our Macro Calculator gives you exact protein, 
                  carbs, and fat targets.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-lime-600" />
                    Protein, Carbs & Fat Targets
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-lime-600" />
                    Goal-Based Calculations
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-lime-600" />
                    BMR & TDEE Included
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-lime-600" />
                    Activity Level Adjusted
                  </li>
                </ul>
                <a href="/macro-calculator">
                  <button className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Calculate Your Macros
                    <Target className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-lime-100 to-green-100 dark:from-lime-900/30 dark:to-green-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🥩</div>
                    <div className="text-2xl font-bold text-lime-600 mb-2">Macro Calculator</div>
                    <div className="text-sm text-muted-foreground">Protein • Carbs • Fat</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-lime-200 dark:border-lime-800">
                  <span className="text-lime-600 font-bold text-sm">100% Free</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-green-200 dark:border-green-800">
                  <span className="text-green-600 font-bold text-sm">Goal-Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calisthenics Workout Challenge Promotion */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Dumbbell className="w-4 h-4" />
                  FREE Calisthenics Challenge
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Start Your <span className="text-blue-600">Bodyweight</span> Workout Challenge!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Build strength without a gym! Get a personalized calisthenics program based on your fitness level, 
                  goals, and available equipment. Includes progression tracking, PDF & Excel exports.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blue-600" />
                    7, 14 or 30 Day Programs
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blue-600" />
                    30+ Bodyweight Exercises
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blue-600" />
                    Injury-Safe Substitutions
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-blue-600" />
                    PDF & Excel Export
                  </li>
                </ul>
                <a href="/calisthenics-challenge">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Start Calisthenics Challenge
                    <Dumbbell className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">💪</div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">Calisthenics</div>
                    <div className="text-sm text-muted-foreground">No Gym Required</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-blue-200 dark:border-blue-800">
                  <span className="text-blue-600 font-bold text-sm">100% Free</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-indigo-200 dark:border-indigo-800">
                  <span className="text-indigo-600 font-bold text-sm">Personalized</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Food Swaps Promotion */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Repeat className="w-4 h-4" />
                  260+ Food Swaps Available
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Discover <span className="text-amber-600">Smart Food Swaps</span>!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Find healthier alternatives for your favorite foods! From drinks to snacks, breakfast to dinner - 
                  get instant suggestions for smarter choices without giving up what you love.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    260+ Food Alternatives
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    Filter by Health Goals
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    Save Your Favorites
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    Multiple Categories
                  </li>
                </ul>
                <a href="/smart-food-swaps">
                  <button className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Explore Smart Food Swaps
                    <Repeat className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🔄</div>
                    <div className="text-2xl font-bold text-amber-600 mb-2">Smart Swaps</div>
                    <div className="text-sm text-muted-foreground">Healthier Choices</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-amber-200 dark:border-amber-800">
                  <span className="text-amber-600 font-bold text-sm">260+ Swaps</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-yellow-200 dark:border-yellow-800">
                  <span className="text-yellow-600 font-bold text-sm">Goal-Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HealthyPlate Builder Promotion */}
        <div className="mt-12 bg-gradient-to-r from-teal-600 via-emerald-500 to-green-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-600 dark:text-teal-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Salad className="w-4 h-4" />
                  Interactive Meal Builder
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Build Your <span className="text-teal-600">HealthyPlate</span>!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Create balanced meals visually! Add foods to your plate and get instant feedback on nutritional balance. 
                  500+ foods with macros, real-time verdicts, and save your favorite plates.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-teal-600" />
                    500+ Foods Database
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-teal-600" />
                    Real-time Nutrition Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-teal-600" />
                    Balance Verdicts
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-teal-600" />
                    Save Favorite Plates
                  </li>
                </ul>
                <a href="/healthy-plate-builder">
                  <button className="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Build Your Plate Now
                    <Salad className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🍽️</div>
                    <div className="text-2xl font-bold text-teal-600 mb-2">Plate Builder</div>
                    <div className="text-sm text-muted-foreground">Visual Nutrition</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-teal-200 dark:border-teal-800">
                  <span className="text-teal-600 font-bold text-sm">500+ Foods</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-600 font-bold text-sm">Live Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HealthyPlates Challenges Promotion */}
        <div className="mt-12 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Trophy className="w-4 h-4" />
                  Health Challenges
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Join <span className="text-fuchsia-600">HealthyPlates Challenges</span>!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Build better habits with time-bound challenges! From 7-Day Sugar Cut to Balanced Plate challenges - 
                  get daily tasks, meal ideas, and track your progress. No sign-up needed!
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-fuchsia-600" />
                    7, 10 & 14 Day Programs
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-fuchsia-600" />
                    Daily Tasks & Meal Ideas
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-fuchsia-600" />
                    Progress Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-fuchsia-600" />
                    No Account Required
                  </li>
                </ul>
                <a href="/challenges">
                  <button className="bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto lg:mx-0">
                    Start a Challenge Today
                    <Trophy className="w-5 h-5" />
                  </button>
                </a>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🏆</div>
                    <div className="text-2xl font-bold text-fuchsia-600 mb-2">Challenges</div>
                    <div className="text-sm text-muted-foreground">Build Better Habits</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-fuchsia-200 dark:border-fuchsia-800">
                  <span className="text-fuchsia-600 font-bold text-sm">Free</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-pink-200 dark:border-pink-800">
                  <span className="text-pink-600 font-bold text-sm">Track Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Trackers Promotion */}
        <div className="mt-12 bg-gradient-to-r from-sky-600 via-blue-500 to-indigo-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-card rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <BarChart3 className="w-4 h-4" />
                  6 Powerful Trackers
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Track Your <span className="text-sky-600">Health Journey</span>!
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  Monitor every aspect of your wellbeing! From mood and sleep to goals and habits - 
                  our trackers help you understand patterns and make progress. All data stays private in your browser.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-8">
                  <li className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-sky-600" />
                    Mood & Sleep Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-sky-600" />
                    Goal & Habit Tracker
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    Bookshelf & Weekly Planner
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-600" />
                    Analytics & Trends
                  </li>
                </ul>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <a href="/mood-tracker">
                    <button className="bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      Mood Tracker
                      <Heart className="w-4 h-4" />
                    </button>
                  </a>
                  <a href="/sleep-tracker">
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      Sleep Tracker
                      <Moon className="w-4 h-4" />
                    </button>
                  </a>
                  <a href="/habit-tracker">
                    <button className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      Habit Tracker
                      <ListChecks className="w-4 h-4" />
                    </button>
                  </a>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="w-72 h-72 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">📊</div>
                    <div className="text-2xl font-bold text-sky-600 mb-2">Health Trackers</div>
                    <div className="text-sm text-muted-foreground">Monitor & Improve</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-sky-200 dark:border-sky-800">
                  <span className="text-sky-600 font-bold text-sm">6 Trackers</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-blue-200 dark:border-blue-800">
                  <span className="text-blue-600 font-bold text-sm">100% Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHealthyPlates;