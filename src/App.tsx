import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Index from "./pages/Index";
import FoodProducts from "./pages/FoodProducts";
import FoodProductDetail from "./pages/FoodProductDetail";
import Foods from "./pages/Foods";
import FoodDetail from "./pages/FoodDetail";
import Diseases from "./pages/Diseases";
import DiseaseDetail from "./pages/DiseaseDetail";
import SelfCare from "./pages/SelfCare";
import SelfCareDetail from "./pages/SelfCareDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import BodyExplorer from "./pages/BodyExplorer";
import DietPlanner from "./pages/DietPlanner";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import InternalOrgans from "./pages/InternalOrgans";
import BodyParts from "./pages/BodyParts";
import BMICalculator from "./pages/BMICalculator";
import CalorieCalculator from "./pages/CalorieCalculator";
import MacroCalculator from "./pages/MacroCalculator";
import CalisthenicsChallenge from "./pages/CalisthenicsChallenge";
import SmartGroceryList from "./pages/SmartGroceryList";
import PersonalityMatch from "./pages/PersonalityMatch";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import MoodTracker from "./pages/MoodTracker";
import SleepTracker from "./pages/SleepTracker";
import GoalTracker from "./pages/GoalTracker";
import BookshelfTracker from "./pages/BookshelfTracker";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import HabitTrackerPage from "./pages/HabitTrackerPage";
import SmartFoodSwaps from "./pages/SmartFoodSwaps";
import HealthyPlateBuilder from "./pages/HealthyPlateBuilder";
import ExpenseTracker from "./pages/ExpenseTracker";
import Mindfulness from "./pages/Mindfulness";
import DeveloperBio from "./pages/DeveloperBio";
import ValentineDay from "./pages/ValentineDay";
import VisionBoard from "./pages/VisionBoard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="food-products" element={<FoodProducts />} />
            <Route path="food-products/:id" element={<FoodProductDetail />} />
            <Route path="foods" element={<Foods />} />
            <Route path="foods/:id" element={<FoodDetail />} />
            <Route path="diseases" element={<Diseases />} />
            <Route path="diseases/:id" element={<DiseaseDetail />} />
            <Route path="self-care" element={<SelfCare />} />
            <Route path="self-care/:id" element={<SelfCareDetail />} />
            <Route path="mindfulness" element={<Mindfulness />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="body-explorer" element={<BodyExplorer />} />
            <Route path="diet-planner" element={<DietPlanner />} />
            {/* Know Your Body Sub-Pages */}
            <Route path="internal-organs" element={<InternalOrgans />} />
            <Route path="body-parts" element={<BodyParts />} />
            <Route path="bmi-calculator" element={<BMICalculator />} />
            <Route path="calorie-calculator" element={<CalorieCalculator />} />
            <Route path="macro-calculator" element={<MacroCalculator />} />
            <Route path="smart-food-swaps" element={<SmartFoodSwaps />} />
            <Route path="healthy-plate-builder" element={<HealthyPlateBuilder />} />
            <Route path="calisthenics-challenge" element={<CalisthenicsChallenge />} />
            <Route path="grocery-list" element={<SmartGroceryList />} />
            <Route path="personality-match" element={<PersonalityMatch />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="challenges/:id" element={<ChallengeDetail />} />
            {/* Tracker Pages */}
            <Route path="mood-tracker" element={<MoodTracker />} />
            <Route path="sleep-tracker" element={<SleepTracker />} />
            <Route path="goal-tracker" element={<GoalTracker />} />
            <Route path="bookshelf-tracker" element={<BookshelfTracker />} />
            <Route path="weekly-planner" element={<WeeklyPlanner />} />
            <Route path="habit-tracker" element={<HabitTrackerPage />} />
            <Route path="expense-tracker" element={<ExpenseTracker />} />
            <Route path="vision-board" element={<VisionBoard />} />
            <Route path="admin" element={<Admin />} />
            {/* Redirect old data-entry route to admin */}
            <Route path="data-entry" element={<Admin />} />
            <Route path="contact" element={<Contact />} />
            {/* Legal & Info Pages */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsConditions />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Auth route outside of Layout */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/developer-bio" element={<DeveloperBio />} />
          <Route path="/ValentineDay" element={<ValentineDay />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
