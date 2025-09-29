import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import FoodProducts from "./pages/FoodProducts";
import Foods from "./pages/Foods";
import Diseases from "./pages/Diseases";
import SelfCare from "./pages/SelfCare";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="food-products" element={<FoodProducts />} />
            <Route path="foods" element={<Foods />} />
            <Route path="diseases" element={<Diseases />} />
            <Route path="self-care" element={<SelfCare />} />
            <Route path="blog" element={<Blog />} />
            <Route path="admin" element={<Admin />} />
            <Route path="contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Auth route outside of Layout */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
