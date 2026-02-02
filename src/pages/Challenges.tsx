import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Target } from "lucide-react";
import { challenges } from "@/components/challenges/challengeData";

const Challenges = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            🌱 HealthyPlates Challenges
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Short, focused challenges to build healthy habits one day at a time. 
            No signup required—just pick a challenge and start today.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            How These Challenges Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Pick a Challenge</h3>
              <p className="text-sm text-muted-foreground">
                Choose one that fits your current goals. Start with what feels doable.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">One Task Per Day</h3>
              <p className="text-sm text-muted-foreground">
                Each day has a simple task, meal ideas, and a quick explanation.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="font-medium mb-1">Build Lasting Habits</h3>
              <p className="text-sm text-muted-foreground">
                Small daily actions compound into sustainable healthy routines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Cards */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Choose Your Challenge
          </h2>
          <div className="grid gap-6">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`overflow-hidden hover:shadow-lg transition-shadow ${challenge.color}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{challenge.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{challenge.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {challenge.duration} Days
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {challenge.description}
                  </CardDescription>
                  <Link to={`/challenges/${challenge.id}`}>
                    <Button className="bg-green-700 hover:bg-green-800 gap-2">
                      Start This Challenge
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Encouragement Section */}
      <section className="py-10 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Remember: Progress, Not Perfection
          </h2>
          <p className="text-muted-foreground">
            Missing a day? That's okay. Just pick up where you left off. 
            These challenges are about building awareness and small wins—not about being perfect.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Challenges;
