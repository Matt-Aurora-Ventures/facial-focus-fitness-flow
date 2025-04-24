
import React from 'react';
import { Ruler, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MeasurementsTracker: React.FC = () => {
  // In a real app, this would come from stored user data
  const measurements = {
    weight: { current: 185, previous: 187, unit: "lbs" },
    bodyFat: { current: 18, previous: 19, unit: "%" },
    chest: { current: 42, previous: 42, unit: "in" },
    waist: { current: 34, previous: 35, unit: "in" },
    lastUpdated: "3 days ago"
  };

  const getChangeIndicator = (current: number, previous: number) => {
    if (current === previous) return "text-muted-foreground";
    return current < previous ? "text-green-500" : "text-red-500";
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-purple/20 flex items-center justify-center">
              <Ruler className="w-4 h-4 text-facefit-purple" />
            </div>
            <h3 className="font-medium">Measurements</h3>
          </div>
          <span className="text-xs text-muted-foreground">Updated {measurements.lastUpdated}</span>
        </div>
        
        <div className="space-y-3">
          {Object.entries(measurements)
            .filter(([key]) => key !== "lastUpdated")
            .map(([key, value]) => {
              if (typeof value !== 'object' || value === null) return null;
              const { current, previous, unit } = value as { current: number, previous: number, unit: string };
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{current} {unit}</span>
                    <ArrowRight className={`h-3 w-3 ${getChangeIndicator(current, previous)}`} />
                    <span className="text-xs text-muted-foreground">{previous} {unit}</span>
                  </div>
                </div>
              );
            })}
        </div>
        
        <Button className="w-full mt-4" variant="outline">
          Update Measurements
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeasurementsTracker;
