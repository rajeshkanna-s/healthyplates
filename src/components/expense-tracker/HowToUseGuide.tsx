import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Home, BarChart3, Settings, PieChart, Download, 
  Upload, Users, Zap, Target, Bell, Calendar, 
  CreditCard, Tag, FileText, HelpCircle, Lightbulb
} from "lucide-react";

const HowToUseGuide = () => {
  const sections = [
    {
      id: "home",
      title: "Home Page - Track Your Expenses",
      icon: Home,
      color: "bg-blue-500",
      items: [
        {
          title: "Daily Summary Card",
          description: "Shows today's spending, monthly total, and budget progress with color indicators (green = safe, yellow = warning, red = over budget)."
        },
        {
          title: "Quick Add Buttons",
          description: "One-tap buttons to add frequent expenses instantly. Customize these in Settings."
        },
        {
          title: "Add Expense Form",
          description: "Tap the + button to add a new expense with amount, category, date, payment method, and optional notes."
        },
        {
          title: "Expense List",
          description: "View all your expenses with category icons, amounts, and dates. Swipe or tap to delete."
        },
        {
          title: "Daily Notes",
          description: "Get automatic reminders when spending is unusually high."
        },
      ]
    },
    {
      id: "reports",
      title: "Reports - Analyze Your Spending",
      icon: BarChart3,
      color: "bg-green-500",
      items: [
        {
          title: "Date Range",
          description: "Filter by week, month, or custom dates to see spending patterns."
        },
        {
          title: "Category Chart",
          description: "Visual pie chart showing spending distribution by category."
        },
        {
          title: "Amount by Category",
          description: "Progress bars showing how much you spent in each category."
        },
        {
          title: "Spending Trends",
          description: "Line chart showing daily spending over time."
        },
        {
          title: "Export Options",
          description: "Download your data as PDF or Excel for records or sharing."
        },
      ]
    },
    {
      id: "settings",
      title: "Settings - Customize Your Experience",
      icon: Settings,
      color: "bg-purple-500",
      items: [
        {
          title: "Currency",
          description: "Select your preferred currency (INR, USD, EUR, etc.) for display."
        },
        {
          title: "Budgets",
          description: "Set monthly spending limits for each category. Get warnings when approaching limits."
        },
        {
          title: "Family Members",
          description: "Add family members to track who is spending money."
        },
        {
          title: "Quick Add Templates",
          description: "Create one-tap buttons for frequent expenses (e.g., ₹20 Tea, ₹100 Lunch)."
        },
      ]
    },
    {
      id: "backup",
      title: "Backup & Restore - Keep Your Data Safe",
      icon: Download,
      color: "bg-orange-500",
      items: [
        {
          title: "Why Backup?",
          description: "Your data is stored locally in your browser. If you clear browser data or switch devices, you'll lose your expenses."
        },
        {
          title: "How to Backup",
          description: "Click \"Export Backup\" to download a JSON file with all your expenses. Save this file safely."
        },
        {
          title: "How to Restore",
          description: "Click \"Import Backup\" and select your backup file to restore all expenses."
        },
        {
          title: "💡 Tip",
          description: "Do a weekly backup to avoid losing data. The app will remind you after 7 days."
        },
      ]
    },
  ];

  return (
    <Accordion type="single" collapsible className="space-y-2">
      <AccordionItem value="guide" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>How to Use This App</span>
            <Badge variant="secondary" className="ml-2">Guide</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">
            Step-by-step guide for new users
          </p>

          {sections.map((section) => (
            <Card key={section.id} className="border-l-4" style={{ borderLeftColor: section.color.replace('bg-', '#').replace('-500', '') }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className={`w-6 h-6 ${section.color} rounded-md flex items-center justify-center`}>
                    <section.icon className="h-3 w-3 text-white" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {section.items.map((item, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{item.title}:</span>{" "}
                      <span className="text-muted-foreground">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Pro Tips</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Use Quick Add for daily recurring expenses</li>
                  <li>• Set category budgets to control spending</li>
                  <li>• Review Reports weekly to spot patterns</li>
                  <li>• Backup data before clearing browser cache</li>
                </ul>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HowToUseGuide;
