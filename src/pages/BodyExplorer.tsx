import { useState } from "react";
import { Brain, Heart, Activity, Droplets, Apple, Sparkles, X, ZoomIn, Wind, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Organ {
  id: string;
  name: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
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
    color: "hsl(var(--primary))",
    position: { x: 50, y: 10 },
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
    id: "heart",
    name: "Heart",
    icon: Heart,
    color: "hsl(0, 70%, 50%)",
    position: { x: 45, y: 30 },
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
    id: "lungs",
    name: "Lungs",
    icon: Wind,
    color: "hsl(200, 70%, 50%)",
    position: { x: 50, y: 28 },
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
    id: "liver",
    name: "Liver",
    icon: Activity,
    color: "hsl(30, 70%, 40%)",
    position: { x: 55, y: 42 },
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
    color: "hsl(45, 70%, 50%)",
    position: { x: 48, y: 45 },
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
    id: "pancreas",
    name: "Pancreas",
    icon: Sparkles,
    color: "hsl(320, 60%, 50%)",
    position: { x: 52, y: 47 },
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
    color: "hsl(280, 60%, 50%)",
    position: { x: 50, y: 50 },
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
    color: "hsl(150, 60%, 45%)",
    position: { x: 50, y: 58 },
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
    color: "hsl(190, 60%, 50%)",
    position: { x: 50, y: 68 },
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
  },
  {
    id: "spleen",
    name: "Spleen",
    icon: Filter,
    color: "hsl(340, 60%, 50%)",
    position: { x: 42, y: 44 },
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
  }
];

