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
              Join 100,000+ Health Enthusiasts
            </h3>
            <p className="text-muted-foreground mb-6">
              Discover the power of healthy eating with our comprehensive database of nutritional information, 
              meal planning guides, and personalized health recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-health mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Food Products Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-nutrition mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Health Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-health mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Disease Guides</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHealthyPlates;