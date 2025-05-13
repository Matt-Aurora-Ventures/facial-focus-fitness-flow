
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/workouts" element={<ProtectedRoute><WorkoutMarketplacePage /></ProtectedRoute>} />
            <Route path="/water" element={<ProtectedRoute><WaterPage /></ProtectedRoute>} />
            <Route path="/gyms" element={<ProtectedRoute><GymFinderPage /></ProtectedRoute>} />
            <Route path="/social" element={<ProtectedRoute><SocialPage /></ProtectedRoute>} />
            <Route path="/measurements" element={<ProtectedRoute><MeasurementsPage /></ProtectedRoute>} />
            <Route path="/activity-clubs" element={<ProtectedRoute><ActivityClubsPage /></ProtectedRoute>} />
            <Route path="/running-trails" element={<ProtectedRoute><RunningTrailsPage /></ProtectedRoute>} />
            <Route path="/workout-recorder" element={<ProtectedRoute><WorkoutRecorderPage /></ProtectedRoute>} />
            <Route path="/mental-health" element={<ProtectedRoute><MentalHealthPage /></ProtectedRoute>} />
            <Route path="/diet-plan" element={<ProtectedRoute><DietPlanPage /></ProtectedRoute>} />
            <Route path="/nutrition" element={<ProtectedRoute><NutritionTrackingPage /></ProtectedRoute>} />
            <Route path="/exercises" element={<ProtectedRoute><ExerciseLibraryPage /></ProtectedRoute>} />
            <Route path="/workout-planner" element={<ProtectedRoute><WorkoutPlannerPage /></ProtectedRoute>} />
            <Route path="/progress-photos" element={<ProtectedRoute><ProgressPhotosPage /></ProtectedRoute>} />
            <Route path="/nutrition-goals" element={<ProtectedRoute><NutritionGoalsPage /></ProtectedRoute>} />
            <Route path="/water-goals" element={<ProtectedRoute><WaterGoalsPage /></ProtectedRoute>} />
            <Route path="/weight-tracker" element={<ProtectedRoute><WeightTrackerPage /></ProtectedRoute>} />
            <Route path="/gemini" element={<ProtectedRoute><GeminiPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
