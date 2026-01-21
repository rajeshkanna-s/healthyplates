import HealthyPlanner from "@/components/health-planner/HealthyPlanner";

const DietPlanner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <HealthyPlanner />
      </div>
    </div>
  );
};

export default DietPlanner;
