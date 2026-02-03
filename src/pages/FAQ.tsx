import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Utensils, Heart, Activity, BookOpen, Calculator, ClipboardList, Sparkles, Users, Apple, Sun, Stethoscope, Scissors, FileText, User, Target, Dumbbell, Moon, BarChart3, Trophy, Repeat, Salad, ListChecks } from 'lucide-react';
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
          answer: "The purpose of HealthyPlates is to build awareness about nutrition, food knowledge, and healthy living. We believe that what we eat is the most important factor in long-term health. By combining food education, anatomy knowledge, calculators, personalized diet plans, trackers, challenges, and self-care guidance, we aim to help users live longer, healthier lives."
        },
        {
          question: "Is HealthyPlates free to use?",
          answer: "Yes! HealthyPlates is completely free to use. All our tools including the BMI Calculator, Daily Calorie Calculator, Macro Calculator, Diet Planner, Smart Food Swaps, HealthyPlate Builder, Mood Tracker, Sleep Tracker, Goal Tracker, and all challenges are available at no cost. We believe health education should be accessible to everyone."
        }
      ]
    },
    {
      title: "Our Main Features",
      icon: BookOpen,
      faqs: [
        {
          question: "What is the Food Items page?",
          answer: "The Food Items page is your complete guide to understanding all types of foods. Here you can learn about different food items, their nutritional value, health benefits, and the purpose of consuming them in your daily diet. Whether it's fruits, vegetables, grains, proteins, or dairy products - we provide detailed information on usage, benefits, and how each food contributes to your overall health and wellbeing."
        },
        {
          question: "What is the Daily Meals page?",
          answer: "The Daily Meals page helps you understand what healthy eating looks like on a daily basis. It provides guidance on what foods are ideal for each meal of the day, what healthy snacks you can take between meals, the best times to eat different foods, and how to properly consume them for maximum nutritional benefit. This section focuses on building healthy eating habits that you can follow every day."
        },
        {
          question: "What is the DMF (Disease Management Foods) page?",
          answer: "The DMF page is designed to help those with specific health conditions. If you have a particular disease or health issue, this section suggests foods that can help improve your condition, foods you should avoid, and natural dietary strategies to support your recovery and overall health management. It's a food-based approach to supporting your health journey."
        },
        {
          question: "What is the Self-Care page?",
          answer: "The Self-Care page covers holistic wellness practices including skin care routines, hair care guidance, and fitness tips. If you're experiencing skin problems like acne, dryness, or pigmentation, we suggest effective home remedies using natural ingredients. The same applies to hair care issues like hair fall, dandruff, or dull hair. We provide step-by-step natural treatments and prevention tips you can follow at home."
        },
        {
          question: "What is the Blog section?",
          answer: "Our Blog section features detailed health-related articles covering a wide range of wellness topics. You'll find wellness stories, nutrition insights, lifestyle improvement content, and expert-backed health education. The blog is regularly updated with new content to keep you informed about the latest in health and nutrition knowledge."
        },
        {
          question: "What is the Know Your Body page?",
          answer: "The Know Your Body page is your gateway to understanding human anatomy. You can explore internal organs (like heart, liver, kidneys, brain) and external body parts with detailed labeled diagrams. This interactive explorer helps you learn how each organ works, its functions, and what foods support its health."
        },
        {
          question: "What is the Diet Planner?",
          answer: "The Diet Planner is a comprehensive tool that creates specialized meal plans tailored for both men and women. Based on your health conditions, age, weight, height, and activity level, it tells you exactly what food items to buy, what to eat per meal, how much to consume, and when to eat. You get complete weekly meal schedules, shopping lists, portion guides, and nutritional information. Best of all, you can download your complete diet plan as a free PDF file!"
        }
      ]
    },
    {
      title: "Smart Food Swaps",
      icon: Repeat,
      faqs: [
        {
          question: "What is the Smart Food Swaps tool?",
          answer: "Smart Food Swaps is an interactive tool that provides instant, healthier alternatives for 260+ common foods and drinks. Instead of completely eliminating your favorite foods, we show you how to make smarter choices. For example, swap sugary drinks with infused water, or replace processed snacks with wholesome alternatives."
        },
        {
          question: "How does Smart Food Swaps work?",
          answer: "Simply browse through categories like Drinks, Office Cravings, Snacks, Breakfast, and more. Each item shows you a healthier alternative with a simple, non-technical explanation of why it's better. You can also filter by health goals like Weight Loss, Energy Boost, Better Digestion, Build Muscle, or Sugar Control."
        },
        {
          question: "Can I save my favorite food swaps?",
          answer: "Yes! You can save any food swap to your favorites for quick reference later. All favorites are stored locally in your browser, so you don't need an account. This makes it easy to remember and apply your healthier choices when shopping or cooking."
        },
        {
          question: "What health goals can I filter by?",
          answer: "You can filter swaps by five health goals: Weight Loss (for lower calorie alternatives), Energy Boost (for sustained energy foods), Better Digestion (for gut-friendly options), Build Muscle (for protein-rich swaps), and Sugar Control (for low-sugar alternatives). Each goal shows relevant swaps across all food categories."
        }
      ]
    },
    {
      title: "HealthyPlate Builder",
      icon: Salad,
      faqs: [
        {
          question: "What is the HealthyPlate Builder?",
          answer: "The HealthyPlate Builder is a visual, interactive tool for constructing meals and assessing their nutritional balance. It uses a database of 500+ common Indian and global foods with approximate macros (calories, protein, carbs, fats). As you add items to your plate, the tool provides real-time feedback on your meal's nutritional composition."
        },
        {
          question: "How does the HealthyPlate Builder verdict work?",
          answer: "As you add foods to your plate, the builder calculates the total calories and the percentage of protein, carbs, and fats. Based on these percentages and whether vegetables are included, it gives a verdict like 'Balanced', 'Low Protein', 'High Carbs', 'Needs Vegetables', etc. This helps you understand and improve your meal composition."
        },
        {
          question: "Can I save my plate combinations?",
          answer: "Yes! Once you've created a plate you like, you can save it to your favorites. These saved plates are stored locally in your browser, allowing you to quickly reference or rebuild your favorite balanced meals without needing an account."
        },
        {
          question: "What foods are included in the database?",
          answer: "The database includes 500+ foods commonly consumed in India and globally, including rice, rotis, curries, vegetables, fruits, proteins like dal, paneer, chicken, fish, eggs, as well as snacks, beverages, and more. Each food has approximate macro values for calories, protein, carbs, and fats."
        }
      ]
    },
    {
      title: "Health Challenges",
      icon: Trophy,
      faqs: [
        {
          question: "What are HealthyPlates Challenges?",
          answer: "HealthyPlates Challenges are time-bound health goals designed to help you build better habits. Examples include the 7-Day Sugar Cut Challenge, 10-Day Smart Office Lunch, and 7-Day Balanced Plate Challenge. Each challenge provides daily tasks, meal ideas, and explanations of why each step matters."
        },
        {
          question: "How do challenges work?",
          answer: "Each challenge has multiple days, and each day includes a specific task to complete, 1-2 practical meal ideas, and a 'Why It Matters' explanation. You can mark days as complete, and your progress is saved locally in your browser. A progress bar shows your completion percentage."
        },
        {
          question: "Do I need an account to participate in challenges?",
          answer: "No! All challenges use browser localStorage to track your progress. This means you can start any challenge immediately without signing up, and your progress will be saved as long as you use the same browser."
        },
        {
          question: "What is the Calisthenics Workout Challenge?",
          answer: "The Calisthenics Challenge is a personalized bodyweight workout program generator. Based on your fitness level, body metrics, AMRAP baseline tests, and available equipment, it creates 7, 14, or 30-day workout plans. It includes 30+ exercises with proper progression models, injury-safe substitutions, and you can export your plan as PDF or Excel."
        },
        {
          question: "What is the Personality Match feature?",
          answer: "Personality Match is a fun questionnaire that helps you understand your personality traits and how they relate to health and wellness. Answer questions about your preferences and behaviors to get insights into your personality type and tailored wellness recommendations."
        }
      ]
    },
    {
      title: "Health Trackers",
      icon: BarChart3,
      faqs: [
        {
          question: "What trackers are available on HealthyPlates?",
          answer: "HealthyPlates offers six comprehensive trackers: Daily Mood Tracker, Sleep Tracker, Goal Tracker, Bookshelf Tracker, Weekly Planner, and Habit Tracker. All trackers store data locally in your browser, ensuring your privacy while keeping your information accessible."
        },
        {
          question: "What is the Mood Tracker?",
          answer: "The Daily Mood Tracker helps you log and monitor your emotional wellbeing over time. You can record your mood (from very bad to excellent), add notes and tags about what influenced your mood, track sleep quality, and see trends over days, weeks, or months. It includes streak tracking, mood analytics, tag comparisons, and sleep-mood correlation insights."
        },
        {
          question: "What is the Sleep Tracker?",
          answer: "The Sleep Tracker helps you monitor your sleep patterns and quality. Log your bedtime, wake time, and sleep quality. View statistics like average sleep duration, sleep streaks, and identify patterns. Add tags to understand what factors affect your sleep, and see how sleep correlates with your mood if using both trackers."
        },
        {
          question: "What is the Goal Tracker?",
          answer: "The Goal Tracker helps you set, track, and achieve personal goals. Create goals with deadlines, break them into milestones, and track your progress. Whether it's fitness goals, learning objectives, or personal development - organize and monitor your journey to success."
        },
        {
          question: "What is the Bookshelf Tracker?",
          answer: "The Bookshelf Tracker helps book lovers organize their reading journey. Add books you want to read, are currently reading, or have finished. Track reading progress, add notes, rate books, and maintain your personal reading statistics."
        },
        {
          question: "What is the Weekly Planner?",
          answer: "The Weekly Planner helps you organize your week with tasks, events, and reminders. Plan each day with specific activities, set priorities, and review your weekly accomplishments. It's designed for mobile-first use with scrollable layouts for easy access."
        },
        {
          question: "What is the Habit Tracker?",
          answer: "The Habit Tracker helps you build and maintain positive habits. Create custom habits, mark them complete each day, and track your streaks. The tracker shows a weekly view where you can see which habits you've completed each day and celebrate your consistency."
        },
        {
          question: "Is my tracker data secure?",
          answer: "All tracker data is stored locally in your browser using localStorage. This means your data never leaves your device and we don't have access to it. However, clearing your browser data will remove your tracker information, so consider exporting your data periodically using the export features available in each tracker."
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
      icon: Apple,
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
          answer: "Our DMF (Disease Management Foods) section provides dietary suggestions for various health conditions. If you have a particular health condition, we suggest appropriate foods that may support improvement and recovery, foods to avoid that could worsen the condition, natural dietary strategies to support healing, and condition-based meal planning ideas."
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
      title: "Body & Anatomy Education",
      icon: Activity,
      faqs: [
        {
          question: "What is the Body Explorer feature?",
          answer: "Body Explorer is our interactive anatomy learning tool that helps users understand human body parts and internal organs, how each organ works and its key functions, interesting facts about the human body, and related medical conditions. It includes detailed labeled diagrams of internal organs and external body parts for visual learning."
        },
        {
          question: "What is the Internal Organs Explorer?",
          answer: "The Internal Organs Explorer is an interactive page where you can click on any organ (heart, brain, liver, kidneys, lungs, stomach, intestines, etc.) to learn about its function, health tips, and foods that support it. It features a zoom view for detailed exploration and educational content for each organ."
        },
        {
          question: "Why should I learn about human anatomy?",
          answer: "Understanding your body helps you make better health decisions. When you know how organs work, you can understand why certain foods or habits affect your health, recognize early warning signs, communicate better with healthcare providers, and take more proactive steps in your wellness journey."
        }
      ]
    },
    {
      title: "Health Calculators",
      icon: Calculator,
      faqs: [
        {
          question: "What is BMI and how does the BMI Calculator work?",
          answer: "BMI (Body Mass Index) is a measurement that uses your height and weight to estimate whether you're at a healthy weight. Our BMI Calculator supports both metric and imperial units, provides color-coded results, and gives personalized health recommendations. BMI ranges: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+)."
        },
        {
          question: "What is the Daily Calorie Calculator?",
          answer: "The Daily Calorie Calculator estimates how many calories your body needs each day. It calculates your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure) based on age, gender, weight, height, and activity level. Use these numbers to plan meals for weight loss, maintenance, or muscle gain."
        },
        {
          question: "What is the Macro Calculator?",
          answer: "The Macro Calculator provides personalized macronutrient targets (protein, carbs, fats) based on your fitness goals. Whether you want to lose fat, maintain weight, or build muscle, it calculates exact gram targets for each macronutrient, helping you structure your meals for optimal results."
        },
        {
          question: "Are the calculators accurate?",
          answer: "Our calculators use scientifically-backed formulas like the Mifflin-St Jeor equation for calorie calculations. However, they provide estimates based on averages. Individual needs may vary based on metabolism, health conditions, and other factors. Use them as a starting point and adjust based on your results over time."
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
          answer: "Getting started is easy! Explore our Food Items section to learn about nutritious foods, use the calculators (BMI, Calorie, Macro) to understand your body's needs, create a personalized diet plan, try Smart Food Swaps for healthier alternatives, build balanced meals with HealthyPlate Builder, join challenges to build habits, use trackers to monitor your progress, and read our Blog for tips and insights."
        },
        {
          question: "Is the information on HealthyPlates reliable?",
          answer: "We strive to provide accurate, evidence-based information. However, our content is for educational purposes only and should not replace professional medical advice. We recommend consulting healthcare professionals for personalized medical guidance, especially for health conditions or significant dietary changes."
        },
        {
          question: "Can I use HealthyPlates for specific health goals?",
          answer: "Absolutely! Whether you want to lose weight, gain muscle, manage a health condition, improve your skin and hair, build better habits, or simply eat healthier, HealthyPlates provides tools and information to support your journey. Use our calculators, diet planner, trackers, challenges, and educational content tailored to your specific goals."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account is required! All our tools work without sign-up. Your tracker data, saved favorites, and challenge progress are stored locally in your browser. This means you can use everything immediately while maintaining your privacy. Just remember that clearing browser data will remove locally stored information."
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
                  href={`#${category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
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
                id={category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}
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
            correct meal planning, habit building, and healthy lifestyle habits. By combining food education, anatomy knowledge, 
            calculators, personalized diet plans, trackers, challenges, and self-care guidance, we help users live longer, healthier lives.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Food Education</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Health Trackers</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Challenges</p>
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
