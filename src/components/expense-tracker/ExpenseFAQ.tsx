import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageCircleQuestion, Shield, Wifi, Users, Database, Zap, FileSpreadsheet, Edit, Tag, RefreshCw, Save, Store, Target, Palette, Calendar, Clock, CreditCard, DollarSign, StickyNote, Upload, Bell, UserPlus, Timer, AlertTriangle, Infinity } from "lucide-react";

const faqData = [
  {
    question: "Is my data safe and private?",
    answer: "Yes! All your expense data is stored locally in your browser's localStorage. We don't collect, transmit, or store any of your financial information on external servers. Your data stays on your device.",
    icon: Shield,
  },
  {
    question: "Can I use this app offline?",
    answer: "Yes! Once the app is loaded, it works completely offline. All data is stored locally, so you can add and view expenses without an internet connection. Just make sure to backup your data regularly.",
    icon: Wifi,
  },
  {
    question: "How do I track expenses for my family?",
    answer: "Go to Settings → Family Members and add each family member's name. When adding an expense, select who made the purchase. You can then filter reports by person to see individual spending patterns.",
    icon: Users,
  },
  {
    question: "What happens if I clear my browser data?",
    answer: "If you clear your browser data, localStorage, or cookies, you will lose all your expense data. Always download a backup before clearing browser data. We recommend weekly backups.",
    icon: Database,
  },
  {
    question: "How do Quick Add Templates work?",
    answer: "Quick Add Templates are one-tap buttons for frequent expenses. Create them in Settings → Quick Add Templates. Set the name, amount, category, and icon. They appear on the Home page for instant expense entry.",
    icon: Zap,
  },
  {
    question: "How are budget warnings calculated?",
    answer: "Budget warnings are based on your monthly budget setting. Green (0-79%) = safe, Yellow (80-99%) = warning, Red (100%+) = over budget. You can also set individual category budgets for more granular control.",
    icon: AlertTriangle,
  },
  {
    question: "Can I export my expenses to Excel?",
    answer: "Yes! Go to Reports page and click the \"Excel\" button. This downloads an .xlsx file with all your filtered expenses including date, amount, category, platform, payment method, and notes.",
    icon: FileSpreadsheet,
  },
  {
    question: "How do I edit or delete an expense?",
    answer: "Go to Reports page, find the expense in the list, and click the eye icon to view details. Use the delete button (trash icon) to remove it. Currently, editing requires deleting and re-adding the expense.",
    icon: Edit,
  },
  {
    question: "What are the available categories?",
    answer: "We have 20+ built-in categories including Food, Grocery, Travel, Petrol, Mobile Recharge, Bills, Entertainment, Health, Education, and more. You can also add custom categories in Settings.",
    icon: Tag,
  },
  {
    question: "Can I sync data across multiple devices?",
    answer: "Currently, data is stored locally on each device. To transfer data, use the Export Backup feature to download your data as JSON, then Import it on another device. Cloud sync is planned for future updates.",
    icon: RefreshCw,
  },
  {
    question: "How does Auto Backup work?",
    answer: "The app reminds you to backup if you haven't backed up today. When you try to leave the page with unsaved data, you'll see a reminder. We recommend downloading a backup at least weekly.",
    icon: Save,
  },
  {
    question: "What's the difference between platforms/shops and categories?",
    answer: "Categories define the type of expense (Food, Travel, etc.). Platforms/Shops specify where you spent (Swiggy, Amazon, Local Shop). This helps you track both what you're spending on and where you're spending.",
    icon: Store,
  },
  {
    question: "How do I set a monthly budget?",
    answer: "Go to Settings → Currency & Monthly Budget. Enter your total monthly spending limit. You can also set individual category budgets under Settings → Category Budgets for more detailed control.",
    icon: Target,
  },
  {
    question: "What do the colors in Daily Summary mean?",
    answer: "Green = You're under 80% of your budget (safe zone). Orange/Yellow = You're between 80-99% (warning zone). Red = You've exceeded 100% of your budget (over budget).",
    icon: Palette,
  },
  {
    question: "How do I filter expenses by date in Reports?",
    answer: "In the Reports page, use the From Date and To Date fields to set your date range. The default shows the current month. You can also filter by category, platform, payment method, and person.",
    icon: Calendar,
  },
  {
    question: "Can I add expenses for past dates?",
    answer: "Yes! When adding an expense, you can change the date field to any past date. This is useful for recording expenses you forgot to log or for importing historical data.",
    icon: Clock,
  },
  {
    question: "What payment methods can I track?",
    answer: "Built-in payment methods include Cash, UPI, Debit Card, Credit Card, Net Banking, and various wallets (Paytm, GPay, PhonePe, Amazon Pay). You can add custom payment methods in Settings.",
    icon: CreditCard,
  },
  {
    question: "How do I change the currency symbol?",
    answer: "Go to Settings → Currency & Monthly Budget and select your currency from the dropdown. Supported currencies include INR (₹), USD ($), EUR (€), and GBP (£).",
    icon: DollarSign,
  },
  {
    question: "What is the 'Daily Notes' feature?",
    answer: "Daily Notes let you add context to your spending. If you spent more than usual, you can note why (e.g., 'Family dinner', 'Medical emergency'). This helps you understand spending patterns when reviewing later.",
    icon: StickyNote,
  },
  {
    question: "How do I restore from a backup file?",
    answer: "Go to Settings → Backup & Data, click 'Import Backup', and select your .json backup file. This will restore all your expenses and settings. Note: This replaces your current data.",
    icon: Upload,
  },
  {
    question: "Why should I add notes to expenses?",
    answer: "Notes help you remember context later. Instead of just 'Food - ₹500', you can note 'Team lunch at office'. This makes it easier to review and categorize expenses when analyzing your spending.",
    icon: StickyNote,
  },
  {
    question: "Can multiple family members use the app together?",
    answer: "Currently, data is stored per browser. For family use, add family members in Settings and select who made each expense. For true multi-user access, each person would need to use the same device/browser or share backup files.",
    icon: UserPlus,
  },
  {
    question: "How often should I backup my data?",
    answer: "We recommend backing up at least once a week, or after adding significant expenses. The app reminds you daily if you haven't backed up. Store backups in a safe location like cloud storage.",
    icon: Timer,
  },
  {
    question: "What happens if I exceed my budget?",
    answer: "You'll see a red warning banner on the Home page showing how much you've exceeded. The progress bar turns red, and you'll get suggestions on where to cut back. The app doesn't prevent adding expenses.",
    icon: Bell,
  },
  {
    question: "Is there a limit to how many expenses I can add?",
    answer: "There's no artificial limit. However, browser localStorage has a limit (usually 5-10MB). With typical usage, you can store years of expenses. If storage fills up, export old data and clear to free space.",
    icon: Infinity,
  },
];

const ExpenseFAQ = () => {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      <AccordionItem value="faq" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <MessageCircleQuestion className="h-5 w-5 text-primary" />
            <span>Frequently Asked Questions</span>
            <Badge variant="secondary" className="ml-2">{faqData.length}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <p className="text-sm text-muted-foreground mb-4">
            Common questions and answers
          </p>
          
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`} 
                className="border rounded-lg px-3"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-2 text-left">
                    <faq.icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <p className="text-sm text-muted-foreground pl-6">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExpenseFAQ;
