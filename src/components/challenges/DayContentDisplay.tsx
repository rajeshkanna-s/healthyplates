import { DayContent } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Utensils } from "lucide-react";

interface DayContentDisplayProps {
  content: DayContent;
}

const DayContentDisplay = ({ content }: DayContentDisplayProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Task Section */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">✅</span>
            Today's Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground font-medium">{content.task}</p>
        </CardContent>
      </Card>

      {/* Meal Ideas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Meal Ideas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {content.mealIdeas.map((meal, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">{meal}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Why It Matters */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Why It Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground italic">{content.whyItMatters}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayContentDisplay;
