
import React, { useState } from 'react';
import { ScanFace, Droplet, Apple, Dumbbell, Ruler, Users, MapPin, Camera, Map, Activity, Heart, BookOpen, Utensils, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainNavItems: NavItem[] = [
    { icon: ScanFace, label: "Home", path: "/" },
    { icon: Droplet, label: "Water", path: "/water" },
    { icon: Utensils, label: "Nutrition", path: "/nutrition" },
    { icon: Dumbbell, label: "Workouts", path: "/workouts" },
    { icon: Heart, label: "Mental", path: "/mental-health" },
  ];

  const moreNavItems: NavItem[] = [
    { icon: Ruler, label: "Measurements", path: "/measurements" },
    { icon: Map, label: "Trails", path: "/running-trails" },
    { icon: Activity, label: "Activity Clubs", path: "/activity-clubs" },
    { icon: Camera, label: "Record Workout", path: "/workout-recorder" },
    { icon: MapPin, label: "Gyms", path: "/gyms" },
    { icon: Users, label: "Social", path: "/social" },
    { icon: BookOpen, label: "Exercise Library", path: "/exercises" },
    { icon: Apple, label: "Diet Plan", path: "/diet-plan" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMoreMenuOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm py-3 px-4 sm:px-6">
      <nav className="flex justify-between max-w-md mx-auto">
        {mainNavItems.map((item) => (
          <Button
            key={item.label}
            variant={item.path === currentPath ? "default" : "ghost"}
            className={`flex flex-col gap-1 h-auto py-1.5 px-2.5 ${
              item.path === currentPath ? "bg-facefit-purple text-white" : "text-muted-foreground"
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
        
        <Popover open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col gap-1 h-auto py-1.5 px-2.5 text-muted-foreground"
            >
              <span className="h-5 w-5 flex items-center justify-center text-lg">•••</span>
              <span className="text-xs font-medium">More</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="center" side="top">
            <div className="grid grid-cols-2 gap-0.5 p-1">
              {moreNavItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.path === currentPath ? "default" : "ghost"}
                  className={`flex flex-col gap-1 h-auto py-3 px-2 ${
                    item.path === currentPath ? "bg-facefit-purple text-white" : ""
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
};

export default Navigation;
