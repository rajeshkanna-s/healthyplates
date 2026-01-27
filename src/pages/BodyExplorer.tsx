import { useState } from "react";
import { Brain, Heart, Activity, Droplets, Apple, Sparkles, X, ZoomIn, Wind, Filter, RotateCcw, User, Bone, Calculator, Scale, Ruler, Flame, Users, Target } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import organ images
import brainImg from "@/assets/organs/brain.png";
import heartImg from "@/assets/organs/heart.png";
import lungsImg from "@/assets/organs/lungs.png";
import liverImg from "@/assets/organs/liver.png";
import stomachImg from "@/assets/organs/stomach.png";
import pancreasImg from "@/assets/organs/pancreas.png";
import kidneysImg from "@/assets/organs/kidneys.png";
import intestinesImg from "@/assets/organs/intestines.png";
import bladderImg from "@/assets/organs/bladder.png";
import spleenImg from "@/assets/organs/spleen.png";

interface Organ {
  id: string;
  name: string;
  icon: any;
  image: string;
  color: string;
  position: { x: number; y: number; width: number; height: number };
  description: string;
  usage: string;
  functions: string[];
  facts: string[];
  disorders: string[];
  stats: { size: string; weight: string; activity: string };
}

interface BodyPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  labelPosition: 'left' | 'right';
  category: 'head' | 'torso' | 'upper-limb' | 'lower-limb';
}

