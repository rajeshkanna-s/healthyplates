import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Utensils, Heart, Activity, BookOpen, Calculator, ClipboardList, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "About HealthyPlates",
      icon: Sparkles,
      faqs: [
        {
          question: "What is HealthyPlates?",
          answer: "HealthyPlates is a comprehensive health and wellness platform that educates users about food, the human body, nutrition, self-care, and healthy living in a practical and accessible way. Our objective is to help people understand what they eat, how it affects their body, and how to make informed dietary choices for a longer, healthier life."
        },
        {
          question: "What is the purpose of this website?",
          answer: "The purpose of HealthyPlates is to build awareness about nutrition, food knowledge, and healthy living. We believe that what we eat is the most important factor in long-term health. By combining food education, anatomy knowledge, calculators, personalized diet plans, and self-care guidance, we aim to help users live longer, healthier lives."
        },
        {
          question: "Is HealthyPlates free to use?",
          answer: "Yes! HealthyPlates is completely free to use. All our tools including the BMI Calculator, Daily Calorie Calculator, Diet Planner, educational content, and health guides are available at no cost. We believe health education should be accessible to everyone."
        }
      ]
    },
    {
      title: "Healthy Plate Concept",
      icon: Utensils,
      faqs: [
        {
          question: "What is the Healthy Plate concept?",
          answer: "The Healthy Plate concept is a visual guide to creating balanced meals. It shows what a healthy plate should look like: approximately half your plate should be vegetables and fruits, one-quarter should be whole grains, and one-quarter should be protein. This simple method helps ensure you're getting proper nutrition without complicated calculations."
        },
        {
          question: "How much of each food group should be on my plate?",
          answer: "A balanced plate should include: 50% vegetables and fruits (more vegetables than fruits), 25% whole grains (brown rice, whole wheat, millets), 25% protein (legumes, dal, paneer, eggs, lean meat, fish), plus a small amount of healthy fats and dairy. This composition ensures you get adequate fiber, vitamins, minerals, protein, and energy."
        },
        {
          question: "What is portion control and why is it important?",
          answer: "Portion control means eating the right amount of food for your body's needs. Portions differ for men and women based on caloric requirements, activity levels, and body composition. Men typically need larger portions due to higher muscle mass and metabolic rates, while women may need smaller but nutrient-dense portions. Proper portion control helps maintain healthy weight, prevents overeating, and ensures optimal nutrition."
        },
        {
          question: "Why is what we eat the most important factor in health?",
          answer: "Food is the fuel and building material for our body. Every cell, organ, and system depends on nutrients from food to function properly. What you eat directly affects your energy levels, disease prevention, lifespan, mental clarity, immune function, and overall quality of life. Poor dietary choices can lead to chronic diseases, while nutritious eating supports healing, vitality, and longevity."
        }
      ]
    },
    {
      title: "Food Knowledge & Nutrition",
      icon: BookOpen,
      faqs: [
        {
          question: "What kind of food information does HealthyPlates provide?",
          answer: "We provide comprehensive information about different food items including their nutritional value, health benefits, proper usage in daily meals, which foods can be consumed daily and in what quantities, healthy snack options, and how specific foods affect different body systems. Our Food Items section covers fruits, vegetables, grains, proteins, dairy, and more."
        },
        {
          question: "What does 'healthy food' truly mean?",
          answer: "Healthy food refers to whole, minimally processed foods that provide essential nutrients your body needs without excessive calories, added sugars, unhealthy fats, or artificial additives. This includes fresh fruits, vegetables, whole grains, legumes, nuts, seeds, lean proteins, and healthy fats. Healthy eating also considers food quality, freshness, preparation methods, and portion sizes."
        },
        {
          question: "How do I know which foods I can eat daily?",
          answer: "Our Daily Meals section provides guidance on foods suitable for regular consumption. Generally, vegetables, fruits, whole grains, and legumes can be eaten daily. We recommend variety to ensure you get different nutrients. Our platform specifies recommended portions and frequency for each food type based on nutritional guidelines."
        }
      ]
    },
    {
      title: "Disease & Diet Guidance",
      icon: Heart,
      faqs: [
        {
          question: "How does HealthyPlates help with health conditions?",
          answer: "Our Disease Guide section provides dietary suggestions for various health conditions. If you have a particular health condition, we suggest appropriate foods that may support improvement and recovery, foods to avoid that could worsen the condition, natural dietary strategies to support healing, and condition-based meal planning ideas."
        },
        {
          question: "Can food really help with diseases?",
          answer: "Yes, nutrition plays a crucial role in managing and preventing many health conditions. While food is not a substitute for medical treatment, proper nutrition can support your body's healing processes, manage symptoms, reduce inflammation, support immune function, and improve overall outcomes. Always consult healthcare professionals for medical conditions."
        },
        {
          question: "What conditions does HealthyPlates cover?",
          answer: "We cover common conditions including diabetes, heart disease, hypertension, digestive issues, thyroid disorders, joint problems, skin conditions, and more. Each condition page includes information about helpful foods, foods to limit or avoid, and practical dietary tips."
        }
      ]
    },
    {
      title: "Self-Care Guidance",
      icon: Sparkles,
      faqs: [
        {
          question: "What self-care guidance does HealthyPlates offer?",
          answer: "Our Self-Care section provides structured guidance including skin care routines, hair care routines, fitness and physical health tips, and lifestyle habits for better health. We focus on natural, accessible self-care practices that anyone can follow at home."
        },
        {
          question: "Does HealthyPlates offer home remedies?",
          answer: "Yes! For common skin and hair problems, we provide natural home remedies using easily available ingredients, prevention tips to avoid recurring issues, and step-by-step treatment guides. These remedies complement professional care and focus on gentle, natural approaches."
        }
      ]
    },
    {
      title: "Body & Anatomy Education",
      icon: Activity,
      faqs: [
        {
          question: "What is the Body Explorer feature?",
          answer: "Body Explorer is our interactive anatomy learning tool that helps users understand human body parts and internal organs, how each organ works and its key functions, interesting facts about the human body, and related medical conditions. It includes detailed labeled diagrams of internal organs and external body parts for visual learning."
        },
        {
          question: "Why should I learn about human anatomy?",
          answer: "Understanding your body helps you make better health decisions. When you know how organs work, you can understand why certain foods or habits affect your health, recognize early warning signs, communicate better with healthcare providers, and take more proactive steps in your wellness journey."
        }
      ]
    },
    {
      title: "BMI Calculator",
      icon: Calculator,
      faqs: [
        {
          question: "What is BMI?",
          answer: "BMI (Body Mass Index) is a simple measurement that uses your height and weight to estimate whether you're at a healthy weight. It's calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). BMI provides a quick screening tool to identify potential weight-related health risks."
        },
        {
          question: "Why is BMI important?",
          answer: "BMI is important because it helps identify if you're underweight, normal weight, overweight, or obese. These categories are associated with different health risks. A healthy BMI (18.5-24.9) is generally linked to lower risks of heart disease, diabetes, joint problems, and other weight-related conditions. However, BMI is just one indicator and should be considered alongside other health factors."
        },
        {
          question: "What do BMI ranges mean?",
          answer: "BMI ranges are: Underweight (below 18.5) - may indicate malnutrition or other health issues; Normal (18.5-24.9) - generally healthy weight range; Overweight (25-29.9) - increased risk of health problems; Obese (30 and above) - higher risk of serious health conditions. Note that BMI doesn't account for muscle mass, age, or body composition, so athletes or elderly may need different interpretations."
        },
        {
          question: "How accurate is the BMI calculator?",
          answer: "Our BMI calculator provides accurate calculations based on standard formulas. However, BMI has limitations - it doesn't distinguish between muscle and fat, doesn't account for bone density or body composition, and may not be accurate for athletes, pregnant women, elderly, or children. Use it as a general guide alongside other health assessments."
        }
      ]
    },
    {
      title: "Daily Calorie Calculator",
      icon: Calculator,
      faqs: [
        {
          question: "What is a Daily Calorie Calculator?",
          answer: "A Daily Calorie Calculator is a tool that estimates how many calories your body needs each day to maintain, lose, or gain weight. It calculates your Basal Metabolic Rate (BMR) - the calories your body burns at rest - and your Total Daily Energy Expenditure (TDEE) based on your activity level. This helps you plan your meals according to your health goals."
        },
        {
          question: "How does the calorie calculator work?",
          answer: "Our calculator uses the Mifflin-St Jeor equation, which considers your age, gender, weight, and height to calculate BMR. Then it multiplies by an activity factor based on your lifestyle (sedentary, lightly active, moderately active, very active, or extra active) to determine your TDEE - the total calories you burn daily including activities."
        },
        {
          question: "How do I use my daily calorie requirement?",
          answer: "Once you know your daily calorie needs, you can: Maintain weight by eating that many calories; Lose weight by eating 500-750 fewer calories (safe rate: 0.5-1 kg/week); Gain weight by eating 250-500 more calories. Our Diet Planner helps you create meal plans based on these goals with proper nutrition balance."
        },
        {
          question: "Why do calorie needs differ by age, gender, and activity?",
          answer: "Calorie needs vary because: Men typically have more muscle mass and higher metabolic rates than women; Younger people generally have faster metabolisms; More active people burn more calories; Larger bodies require more energy to maintain. Our calculator accounts for all these factors to give personalized recommendations."
        }
      ]
    },
    {
      title: "Diet Planner",
      icon: ClipboardList,
      faqs: [
        {
          question: "What is the Diet Planner feature?",
          answer: "Our Diet Planner is a comprehensive tool that creates personalized meal plans based on your age, gender, weight, height, activity level, health conditions, and dietary preferences. It generates complete meal schedules with breakfast, lunch, dinner, and snacks, along with portion sizes, shopping lists, and nutritional information."
        },
        {
          question: "How are diet plans personalized for men and women?",
          answer: "Diet plans are customized based on gender-specific nutritional needs. Men typically need more calories and protein for muscle maintenance, while women may have different requirements, especially for iron, calcium, and folate. Plans also consider different age groups, health conditions, and fitness goals like weight loss, muscle gain, or maintenance."
        },
        {
          question: "Can I download my diet plan?",
          answer: "Yes! You can download your complete diet plan as a free PDF that includes all meals for your selected duration (1 week to 1 year), portion sizes and timing, complete shopping lists, nutritional information, lifestyle tips, and recipes. You can also export to Excel for customization."
        },
        {
          question: "What does the diet plan include?",
          answer: "Each diet plan includes: Food items to buy (weekly shopping lists), what to eat per meal with variety, portion sizes appropriate for your needs, meal timing recommendations, weekly meal schedules, calorie and macro breakdowns, and special considerations for any health conditions you've selected."
        }
      ]
    },
    {
      title: "Using HealthyPlates",
      icon: Users,
      faqs: [
        {
          question: "How do I get started with HealthyPlates?",
          answer: "Getting started is easy! Explore our Food Items section to learn about nutritious foods, use the BMI Calculator to check your weight status, use the Daily Calorie Calculator to understand your energy needs, create a personalized diet plan with our Diet Planner, read our Blog for health tips and insights, and check out Self-Care for wellness routines."
        },
        {
          question: "Is the information on HealthyPlates reliable?",
          answer: "We strive to provide accurate, evidence-based information. However, our content is for educational purposes only and should not replace professional medical advice. We recommend consulting healthcare professionals for personalized medical guidance, especially for health conditions or significant dietary changes."
        },
        {
          question: "Can I use HealthyPlates for specific health goals?",
          answer: "Absolutely! Whether you want to lose weight, gain muscle, manage a health condition, improve your skin and hair, or simply eat healthier, HealthyPlates provides tools and information to support your journey. Use our calculators, diet planner, and educational content tailored to your specific goals."
        }
      ]
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
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/30">Help & Support</Badge>
          <p className="text-muted-foreground mt-4 text-lg">
            Find answers to common questions about HealthyPlates, our features, and how to make the most of your health journey.
          </p>
        </div>

        {/* Quick Links */}
        <div className="card-health p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <a
                  key={index}
                  href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-accent/50 hover:bg-accent rounded-lg text-sm font-medium text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {category.title}
                </a>
              );
            })}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={categoryIndex}
                id={category.title.toLowerCase().replace(/\s+/g, '-')}
                className="card-health p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-health p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">{category.title}</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left text-foreground hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>

        {/* Our Vision */}
        <div className="card-health p-8 mt-8 bg-gradient-to-br from-primary/5 to-accent/30">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            HealthyPlates aims to educate people about basic nutrition, human body functions, food awareness, 
            correct meal planning, and healthy lifestyle habits. By combining food education, anatomy knowledge, 
            calculators, personalized diet plans, and self-care guidance, we help users live longer, healthier lives.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Food Education</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Body Knowledge</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Free Tools</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <ClipboardList className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Diet Plans</p>
            </div>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="card-health p-8 mt-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <Link to="/contact">
            <Button className="btn-health">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
