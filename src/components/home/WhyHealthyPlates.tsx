import { Heart, Shield, Brain, Zap } from 'lucide-react';

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
      </div>
    </section>
  );
};

export default WhyHealthyPlates;