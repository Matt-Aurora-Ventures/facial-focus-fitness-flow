
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Minus, Settings, Save } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface WaterEntry {
  id: string;
  time: Date;
  amount: number;
}

const WaterGoalTracker: React.FC = () => {
  const { toast } = useToast();
  const [waterGoal, setWaterGoal] = useState(2500); // ml
  const [waterConsumed, setWaterConsumed] = useState(850); // ml
  const [quickAddAmount, setQuickAddAmount] = useState(250); // ml
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempWaterGoal, setTempWaterGoal] = useState(waterGoal);
  const [waterHistory, setWaterHistory] = useState<WaterEntry[]>([
    { id: '1', time: new Date(new Date().setHours(8, 30)), amount: 350 },
    { id: '2', time: new Date(new Date().setHours(10, 15)), amount: 250 },
    { id: '3', time: new Date(new Date().setHours(13, 45)), amount: 250 },
  ]);
  
  // Calculate percentage
  const waterPercentage = Math.min(Math.round((waterConsumed / waterGoal) * 100), 100);
  
  const handleQuickAdd = () => {
    const newAmount = waterConsumed + quickAddAmount;
    setWaterConsumed(newAmount);
    
    // Add to history
    const newEntry = {
      id: Date.now().toString(),
      time: new Date(),
      amount: quickAddAmount
    };
    setWaterHistory([...waterHistory, newEntry]);
    
    // Show toast
    toast({
      title: `Added ${quickAddAmount}ml of water!`,
      description: `${newAmount}ml / ${waterGoal}ml (${Math.min(Math.round((newAmount / waterGoal) * 100), 100)}%)`,
    });
  };

  const handleQuickSubtract = () => {
    if (waterHistory.length === 0) return;
    
    // Remove last entry
    const lastEntry = waterHistory[waterHistory.length - 1];
    const newHistory = waterHistory.slice(0, -1);
    setWaterHistory(newHistory);
    
    // Update total
    const newAmount = Math.max(0, waterConsumed - lastEntry.amount);
    setWaterConsumed(newAmount);
    
    toast({
      title: "Removed last water entry",
      description: `${newAmount}ml / ${waterGoal}ml (${Math.round((newAmount / waterGoal) * 100)}%)`,
    });
  };
  
  const handleSaveSettings = () => {
    setWaterGoal(tempWaterGoal);
    setIsSettingsOpen(false);
    
    toast({
      title: "Water goal updated",
      description: `New goal: ${tempWaterGoal}ml`,
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-blue-500" />
            Water Tracker
          </CardTitle>
          <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4">
              <h3 className="font-medium mb-2">Daily Water Goal</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="water-goal">Target (ml)</Label>
                  <Input 
                    id="water-goal" 
                    type="number"
                    value={tempWaterGoal}
                    onChange={(e) => setTempWaterGoal(Number(e.target.value))}
                  />
                </div>
                <Button 
                  onClick={handleSaveSettings}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Water visualization */}
        <div className="flex flex-col items-center">
          <div className="relative h-40 w-40 flex items-end justify-center mb-2">
            <div className="absolute inset-0 rounded-full border-2 border-blue-100"></div>
            <div 
              className="absolute bottom-0 rounded-full bg-blue-500/20 transition-all duration-700"
              style={{ 
                height: `${waterPercentage}%`,
                width: '100%',
                maxHeight: '100%'
              }}
            ></div>
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">{waterPercentage}%</span>
              <span className="text-sm text-muted-foreground">
                {waterConsumed}/{waterGoal} ml
              </span>
            </div>
          </div>
        </div>

        {/* Quick add section */}
        <div className="space-y-4">
          <h3 className="font-medium">Quick Add</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <Slider
                value={[quickAddAmount]}
                min={50}
                max={500}
                step={50}
                onValueChange={(values) => setQuickAddAmount(values[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50ml</span>
                <span>250ml</span>
                <span>500ml</span>
              </div>
            </div>
            <Button
              onClick={handleQuickAdd}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
              Add {quickAddAmount}ml
            </Button>
            <Button
              onClick={handleQuickSubtract}
              variant="outline"
              className="flex items-center justify-center gap-2"
              disabled={waterHistory.length === 0}
            >
              <Minus className="h-4 w-4" />
              Undo Last
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Daily Progress</h3>
            <span className="text-sm text-muted-foreground">
              {waterPercentage}% complete
            </span>
          </div>
          <Progress value={waterPercentage} className="h-2 [&>div]:bg-blue-500" />
        </div>

        {/* Today's log */}
        <div>
          <h3 className="font-medium mb-2">Today's Log</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {waterHistory.length > 0 ? (
              waterHistory.map((entry) => (
                <div 
                  key={entry.id}
                  className="flex justify-between py-2 px-3 rounded-md bg-accent/40"
                >
                  <span className="text-sm">{formatTime(entry.time)}</span>
                  <span className="text-sm font-medium">{entry.amount} ml</span>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-2">
                No entries yet today
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterGoalTracker;
