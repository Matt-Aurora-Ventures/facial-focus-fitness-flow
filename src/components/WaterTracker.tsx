
import React, { useState } from 'react';
import { Droplet, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WaterTracker: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(3);
  const dailyGoal = 8;
  const progress = Math.min((waterAmount / dailyGoal) * 100, 100);

  const addWater = () => {
    setWaterAmount(prev => Math.min(prev + 1, 20));
  };

  const removeWater = () => {
    setWaterAmount(prev => Math.max(prev - 1, 0));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-blue/20 flex items-center justify-center">
              <Droplet className="w-4 h-4 text-facefit-blue" />
            </div>
            <h3 className="font-medium">Water Intake</h3>
          </div>
          <span className="text-sm font-medium">{waterAmount}/{dailyGoal} glasses</span>
        </div>
        
        <div className="h-10 bg-facefit-blue/10 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-facefit-blue/80 to-facefit-blue rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-center gap-4 items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-facefit-blue/30 text-facefit-blue"
            onClick={removeWater}
            disabled={waterAmount <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="text-2xl font-medium text-facefit-blue">
            {waterAmount}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-facefit-blue/30 text-facefit-blue"
            onClick={addWater}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
