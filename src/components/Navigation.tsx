
import React from 'react';
import { ScanFace, Droplet, Apple, Dumbbell, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    { icon: ScanFace, label: "Scan", path: "/" },
    { icon: Droplet, label: "Water", path: "/" },
    { icon: Apple, label: "Nutrition", path: "/" },
    { icon: Dumbbell, label: "Workouts", path: "/workouts" },
    { icon: Ruler, label: "Measures", path: "/" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm py-3 px-4 sm:px-6">
      <nav className="flex justify-between max-w-md mx-auto">
        {navItems.map((item) => (
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
      </nav>
    </div>
  );
};

export default Navigation;