const organs: Organ[] = [
  {
    id: "brain",
    name: "Brain",
    icon: Brain,
    image: brainImg,
    color: "hsl(280, 70%, 65%)",
    position: { x: 35, y: 2, width: 30, height: 20 },
    description: "The control center of the nervous system, responsible for processing information and coordinating body functions.",
    usage: "Controls thoughts, memory, emotions, movement, and all bodily functions through electrical and chemical signals.",
    functions: [
      "Processes sensory information",
      "Controls voluntary movements",
      "Regulates emotions and behavior",
      "Stores and retrieves memories",
      "Manages body temperature",
      "Controls breathing and heart rate",
      "Enables learning and decision making",
      "Coordinates balance and posture"
    ],
    facts: [
      "Contains approximately 86 billion neurons",
      "Uses 20% of the body's total energy",
      "Generates about 23 watts of power",
      "Can process information at 268 mph",
      "Never stops working, even during sleep"
    ],
    disorders: ["Alzheimer's Disease", "Stroke", "Epilepsy", "Brain Tumors", "Migraine"],
    stats: { size: "~1,350 cm³", weight: "~1.4 kg", activity: "24/7 active" }
  },
  {
    id: "lungs",
    name: "Lungs",
    icon: Wind,
    image: lungsImg,
    color: "hsl(340, 70%, 65%)",
    position: { x: 30, y: 22, width: 40, height: 25 },
    description: "Paired organs responsible for gas exchange, taking in oxygen and expelling carbon dioxide.",
    usage: "Exchange oxygen from air with carbon dioxide from blood through millions of tiny air sacs called alveoli.",
    functions: [
      "Exchange oxygen and CO2",
      "Filter small blood clots",
      "Remove air bubbles from blood",
      "Regulate blood pH levels",
      "Protect heart from shock",
      "Synthesize angiotensin",
      "Remove metabolic waste",
      "Maintain acid-base balance"
    ],
    facts: [
      "Surface area equals a tennis court",
      "Process 11,000 liters of air daily",
      "Right lung has 3 lobes, left has 2",
      "Contain about 300 million alveoli",
      "Can float on water"
    ],
    disorders: ["Asthma", "COPD", "Pneumonia", "Lung Cancer", "Tuberculosis"],
    stats: { size: "~6 liters capacity", weight: "~1.3 kg total", activity: "20,000 breaths/day" }
  },
  {
    id: "heart",
    name: "Heart",
    icon: Heart,
    image: heartImg,
    color: "hsl(0, 85%, 60%)",
    position: { x: 38, y: 30, width: 24, height: 20 },
    description: "A muscular organ that pumps blood throughout the circulatory system, delivering oxygen and nutrients.",
    usage: "Continuously pumps oxygenated blood to all body tissues and returns deoxygenated blood to the lungs.",
    functions: [
      "Pumps blood throughout the body",
      "Maintains blood pressure",
      "Delivers oxygen to tissues",
      "Removes carbon dioxide",
      "Distributes nutrients and hormones",
      "Regulates blood flow",
      "Maintains cardiac rhythm",
      "Responds to body's changing needs"
    ],
    facts: [
      "Beats approximately 100,000 times per day",
      "Pumps about 7,570 liters of blood daily",
      "Can continue beating outside the body",
      "Creates enough pressure to squirt blood 30 feet",
      "Your heartbeat syncs with the music you listen to"
    ],
    disorders: ["Heart Disease", "Heart Attack", "Arrhythmia", "Heart Failure", "Coronary Artery Disease"],
    stats: { size: "~Fist-sized", weight: "~300g", activity: "100,000 beats/day" }
  },
  {
    id: "liver",
    name: "Liver",
    icon: Activity,
    image: liverImg,
    color: "hsl(15, 70%, 50%)",
    position: { x: 42, y: 40, width: 28, height: 18 },
    description: "The largest internal organ, performing over 500 vital functions including detoxification and metabolism.",
    usage: "Processes nutrients from food, produces bile for digestion, stores vitamins, and filters toxins from blood.",
    functions: [
      "Detoxifies harmful substances",
      "Produces bile for digestion",
      "Stores vitamins and minerals",
      "Converts glucose to glycogen",
      "Produces blood clotting factors",
      "Breaks down old red blood cells",
      "Synthesizes proteins",
      "Metabolizes drugs and alcohol"
    ],
    facts: [
      "Performs over 500 different functions",
      "Can regenerate itself completely",
      "Filters 1.4 liters of blood per minute",
      "Produces 800-1000ml of bile daily",
      "Only organ that can regenerate fully"
    ],
    disorders: ["Hepatitis", "Cirrhosis", "Fatty Liver", "Liver Cancer", "Hemochromatosis"],
    stats: { size: "~15cm x 20cm", weight: "~1.5 kg", activity: "Continuous filtration" }
  },
  {
    id: "stomach",
    name: "Stomach",
    icon: Apple,
    image: stomachImg,
    color: "hsl(350, 70%, 65%)",
    position: { x: 32, y: 48, width: 20, height: 18 },
    description: "A muscular, hollow organ that breaks down food using acid and enzymes as part of digestion.",
    usage: "Mixes food with digestive juices, breaks down proteins, and gradually releases contents to small intestine.",
    functions: [
      "Stores food temporarily",
      "Secretes digestive enzymes",
      "Produces hydrochloric acid",
      "Breaks down proteins",
      "Kills harmful bacteria",
      "Mixes and churns food",
      "Absorbs some medications",
      "Regulates food release"
    ],
    facts: [
      "Can hold up to 1.5 liters of food",
      "Acid is strong enough to dissolve metal",
      "Produces new stomach lining every 3-4 days",
      "Growling is caused by muscle contractions",
      "Takes 2-4 hours to empty after a meal"
    ],
    disorders: ["GERD", "Ulcers", "Gastritis", "Stomach Cancer", "Gastroparesis"],
    stats: { size: "~25cm long", weight: "~1.5 kg when full", activity: "2-4 hour digestion" }
  },
  {
    id: "spleen",
    name: "Spleen",
    icon: Filter,
    image: spleenImg,
    color: "hsl(320, 65%, 55%)",
    position: { x: 20, y: 42, width: 15, height: 14 },
    description: "An organ that filters blood, removes old red blood cells, and supports the immune system.",
    usage: "Filters blood, stores white blood cells and platelets, helps fight infections, and recycles iron.",
    functions: [
      "Filters damaged blood cells",
      "Stores white blood cells",
      "Produces antibodies",
      "Removes old red blood cells",
      "Stores platelets",
      "Recycles iron",
      "Fights bacterial infections",
      "Supports immune response"
    ],
    facts: [
      "Can increase 3x in size when storing blood",
      "Contains 25% of body's lymphocytes",
      "Filters 150ml of blood per minute",
      "Can live without it",
      "Stores 1/3 of body's platelets"
    ],
    disorders: ["Enlarged Spleen", "Ruptured Spleen", "Hypersplenism", "Splenomegaly", "Blood Disorders"],
    stats: { size: "~12cm long", weight: "~150-200g", activity: "Continuous filtration" }
  },
  {
    id: "pancreas",
    name: "Pancreas",
    icon: Sparkles,
    image: pancreasImg,
    color: "hsl(30, 75%, 70%)",
    position: { x: 35, y: 52, width: 24, height: 12 },
    description: "A gland that produces insulin to regulate blood sugar and digestive enzymes to break down food.",
    usage: "Secretes insulin and glucagon to control blood glucose, and releases enzymes to digest proteins, fats, and carbohydrates.",
    functions: [
      "Produces insulin hormone",
      "Secretes glucagon",
      "Creates digestive enzymes",
      "Regulates blood sugar",
      "Breaks down proteins",
      "Digests fats",
      "Processes carbohydrates",
      "Maintains metabolic balance"
    ],
    facts: [
      "Produces 1-2 liters of enzymes daily",
      "Contains 1-2 million islet cells",
      "Both an endocrine and exocrine gland",
      "Can't be transplanted easily",
      "Works closely with liver"
    ],
    disorders: ["Diabetes Type 1", "Diabetes Type 2", "Pancreatitis", "Pancreatic Cancer", "Cystic Fibrosis"],
    stats: { size: "~15cm long", weight: "~100g", activity: "Continuous hormone production" }
  },
  {
    id: "kidneys",
    name: "Kidneys",
    icon: Droplets,
    image: kidneysImg,
    color: "hsl(5, 70%, 60%)",
    position: { x: 30, y: 56, width: 40, height: 18 },
    description: "Paired organs that filter waste products, excess water, and toxins from blood to produce urine.",
    usage: "Filter blood continuously, maintain fluid balance, regulate blood pressure, and produce hormones.",
    functions: [
      "Filter waste from blood",
      "Regulate fluid balance",
      "Control blood pressure",
      "Produce red blood cells",
      "Activate vitamin D",
      "Maintain pH balance",
      "Filter 200 liters daily",
      "Reabsorb essential nutrients"
    ],
    facts: [
      "Filter your blood 40 times per day",
      "Contain 1 million filtering units each",
      "Produce 1-2 liters of urine daily",
      "Right kidney is slightly lower than left",
      "Can survive with just one kidney"
    ],
    disorders: ["Kidney Stones", "Chronic Kidney Disease", "UTI", "Kidney Failure", "Polycystic Kidney"],
    stats: { size: "~10-12cm each", weight: "~150g each", activity: "Filter 180L blood/day" }
  },
  {
    id: "intestines",
    name: "Intestines",
    icon: Activity,
    image: intestinesImg,
    color: "hsl(355, 65%, 65%)",
    position: { x: 28, y: 62, width: 44, height: 28 },
    description: "A long tube where most digestion and nutrient absorption occurs, divided into small and large intestines.",
    usage: "Small intestine absorbs nutrients; large intestine absorbs water and forms waste for elimination.",
    functions: [
      "Absorb nutrients from food",
      "Extract water from waste",
      "Produce vitamins (K, B)",
      "Host beneficial bacteria",
      "Complete digestion process",
      "Form and store feces",
      "Maintain gut microbiome",
      "Support immune system"
    ],
    facts: [
      "Small intestine is 6-7 meters long",
      "Large intestine is 1.5 meters long",
      "Contains trillions of bacteria",
      "Surface area equals a studio apartment",
      "Takes 30-40 hours to digest food completely"
    ],
    disorders: ["IBS", "Crohn's Disease", "Celiac Disease", "Colorectal Cancer", "Diverticulitis"],
    stats: { size: "~7.5m total", weight: "~2kg", activity: "30-40 hours transit" }
  },
  {
    id: "bladder",
    name: "Bladder",
    icon: Droplets,
    image: bladderImg,
    color: "hsl(345, 65%, 70%)",
    position: { x: 38, y: 80, width: 24, height: 16 },
    description: "A hollow, muscular organ that stores urine before it is eliminated from the body.",
    usage: "Collects and stores urine from kidneys, then releases it through the urethra during urination.",
    functions: [
      "Stores urine temporarily",
      "Signals when full",
      "Controls urination timing",
      "Prevents bacterial infection",
      "Stretches to accommodate volume",
      "Contracts to expel urine",
      "Maintains sphincter control",
      "Protects from toxins"
    ],
    facts: [
      "Can hold 400-600ml comfortably",
      "Urge starts at 150-200ml",
      "Made of very elastic tissue",
      "Can expand to hold 1 liter",
      "Average person urinates 6-8 times daily"
    ],
    disorders: ["UTI", "Overactive Bladder", "Bladder Cancer", "Incontinence", "Bladder Stones"],
    stats: { size: "~400-600ml capacity", weight: "~40g empty", activity: "6-8 voids/day" }
  }
];

