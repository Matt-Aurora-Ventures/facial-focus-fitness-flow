
import React from 'react';
import { ScanFace, Droplet, Apple, Dumbbell, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: ScanFace, label: "Scan", active: true },
    { icon: Droplet, label: "Water" },
    { icon: Apple, label: "Nutrition" },
    { icon: Dumbbell, label: "Workouts" },
    { icon: Ruler, label: "Measures" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-sm py-3 px-4 sm:px-6">
      <nav className="flex justify-between max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={`flex flex-col gap-1 h-auto py-1.5 px-2.5 ${
              item.active ? "bg-facefit-purple text-white" : "text-muted-foreground"
            }`}
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
