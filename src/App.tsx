import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
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
            <Route path="food-products/:id" element={<FoodProductDetail />} />
            <Route path="foods" element={<Foods />} />
            <Route path="foods/:id" element={<FoodDetail />} />
            <Route path="diseases" element={<Diseases />} />
            <Route path="diseases/:id" element={<DiseaseDetail />} />
            <Route path="self-care" element={<SelfCare />} />
            <Route path="self-care/:id" element={<SelfCareDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="body-explorer" element={<BodyExplorer />} />
            <Route path="admin" element={<Admin />} />
            {/* Redirect old data-entry route to admin */}
            <Route path="data-entry" element={<Admin />} />
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
