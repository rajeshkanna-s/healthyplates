import { Activity, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BodyParts() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
            Body Parts Diagrams
          </h1>
          <p className="text-xl text-muted-foreground">Learn human anatomy with labeled diagrams</p>
        </div>

        {/* Body Parts Diagrams */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Internal Organs Image */}
          <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-b">
              <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                <Activity className="w-5 h-5" />
                Internal Organs
              </CardTitle>
              <CardDescription>
                Major internal organs labeled
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 bg-gradient-to-b from-rose-50/50 to-pink-50/30 dark:from-slate-900 dark:to-slate-800">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/di4yfgmlz/image/upload/v1768899351/BODY%20PARTS/Internal_Organs_fwl5wd.png"
                  alt="Human Internal Organs Anatomy Diagram showing Brain, Thyroid, Trachea, Heart, Lungs, Liver, Stomach, Spleen, Kidneys, Pancreas, Small Intestine, Large Intestine, and Bladder"
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

        {/* Educational Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Educational Disclaimer:</strong> These diagrams are for learning purposes only. 
            Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
