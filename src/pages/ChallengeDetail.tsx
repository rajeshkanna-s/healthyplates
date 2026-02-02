import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getChallengeById } from "@/components/challenges/challengeData";
import DayContentDisplay from "@/components/challenges/DayContentDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_PREFIX = "healthyplates_challenge_";

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const challenge = getChallengeById(id || "");
  
  // Get saved day from localStorage
  const getSavedDay = (): string => {
    if (!id) return "1";
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${id}_currentDay`);
    return saved || "1";
  };

  const [currentDay, setCurrentDay] = useState<string>(getSavedDay);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Load completed days from localStorage
  useEffect(() => {
    if (!id) return;
    const savedCompleted = localStorage.getItem(`${STORAGE_PREFIX}${id}_completedDays`);
    if (savedCompleted) {
      try {
        setCompletedDays(JSON.parse(savedCompleted));
      } catch {
        setCompletedDays([]);
      }
    }
  }, [id]);

  // Save current day to localStorage
  useEffect(() => {
    if (!id) return;
    localStorage.setItem(`${STORAGE_PREFIX}${id}_currentDay`, currentDay);
  }, [currentDay, id]);

  // Save completed days to localStorage
  useEffect(() => {
    if (!id) return;
    localStorage.setItem(`${STORAGE_PREFIX}${id}_completedDays`, JSON.stringify(completedDays));
  }, [completedDays, id]);

  const toggleDayComplete = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <Link to="/challenges">
            <Button>Back to Challenges</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentDayNumber = parseInt(currentDay);
  const currentDayContent = challenge.days.find(d => d.day === currentDayNumber);
  const progress = (completedDays.length / challenge.duration) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className={cn("py-8 md:py-12", challenge.color)}>
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/challenges" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Challenges
          </Link>
          
          <div className="flex items-start gap-4">
            <span className="text-5xl">{challenge.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {challenge.title}
              </h1>
              <p className="text-muted-foreground mt-2">{challenge.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="secondary">{challenge.duration} Days</Badge>
                {completedDays.length > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {completedDays.length}/{challenge.duration} Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {completedDays.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Day Navigation & Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs value={currentDay} onValueChange={setCurrentDay} className="w-full">
            {/* Scrollable Tab List */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <TabsList className="inline-flex h-auto p-1 bg-muted min-w-max">
                {challenge.days.map((day) => (
                  <TabsTrigger
                    key={day.day}
                    value={day.day.toString()}
                    className={cn(
                      "relative px-4 py-2 text-sm whitespace-nowrap",
                      "data-[state=active]:bg-green-700 data-[state=active]:text-white",
                      completedDays.includes(day.day) && "ring-2 ring-green-500 ring-offset-1"
                    )}
                  >
                    Day {day.day}
                    {completedDays.includes(day.day) && (
                      <CheckCircle className="h-3 w-3 ml-1 inline-block" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Day Content */}
            {challenge.days.map((day) => (
              <TabsContent key={day.day} value={day.day.toString()} className="mt-6">
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Day {day.day} – {day.title}
                  </h2>
                </div>
                
                <DayContentDisplay content={day} />

                {/* Mark Complete Button */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => toggleDayComplete(day.day)}
                    variant={completedDays.includes(day.day) ? "outline" : "default"}
                    className={cn(
                      "gap-2",
                      !completedDays.includes(day.day) && "bg-green-700 hover:bg-green-800"
                    )}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {completedDays.includes(day.day) ? "Mark as Incomplete" : "Mark Day as Complete"}
                  </Button>
                  
                  {day.day < challenge.duration && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDay((day.day + 1).toString())}
                    >
                      Go to Day {day.day + 1}
                    </Button>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Encouragement Footer */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            💡 <strong>Tip:</strong> Bookmark this page! Your progress is saved in your browser, 
            so you can pick up right where you left off.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChallengeDetail;
