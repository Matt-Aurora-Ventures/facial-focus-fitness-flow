
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Progress from "./pages/Progress";
import WorkoutMarketplacePage from "./pages/WorkoutMarketplace";
import NotFound from "./pages/NotFound";
import WaterPage from "./pages/WaterPage";
import GymFinderPage from "./pages/GymFinder";
import SocialPage from "./pages/Social";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/workouts" element={<WorkoutMarketplacePage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/gyms" element={<GymFinderPage />} />
          <Route path="/social" element={<SocialPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
