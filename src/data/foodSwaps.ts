export interface FoodSwap {
  id: number;
  usualItem: string;
  category: string;
  mealType: string;
  swaps: {
    name: string;
    whyBetter: string;
    tags: string[];
  }[];
  tags: string[];
}

export const SWAP_CATEGORIES = [
  { id: "drinks", label: "Drinks", icon: "🥤" },
  { id: "tea-coffee", label: "Tea & Coffee", icon: "☕" },
  { id: "breakfast", label: "Breakfast", icon: "🍳" },
  { id: "rice-roti", label: "Rice & Roti", icon: "🍚" },
  { id: "snacks", label: "Snacks", icon: "🍿" },
  { id: "sweets", label: "Sweets", icon: "🍰" },
  { id: "fast-food", label: "Fast Food", icon: "🍔" },
  { id: "office-night", label: "Office & Late-Night", icon: "🌙" },
] as const;

export const GOAL_FILTERS = [
  { id: "all", label: "All Goals" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "more-energy", label: "More Energy" },
  { id: "better-digestion", label: "Better Digestion" },
  { id: "build-muscle", label: "Build Muscle" },
  { id: "sugar-control", label: "Sugar Control" },
] as const;

export const FOOD_SWAPS: FoodSwap[] = [
  // A. Sugary Drinks (20)
  {
    id: 1,
    usualItem: "Sugary cola",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Lemon water with pinch of salt", whyBetter: "Far less sugar and calories, still refreshing and hydrating.", tags: ["less sugar", "hydration", "weight-loss"] },
      { name: "Plain soda with lemon", whyBetter: "No extra sugar, keeps the fizz feel without calories.", tags: ["less sugar", "refreshing"] },
      { name: "Buttermilk (chaas)", whyBetter: "Adds protein, probiotics, and electrolytes instead of empty calories.", tags: ["digestion", "probiotics"] }
    ],
    tags: ["student", "office", "craving", "cold drink"]
  },
  {
    id: 2,
    usualItem: "Orange-flavoured soft drink",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Fresh orange slices in chilled water", whyBetter: "No extra sugar or chemicals, keeps fiber from the fruit.", tags: ["less sugar", "hydration"] },
      { name: "Fresh orange juice (no sugar)", whyBetter: "Real vitamin C and natural sweetness.", tags: ["vitamins", "natural"] }
    ],
    tags: ["craving", "summer"]
  },
  {
    id: 3,
    usualItem: "Packaged fruit juice (with sugar)",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Whole fruit", whyBetter: "Whole fruit gives fiber and keeps you full longer.", tags: ["fiber", "weight-loss"] },
      { name: "Fresh unsweetened juice", whyBetter: "No added sugar, real nutrients from fresh fruit.", tags: ["vitamins", "natural"] }
    ],
    tags: ["breakfast", "snack"]
  },
  {
    id: 4,
    usualItem: "Energy drink (sugary)",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Coconut water", whyBetter: "Natural electrolytes and less sugar, kinder to your heart and sleep.", tags: ["hydration", "natural", "more-energy"] },
      { name: "Black coffee (no sugar)", whyBetter: "Natural caffeine boost without sugar crash.", tags: ["more-energy", "focus"] }
    ],
    tags: ["office", "workout", "student"]
  },
  {
    id: 5,
    usualItem: "Sweetened iced tea",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Unsweetened iced tea with lemon and mint", whyBetter: "Removes added sugar but keeps flavour and refreshment.", tags: ["less sugar", "refreshing"] },
      { name: "Green tea (cold brewed)", whyBetter: "Antioxidants and natural energy without sugar.", tags: ["antioxidants", "more-energy"] }
    ],
    tags: ["summer", "office"]
  },
  {
    id: 6,
    usualItem: "Bottled sweet lassi",
    category: "drinks",
    mealType: "Lunch",
    swaps: [
      { name: "Plain buttermilk (chaas) with jeera", whyBetter: "Lighter, less sugar, helps digestion.", tags: ["digestion", "probiotics", "weight-loss"] }
    ],
    tags: ["Indian", "lunch"]
  },
  {
    id: 7,
    usualItem: "Flavoured milkshake (ice cream based)",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Cold milk with 1 tsp cocoa and no sugar", whyBetter: "Much less sugar and fat, still chocolatey.", tags: ["less sugar", "protein"] },
      { name: "Banana smoothie with milk", whyBetter: "Natural sweetness from fruit, more filling.", tags: ["natural", "energy"] }
    ],
    tags: ["craving", "treat"]
  },
  {
    id: 8,
    usualItem: "Sweetened cold coffee (café style)",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Home cold coffee with less sugar and no cream", whyBetter: "Cuts empty calories but keeps caffeine kick.", tags: ["less sugar", "more-energy"] },
      { name: "Black iced coffee with splash of milk", whyBetter: "Almost zero sugar, same focus boost.", tags: ["weight-loss", "focus"] }
    ],
    tags: ["office", "student"]
  },
  {
    id: 9,
    usualItem: "Sugary sports drink",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Water + pinch of salt + lemon", whyBetter: "Simple homemade electrolyte drink with less sugar.", tags: ["hydration", "natural", "weight-loss"] },
      { name: "Coconut water", whyBetter: "Natural electrolytes, no artificial colors.", tags: ["hydration", "natural"] }
    ],
    tags: ["workout", "sports"]
  },
  {
    id: 10,
    usualItem: "Sugar-heavy flavoured yogurt drink",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Plain home-set curd whisked with water (salted)", whyBetter: "Removes flavouring sugars, adds real probiotics.", tags: ["probiotics", "digestion"] }
    ],
    tags: ["snack", "healthy"]
  },
  {
    id: 11,
    usualItem: "Packaged lemonade (high sugar)",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Infused water (lemon + cucumber + mint)", whyBetter: "Mild flavour and hydration without sugar.", tags: ["hydration", "refreshing", "weight-loss"] }
    ],
    tags: ["summer", "refreshing"]
  },
  {
    id: 12,
    usualItem: "Pre-mixed vitamin water (sugary)",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Plain water + real fruit slices", whyBetter: "Avoids added sugar and artificial flavours.", tags: ["natural", "hydration"] }
    ],
    tags: ["healthy", "fitness"]
  },
  {
    id: 13,
    usualItem: "Bottled cold coffee with sugar",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Black iced coffee with splash of milk, no sugar", whyBetter: "Almost zero sugar, lower calories, same focus.", tags: ["weight-loss", "more-energy"] }
    ],
    tags: ["office", "student"]
  },
  {
    id: 14,
    usualItem: "Canned sweetened milk drink",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Plain chilled toned milk", whyBetter: "Protein and calcium without added sugar.", tags: ["protein", "calcium"] }
    ],
    tags: ["healthy", "simple"]
  },
  {
    id: 15,
    usualItem: "Flavoured soda with syrup",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Soda + splash of lime + ice", whyBetter: "Removes sugary syrup, keeps fizz.", tags: ["less sugar", "refreshing"] }
    ],
    tags: ["party", "refreshing"]
  },
  {
    id: 16,
    usualItem: "Sweetened rose milk",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Chilled milk with a drop of pure rose water, no sugar", whyBetter: "Flavour with minimal calories.", tags: ["less sugar", "aromatic"] }
    ],
    tags: ["Indian", "summer"]
  },
  {
    id: 17,
    usualItem: "Sweetened probiotic drink",
    category: "drinks",
    mealType: "Anytime",
    swaps: [
      { name: "Plain curd/buttermilk with roasted cumin", whyBetter: "Natural probiotics, less sugar.", tags: ["probiotics", "digestion"] }
    ],
    tags: ["healthy", "digestion"]
  },
  {
    id: 18,
    usualItem: "Chocolate milk (sugary)",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Milk with small piece of dark chocolate melted in", whyBetter: "Less sugar than packaged mixes, more cocoa.", tags: ["less sugar", "antioxidants"] }
    ],
    tags: ["treat", "kids"]
  },
  {
    id: 19,
    usualItem: "Canned iced latte with sugar",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Americano with a little milk", whyBetter: "Much lower sugar and calories, similar coffee taste.", tags: ["weight-loss", "more-energy"] }
    ],
    tags: ["office", "coffee-lover"]
  },
  {
    id: 20,
    usualItem: "Sugar-loaded bubble tea",
    category: "drinks",
    mealType: "Snack",
    swaps: [
      { name: "Green tea with lemon and a few fruit pieces", whyBetter: "Huge sugar reduction while still giving a treat feel.", tags: ["less sugar", "antioxidants"] }
    ],
    tags: ["trendy", "treat"]
  },
  
  // B. Tea / Coffee & Hot Drinks (15)
  {
    id: 21,
    usualItem: "Tea with 3 tsp sugar",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Tea with 1 tsp sugar, then slowly switch to no sugar", whyBetter: "Gradual sugar reduction without feeling deprived.", tags: ["less sugar", "habit-change"] }
    ],
    tags: ["daily", "Indian"]
  },
  {
    id: 22,
    usualItem: "Milk tea with full-cream milk",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Tea with toned/low-fat milk", whyBetter: "Cuts saturated fat, supports heart health.", tags: ["heart-health", "weight-loss"] }
    ],
    tags: ["daily", "Indian"]
  },
  {
    id: 23,
    usualItem: "3–4 cups of very strong coffee daily",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "1–2 normal coffees + 1–2 cups of herbal/green tea", whyBetter: "Reduces jitters and sleep disturbance.", tags: ["better-sleep", "balance"] }
    ],
    tags: ["office", "habit-change"]
  },
  {
    id: 24,
    usualItem: "Instant coffee premix (sugar + whitener)",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Brewed coffee + little milk, no premix", whyBetter: "Avoids hidden sugar and trans fats in whiteners.", tags: ["less sugar", "natural"] }
    ],
    tags: ["office", "quick"]
  },
  {
    id: 25,
    usualItem: "Hot chocolate with cream",
    category: "tea-coffee",
    mealType: "Evening",
    swaps: [
      { name: "Cocoa powder in milk with very little sugar", whyBetter: "Keeps warmth and taste, lighter on calories.", tags: ["less sugar", "comfort"] }
    ],
    tags: ["winter", "treat"]
  },
  {
    id: 26,
    usualItem: "Masala chai with lots of sugar",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Masala chai with more spices, less sugar", whyBetter: "Spices add flavour so you don't miss sweetness.", tags: ["less sugar", "Indian"] }
    ],
    tags: ["Indian", "daily"]
  },
  {
    id: 27,
    usualItem: "Sweetened green tea sachet",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Plain green tea bag + lemon slice", whyBetter: "Removes added sugar, still refreshing and light.", tags: ["less sugar", "antioxidants"] }
    ],
    tags: ["healthy", "simple"]
  },
  {
    id: 28,
    usualItem: "Ready-made health drink powder in milk",
    category: "tea-coffee",
    mealType: "Breakfast",
    swaps: [
      { name: "Plain milk + real soaked nuts & seeds", whyBetter: "Cuts sugar and additives, adds real nutrition.", tags: ["natural", "protein"] }
    ],
    tags: ["kids", "healthy"]
  },
  {
    id: 29,
    usualItem: "Sugar-heavy badam milk mix",
    category: "tea-coffee",
    mealType: "Evening",
    swaps: [
      { name: "Warm milk with a few crushed almonds and cardamom", whyBetter: "Natural flavour, less sugar.", tags: ["natural", "less sugar"] }
    ],
    tags: ["Indian", "night"]
  },
  {
    id: 30,
    usualItem: "Sweetened turmeric latte",
    category: "tea-coffee",
    mealType: "Evening",
    swaps: [
      { name: "Turmeric in warm milk with pinch of pepper, minimal jaggery", whyBetter: "Anti-inflammatory benefits with controlled sugar.", tags: ["anti-inflammatory", "immunity"] }
    ],
    tags: ["healthy", "night"]
  },
  {
    id: 31,
    usualItem: "5–6 cups of tea daily",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "2–3 cups tea + 2–3 cups warm water/herbal tea", whyBetter: "Reduces caffeine load, improves hydration.", tags: ["hydration", "balance"] }
    ],
    tags: ["habit-change", "daily"]
  },
  {
    id: 32,
    usualItem: "Premixed chai in vending machine",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Freshly made home chai with measured sugar", whyBetter: "You control sugar and milk quantity.", tags: ["less sugar", "fresh"] }
    ],
    tags: ["office", "control"]
  },
  {
    id: 33,
    usualItem: "Coffee with flavoured syrups",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Coffee with cinnamon or cardamom", whyBetter: "Flavour without sugary syrups.", tags: ["less sugar", "aromatic"] }
    ],
    tags: ["café", "treat"]
  },
  {
    id: 34,
    usualItem: "Sweetened condensed milk in tea/coffee",
    category: "tea-coffee",
    mealType: "Anytime",
    swaps: [
      { name: "Normal milk + much less sugar", whyBetter: "Avoids very dense sugar source.", tags: ["less sugar", "simple"] }
    ],
    tags: ["habit-change"]
  },
  {
    id: 35,
    usualItem: "Sugary malt drink every night",
    category: "tea-coffee",
    mealType: "Night",
    swaps: [
      { name: "Warm milk with nutmeg or turmeric", whyBetter: "Comforting night drink with less sugar.", tags: ["better-sleep", "less sugar"] }
    ],
    tags: ["night", "habit-change"]
  },

  // C. Breakfast Swaps (30)
  {
    id: 36,
    usualItem: "White bread with jam",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Whole grain bread with peanut butter and banana slices", whyBetter: "More fiber and protein, slower energy release.", tags: ["fiber", "protein", "more-energy"] }
    ],
    tags: ["quick", "student"]
  },
  {
    id: 37,
    usualItem: "White bread with butter",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Whole wheat toast with avocado or homemade chutney", whyBetter: "More healthy fats and fiber, less saturated fat.", tags: ["fiber", "healthy-fats"] }
    ],
    tags: ["quick", "healthy"]
  },
  {
    id: 38,
    usualItem: "Deep-fried pooris",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Phulka/roti (no oil) with sabzi", whyBetter: "Same meal feel, much less oil and heaviness.", tags: ["less-oil", "lighter"] }
    ],
    tags: ["Indian", "traditional"]
  },
  {
    id: 39,
    usualItem: "Stuffed paratha with lots of ghee",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Plain chapati with the same stuffing on the side, little ghee", whyBetter: "Reduces oil while keeping taste.", tags: ["less-oil", "portion-control"] }
    ],
    tags: ["Indian", "traditional"]
  },
  {
    id: 40,
    usualItem: "Instant noodles for breakfast",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Vegetable poha/upma", whyBetter: "Adds veggies and fiber instead of refined flour.", tags: ["fiber", "vitamins"] }
    ],
    tags: ["quick", "student"]
  },
  {
    id: 41,
    usualItem: "Sugary breakfast cereal",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Plain oats cooked with milk and fruit", whyBetter: "No sugar coating, more fiber and satiety.", tags: ["fiber", "weight-loss"] }
    ],
    tags: ["quick", "healthy"]
  },
  {
    id: 42,
    usualItem: "Sweet buns/pastries",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Idli with sambar and chutney", whyBetter: "Less sugar, more protein and complex carbs.", tags: ["protein", "balanced"] }
    ],
    tags: ["bakery", "habit-change"]
  },
  {
    id: 43,
    usualItem: "Cookies/biscuits and tea",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Fruit + handful of nuts with tea", whyBetter: "Natural sweetness and good fats instead of refined flour.", tags: ["natural", "healthy-fats"] }
    ],
    tags: ["quick", "office"]
  },
  {
    id: 44,
    usualItem: "Parotta with kurma",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Chapati with vegetable curry", whyBetter: "Less oil and refined flour, easier to digest.", tags: ["less-oil", "digestion"] }
    ],
    tags: ["South-Indian", "traditional"]
  },
  {
    id: 45,
    usualItem: "Leftover pizza for breakfast",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Whole wheat veggie sandwich", whyBetter: "Similar convenience with better nutrition.", tags: ["fiber", "balanced"] }
    ],
    tags: ["quick", "student"]
  },
  {
    id: 46,
    usualItem: "Vada + sambar",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Idli + sambar", whyBetter: "Soft, steamed option with much less oil.", tags: ["less-oil", "lighter"] }
    ],
    tags: ["South-Indian", "traditional"]
  },
  {
    id: 47,
    usualItem: "Bread omelette with white bread",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Vegetable omelette with whole grain toast", whyBetter: "More fiber and micronutrients.", tags: ["fiber", "protein"] }
    ],
    tags: ["quick", "protein"]
  },
  {
    id: 48,
    usualItem: "Sugar-loaded granola bar",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Handful of mixed nuts and seeds + 1 fruit", whyBetter: "No added sugar, more healthy fats and fiber.", tags: ["natural", "healthy-fats"] }
    ],
    tags: ["on-the-go", "healthy"]
  },
  {
    id: 49,
    usualItem: "Buttered toast only",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Toast with paneer/besan chilla on the side", whyBetter: "Adds protein, keeps you full longer.", tags: ["protein", "satiety"] }
    ],
    tags: ["quick", "balanced"]
  },
  {
    id: 50,
    usualItem: "Plain dosa with lots of oil",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Set dosa/uttapam with minimal oil and more veggies", whyBetter: "Better fiber and less fat.", tags: ["less-oil", "fiber"] }
    ],
    tags: ["South-Indian"]
  },
  {
    id: 51,
    usualItem: "Jam-smeared toast",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Toast with homemade tomato chutney or hummus", whyBetter: "Savoury, low sugar, more nutrients.", tags: ["less sugar", "protein"] }
    ],
    tags: ["quick", "healthy"]
  },
  {
    id: 52,
    usualItem: "Sweetened flavoured yogurt cup",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Plain curd with fresh fruits and a few nuts", whyBetter: "Avoids added sugar, adds natural sweetness.", tags: ["natural", "probiotics"] }
    ],
    tags: ["quick", "healthy"]
  },
  {
    id: 53,
    usualItem: "Leftover sweets for breakfast",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Bowl of fruit salad with curd", whyBetter: "Satisfies sweet tooth with vitamins and probiotics.", tags: ["vitamins", "probiotics"] }
    ],
    tags: ["habit-change", "healthy"]
  },
  {
    id: 54,
    usualItem: "Fried bread pakora",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Besan chilla with onions and coriander", whyBetter: "Same gram flour taste with much less oil.", tags: ["less-oil", "protein"] }
    ],
    tags: ["monsoon", "Indian"]
  },
  {
    id: 55,
    usualItem: "Large portion of poha with namkeen topping",
    category: "breakfast",
    mealType: "Breakfast",
    swaps: [
      { name: "Poha with added veggies and peanuts, no extra namkeen", whyBetter: "Keeps crunch, avoids extra salt/fat.", tags: ["fiber", "less-sodium"] }
    ],
    tags: ["Indian", "balanced"]
  },

  // D. Rice, Roti & Main Meals (35)
  {
    id: 56,
    usualItem: "Large plate of white rice",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Half white + half brown rice/millets", whyBetter: "Gradual fiber increase without big taste change.", tags: ["fiber", "balanced"] }
    ],
    tags: ["daily", "habit-change"]
  },
  {
    id: 57,
    usualItem: "3 big ladles of rice",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "1–1.5 ladles rice + more sabzi and dal", whyBetter: "Same satisfaction with better nutrition balance.", tags: ["portion-control", "balanced"] }
    ],
    tags: ["daily", "portion-control"]
  },
  {
    id: 58,
    usualItem: "Ghee rice daily",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Plain rice with ghee only on top of dal (1 tsp)", whyBetter: "Cuts oil quantity, keeps flavour.", tags: ["less-oil", "portion-control"] }
    ],
    tags: ["Indian", "daily"]
  },
  {
    id: 59,
    usualItem: "Fried rice from restaurant",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Home-made veg pulao with less oil", whyBetter: "Lower sodium and fat, more veggies.", tags: ["less-oil", "less-sodium"] }
    ],
    tags: ["eating-out", "Chinese"]
  },
  {
    id: 60,
    usualItem: "Biryani as everyday lunch",
    category: "rice-roti",
    mealType: "Lunch",
    swaps: [
      { name: "Biryani once a week + simple rice-dal on other days", whyBetter: "Keeps joy of biryani but avoids overload.", tags: ["balance", "portion-control"] }
    ],
    tags: ["Indian", "habit-change"]
  },
  {
    id: 61,
    usualItem: "Only rice and pickle",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Rice with dal/curd and stir-fried veg", whyBetter: "Adds protein and vitamins, not just salt.", tags: ["protein", "balanced"] }
    ],
    tags: ["simple", "Indian"]
  },
  {
    id: 62,
    usualItem: "4–5 chapatis with oil",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "2–3 oil-free phulkas + more sabzi", whyBetter: "Same fullness with lower fat.", tags: ["less-oil", "portion-control"] }
    ],
    tags: ["Indian", "daily"]
  },
  {
    id: 63,
    usualItem: "Maida naan",
    category: "rice-roti",
    mealType: "Dinner",
    swaps: [
      { name: "Whole wheat tawa roti/kulcha", whyBetter: "Less refined flour, better digestion.", tags: ["fiber", "digestion"] }
    ],
    tags: ["restaurant", "Indian"]
  },
  {
    id: 64,
    usualItem: "Butter naan regularly",
    category: "rice-roti",
    mealType: "Dinner",
    swaps: [
      { name: "Plain roti/naan without butter", whyBetter: "Removes saturated fat but keeps Indian bread feel.", tags: ["less-oil", "heart-health"] }
    ],
    tags: ["restaurant", "habit-change"]
  },
  {
    id: 65,
    usualItem: "Daily parotta",
    category: "rice-roti",
    mealType: "Dinner",
    swaps: [
      { name: "Chapati or phulka most days, parotta once in a while", whyBetter: "Reduces refined flour and layering fat.", tags: ["fiber", "less-oil"] }
    ],
    tags: ["South-Indian", "habit-change"]
  },
  {
    id: 66,
    usualItem: "Heavy creamy gravies",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Tomato-onion based gravies with little cream", whyBetter: "Similar taste, much less fat.", tags: ["less-oil", "lighter"] }
    ],
    tags: ["restaurant", "Indian"]
  },
  {
    id: 67,
    usualItem: "Only sabzi and roti, no dal",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Add at least a small bowl of dal", whyBetter: "Easy protein boost.", tags: ["protein", "balanced"] }
    ],
    tags: ["Indian", "simple"]
  },
  {
    id: 68,
    usualItem: "Skipping salad daily",
    category: "rice-roti",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Simple cucumber/onion/carrot slices", whyBetter: "Minimal effort, adds crunch and vitamins.", tags: ["vitamins", "fiber"] }
    ],
    tags: ["habit-change", "simple"]
  },

  // E. Savoury Snacks (40)
  {
    id: 69,
    usualItem: "Fried potato chips",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Roasted chana or nuts (unsalted)", whyBetter: "More protein and good fats, not just empty calories.", tags: ["protein", "healthy-fats"] },
      { name: "Roasted makhana (foxnuts)", whyBetter: "Crunchy, less oil and salt.", tags: ["less-oil", "lighter"] }
    ],
    tags: ["craving", "office", "student"]
  },
  {
    id: 70,
    usualItem: "Mixture/namkeen packet",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Roasted makhana with light seasoning", whyBetter: "Crunchy, much less oil and salt.", tags: ["less-oil", "lighter"] }
    ],
    tags: ["tea-time", "Indian"]
  },
  {
    id: 71,
    usualItem: "Samosa as daily snack",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Boiled chana chaat or sprouts chaat", whyBetter: "Spicy, tasty, but baked/boiled not fried.", tags: ["less-oil", "protein"] }
    ],
    tags: ["Indian", "street-food"]
  },
  {
    id: 72,
    usualItem: "Pakoda/bajji often",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Grilled or tawa-roasted paneer/vegetable skewers", whyBetter: "Snack feel with much less oil.", tags: ["less-oil", "protein"] }
    ],
    tags: ["monsoon", "Indian"]
  },
  {
    id: 73,
    usualItem: "Instant noodles every evening",
    category: "snacks",
    mealType: "Evening",
    swaps: [
      { name: "Vegetable-loaded homemade soup", whyBetter: "Warm, comforting, but more nutrients.", tags: ["vitamins", "fiber"] }
    ],
    tags: ["quick", "student"]
  },
  {
    id: 74,
    usualItem: "Deep-fried murukku/sev",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Roasted peanuts + small piece of jaggery", whyBetter: "Simple, satisfying, more natural.", tags: ["natural", "protein"] }
    ],
    tags: ["South-Indian", "traditional"]
  },
  {
    id: 75,
    usualItem: "Buttered popcorn (theatre style)",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Air-popped popcorn with little oil and spices", whyBetter: "Big volume, low calories.", tags: ["fiber", "lighter"] }
    ],
    tags: ["movie", "treat"]
  },
  {
    id: 76,
    usualItem: "Sandwich with mayo and cheese",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Sandwich with hung curd or hummus spread", whyBetter: "Creamy feel without heavy fat.", tags: ["protein", "lighter"] }
    ],
    tags: ["quick", "office"]
  },
  {
    id: 77,
    usualItem: "Fried vada pav",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Same pav with aloo tikki roasted or baked", whyBetter: "Reduces deep-fry oil load.", tags: ["less-oil"] }
    ],
    tags: ["Mumbai", "street-food"]
  },
  {
    id: 78,
    usualItem: "Bread pakora (deep-fried)",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Grilled veg sandwich", whyBetter: "Keeps bread snack idea with less oil.", tags: ["less-oil", "fiber"] }
    ],
    tags: ["monsoon", "Indian"]
  },
  {
    id: 79,
    usualItem: "Heavy cheese-loaded fries",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Baked potato wedges with herbs", whyBetter: "Satisfies craving with less fat.", tags: ["less-oil", "fiber"] }
    ],
    tags: ["Western", "treat"]
  },
  {
    id: 80,
    usualItem: "Daily savoury biscuits",
    category: "snacks",
    mealType: "Snack",
    swaps: [
      { name: "Roasted seeds and nuts mix", whyBetter: "Crunchy snack high in healthy fats and minerals.", tags: ["healthy-fats", "minerals"] }
    ],
    tags: ["office", "tea-time"]
  },

  // F. Sweets & Desserts (30)
  {
    id: 81,
    usualItem: "Gulab jamun as regular dessert",
    category: "sweets",
    mealType: "Dessert",
    swaps: [
      { name: "Fruit with a spoon of rabdi once in a while", whyBetter: "Keeps festival taste but reduces frequency.", tags: ["less sugar", "natural"] }
    ],
    tags: ["Indian", "festival"]
  },
  {
    id: 82,
    usualItem: "Daily ice cream",
    category: "sweets",
    mealType: "Dessert",
    swaps: [
      { name: "Frozen banana blended with cocoa and nuts", whyBetter: "Ice-cream-like feel with better ingredients.", tags: ["natural", "fiber"] }
    ],
    tags: ["treat", "summer"]
  },
  {
    id: 83,
    usualItem: "Milk chocolates",
    category: "sweets",
    mealType: "Snack",
    swaps: [
      { name: "Dark chocolate (70%+) in small pieces", whyBetter: "Less sugar, more cocoa and antioxidants.", tags: ["less sugar", "antioxidants"] }
    ],
    tags: ["treat", "craving"]
  },
  {
    id: 84,
    usualItem: "Packaged cupcakes",
    category: "sweets",
    mealType: "Snack",
    swaps: [
      { name: "Home-made small portion cake with less sugar", whyBetter: "You control ingredients and quantity.", tags: ["portion-control", "less sugar"] }
    ],
    tags: ["bakery", "treat"]
  },
  {
    id: 85,
    usualItem: "Sweet after every meal",
    category: "sweets",
    mealType: "Dessert",
    swaps: [
      { name: "Sweet only after lunch or only on weekends", whyBetter: "Gradual reduction in habit.", tags: ["habit-change", "portion-control"] }
    ],
    tags: ["habit-change", "daily"]
  },
  {
    id: 86,
    usualItem: "Indian sweets box at desk",
    category: "sweets",
    mealType: "Snack",
    swaps: [
      { name: "Nuts, dates, and a few dark chocolate pieces", whyBetter: "Natural sweetness + healthy fats.", tags: ["natural", "healthy-fats"] }
    ],
    tags: ["office", "habit-change"]
  },
  {
    id: 87,
    usualItem: "Sugar in curd",
    category: "sweets",
    mealType: "Anytime",
    swaps: [
      { name: "Curd with fresh fruits instead", whyBetter: "Same sweet feel with vitamins and fiber.", tags: ["natural", "vitamins"] }
    ],
    tags: ["Indian", "simple"]
  },
  {
    id: 88,
    usualItem: "Sweet halwa big bowl",
    category: "sweets",
    mealType: "Dessert",
    swaps: [
      { name: "Small bowl of halwa + more fruit", whyBetter: "Keeps joy, reduces load.", tags: ["portion-control", "balanced"] }
    ],
    tags: ["Indian", "festival"]
  },
  {
    id: 89,
    usualItem: "Biscuits dipped in tea",
    category: "sweets",
    mealType: "Snack",
    swaps: [
      { name: "Dates or fig with nuts + tea", whyBetter: "Whole food sweetness, no refined flour.", tags: ["natural", "fiber"] }
    ],
    tags: ["tea-time", "Indian"]
  },
  {
    id: 90,
    usualItem: "Sugary doughnuts",
    category: "sweets",
    mealType: "Snack",
    swaps: [
      { name: "Small homemade baked doughnut or whole wheat muffin", whyBetter: "Lower sugar and fat.", tags: ["less sugar", "less-oil"] }
    ],
    tags: ["bakery", "treat"]
  },

  // G. Fast Food & Eating Out (30)
  {
    id: 91,
    usualItem: "Large burger with fries and cola",
    category: "fast-food",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Regular burger + side salad + water", whyBetter: "Keeps treat, reduces fried extras and sugar.", tags: ["portion-control", "balanced"] }
    ],
    tags: ["Western", "eating-out"]
  },
  {
    id: 92,
    usualItem: "Double cheese pizza",
    category: "fast-food",
    mealType: "Dinner",
    swaps: [
      { name: "Thin crust veg pizza with less cheese", whyBetter: "Same flavour with fewer calories.", tags: ["less-oil", "lighter"] }
    ],
    tags: ["Western", "party"]
  },
  {
    id: 93,
    usualItem: "Fried chicken bucket",
    category: "fast-food",
    mealType: "Dinner",
    swaps: [
      { name: "Grilled/roasted chicken pieces", whyBetter: "Cuts deep-fry oil, keeps protein.", tags: ["protein", "less-oil"] }
    ],
    tags: ["Western", "non-veg"]
  },
  {
    id: 94,
    usualItem: "Daily ordered biryani",
    category: "fast-food",
    mealType: "Lunch",
    swaps: [
      { name: "Home-cooked pulao/biryani once or twice a week", whyBetter: "Control oil, portion, and frequency.", tags: ["portion-control", "less-oil"] }
    ],
    tags: ["Indian", "habit-change"]
  },
  {
    id: 95,
    usualItem: "Creamy pasta in white sauce",
    category: "fast-food",
    mealType: "Lunch/Dinner",
    swaps: [
      { name: "Tomato-based pasta with veggies", whyBetter: "Less cream, more fiber and vitamins.", tags: ["less-oil", "fiber"] }
    ],
    tags: ["Western", "Italian"]
  },
  {
    id: 96,
    usualItem: "Garlic bread with extra cheese",
    category: "fast-food",
    mealType: "Dinner",
    swaps: [
      { name: "Plain garlic bread + a bowl of soup", whyBetter: "Satisfies carb craving, adds volume from soup.", tags: ["balanced", "lighter"] }
    ],
    tags: ["Western", "Italian"]
  },
  {
    id: 97,
    usualItem: "Street fried rice and noodles",
    category: "fast-food",
    mealType: "Dinner",
    swaps: [
      { name: "Same dish made at home with less oil", whyBetter: "Better hygiene, lower fat.", tags: ["less-oil", "hygiene"] }
    ],
    tags: ["Chinese", "street-food"]
  },
  {
    id: 98,
    usualItem: "Loaded fries with toppings",
    category: "fast-food",
    mealType: "Snack",
    swaps: [
      { name: "Plain fries (smaller portion) + side salad", whyBetter: "Combination reduces calorie density.", tags: ["portion-control", "fiber"] }
    ],
    tags: ["Western", "treat"]
  },
  {
    id: 99,
    usualItem: "Fried momos",
    category: "fast-food",
    mealType: "Snack",
    swaps: [
      { name: "Steamed momos with spicy chutney", whyBetter: "Retains fun street food feel, cuts oil.", tags: ["less-oil"] }
    ],
    tags: ["street-food", "Chinese"]
  },
  {
    id: 100,
    usualItem: "Cheese burst pizza",
    category: "fast-food",
    mealType: "Dinner",
    swaps: [
      { name: "Normal cheese pizza or thin crust", whyBetter: "Reduces heavy fat layer.", tags: ["less-oil", "portion-control"] }
    ],
    tags: ["Western", "party"]
  },

  // H. Office & Late-Night Habits (30)
  {
    id: 101,
    usualItem: "Tea + 4 biscuits at office",
    category: "office-night",
    mealType: "Snack",
    swaps: [
      { name: "Tea + 1 biscuit + handful of nuts", whyBetter: "Gradual biscuit reduction, adds healthy fats.", tags: ["portion-control", "healthy-fats"] }
    ],
    tags: ["office", "habit-change"]
  },
  {
    id: 102,
    usualItem: "Snacking at desk nonstop",
    category: "office-night",
    mealType: "Anytime",
    swaps: [
      { name: "Fixed snack time + keep water bottle handy", whyBetter: "Reduces mindless munching.", tags: ["mindful-eating", "hydration"] }
    ],
    tags: ["office", "habit-change"]
  },
  {
    id: 103,
    usualItem: "Sugary 3 pm snack",
    category: "office-night",
    mealType: "Afternoon",
    swaps: [
      { name: "Fruit + black coffee/tea", whyBetter: "Natural sugar with less crash.", tags: ["natural", "more-energy"] }
    ],
    tags: ["office", "afternoon-slump"]
  },
  {
    id: 104,
    usualItem: "Skipping lunch then overeating at night",
    category: "office-night",
    mealType: "Anytime",
    swaps: [
      { name: "Smaller, earlier lunch from home + lighter dinner", whyBetter: "Balances hunger across day.", tags: ["balanced", "portion-control"] }
    ],
    tags: ["office", "habit-change"]
  },
  {
    id: 105,
    usualItem: "Late-night instant noodles",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "Oats or poha with veggies", whyBetter: "Warm comfort with better nutrition.", tags: ["fiber", "lighter"] }
    ],
    tags: ["late-night", "student"]
  },
  {
    id: 106,
    usualItem: "Eating directly from big snack packet",
    category: "office-night",
    mealType: "Snack",
    swaps: [
      { name: "Pour small portion into bowl, close packet", whyBetter: "Simple portion control trick.", tags: ["portion-control", "mindful-eating"] }
    ],
    tags: ["habit-change", "simple"]
  },
  {
    id: 107,
    usualItem: "Chocolate bar kept on desk",
    category: "office-night",
    mealType: "Snack",
    swaps: [
      { name: "Keep cut fruit or nuts instead", whyBetter: "Changes default choice.", tags: ["natural", "healthy-fats"] }
    ],
    tags: ["office", "habit-change"]
  },
  {
    id: 108,
    usualItem: "Working late with multiple coffees",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "Alternate coffee with water/herbal tea", whyBetter: "Less caffeine, better hydration.", tags: ["hydration", "better-sleep"] }
    ],
    tags: ["office", "late-night"]
  },
  {
    id: 109,
    usualItem: "10 pm heavy dinner",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "7–8 pm moderate dinner, later herbal tea only", whyBetter: "Helps sleep and digestion.", tags: ["digestion", "better-sleep"] }
    ],
    tags: ["habit-change", "night"]
  },
  {
    id: 110,
    usualItem: "Midnight fridge raids",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "Keep cut fruits, salad, or buttermilk ready", whyBetter: "Better late-night choices.", tags: ["lighter", "digestion"] }
    ],
    tags: ["late-night", "habit-change"]
  },
  {
    id: 111,
    usualItem: "Sugary biscuits for brain fuel",
    category: "office-night",
    mealType: "Snack",
    swaps: [
      { name: "Banana + handful of peanuts", whyBetter: "Sustained energy, not sugar spike.", tags: ["more-energy", "natural"] }
    ],
    tags: ["office", "student"]
  },
  {
    id: 112,
    usualItem: "Large late-night takeaway meal",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "Half portion now, half next day lunch", whyBetter: "Avoids overloading stomach at night.", tags: ["portion-control", "digestion"] }
    ],
    tags: ["late-night", "portion-control"]
  },
  {
    id: 113,
    usualItem: "Having nothing all day then bingeing",
    category: "office-night",
    mealType: "Anytime",
    swaps: [
      { name: "Small planned snacks: nuts, fruit, buttermilk", whyBetter: "Prevents extreme hunger.", tags: ["balanced", "portion-control"] }
    ],
    tags: ["habit-change", "office"]
  },
  {
    id: 114,
    usualItem: "Late-night streaming with chips",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "Carrot/cucumber sticks with hummus", whyBetter: "Crunchy, but lighter.", tags: ["fiber", "lighter"] }
    ],
    tags: ["late-night", "entertainment"]
  },
  {
    id: 115,
    usualItem: "Going to bed immediately after eating",
    category: "office-night",
    mealType: "Night",
    swaps: [
      { name: "Keep 1–2 hours gap between dinner and sleep", whyBetter: "Helps digestion and avoids reflux.", tags: ["digestion", "better-sleep"] }
    ],
    tags: ["habit-change", "night"]
  },
];

export const QUICK_TIPS = [
  "Start with 1–2 swaps per week, not everything at once.",
  "If you crave sweet, add fruit first, then slowly cut biscuits/packaged sweets.",
  "Drink a glass of water before snacking – you might just be thirsty.",
  "Keep healthier options visible and accessible at home and work.",
  "Small changes add up – consistency beats perfection.",
  "Swap fried for roasted/baked when possible.",
  "Read labels – many 'healthy' products have hidden sugar.",
  "Prep healthy snacks on weekends for the week ahead.",
];
