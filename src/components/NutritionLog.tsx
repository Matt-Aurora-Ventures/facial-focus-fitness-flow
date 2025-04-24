
import React from 'react';
import { Apple, Plus, ChartPie } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const NutritionLog: React.FC = () => {
  // In a real app, this data would come from user input and stored data
  const nutritionData = {
    calories: { consumed: 1450, goal: 2000 },
    protein: { consumed: 80, goal: 120 },
    carbs: { consumed: 140, goal: 200 },
    fat: { consumed: 45, goal: 65 }
  };

  const formatProgress = (consumed: number, goal: number) => {
    return Math.min(Math.round((consumed / goal) * 100), 100);
  };

  const recentMeals = [
    { name: "Breakfast", calories: 450, time: "8:30 AM" },
    { name: "Lunch", calories: 620, time: "12:45 PM" },
    { name: "Snack", calories: 180, time: "3:30 PM" },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-green/20 flex items-center justify-center">
              <Apple className="w-4 h-4 text-facefit-green" />
            </div>
            <h3 className="font-medium">Nutrition Log</h3>
          </div>
          <Button size="sm" className="gap-1 bg-facefit-green hover:bg-facefit-green/80">
            <Plus className="h-3.5 w-3.5" />
            <span>Add Meal</span>
          </Button>
        </div>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">Calories</span>
              <span className="text-xs text-muted-foreground">
                {nutritionData.calories.consumed} / {nutritionData.calories.goal}
              </span>
            </div>
            <Progress value={formatProgress(nutritionData.calories.consumed, nutritionData.calories.goal)} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Protein</span>
                <span className="text-xs text-muted-foreground">{nutritionData.protein.consumed}g</span>
              </div>
              <Progress value={formatProgress(nutritionData.protein.consumed, nutritionData.protein.goal)} className="h-1.5 bg-facefit-purple/20" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Carbs</span>
                <span className="text-xs text-muted-foreground">{nutritionData.carbs.consumed}g</span>
              </div>
              <Progress value={formatProgress(nutritionData.carbs.consumed, nutritionData.carbs.goal)} className="h-1.5 bg-facefit-blue/20" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Fat</span>
                <span className="text-xs text-muted-foreground">{nutritionData.fat.consumed}g</span>
              </div>
              <Progress value={formatProgress(nutritionData.fat.consumed, nutritionData.fat.goal)} className="h-1.5 bg-facefit-green/20" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {recentMeals.map((meal, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <h4 className="text-sm font-medium">{meal.name}</h4>
                <p className="text-xs text-muted-foreground">{meal.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{meal.calories} cal</span>
                <ChartPie className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionLog;
