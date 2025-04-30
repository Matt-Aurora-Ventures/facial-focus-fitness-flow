
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Apple, Edit, Save, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface NutritionGoal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NutritionGoals: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [goals, setGoals] = useState<NutritionGoal>({
    calories: 2200,
    protein: 150,
    carbs: 225,
    fat: 70
  });
  
  const [editableGoals, setEditableGoals] = useState<NutritionGoal>({
    calories: 2200,
    protein: 150,
    carbs: 225,
    fat: 70
  });
  
  // Example daily consumption (in a real app, this would be calculated from food diary entries)
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    calories: 1750,
    protein: 125,
    carbs: 180,
    fat: 55
  });
  
  const handleSaveGoals = () => {
    setGoals({...editableGoals});
    setIsEditing(false);
  };
  
  const calculatePercentage = (consumed: number, target: number) => {
    return Math.min(Math.round((consumed / target) * 100), 100);
  };
  
  const getMacroDistribution = () => {
    const proteinCalories = goals.protein * 4; // 4 calories per gram of protein
    const carbCalories = goals.carbs * 4;   // 4 calories per gram of carbs
    const fatCalories = goals.fat * 9;      // 9 calories per gram of fat
    
    const total = proteinCalories + carbCalories + fatCalories;
    
    return {
      protein: Math.round((proteinCalories / total) * 100),
      carbs: Math.round((carbCalories / total) * 100),
      fat: Math.round((fatCalories / total) * 100)
    };
  };
  
  const macroDistribution = getMacroDistribution();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-facefit-purple" />
            Nutrition Goals
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Goals
            </Button>
          ) : (
            <Button 
              className="bg-facefit-purple hover:bg-facefit-purple/90" 
              size="sm" 
              onClick={handleSaveGoals}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Goals
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Calories */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Daily Calories</h3>
            <div className="text-sm">
              <span className="font-medium">{dailyNutrition.calories}</span>
              <span className="text-muted-foreground"> / {goals.calories}</span>
            </div>
          </div>
          
          {isEditing ? (
            <div className="mb-4">
              <Label htmlFor="calories-goal">Calories Target</Label>
              <Input
                id="calories-goal"
                type="number"
                value={editableGoals.calories}
                onChange={(e) => setEditableGoals({...editableGoals, calories: Number(e.target.value)})}
              />
            </div>
          ) : (
            <Progress 
              value={calculatePercentage(dailyNutrition.calories, goals.calories)} 
              className="h-2"
            />
          )}
        </div>
        
        {/* Macronutrients */}
        <div className="space-y-4">
          <h3 className="font-medium">Macronutrients</h3>
          
          {/* Protein */}
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-1 text-sm">
                <div className="w-3 h-3 bg-facefit-purple rounded-full"></div>
                <span>Protein</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{dailyNutrition.protein}g</span>
                <span className="text-muted-foreground"> / {goals.protein}g</span>
              </div>
            </div>
            
            {isEditing ? (
              <div className="mb-4">
                <Label htmlFor="protein-goal">Protein Target (g)</Label>
                <Input
                  id="protein-goal"
                  type="number"
                  value={editableGoals.protein}
                  onChange={(e) => setEditableGoals({...editableGoals, protein: Number(e.target.value)})}
                />
              </div>
            ) : (
              <Progress 
                value={calculatePercentage(dailyNutrition.protein, goals.protein)} 
                className="h-2 bg-muted"
                indicatorClassName="bg-facefit-purple"
              />
            )}
          </div>
          
          {/* Carbs */}
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-1 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Carbs</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{dailyNutrition.carbs}g</span>
                <span className="text-muted-foreground"> / {goals.carbs}g</span>
              </div>
            </div>
            
            {isEditing ? (
              <div className="mb-4">
                <Label htmlFor="carbs-goal">Carbs Target (g)</Label>
                <Input
                  id="carbs-goal"
                  type="number"
                  value={editableGoals.carbs}
                  onChange={(e) => setEditableGoals({...editableGoals, carbs: Number(e.target.value)})}
                />
              </div>
            ) : (
              <Progress 
                value={calculatePercentage(dailyNutrition.carbs, goals.carbs)} 
                className="h-2 bg-muted"
                indicatorClassName="bg-blue-500"
              />
            )}
          </div>
          
          {/* Fat */}
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-1 text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Fat</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{dailyNutrition.fat}g</span>
                <span className="text-muted-foreground"> / {goals.fat}g</span>
              </div>
            </div>
            
            {isEditing ? (
              <div>
                <Label htmlFor="fat-goal">Fat Target (g)</Label>
                <Input
                  id="fat-goal"
                  type="number"
                  value={editableGoals.fat}
                  onChange={(e) => setEditableGoals({...editableGoals, fat: Number(e.target.value)})}
                />
              </div>
            ) : (
              <Progress 
                value={calculatePercentage(dailyNutrition.fat, goals.fat)} 
                className="h-2 bg-muted"
                indicatorClassName="bg-yellow-500"
              />
            )}
          </div>
        </div>
        
        {/* Macro Distribution */}
        {!isEditing && (
          <div>
            <h3 className="font-medium mb-2">Macro Distribution</h3>
            <div className="h-6 w-full flex rounded-full overflow-hidden">
              <div 
                className="bg-facefit-purple h-full"
                style={{ width: `${macroDistribution.protein}%` }}
              ></div>
              <div 
                className="bg-blue-500 h-full"
                style={{ width: `${macroDistribution.carbs}%` }}
              ></div>
              <div 
                className="bg-yellow-500 h-full"
                style={{ width: `${macroDistribution.fat}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Protein {macroDistribution.protein}%</span>
              <span>Carbs {macroDistribution.carbs}%</span>
              <span>Fat {macroDistribution.fat}%</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionGoals;
