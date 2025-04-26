
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Minus, History, TimerReset, Gauge } from "lucide-react";

const WaterTracking: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState(3);
  const [waterHistory, setWaterHistory] = useState([
    { day: "Monday", amount: 7 },
    { day: "Tuesday", amount: 6 },
    { day: "Wednesday", amount: 8 },
    { day: "Thursday", amount: 5 },
    { day: "Friday", amount: 3 },
  ]);
  const dailyGoal = 8;
  const progress = Math.min((waterAmount / dailyGoal) * 100, 100);

  const addWater = (amount: number) => {
    setWaterAmount(prev => Math.min(prev + amount, 20));
  };

  const removeWater = () => {
    setWaterAmount(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Water Tracking</h2>
        <Button variant="outline" className="gap-2">
          <History className="w-4 h-4" />
          History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Water Tracker */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-6 w-6 text-facefit-blue" />
                Today's Water Intake
              </CardTitle>
              <span className="text-xl font-bold text-facefit-blue">{waterAmount}/{dailyGoal} glasses</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-12 bg-facefit-blue/10 rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-gradient-to-r from-facefit-blue/80 to-facefit-blue rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-4"
                style={{ width: `${progress}%` }}
              >
                {progress > 20 && (
                  <span className="text-white font-medium">{Math.round(progress)}%</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <Button 
                onClick={() => addWater(0.25)} 
                variant="outline"
                className="flex flex-col py-6 border-facefit-blue/30 hover:bg-facefit-blue/10"
              >
                <Droplet className="h-6 w-6 mb-2 text-facefit-blue" />
                <span>¼ Glass</span>
              </Button>
              <Button 
                onClick={() => addWater(0.5)} 
                variant="outline"
                className="flex flex-col py-6 border-facefit-blue/30 hover:bg-facefit-blue/10"
              >
                <Droplet className="h-6 w-6 mb-2 text-facefit-blue" />
                <span>½ Glass</span>
              </Button>
              <Button 
                onClick={() => addWater(1)} 
                variant="outline"
                className="flex flex-col py-6 border-facefit-blue/30 hover:bg-facefit-blue/10"
              >
                <Droplet className="h-6 w-6 mb-2 text-facefit-blue" />
                <span>1 Glass</span>
              </Button>
              <Button 
                onClick={() => addWater(2)} 
                variant="outline"
                className="flex flex-col py-6 border-facefit-blue/30 hover:bg-facefit-blue/10"
              >
                <Droplet className="h-8 w-8 mb-2 text-facefit-blue" />
                <span>2 Glasses</span>
              </Button>
            </div>

            <div className="flex justify-center gap-6 items-center">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full border-facefit-blue/30 text-facefit-blue h-16 w-16"
                onClick={removeWater}
                disabled={waterAmount <= 0}
              >
                <Minus className="h-6 w-6" />
              </Button>
              
              <div className="text-5xl font-medium text-facefit-blue">
                {waterAmount}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full border-facefit-blue/30 text-facefit-blue h-16 w-16"
                onClick={() => addWater(1)}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Water Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Weekly Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {waterHistory.map((day, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-accent rounded-full">
                      <div 
                        className="h-full bg-facefit-blue rounded-full"
                        style={{ width: `${(day.amount / dailyGoal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{day.amount}/{dailyGoal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Water Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TimerReset className="h-5 w-5" />
              Reminders & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Daily Goal</h4>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-medium">{dailyGoal} glasses</span>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Reminder Schedule</h4>
              <Button className="w-full bg-facefit-blue hover:bg-facefit-blue/90">
                Set Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterTracking;
