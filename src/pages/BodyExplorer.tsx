import React, { useState } from "react";
import { Brain, Heart, Activity, Droplets, Apple, Sparkles, X, ZoomIn, Wind, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

// Organ callout positions - arranged around the body like in reference image
const organCallouts = [
  { id: "brain", angle: 45, distance: 280, bodyX: 50, bodyY: 8 },
  { id: "lungs", angle: 135, distance: 260, bodyX: 42, bodyY: 28 },
  { id: "heart", angle: 0, distance: 320, bodyX: 52, bodyY: 35 },
  { id: "liver", angle: 180, distance: 260, bodyX: 32, bodyY: 42 },
  { id: "kidneys", angle: 210, distance: 280, bodyX: 42, bodyY: 56 },
  { id: "stomach", angle: 340, distance: 300, bodyX: 58, bodyY: 50 },
  { id: "pancreas", angle: 240, distance: 300, bodyX: 40, bodyY: 52 },
  { id: "intestines", angle: 300, distance: 320, bodyX: 50, bodyY: 68 },
  { id: "bladder", angle: 270, distance: 280, bodyX: 50, bodyY: 80 },
  { id: "spleen", angle: 160, distance: 240, bodyX: 28, bodyY: 45 },
];

export default function BodyExplorer() {
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  const resetView = () => {
    setSelectedOrgan(null);
    setHoveredOrgan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            THE HUMAN BODY
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium">Internal Organs</p>
          <p className="text-sm text-muted-foreground mt-2">Click on any organ to explore detailed information</p>
        </div>

        {/* Main Interactive Body Display */}
        <div className="relative max-w-7xl mx-auto mb-8">
          <Card className="relative overflow-visible bg-gradient-to-br from-background to-muted/5 border-2">
            <CardContent className="p-4 md:p-8">
              {selectedOrgan && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetView}
                  className="absolute top-4 right-4 z-30 shadow-lg"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
              
              <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center">
                {/* Central Body Silhouette with Organs */}
                <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[650px]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Male Body Silhouette - Skin tone */}
                    <defs>
                      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'hsl(25, 60%, 75%)', stopOpacity: 0.9 }} />
                        <stop offset="100%" style={{ stopColor: 'hsl(25, 55%, 70%)', stopOpacity: 0.9 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* Head */}
                    <ellipse cx="50" cy="8" rx="7" ry="9" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    
                    {/* Neck */}
                    <rect x="46" y="15" width="8" height="7" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    
                    {/* Torso - Main body */}
                    <path 
                      d="M 32 22 L 32 65 Q 32 72 38 72 L 62 72 Q 68 72 68 65 L 68 22 L 60 22 L 60 24 Q 58 22 50 22 Q 42 22 40 24 L 40 22 Z" 
                      fill="url(#skinGradient)" 
                      stroke="hsl(25, 50%, 60%)" 
                      strokeWidth="0.4"
                    />
                    
                    {/* Shoulders */}
                    <ellipse cx="32" cy="24" rx="6" ry="7" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    <ellipse cx="68" cy="24" rx="6" ry="7" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    
                    {/* Arms */}
                    <rect x="22" y="28" width="6" height="30" rx="3" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    <rect x="72" y="28" width="6" height="30" rx="3" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    
                    {/* Hands */}
                    <ellipse cx="25" cy="60" rx="3" ry="4" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    <ellipse cx="75" cy="60" rx="3" ry="4" fill="url(#skinGradient)" stroke="hsl(25, 50%, 60%)" strokeWidth="0.4"/>
                    
                    {/* Pelvis/Hips */}
                    <path 
                      d="M 38 72 L 38 78 L 42 85 L 42 98 L 46 98 L 46 85 Q 46 82 48 82 L 52 82 Q 54 82 54 85 L 54 98 L 58 98 L 58 85 L 62 78 L 62 72 Z" 
                      fill="url(#skinGradient)" 
                      stroke="hsl(25, 50%, 60%)" 
                      strokeWidth="0.4"
                    />

                    {/* Internal Organs - positioned anatomically */}
                    {/* Brain */}
                    <ellipse cx="50" cy="7" rx="5" ry="4" fill="hsl(340, 80%, 70%)" opacity="0.7" stroke="hsl(340, 70%, 50%)" strokeWidth="0.3"/>
                    
                    {/* Lungs - both sides */}
                    <ellipse cx="44" cy="32" rx="6" ry="10" fill="hsl(340, 75%, 65%)" opacity="0.6" stroke="hsl(340, 70%, 50%)" strokeWidth="0.3"/>
                    <ellipse cx="56" cy="32" rx="6" ry="10" fill="hsl(340, 75%, 65%)" opacity="0.6" stroke="hsl(340, 70%, 50%)" strokeWidth="0.3"/>
                    
                    {/* Heart */}
                    <path d="M 50 38 L 47 42 L 50 45 L 53 42 Z" fill="hsl(0, 85%, 60%)" opacity="0.7" stroke="hsl(0, 75%, 50%)" strokeWidth="0.3"/>
                    
                    {/* Liver */}
                    <ellipse cx="54" cy="48" rx="8" ry="6" fill="hsl(15, 70%, 50%)" opacity="0.7" stroke="hsl(15, 60%, 40%)" strokeWidth="0.3"/>
                    
                    {/* Stomach */}
                    <ellipse cx="46" cy="50" rx="4" ry="6" fill="hsl(350, 70%, 65%)" opacity="0.6" stroke="hsl(350, 60%, 50%)" strokeWidth="0.3"/>
                    
                    {/* Pancreas */}
                    <ellipse cx="50" cy="52" rx="6" ry="3" fill="hsl(30, 75%, 70%)" opacity="0.6" stroke="hsl(30, 65%, 55%)" strokeWidth="0.3"/>
                    
                    {/* Kidneys - both sides */}
                    <ellipse cx="45" cy="56" rx="3" ry="5" fill="hsl(5, 70%, 60%)" opacity="0.6" stroke="hsl(5, 60%, 50%)" strokeWidth="0.3"/>
                    <ellipse cx="55" cy="56" rx="3" ry="5" fill="hsl(5, 70%, 60%)" opacity="0.6" stroke="hsl(5, 60%, 50%)" strokeWidth="0.3"/>
                    
                    {/* Intestines */}
                    <path d="M 45 60 Q 48 62 50 60 Q 52 62 55 60 L 55 68 Q 50 70 45 68 Z" fill="hsl(355, 65%, 65%)" opacity="0.6" stroke="hsl(355, 60%, 50%)" strokeWidth="0.3"/>
                    
                    {/* Bladder */}
                    <ellipse cx="50" cy="75" rx="4" ry="3" fill="hsl(345, 65%, 70%)" opacity="0.6" stroke="hsl(345, 60%, 55%)" strokeWidth="0.3"/>
                  </svg>

                  {/* Connecting Lines and Organ Callouts */}
                  {organCallouts.map((callout) => {
                    const organ = organs.find(o => o.id === callout.id);
                    if (!organ) return null;
                    
                    const isSelected = selectedOrgan?.id === organ.id;
                    const isHovered = hoveredOrgan === organ.id;
                    const shouldHighlight = isSelected || isHovered;
                    
                    // Calculate callout position (around the body)
                    const angle = (callout.angle * Math.PI) / 180;
                    const radius = callout.distance;
                    const centerX = 50;
                    const centerY = 50;
                    
                    // Callout position in percentage
                    const calloutXPercent = centerX + (Math.cos(angle) * radius / 4);
                    const calloutYPercent = centerY + (Math.sin(angle) * radius / 6.5);
                    
                    return (
                      <React.Fragment key={organ.id}>
                        {/* Connecting Line */}
                        <svg 
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          style={{ zIndex: 1 }}
                        >
                          <line
                            x1={`${callout.bodyX}%`}
                            y1={`${callout.bodyY}%`}
                            x2={`${calloutXPercent}%`}
                            y2={`${calloutYPercent}%`}
                            stroke={shouldHighlight ? organ.color : 'hsl(var(--border))'}
                            strokeWidth={shouldHighlight ? "2" : "1"}
                            strokeDasharray="4,4"
                            className="transition-all duration-300"
                            opacity={shouldHighlight ? "0.8" : "0.4"}
                          />
                        </svg>

                        {/* Organ Callout Circle */}
                        <div
                          className={`absolute cursor-pointer transition-all duration-500 ${
                            shouldHighlight ? 'z-20' : 'z-10'
                          }`}
                          style={{
                            left: `${calloutXPercent}%`,
                            top: `${calloutYPercent}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          onClick={() => setSelectedOrgan(organ)}
                          onMouseEnter={() => setHoveredOrgan(organ.id)}
                          onMouseLeave={() => setHoveredOrgan(null)}
                        >
                          {/* Circular Background */}
                          <div 
                            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-background border-2 shadow-lg flex items-center justify-center transition-all duration-300 ${
                              shouldHighlight ? 'scale-125 shadow-2xl' : 'scale-100'
                            }`}
                            style={{
                              borderColor: shouldHighlight ? organ.color : 'hsl(var(--border))',
                            }}
                          >
                            {/* Organ Image */}
                            <img 
                              src={organ.image} 
                              alt={organ.name}
                              className="w-14 h-14 md:w-16 md:h-16 object-contain"
                            />
                            
                            {/* Glow Effect */}
                            {shouldHighlight && (
                              <div 
                                className="absolute inset-0 rounded-full animate-pulse opacity-40"
                                style={{ 
                                  backgroundColor: organ.color,
                                  filter: 'blur(8px)',
                                  zIndex: -1
                                }}
                              />
                            )}
                          </div>

                          {/* Organ Label */}
                          <div 
                            className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                              shouldHighlight ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
                            }`}
                          >
                            <div 
                              className="px-2 py-1 rounded text-xs font-semibold text-center uppercase tracking-wide"
                              style={{ 
                                color: shouldHighlight ? organ.color : 'hsl(var(--foreground))',
                              }}
                            >
                              {organ.name.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
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
