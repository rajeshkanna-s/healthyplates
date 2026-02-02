import { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    id: "sugar-cut",
    title: "7-Day Sugar Cut Challenge",
    duration: 7,
    description: "Reduce added sugars gradually and discover naturally sweet alternatives. Build awareness around hidden sugars in everyday foods.",
    icon: "🍬",
    color: "bg-rose-100 dark:bg-rose-900/30",
    days: [
      {
        day: 1,
        title: "Spot the Hidden Sugars",
        task: "Check the labels of 3 items in your kitchen and note the added sugar content.",
        mealIdeas: [
          "Oatmeal with fresh banana slices instead of flavored instant oats",
          "Unsweetened curd with a drizzle of honey"
        ],
        whyItMatters: "Awareness is the first step. Many 'healthy' foods contain surprising amounts of hidden sugar."
      },
      {
        day: 2,
        title: "Skip the Sweet Drink",
        task: "Replace one sugary beverage (soda, packaged juice, sweetened tea) with water or nimbu pani.",
        mealIdeas: [
          "Fresh lime water with a pinch of rock salt",
          "Coconut water straight from the shell"
        ],
        whyItMatters: "Liquid sugars spike blood sugar faster and don't fill you up. Swapping them saves 150+ empty calories."
      },
      {
        day: 3,
        title: "Upgrade Your Breakfast",
        task: "Choose a breakfast with no added sugar—skip sugary cereals, jam, or sweetened spreads.",
        mealIdeas: [
          "Poha with peanuts, curry leaves, and veggies",
          "Whole wheat toast with mashed avocado or peanut butter (unsweetened)"
        ],
        whyItMatters: "A sugar-free morning stabilizes your energy and reduces cravings for the rest of the day."
      },
      {
        day: 4,
        title: "Snack Smarter",
        task: "Replace your afternoon sugary snack with a naturally sweet or savory option.",
        mealIdeas: [
          "A handful of roasted makhana (fox nuts) with light salt",
          "Apple slices with a tablespoon of almond butter"
        ],
        whyItMatters: "Afternoon snack cravings often come from blood sugar dips. Protein and fiber snacks prevent the crash."
      },
      {
        day: 5,
        title: "Dessert Swap",
        task: "If you want something sweet after dinner, choose fruit or homemade treats over store-bought desserts.",
        mealIdeas: [
          "Chilled mango slices or a small bowl of papaya",
          "Dates stuffed with a walnut or almond"
        ],
        whyItMatters: "Natural sugars come with fiber, vitamins, and antioxidants—packaged desserts don't."
      },
      {
        day: 6,
        title: "Cook One Meal Without Sugar",
        task: "Prepare one full meal today where no ingredient has added sugar.",
        mealIdeas: [
          "Dal tadka with brown rice and cucumber raita",
          "Grilled paneer tikka with mint chutney and roti"
        ],
        whyItMatters: "Cooking at home gives you full control over ingredients and helps you build lasting habits."
      },
      {
        day: 7,
        title: "Reflect and Plan Ahead",
        task: "Write down one sugar habit you want to keep reducing and one swap that worked best for you.",
        mealIdeas: [
          "Celebrate with a homemade smoothie: banana, spinach, curd, no added sugar",
          "Masala chai made with less sugar than usual"
        ],
        whyItMatters: "Reflection locks in progress. Identifying what worked makes it easier to continue beyond 7 days."
      }
    ]
  },
  {
    id: "office-lunch",
    title: "10-Day Smart Office Lunch Challenge",
    duration: 10,
    description: "Transform your workday meals with balanced, energizing lunches. No more afternoon slumps or unhealthy takeout habits.",
    icon: "💼",
    color: "bg-blue-100 dark:bg-blue-900/30",
    days: [
      {
        day: 1,
        title: "Plan Your Week",
        task: "Spend 10 minutes planning 3-4 lunch options for this week. Write them down.",
        mealIdeas: [
          "Simple veggie wrap with hummus",
          "Rice with dal and sabzi (any vegetable)"
        ],
        whyItMatters: "Planning prevents last-minute junk food decisions when you're hungry and busy."
      },
      {
        day: 2,
        title: "Pack Your Lunch",
        task: "Bring lunch from home today, even if it's simple.",
        mealIdeas: [
          "Curd rice with pickle and cucumber",
          "Roti roll with leftover sabzi"
        ],
        whyItMatters: "Home-packed meals are typically 30-50% lower in sodium and calories than takeout."
      },
      {
        day: 3,
        title: "Add More Vegetables",
        task: "Include at least 2 different vegetables in your lunch today.",
        mealIdeas: [
          "Mixed vegetable pulao with raita",
          "Bhindi (okra) and aloo with roti and salad"
        ],
        whyItMatters: "Vegetables add fiber, vitamins, and volume without excess calories—keeping you full longer."
      },
      {
        day: 4,
        title: "Protein Power",
        task: "Ensure your lunch has a good protein source (dal, curd, paneer, eggs, chicken).",
        mealIdeas: [
          "Egg curry with brown rice",
          "Chana masala with whole wheat roti"
        ],
        whyItMatters: "Protein sustains energy and prevents the 3 PM crash that makes you reach for coffee or sweets."
      },
      {
        day: 5,
        title: "Hydration Check",
        task: "Drink at least 3 glasses of water between morning and lunch.",
        mealIdeas: [
          "Regular lunch + keep a water bottle at your desk",
          "Buttermilk (chaas) with lunch"
        ],
        whyItMatters: "Mild dehydration causes fatigue and poor concentration—often mistaken for hunger."
      },
      {
        day: 6,
        title: "Skip the Fried Side",
        task: "Avoid fried items (pakoras, chips, samosas) with your lunch today.",
        mealIdeas: [
          "Grilled sandwich with veggies instead of fried cutlet",
          "Steamed idli with sambar instead of vada"
        ],
        whyItMatters: "Fried foods are calorie-dense and cause energy dips. Baked or steamed options keep you alert."
      },
      {
        day: 7,
        title: "Mindful Eating",
        task: "Eat lunch away from your screen. Focus on the food for at least 10 minutes.",
        mealIdeas: [
          "Any balanced lunch—eaten slowly and mindfully",
          "Try eating in a break room or outside if possible"
        ],
        whyItMatters: "Distracted eating leads to overeating. Mindful meals improve digestion and satisfaction."
      },
      {
        day: 8,
        title: "Batch Cook Something",
        task: "Prepare one component in bulk (dal, rice, sabzi) that can be used for 2-3 lunches.",
        mealIdeas: [
          "A large pot of rajma to portion for multiple days",
          "Batch of brown rice stored in the fridge"
        ],
        whyItMatters: "Batch cooking saves time and ensures you always have healthy options ready."
      },
      {
        day: 9,
        title: "Healthy Takeout Choice",
        task: "If you order food, choose the healthiest option on the menu.",
        mealIdeas: [
          "Grilled chicken salad instead of fried rice",
          "Roti with paneer bhurji instead of butter naan with gravy"
        ],
        whyItMatters: "Eating out doesn't have to derail your progress. Smart choices make all the difference."
      },
      {
        day: 10,
        title: "Create Your Go-To Lunch",
        task: "Identify your favorite healthy lunch from this challenge and commit to making it your default.",
        mealIdeas: [
          "Your personal best: the meal you enjoyed most this week",
          "A simple formula: protein + vegetable + whole grain"
        ],
        whyItMatters: "Having a default healthy meal removes decision fatigue and builds a sustainable habit."
      }
    ]
  },
  {
    id: "balanced-plate",
    title: "7-Day Beginners' Balanced Plate Challenge",
    duration: 7,
    description: "Learn the basics of building a balanced meal. Perfect for anyone new to healthy eating who wants simple, practical guidance.",
    icon: "🥗",
    color: "bg-green-100 dark:bg-green-900/30",
    days: [
      {
        day: 1,
        title: "Understand the Balanced Plate",
        task: "Learn the simple rule: ½ vegetables, ¼ protein, ¼ whole grains. Apply it to one meal today.",
        mealIdeas: [
          "Half plate salad + quarter plate dal + quarter plate brown rice",
          "Vegetable stir-fry + grilled chicken + roti"
        ],
        whyItMatters: "The balanced plate formula ensures you get all nutrients without complicated calorie counting."
      },
      {
        day: 2,
        title: "Fill Half with Vegetables",
        task: "At lunch or dinner, make sure vegetables take up half your plate.",
        mealIdeas: [
          "Large mixed salad with your regular dal-chawal",
          "Stir-fried veggies (beans, carrots, cabbage) with roti"
        ],
        whyItMatters: "Vegetables add volume and fiber, helping you feel full with fewer calories."
      },
      {
        day: 3,
        title: "Add Quality Protein",
        task: "Include a protein source in every main meal today.",
        mealIdeas: [
          "Breakfast: Moong dal chilla | Lunch: Rajma | Dinner: Egg bhurji",
          "Paneer tikka, grilled fish, or a bowl of sprouts"
        ],
        whyItMatters: "Protein builds and repairs your body and keeps you satisfied between meals."
      },
      {
        day: 4,
        title: "Choose Whole Grains",
        task: "Replace refined grains with whole grains in at least one meal.",
        mealIdeas: [
          "Brown rice instead of white rice",
          "Whole wheat roti instead of maida paratha"
        ],
        whyItMatters: "Whole grains provide sustained energy and more fiber than refined alternatives."
      },
      {
        day: 5,
        title: "Add Color to Your Plate",
        task: "Include at least 3 different colored vegetables or fruits in your meals today.",
        mealIdeas: [
          "Red tomatoes, green spinach, orange carrots in a sabzi",
          "Rainbow salad with beetroot, cucumber, corn, and capsicum"
        ],
        whyItMatters: "Different colors mean different nutrients. A colorful plate is a nutritious plate."
      },
      {
        day: 6,
        title: "Balance Your Snacks",
        task: "Apply the balanced approach to snacks: pair carbs with protein or healthy fat.",
        mealIdeas: [
          "Apple slices with peanut butter",
          "Roasted chana (chickpeas) as an evening snack"
        ],
        whyItMatters: "Balanced snacks prevent blood sugar spikes and keep cravings at bay."
      },
      {
        day: 7,
        title: "Build Your Template Meal",
        task: "Create your personal balanced plate meal that you can make easily any day.",
        mealIdeas: [
          "Your formula: favorite vegetable + favorite protein + favorite grain",
          "Example: Palak paneer + brown rice + cucumber raita + salad"
        ],
        whyItMatters: "A go-to template meal makes healthy eating automatic instead of requiring daily decisions."
      }
    ]
  }
];

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(c => c.id === id);
};
