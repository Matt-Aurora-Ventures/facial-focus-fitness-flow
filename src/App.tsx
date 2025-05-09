
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
import MeasurementsPage from "./pages/Measurements";
import ActivityClubsPage from "./pages/ActivityClubs";
import RunningTrailsPage from "./pages/RunningTrails";
import WorkoutRecorderPage from "./pages/WorkoutRecorder";
import MentalHealthPage from "./pages/MentalHealth";
import DietPlanPage from "./pages/DietPlan";
import NutritionTrackingPage from "./pages/NutritionTracking";
import ExerciseLibraryPage from "./pages/ExerciseLibraryPage";
import WorkoutPlannerPage from "./pages/WorkoutPlannerPage";
import ProgressPhotosPage from "./pages/ProgressPhotosPage";
import NutritionGoalsPage from "./pages/NutritionGoalsPage";
import WaterGoalsPage from "./pages/WaterGoalsPage";
import WeightTrackerPage from "./pages/WeightTrackerPage";
import GeminiPage from "./pages/GeminiPage";

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
          <Route path="/measurements" element={<MeasurementsPage />} />
          <Route path="/activity-clubs" element={<ActivityClubsPage />} />
          <Route path="/running-trails" element={<RunningTrailsPage />} />
          <Route path="/workout-recorder" element={<WorkoutRecorderPage />} />
          <Route path="/mental-health" element={<MentalHealthPage />} />
          <Route path="/diet-plan" element={<DietPlanPage />} />
          <Route path="/nutrition" element={<NutritionTrackingPage />} />
          <Route path="/exercises" element={<ExerciseLibraryPage />} />
          <Route path="/workout-planner" element={<WorkoutPlannerPage />} />
          <Route path="/progress-photos" element={<ProgressPhotosPage />} />
          <Route path="/nutrition-goals" element={<NutritionGoalsPage />} />
          <Route path="/water-goals" element={<WaterGoalsPage />} />
          <Route path="/weight-tracker" element={<WeightTrackerPage />} />
          <Route path="/gemini" element={<GeminiPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
