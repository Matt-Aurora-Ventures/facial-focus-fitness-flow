
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Apple, Plus, Search, X } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

const FoodDiary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foodEntries, setFoodEntries] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Greek Yogurt',
      calories: 150,
      protein: 15,
      carbs: 7,
      fat: 5,
      mealType: 'breakfast'
    },
    {
      id: '2',
      name: 'Chicken Salad',
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 18,
      mealType: 'lunch'
    }
  ]);
  
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast' as MealType
  });
  
  const foodDatabase = [
    { name: 'Greek Yogurt', calories: 150, protein: 15, carbs: 7, fat: 5 },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Quinoa', calories: 120, protein: 4, carbs: 21, fat: 1.9 },
    { name: 'Avocado', calories: 234, protein: 2.9, carbs: 12.5, fat: 21 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13 },
    { name: 'Whole Wheat Bread', calories: 80, protein: 4, carbs: 15, fat: 1.1 },
    { name: 'Egg', calories: 72, protein: 6, carbs: 0.6, fat: 5 },
    { name: 'Almonds', calories: 162, protein: 6, carbs: 6, fat: 14 },
    { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
  ];

  const calculateTotals = () => {
    return foodEntries.reduce((acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbs += food.carbs;
      acc.fat += food.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };
  
  const handleAddFood = () => {
    if (newFood.name && newFood.calories) {
      const newEntry: FoodItem = {
        id: Date.now().toString(),
        name: newFood.name,
        calories: Number(newFood.calories),
        protein: Number(newFood.protein) || 0,
        carbs: Number(newFood.carbs) || 0,
        fat: Number(newFood.fat) || 0,
        mealType: newFood.mealType,
      };
      
      setFoodEntries([...foodEntries, newEntry]);
      setNewFood({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        mealType: 'breakfast'
      });
    }
  };
  
  const handleSelectFood = (food: typeof foodDatabase[0]) => {
    setNewFood({
      ...newFood,
      name: food.name,
      calories: food.calories.toString(),
      protein: food.protein.toString(),
      carbs: food.carbs.toString(),
      fat: food.fat.toString(),
    });
  };
  
  const handleRemoveFood = (id: string) => {
    setFoodEntries(foodEntries.filter(food => food.id !== id));
  };
  
  const filteredFoods = foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totals = calculateTotals();

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-green/20 flex items-center justify-center">
              <Apple className="w-4 h-4 text-facefit-green" />
            </div>
            <CardTitle>Food Diary</CardTitle>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-facefit-green hover:bg-facefit-green/80">
                <Plus className="h-3.5 w-3.5" />
                <span>Add Food</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Food to Diary</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="foodSearch">Search Food Database</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="foodSearch"
                      placeholder="Search foods..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="bg-accent/50 rounded-md h-40 overflow-y-auto p-2 mt-2">
                    {filteredFoods.length > 0 ? (
                      filteredFoods.map((food, index) => (
                        <div 
                          key={index}
                          className="flex justify-between items-center p-2 hover:bg-accent rounded cursor-pointer"
                          onClick={() => handleSelectFood(food)}
                        >
                          <span>{food.name}</span>
                          <span className="text-sm text-muted-foreground">{food.calories} cal</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-muted-foreground">No foods found</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foodName">Food Name</Label>
                    <Input
                      id="foodName"
                      value={newFood.name}
                      onChange={(e) => setNewFood({...newFood, name: e.target.value})}
                      placeholder="Enter food name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mealType">Meal Type</Label>
                    <Select 
                      onValueChange={(value: 'breakfast' | 'lunch' | 'dinner' | 'snack') => 
                        setNewFood({...newFood, mealType: value})
                      }
                      value={newFood.mealType}
                    >
                      <SelectTrigger id="mealType">
                        <SelectValue placeholder="Select meal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({...newFood, calories: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      type="number"
                      value={newFood.protein}
                      onChange={(e) => setNewFood({...newFood, protein: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      type="number"
                      value={newFood.carbs}
                      onChange={(e) => setNewFood({...newFood, carbs: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      type="number"
                      value={newFood.fat}
                      onChange={(e) => setNewFood({...newFood, fat: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="bg-facefit-green hover:bg-facefit-green/90" onClick={handleAddFood}>
                    Add to Diary
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Nutrition summary */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-3 bg-accent/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Calories</p>
              <p className="text-xl font-semibold">{totals.calories}</p>
            </div>
            <div className="p-3 bg-accent/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="text-xl font-semibold">{totals.protein}g</p>
            </div>
            <div className="p-3 bg-accent/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Carbs</p>
              <p className="text-xl font-semibold">{totals.carbs}g</p>
            </div>
            <div className="p-3 bg-accent/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Fat</p>
              <p className="text-xl font-semibold">{totals.fat}g</p>
            </div>
          </div>
          
          {/* Food entries table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Food</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right">P/C/F</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No foods added yet. Add your first food!
                  </TableCell>
                </TableRow>
              ) : (
                foodEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {entry.mealType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{entry.calories}</TableCell>
                    <TableCell className="text-right text-sm">
                      {entry.protein}g / {entry.carbs}g / {entry.fat}g
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleRemoveFood(entry.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodDiary;