// Body parts data for the labeled anatomy view
const bodyParts: BodyPart[] = [
  // Head
  { id: "head", name: "Head", position: { x: 50, y: 5 }, labelPosition: "right", category: "head" },
  { id: "forehead", name: "Forehead", position: { x: 50, y: 3 }, labelPosition: "left", category: "head" },
  { id: "eye", name: "Eye", position: { x: 47, y: 6 }, labelPosition: "left", category: "head" },
  { id: "nose", name: "Nose", position: { x: 50, y: 8 }, labelPosition: "right", category: "head" },
  { id: "ear", name: "Ear", position: { x: 42, y: 6 }, labelPosition: "left", category: "head" },
  { id: "mouth", name: "Mouth", position: { x: 50, y: 10 }, labelPosition: "right", category: "head" },
  { id: "chin", name: "Chin", position: { x: 50, y: 12 }, labelPosition: "left", category: "head" },
  { id: "neck", name: "Neck", position: { x: 50, y: 16 }, labelPosition: "right", category: "head" },
  
  // Torso
  { id: "shoulder", name: "Shoulder", position: { x: 35, y: 20 }, labelPosition: "left", category: "torso" },
  { id: "chest", name: "Chest", position: { x: 50, y: 26 }, labelPosition: "right", category: "torso" },
  { id: "breast", name: "Breast", position: { x: 44, y: 28 }, labelPosition: "left", category: "torso" },
  { id: "abdomen", name: "Abdomen", position: { x: 50, y: 38 }, labelPosition: "right", category: "torso" },
  { id: "navel", name: "Navel", position: { x: 50, y: 42 }, labelPosition: "left", category: "torso" },
  { id: "waist", name: "Waist", position: { x: 38, y: 40 }, labelPosition: "left", category: "torso" },
  { id: "hip", name: "Hip", position: { x: 38, y: 48 }, labelPosition: "left", category: "torso" },
  { id: "pelvis", name: "Pelvis", position: { x: 50, y: 50 }, labelPosition: "right", category: "torso" },
  { id: "groin", name: "Groin", position: { x: 50, y: 54 }, labelPosition: "left", category: "torso" },
  
  // Upper Limb
  { id: "upperArm", name: "Upper Arm", position: { x: 30, y: 28 }, labelPosition: "left", category: "upper-limb" },
  { id: "elbow", name: "Elbow", position: { x: 28, y: 38 }, labelPosition: "left", category: "upper-limb" },
  { id: "forearm", name: "Forearm", position: { x: 26, y: 45 }, labelPosition: "left", category: "upper-limb" },
  { id: "wrist", name: "Wrist", position: { x: 24, y: 52 }, labelPosition: "left", category: "upper-limb" },
  { id: "hand", name: "Hand", position: { x: 22, y: 56 }, labelPosition: "left", category: "upper-limb" },
  { id: "fingers", name: "Fingers", position: { x: 20, y: 60 }, labelPosition: "left", category: "upper-limb" },
  { id: "thumb", name: "Thumb", position: { x: 26, y: 58 }, labelPosition: "left", category: "upper-limb" },
  
  // Lower Limb
  { id: "thigh", name: "Thigh", position: { x: 44, y: 60 }, labelPosition: "left", category: "lower-limb" },
  { id: "knee", name: "Knee", position: { x: 44, y: 72 }, labelPosition: "left", category: "lower-limb" },
  { id: "shin", name: "Shin", position: { x: 44, y: 80 }, labelPosition: "left", category: "lower-limb" },
  { id: "calf", name: "Calf", position: { x: 56, y: 80 }, labelPosition: "right", category: "lower-limb" },
  { id: "ankle", name: "Ankle", position: { x: 44, y: 90 }, labelPosition: "left", category: "lower-limb" },
  { id: "foot", name: "Foot", position: { x: 44, y: 95 }, labelPosition: "left", category: "lower-limb" },
  { id: "toes", name: "Toes", position: { x: 44, y: 98 }, labelPosition: "left", category: "lower-limb" },
];

// Internal organs for body parts view
// BMI Calculator Component
interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  description: string;
}

