import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Plus, BarChart3, Landmark } from "lucide-react";
import { TaxEntry } from "@/components/taxes-tracker/types";
import { getTaxes, saveTaxes } from "@/components/taxes-tracker/utils";
import TaxHome from "@/components/taxes-tracker/TaxHome";
import TaxForm from "@/components/taxes-tracker/TaxForm";
import TaxReports from "@/components/taxes-tracker/TaxReports";
import { toast } from "sonner";

const TaxesTracker = () => {
  const [activeTab, setActiveTab] = useState<"home" | "add" | "reports">("home");
  const [taxes, setTaxes] = useState<TaxEntry[]>([]);

  useEffect(() => { setTaxes(getTaxes()); }, []);

  const handleAddTax = (tax: TaxEntry) => {
    const updated = [tax, ...taxes];
    setTaxes(updated);
    saveTaxes(updated);
    setActiveTab("home");
  };

  const handleDeleteTax = (id: string) => {
    const updated = taxes.filter(t => t.id !== id);
    setTaxes(updated);
    saveTaxes(updated);
    toast.success("Tax entry deleted");
  };

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "add", label: "Add", icon: Plus },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-24">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
        <div className="max-w-lg mx-auto p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Taxes Tracker</h1>
              <p className="text-xs text-white/80">Track your tax payments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {activeTab === "home" && <TaxHome taxes={taxes} />}
        {activeTab === "add" && <TaxForm onAddTax={handleAddTax} />}
        {activeTab === "reports" && <TaxReports taxes={taxes} onDeleteTax={handleDeleteTax} />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around py-2 px-2">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <Button key={tab.id} variant="ghost" className={`flex-1 flex flex-col items-center gap-1 h-auto py-3 relative transition-all ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab(tab.id as any)}>
                  {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />}
                  <tab.icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxesTracker;
