import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Leaf, BookOpen, Users, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const values = [
    {
      icon: BookOpen,
      title: "Education First",
      description: "We believe in empowering individuals with knowledge about nutrition and wellness to make informed choices."
    },
    {
      icon: Heart,
      title: "Health-Focused",
      description: "Our content is designed to support your overall well-being through natural and wholesome approaches."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community of health-conscious individuals on their wellness journey."
    },
    {
      icon: Target,
      title: "Evidence-Based",
      description: "We strive to provide information grounded in nutritional science and traditional wisdom."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-health p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">About HealthyPlates</h1>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/30">Educational Health Resource</Badge>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Mission Section */}
          <div className="card-health p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              HealthyPlates is an educational platform dedicated to spreading awareness about healthy eating, 
              nutrition, and natural wellness practices. We aim to make reliable health information accessible 
              to everyone, helping you make informed choices for a healthier lifestyle.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is simple: <strong>Eat Smart, Live Healthy</strong>. We believe that understanding what 
              we eat and how it affects our bodies is the first step toward better health.
            </p>
          </div>

          {/* What We Offer */}
          <div className="card-health p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-accent/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">🍎 Food Information</h3>
                <p className="text-sm text-muted-foreground">Comprehensive guides on nutritious foods, their benefits, and how to include them in your diet.</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">🏥 Disease & Nutrition</h3>
                <p className="text-sm text-muted-foreground">Information on how certain foods may support wellness for various health conditions.</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">💆 Self-Care Guides</h3>
                <p className="text-sm text-muted-foreground">Natural self-care routines for skin, hair, and overall wellness.</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">📚 Health Articles</h3>
                <p className="text-sm text-muted-foreground">Regularly updated blog posts on nutrition, wellness, and healthy living.</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">🧮 Health Calculators</h3>
                <p className="text-sm text-muted-foreground">Interactive tools like BMI and calorie calculators to help track your health.</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">🫀 Body Explorer</h3>
                <p className="text-sm text-muted-foreground">Interactive anatomy guides to learn about how your body works.</p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="card-health p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gradient-health p-3 rounded-lg shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important Note */}
          <div className="card-health p-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <Award className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Educational Purpose Only</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on HealthyPlates is provided for educational and informational purposes only. 
                  We do not provide medical advice, diagnosis, or treatment. Always consult with qualified 
                  healthcare professionals before making changes to your diet or health routine.
                </p>
                <Link to="/disclaimer" className="text-primary hover:underline font-medium mt-2 inline-block">
                  Read our full Medical Disclaimer →
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card-health p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions, suggestions, or want to share your health journey with us? We'd love to hear from you!
            </p>
            <Link to="/contact">
              <Button className="btn-health">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