export default function BodyExplorer() {
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);

  const resetView = () => {
    setSelectedOrgan(null);
    setHoveredOrgan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Know Your Body
          </h1>
          <p className="text-xl text-muted-foreground mb-2">Internal Organs Interactive Explorer</p>
          <p className="text-sm text-muted-foreground">Click on any organ to explore detailed information</p>
        </div>

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
          <Card className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
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
                {/* SVG Body with Organs */}
                <svg 
                  viewBox="0 0 400 700" 
                  className={`w-full h-full transition-all duration-700 ${
                    selectedOrgan ? 'scale-150' : 'scale-100'
                  }`}
                  style={{ 
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                  }}
                >
                  {/* Body Silhouette */}
                  <g>
                    {/* Head */}
                    <ellipse cx="200" cy="60" rx="45" ry="55" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    
                    {/* Neck */}
                    <rect x="185" y="105" width="30" height="35" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    
                    {/* Torso */}
                    <path 
                      d="M 155 140 L 155 400 Q 155 420 175 420 L 225 420 Q 245 420 245 400 L 245 140 Q 245 140 200 140 Q 155 140 155 140" 
                      fill="hsl(var(--muted))" 
                      opacity="0.3" 
                      stroke="hsl(var(--border))" 
                      strokeWidth="2"
                    />
                    
                    {/* Shoulders */}
                    <ellipse cx="130" cy="160" rx="25" ry="30" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    <ellipse cx="270" cy="160" rx="25" ry="30" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    
                    {/* Arms */}
                    <rect x="105" y="180" width="20" height="150" rx="10" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    <rect x="275" y="180" width="20" height="150" rx="10" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    
                    {/* Pelvis */}
                    <ellipse cx="200" cy="440" rx="60" ry="40" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    
                    {/* Legs */}
                    <rect x="165" y="460" width="30" height="180" rx="15" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                    <rect x="205" y="460" width="30" height="180" rx="15" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="2"/>
                  </g>

                  {/* Organs with transparent colored overlays */}
                  {organs.map((organ) => {
                    const isSelected = selectedOrgan?.id === organ.id;
                    const isHovered = hoveredOrgan === organ.id;
                    const shouldHighlight = isSelected || isHovered;
                    
                    // Organ shapes based on position
                    let organPath = "";
                    let organShape: JSX.Element;
                    
                    switch(organ.id) {
                      case "brain":
                        organShape = (
                          <g key={organ.id}>
                            <ellipse cx="200" cy="50" rx="38" ry="45" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="165" y="80" width="70" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="200" y="97" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Brain</text>
                          </g>
                        );
                        break;
                      
                      case "heart":
                        organShape = (
                          <g key={organ.id}>
                            <path d="M 185 200 L 200 220 L 215 200 Q 225 185 215 175 Q 205 170 200 175 Q 195 170 185 175 Q 175 185 185 200" 
                              fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="165" y="205" width="70" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="200" y="222" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Heart</text>
                          </g>
                        );
                        break;
                      
                      case "lungs":
                        organShape = (
                          <g key={organ.id}>
                            <ellipse cx="175" cy="190" rx="25" ry="45" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <ellipse cx="225" cy="190" rx="25" ry="45" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="165" y="145" width="70" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="200" y="162" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Lungs</text>
                          </g>
                        );
                        break;
                      
                      case "liver":
                        organShape = (
                          <g key={organ.id}>
                            <path d="M 160 260 L 220 260 Q 235 265 230 280 L 210 290 L 165 290 Q 155 285 160 270 Z" 
                              fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="165" y="250" width="70" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="200" y="267" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Liver</text>
                          </g>
                        );
                        break;
                      
                      case "stomach":
                        organShape = (
                          <g key={organ.id}>
                            <ellipse cx="185" cy="300" rx="22" ry="35" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="215" y="285" width="85" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="257" y="302" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Stomach</text>
                          </g>
                        );
                        break;
                      
                      case "pancreas":
                        organShape = (
                          <g key={organ.id}>
                            <rect x="195" y="305" width="45" height="15" rx="7" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="240" y="295" width="85" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="282" y="312" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Pancreas</text>
                          </g>
                        );
                        break;
                      
                      case "spleen":
                        organShape = (
                          <g key={organ.id}>
                            <ellipse cx="230" cy="290" rx="18" ry="30" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="235" y="315" width="70" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="270" y="332" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Spleen</text>
                          </g>
                        );
                        break;
                      
                      case "kidneys":
                        organShape = (
                          <g key={organ.id}>
                            <ellipse cx="170" cy="340" rx="15" ry="25" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <ellipse cx="230" cy="340" rx="15" ry="25" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="165" y="325" width="80" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="205" y="342" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Kidneys</text>
                          </g>
                        );
                        break;
                      
                      case "intestines":
                        organShape = (
                          <g key={organ.id}>
                            <path d="M 170 370 Q 165 380 175 390 Q 185 395 195 390 Q 205 395 215 390 Q 225 395 230 385 Q 235 375 225 370 Z" 
                              fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <path d="M 175 385 Q 180 400 200 405 Q 220 400 225 385" 
                              fill={organ.color} opacity={shouldHighlight ? 0.6 : 0.3} />
                            <rect x="165" y="405" width="85" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="207" y="422" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Intestines</text>
                          </g>
                        );
                        break;
                      
                      case "bladder":
                        organShape = (
                          <g key={organ.id}>
                            <ellipse cx="200" cy="455" rx="22" ry="18" fill={organ.color} opacity={shouldHighlight ? 0.7 : 0.4} />
                            <rect x="165" y="465" width="75" height="25" rx="3" fill="white" opacity="0.9" stroke={organ.color} strokeWidth="2"/>
                            <text x="202" y="482" textAnchor="middle" fill={organ.color} fontSize="14" fontWeight="600">Bladder</text>
                          </g>
                        );
                        break;
                      
                      default:
                        organShape = <g key={organ.id}></g>;
                    }
                    
                    return (
                      <g 
                        key={organ.id}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => setSelectedOrgan(organ)}
                        onMouseEnter={() => setHoveredOrgan(organ.id)}
                        onMouseLeave={() => setHoveredOrgan(null)}
                        style={{
                          transform: shouldHighlight ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center',
                        }}
                      >
                        {organShape}
                        {shouldHighlight && (
                          <circle 
                            cx={organ.position.x * 4} 
                            cy={organ.position.y * 7}
                            r="60" 
                            fill="none" 
                            stroke={organ.color} 
                            strokeWidth="3" 
                            strokeDasharray="5,5"
                            opacity="0.6"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>
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
                      <div className="p-3 rounded-full" style={{ backgroundColor: selectedOrgan.color }}>
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