function calculateBmi(weight: number, height: number): BMIResult {
  // height in cm, weight in kg
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category: string;
  let color: string;
  let description: string;
  
  if (bmi < 18.5) {
    category = "Underweight";
    color = "hsl(200, 80%, 50%)"; // Blue
    description = "You may need to gain some weight. Consult a healthcare provider.";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal";
    color = "hsl(142, 76%, 36%)"; // Green
    description = "Great! You have a healthy weight. Keep maintaining it.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    color = "hsl(38, 92%, 50%)"; // Orange
    description = "You may need to lose some weight through diet and exercise.";
  } else {
    category = "Obese";
    color = "hsl(0, 84%, 60%)"; // Red
    description = "Consider consulting a healthcare provider for weight management.";
  }
  
  return { bmi, category, color, description };
}

function BMICalculator() {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    let weightNum: number;
    let heightNum: number;

    // Convert weight to kg
    if (weightUnit === 'kg') {
      weightNum = parseFloat(weight);
    } else {
      weightNum = parseFloat(weight) * 0.453592; // lb to kg
    }

    // Convert height to cm
    if (heightUnit === 'cm') {
      heightNum = parseFloat(height);
    } else {
      const feetNum = parseFloat(feet) || 0;
      const inchesNum = parseFloat(inches) || 0;
      heightNum = (feetNum * 30.48) + (inchesNum * 2.54); // ft/in to cm
    }

    // Validate
    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }
    if (weightNum > 500) {
      setError('Weight seems too high. Please check your input.');
      return;
    }
    if (heightNum > 300 || heightNum < 50) {
      setError('Height seems invalid. Please check your input.');
      return;
    }

    const bmiResult = calculateBmi(weightNum, heightNum);
    setResult(bmiResult);
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500 text-white">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">BMI Calculator</h2>
              <p className="text-blue-600 dark:text-blue-400">
                Calculate your Body Mass Index to understand your weight category
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Enter Your Measurements
          </CardTitle>
          <CardDescription>
            Enter your weight and height to calculate your BMI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Weight Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Weight
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={weightUnit === 'kg' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWeightUnit('kg')}
                >
                  kg
                </Button>
                <Button
                  variant={weightUnit === 'lb' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWeightUnit('lb')}
                >
                  lb
                </Button>
              </div>
            </div>
            <Input
              type="number"
              placeholder={`Enter weight in ${weightUnit}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg"
              min="0"
              max="500"
            />
          </div>

          {/* Height Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Height
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={heightUnit === 'cm' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHeightUnit('cm')}
                >
                  cm
                </Button>
                <Button
                  variant={heightUnit === 'ft' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHeightUnit('ft')}
                >
                  ft/in
                </Button>
              </div>
            </div>
            {heightUnit === 'cm' ? (
              <Input
                type="number"
                placeholder="Enter height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg"
                min="0"
                max="300"
              />
            ) : (
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="text-lg"
                    min="0"
                    max="8"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="text-lg"
                    min="0"
                    max="11"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate BMI
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className="mt-8 animate-fade-in shadow-lg overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-xl">Your BMI Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* BMI Circle Display */}
            <div className="flex flex-col items-center">
              <div 
                className="w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-lg"
                style={{ backgroundColor: result.color }}
              >
                <span className="text-3xl font-bold text-white">{result.bmi.toFixed(1)}</span>
                <span className="text-sm text-white/90">BMI</span>
              </div>
              <div className="mt-4 text-center">
                <span 
                  className="text-2xl font-bold"
                  style={{ color: result.color }}
                >
                  {result.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-muted-foreground">{result.description}</p>
            </div>

            {/* BMI Scale */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-center">BMI Categories</p>
              <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                <div className="flex-1 bg-blue-400" title="Underweight" />
                <div className="flex-1 bg-green-500" title="Normal" />
                <div className="flex-1 bg-orange-400" title="Overweight" />
                <div className="flex-1 bg-red-500" title="Obese" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>&lt;18.5</span>
                <span>18.5-24.9</span>
                <span>25-29.9</span>
                <span>&gt;30</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-blue-500">Underweight</span>
                <span className="text-green-600">Normal</span>
                <span className="text-orange-500">Overweight</span>
                <span className="text-red-500">Obese</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="mt-8 border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">What is BMI?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Body Mass Index (BMI)</strong> is a simple measurement using your height and weight to work out if your weight is healthy.
          </p>
          <p>
            The BMI calculation divides your weight (in kilograms) by your height (in meters) squared.
          </p>
          <p className="text-xs italic">
            Note: BMI is a general indicator and doesn't account for muscle mass, bone density, age, or gender. Always consult a healthcare provider for personalized advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Daily Calorie Calculator Component (BMR + TDEE)
interface CalorieResult {
  bmr: number;
  tdee: number;
  activityLevel: string;
}

const activityLevels = [
  { value: "1.2", label: "Sedentary", description: "Little or no exercise" },
  { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
  { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
  { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
  { value: "1.9", label: "Super Active", description: "Very hard training / physical job" },
];

function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Mifflin-St Jeor formula
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

function DailyCalorieCalculator() {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityFactor, setActivityFactor] = useState('1.55');
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    setResult(null);

    let weightNum: number;
    let heightNum: number;
    const ageNum = parseInt(age);

    // Convert weight to kg
    if (weightUnit === 'kg') {
      weightNum = parseFloat(weight);
    } else {
      weightNum = parseFloat(weight) * 0.453592; // lb to kg
    }

    // Convert height to cm
    if (heightUnit === 'cm') {
      heightNum = parseFloat(height);
    } else {
      const feetNum = parseFloat(feet) || 0;
      const inchesNum = parseFloat(inches) || 0;
      heightNum = (feetNum * 30.48) + (inchesNum * 2.54); // ft/in to cm
    }

    // Validate
    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    if (isNaN(heightNum) || heightNum <= 0) {
      setError('Please enter a valid height');
      return;
    }
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      setError('Please enter a valid age (1-120)');
      return;
    }
    if (weightNum > 500) {
      setError('Weight seems too high. Please check your input.');
      return;
    }
    if (heightNum > 300 || heightNum < 50) {
      setError('Height seems invalid. Please check your input.');
      return;
    }

    const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
    const tdee = bmr * parseFloat(activityFactor);
    const selectedActivity = activityLevels.find(a => a.value === activityFactor);

    setResult({
      bmr,
      tdee,
      activityLevel: selectedActivity?.label || 'Moderate'
    });
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setAge('');
    setGender('male');
    setActivityFactor('1.55');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-500 text-white">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-800 dark:text-orange-200">Daily Calorie Calculator</h2>
              <p className="text-orange-600 dark:text-orange-400">
                Calculate your BMR and daily calorie needs based on activity level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Enter Your Details
          </CardTitle>
          <CardDescription>
            Provide your measurements, age, gender, and activity level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gender Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Gender
            </Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as 'male' | 'female')}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">Female</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Age Input */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Age (years)</Label>
            <Input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="text-lg"
              min="1"
              max="120"
            />
          </div>

          {/* Weight Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Weight
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={weightUnit === 'kg' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWeightUnit('kg')}
                >
                  kg
                </Button>
                <Button
                  variant={weightUnit === 'lb' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWeightUnit('lb')}
                >
                  lb
                </Button>
              </div>
            </div>
            <Input
              type="number"
              placeholder={`Enter weight in ${weightUnit}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="text-lg"
              min="0"
              max="500"
            />
          </div>

          {/* Height Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Height
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={heightUnit === 'cm' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHeightUnit('cm')}
                >
                  cm
                </Button>
                <Button
                  variant={heightUnit === 'ft' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHeightUnit('ft')}
                >
                  ft/in
                </Button>
              </div>
            </div>
            {heightUnit === 'cm' ? (
              <Input
                type="number"
                placeholder="Enter height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg"
                min="0"
                max="300"
              />
            ) : (
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="text-lg"
                    min="0"
                    max="8"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="text-lg"
                    min="0"
                    max="11"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity Level
            </Label>
            <Select value={activityFactor} onValueChange={setActivityFactor}>
              <SelectTrigger className="text-lg">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{level.label}</span>
                      <span className="text-xs text-muted-foreground">{level.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              <Flame className="w-4 h-4 mr-2" />
              Calculate Calories
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className="mt-8 animate-fade-in shadow-lg overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30">
            <CardTitle className="text-center text-xl">Your Daily Calorie Needs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* BMR & TDEE Display */}
            <div className="grid grid-cols-2 gap-4">
              {/* BMR */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
                <div className="p-3 rounded-full bg-blue-500 text-white w-fit mx-auto mb-3">
                  <Activity className="w-5 h-5" />
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Basal Metabolic Rate</p>
                <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{Math.round(result.bmr)}</p>
                <p className="text-xs text-blue-500 dark:text-blue-400">kcal/day</p>
                <p className="text-xs text-muted-foreground mt-2">Calories at complete rest</p>
              </div>

              {/* TDEE */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200 dark:border-orange-800">
                <div className="p-3 rounded-full bg-orange-500 text-white w-fit mx-auto mb-3">
                  <Flame className="w-5 h-5" />
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">Daily Calorie Requirement</p>
                <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">{Math.round(result.tdee)}</p>
                <p className="text-xs text-orange-500 dark:text-orange-400">kcal/day</p>
                <p className="text-xs text-muted-foreground mt-2">{result.activityLevel} activity</p>
              </div>
            </div>

            {/* Calorie Goals */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-center">Calorie Goals</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-600 dark:text-green-400 mb-1">Weight Loss</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">{Math.round(result.tdee - 500)}</p>
                  <p className="text-xs text-muted-foreground">-500 cal/day</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Maintain Weight</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{Math.round(result.tdee)}</p>
                  <p className="text-xs text-muted-foreground">TDEE</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                  <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Weight Gain</p>
                  <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{Math.round(result.tdee + 500)}</p>
                  <p className="text-xs text-muted-foreground">+500 cal/day</p>
                </div>
              </div>
            </div>

            {/* Activity Factor Scale */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-center">Activity Level Multipliers</p>
              <div className="space-y-2">
                {activityLevels.map((level) => (
                  <div 
                    key={level.value} 
                    className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                      level.value === activityFactor 
                        ? 'bg-primary/10 border border-primary' 
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${level.value === activityFactor ? 'text-primary' : ''}`}>
                        {level.label}
                      </span>
                      <span className="text-xs text-muted-foreground">({level.description})</span>
                    </div>
                    <span className="font-mono text-xs">×{level.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="mt-8 border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">What is BMR & TDEE?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs at complete rest to maintain vital functions like breathing, circulation, and cell production.
          </p>
          <p>
            <strong>Total Daily Energy Expenditure (TDEE)</strong> is your BMR multiplied by an activity factor. This represents the total calories you burn in a day including physical activity.
          </p>
          <p>
            We use the <strong>Mifflin-St Jeor formula</strong>, which is considered the most accurate for estimating BMR.
          </p>
          <p className="text-xs italic">
            Note: These are estimates. Individual metabolism varies based on genetics, muscle mass, hormones, and other factors. Consult a healthcare provider for personalized advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Macro Calculator Tab Component
function MacroCalculatorTab() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("1.55");
  const [goal, setGoal] = useState<string>("maintain");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const activityMultipliers: { [key: string]: { label: string; description: string } } = {
    "1.2": { label: "Sedentary", description: "Desk job, little exercise" },
    "1.375": { label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    "1.55": { label: "Moderate", description: "Gym 3-5 times/week" },
    "1.725": { label: "Very Active", description: "Heavy workouts daily" },
    "1.9": { label: "Super Active", description: "Athlete or physical job" },
  };

  const goalAdjustments: { [key: string]: { factor: number; label: string; proteinMultiplier: number } } = {
    loss: { factor: 0.80, label: "Fat Loss (-20%)", proteinMultiplier: 1.8 },
    maintain: { factor: 1.0, label: "Maintenance", proteinMultiplier: 1.6 },
    gain: { factor: 1.10, label: "Muscle Gain (+10%)", proteinMultiplier: 2.0 },
  };

  const calculateMacros = () => {
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseInt(age);

    if (!weightKg || !heightCm || !ageYears) return;

    // BMR using Mifflin-St Jeor
    let bmr: number;
    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // TDEE
    const tdee = bmr * parseFloat(activityLevel);

    // Goal calories
    const goalCalories = tdee * goalAdjustments[goal].factor;

    // Macros
    const proteinGrams = weightKg * goalAdjustments[goal].proteinMultiplier;
    const proteinCalories = proteinGrams * 4;
    const fatCalories = goalCalories * 0.25;
    const fatGrams = fatCalories / 9;
    const carbsCalories = goalCalories - proteinCalories - fatCalories;
    const carbsGrams = carbsCalories / 4;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fat: Math.round(fatGrams),
    });
  };

  const resetCalculator = () => {
    setSex("male");
    setAge("");
    setWeight("");
    setHeight("");
    setActivityLevel("1.55");
    setGoal("maintain");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8 bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-950/30 dark:to-green-950/30 border-lime-200 dark:border-lime-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-lime-800 dark:text-lime-200 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Macro Calculator
          </h2>
          <p className="text-lime-600 dark:text-lime-400">
            Calculate your daily protein, carbs, and fat targets based on your fitness goals
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={sex} onValueChange={(v) => setSex(v as "male" | "female")} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="macro-male" />
                  <Label htmlFor="macro-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="macro-female" />
                  <Label htmlFor="macro-female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Age, Weight, Height */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="macro-age">Age</Label>
                <Input id="macro-age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="macro-weight">Weight (kg)</Label>
                <Input id="macro-weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="macro-height">Height (cm)</Label>
                <Input id="macro-height" type="number" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityMultipliers).map(([key, { label, description }]) => (
                    <SelectItem key={key} value={key}>
                      {label} - {description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <Label>Fitness Goal</Label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(goalAdjustments).map(([key, { label }]) => (
                  <Button
                    key={key}
                    variant={goal === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGoal(key)}
                    className={goal === key ? "bg-lime-600 hover:bg-lime-700" : ""}
                  >
                    {label.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={calculateMacros} className="flex-1 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Macros
              </Button>
              <Button variant="outline" onClick={resetCalculator}>Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {result ? (
            <>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    Your Daily Targets
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{result.bmr}</div>
                      <div className="text-xs text-muted-foreground">BMR</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{result.tdee}</div>
                      <div className="text-xs text-muted-foreground">TDEE</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300">
                      <div className="text-xl font-bold text-green-600">{result.goalCalories}</div>
                      <div className="text-xs text-muted-foreground">Target</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-lime-600" />
                    Macro Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-red-700 dark:text-red-400">Protein</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">{Math.round(result.protein * 4)} kcal</Badge>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{result.protein}g</div>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">Carbohydrates</span>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">{Math.round(result.carbs * 4)} kcal</Badge>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">{result.carbs}g</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-700 dark:text-blue-400">Fat</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">{Math.round(result.fat * 9)} kcal</Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{result.fat}g</div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>What Are Macros?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Protein:</strong> Muscle building & repair (4 cal/gram)</p>
                <p><strong>Carbohydrates:</strong> Primary energy source (4 cal/gram)</p>
                <p><strong>Fat:</strong> Hormone balance & energy storage (9 cal/gram)</p>
                <div className="p-3 bg-lime-50 dark:bg-lime-900/20 rounded-lg mt-4">
                  <p className="text-lime-700 dark:text-lime-300 font-medium">
                    Enter your details to get personalized macro targets!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

const internalOrgans: BodyPart[] = [
  { id: "brain-part", name: "Brain", position: { x: 50, y: 5 }, labelPosition: "right", category: "head" },
  { id: "thyroid", name: "Thyroid", position: { x: 50, y: 17 }, labelPosition: "right", category: "torso" },
  { id: "trachea", name: "Trachea", position: { x: 50, y: 19 }, labelPosition: "left", category: "torso" },
  { id: "lungs-part", name: "Lungs", position: { x: 44, y: 26 }, labelPosition: "left", category: "torso" },
  { id: "heart-part", name: "Heart", position: { x: 52, y: 30 }, labelPosition: "right", category: "torso" },
  { id: "diaphragm", name: "Diaphragm", position: { x: 50, y: 36 }, labelPosition: "left", category: "torso" },
  { id: "liver-part", name: "Liver", position: { x: 56, y: 38 }, labelPosition: "right", category: "torso" },
  { id: "stomach-part", name: "Stomach", position: { x: 44, y: 40 }, labelPosition: "left", category: "torso" },
  { id: "spleen-part", name: "Spleen", position: { x: 60, y: 42 }, labelPosition: "right", category: "torso" },
  { id: "gallbladder", name: "Gallbladder", position: { x: 54, y: 42 }, labelPosition: "right", category: "torso" },
  { id: "pancreas-part", name: "Pancreas", position: { x: 50, y: 44 }, labelPosition: "left", category: "torso" },
  { id: "kidneys-part", name: "Kidneys", position: { x: 56, y: 46 }, labelPosition: "right", category: "torso" },
  { id: "small-intestine", name: "Small Intestine", position: { x: 50, y: 50 }, labelPosition: "left", category: "torso" },
  { id: "large-intestine", name: "Large Intestine", position: { x: 56, y: 52 }, labelPosition: "right", category: "torso" },
  { id: "appendix", name: "Appendix", position: { x: 58, y: 54 }, labelPosition: "right", category: "torso" },
  { id: "bladder-part", name: "Bladder", position: { x: 50, y: 56 }, labelPosition: "left", category: "torso" },
  { id: "reproductive", name: "Reproductive Organs", position: { x: 50, y: 58 }, labelPosition: "right", category: "torso" },
];

export default function BodyExplorer() {
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const resetView = () => {
    setSelectedOrgan(null);
    setHoveredOrgan(null);
  };

  const categoryColors = {
    'head': 'hsl(280, 70%, 65%)',
    'torso': 'hsl(0, 85%, 60%)',
    'upper-limb': 'hsl(200, 70%, 50%)',
    'lower-limb': 'hsl(150, 60%, 45%)',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Know Your Body
          </h1>
          <p className="text-xl text-muted-foreground">Explore the Human Anatomy</p>
        </div>

        {/* Tabs for switching between views */}
        <Tabs defaultValue="organs" className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="organs" className="flex items-center gap-1 text-xs sm:text-sm">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Internal</span> Organs
            </TabsTrigger>
            <TabsTrigger value="body-parts" className="flex items-center gap-1 text-xs sm:text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Body</span> Parts
            </TabsTrigger>
            <TabsTrigger value="bmi-calc" className="flex items-center gap-1 text-xs sm:text-sm">
              <Calculator className="h-4 w-4" />
              BMI
            </TabsTrigger>
            <TabsTrigger value="calorie-calc" className="flex items-center gap-1 text-xs sm:text-sm">
              <Flame className="h-4 w-4" />
              Calorie
            </TabsTrigger>
            <TabsTrigger value="macro-calc" className="flex items-center gap-1 text-xs sm:text-sm">
              <Target className="h-4 w-4" />
              Macro
            </TabsTrigger>
          </TabsList>

          {/* Internal Organs Tab (existing content) */}
          <TabsContent value="organs" className="animate-fade-in">
            <p className="text-sm text-muted-foreground text-center mb-8">Click on any organ to explore detailed information</p>

            {/* Quick Navigation Panel */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZoomIn className="h-5 w-5" />
                  Quick Navigation
                </CardTitle>
                <CardDescription>Jump directly to any organ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {organs.map((organ) => (
                    <Button
                      key={organ.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOrgan(organ)}
                      className="hover:scale-105 transition-transform"
                    >
                      <organ.icon className="h-4 w-4 mr-2" style={{ color: organ.color }} />
                      {organ.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Body Viewer */}
              <Card className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <CardContent className="p-4">
                  {selectedOrgan && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetView}
                      className="absolute top-4 right-4 z-20"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset View
                    </Button>
                  )}
                  
                  <div className="relative h-[700px] flex items-center justify-center overflow-hidden">
                    {/* Body Silhouette */}
                    <div className={`relative w-full h-full transition-all duration-700 ${
                      selectedOrgan ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
                    }`}>
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Head */}
                        <ellipse cx="50" cy="8" rx="8" ry="10" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        {/* Neck */}
                        <rect x="47" y="16" width="6" height="6" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        {/* Torso */}
                        <path 
                          d="M 35 22 L 35 70 Q 35 75 40 75 L 60 75 Q 65 75 65 70 L 65 22 Q 65 22 50 22 Q 35 22 35 22" 
                          fill="none" 
                          stroke="hsl(var(--border))" 
                          strokeWidth="0.3" 
                          opacity="0.5"
                        />
                        {/* Shoulders */}
                        <ellipse cx="28" cy="25" rx="5" ry="6" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        <ellipse cx="72" cy="25" rx="5" ry="6" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        {/* Arms */}
                        <rect x="23" y="30" width="4" height="25" rx="2" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        <rect x="73" y="30" width="4" height="25" rx="2" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        {/* Pelvis */}
                        <ellipse cx="50" cy="78" rx="12" ry="8" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        {/* Legs */}
                        <rect x="42" y="84" width="6" height="14" rx="3" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                        <rect x="52" y="84" width="6" height="14" rx="3" fill="none" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5"/>
                      </svg>
                    </div>

                    {/* Organs Layer */}
                    <div className="absolute inset-0 w-full h-full">
                      {organs.map((organ) => {
                        const isSelected = selectedOrgan?.id === organ.id;
                        const isHovered = hoveredOrgan === organ.id;
                        const shouldHighlight = isSelected || isHovered;
                        
                        return (
                          <div
                            key={organ.id}
                            className={`absolute cursor-pointer transition-all duration-700 ease-out ${
                              isSelected ? 'z-30 scale-[2.5]' : shouldHighlight ? 'z-20 scale-110' : 'z-10 scale-100'
                            }`}
                            style={{
                              left: `${organ.position.x}%`,
                              top: `${organ.position.y}%`,
                              width: `${organ.position.width}%`,
                              height: `${organ.position.height}%`,
                              filter: shouldHighlight ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))' : 'none',
                              transform: isSelected ? 'translate(-50%, -50%)' : 'translate(0, 0)',
                              transformOrigin: 'center',
                            }}
                            onClick={() => setSelectedOrgan(organ)}
                            onMouseEnter={() => setHoveredOrgan(organ.id)}
                            onMouseLeave={() => setHoveredOrgan(null)}
                          >
                            <img 
                              src={organ.image} 
                              alt={organ.name}
                              className={`w-full h-full object-contain transition-all duration-300 ${
                                shouldHighlight ? 'brightness-110' : 'brightness-100'
                              }`}
                            />
                            
                            {/* Label */}
                            {!isSelected && (
                              <div 
                                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                                  shouldHighlight ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                }`}
                              >
                                <div 
                                  className="px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                                  style={{ 
                                    backgroundColor: organ.color,
                                    color: 'white'
                                  }}
                                >
                                  {organ.name}
                                </div>
                              </div>
                            )}

                            {/* Pulse Animation */}
                            {shouldHighlight && !isSelected && (
                              <div 
                                className="absolute inset-0 rounded-full animate-ping opacity-30"
                                style={{ backgroundColor: organ.color }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organ Detail Panel */}
              <div className="space-y-4">
                {selectedOrgan ? (
                  <Card className="animate-fade-in">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-full shadow-lg" style={{ backgroundColor: selectedOrgan.color }}>
                            <selectedOrgan.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{selectedOrgan.name}</CardTitle>
                            <CardDescription>{selectedOrgan.description}</CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedOrgan(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Organ Image */}
                      <div className="flex justify-center">
                        <img 
                          src={selectedOrgan.image} 
                          alt={selectedOrgan.name}
                          className="w-48 h-48 object-contain drop-shadow-2xl"
                        />
                      </div>

                      {/* Usage */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          How It Works
                        </h3>
                        <p className="text-muted-foreground">{selectedOrgan.usage}</p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Size</p>
                          <p className="font-semibold text-sm">{selectedOrgan.stats.size}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Weight</p>
                          <p className="font-semibold text-sm">{selectedOrgan.stats.weight}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Activity</p>
                          <p className="font-semibold text-sm">{selectedOrgan.stats.activity}</p>
                        </div>
                      </div>

                      {/* Functions */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Key Functions
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedOrgan.functions.map((func, idx) => (
                            <Badge key={idx} variant="secondary" className="justify-start">
                              {func}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Amazing Facts */}
                      <div>
                        <h3 className="font-semibold mb-3">Amazing Facts</h3>
                        <ul className="space-y-2">
                          {selectedOrgan.facts.map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Disorders */}
                      <div>
                        <h3 className="font-semibold mb-3">Related Medical Conditions</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedOrgan.disorders.map((disorder, idx) => (
                            <Badge key={idx} variant="outline">
                              {disorder}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <ZoomIn className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Click on any organ to explore detailed information
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Body Parts Tab (new content) */}
          <TabsContent value="body-parts" className="animate-fade-in">
            {/* Body Parts Section Header */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Human Anatomy</h2>
                    <p className="text-green-600 dark:text-green-400">
                      Explore internal organs and external body parts with detailed labeled diagrams
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anatomy Images Display - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Internal Organs Image */}
              <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-b">
                  <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                    <Activity className="w-5 h-5" />
                    Internal Organs
                  </CardTitle>
                  <CardDescription>
                    Major organs inside the human body
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-slate-900 dark:to-slate-800">
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src="https://res.cloudinary.com/di4yfgmlz/image/upload/v1768899400/BODY%20PARTS/Internal_Organs_ke7xmk.png"
                      alt="Human Internal Organs Anatomy Diagram showing Trachea, Esophagus, Lungs, Heart, Liver, Stomach, Spleen, Pancreas, Kidneys, Intestines, and Bladder"
                      className="w-full h-auto object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* External Body Parts Image */}
              <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-b">
                  <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <User className="w-5 h-5" />
                    External Body Parts
                  </CardTitle>
                  <CardDescription>
                    External anatomical parts labeled
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-slate-900 dark:to-slate-800">
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src="https://res.cloudinary.com/di4yfgmlz/image/upload/v1768899400/BODY%20PARTS/External_Body_Parts_lcdjcv.png"
                      alt="Human External Body Parts Anatomy Diagram showing Head, Forehead, Eyes, Nose, Mouth, Neck, Shoulders, Chest, Arms, Elbows, Hands, Fingers, Knees, Ankles, Feet, and Toes"
                      className="w-full h-auto object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Reference Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50/50 to-pink-50/30 dark:from-rose-950/20 dark:to-pink-950/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-rose-700 dark:text-rose-300">
                    <Activity className="w-5 h-5" />
                    Key Internal Organs
                  </CardTitle>
                  <CardDescription>Vital organs essential for body functions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Brain", "Heart", "Lungs", "Liver", "Stomach", "Kidneys", "Pancreas", "Spleen", "Small Intestine", "Large Intestine", "Bladder", "Esophagus", "Trachea", "Gallbladder", "Ureter"].map((organ) => (
                      <Badge key={organ} variant="secondary" className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 hover:bg-rose-200 transition-colors">
                        {organ}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <User className="w-5 h-5" />
                    Key External Parts
                  </CardTitle>
                  <CardDescription>External body parts visible on the body surface</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Head", "Scalp", "Forehead", "Eyes", "Eyebrows", "Ears", "Nose", "Mouth", "Lips", "Chin", "Cheeks", "Neck", "Shoulders", "Chest", "Armpits", "Upper Arms", "Elbows", "Forearms", "Wrists", "Hands", "Fingers", "Navel", "Knees", "Lower Legs", "Ankles", "Feet", "Toes"].map((part) => (
                      <Badge key={part} variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 transition-colors">
                        {part}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* BMI Calculator Tab */}
          <TabsContent value="bmi-calc" className="animate-fade-in">
            <BMICalculator />
          </TabsContent>

          {/* Daily Calorie Calculator Tab */}
          <TabsContent value="calorie-calc" className="animate-fade-in">
            <DailyCalorieCalculator />
          </TabsContent>

          {/* Macro Calculator Tab */}
          <TabsContent value="macro-calc" className="animate-fade-in">
            <MacroCalculatorTab />
          </TabsContent>

        </Tabs>

        {/* Educational Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Educational Disclaimer:</strong> This interactive tool is for learning purposes only. 
            Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
