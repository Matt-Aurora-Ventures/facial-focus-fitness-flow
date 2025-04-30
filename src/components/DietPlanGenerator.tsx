
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Apple, SparkleIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DietPlanGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryRestrictions: '',
    goals: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation, this would make an API call to an AI service
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a sample diet plan based on the form data
      const plan = generateSampleDietPlan(formData);
      setDietPlan(plan);
      
      toast({
        title: "Diet Plan Generated",
        description: "Your custom diet plan is ready!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate diet plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const generateSampleDietPlan = (data: typeof formData) => {
    // This is a placeholder for actual AI-generated content
    const { age, sex, weight, goals, activityLevel } = data;
    
    return `
# Custom Diet Plan for ${sex === 'male' ? 'Male' : 'Female'}, ${age} years old, ${weight} lbs

## Daily Nutritional Goals
- Calories: ${Number(weight) * (activityLevel === 'high' ? 15 : activityLevel === 'medium' ? 13 : 11)} kcal
- Protein: ${goals.includes('muscle') ? '1.8g' : '1.2g'} per kg of body weight
- Carbs: ${goals.includes('weight-loss') ? '40%' : '50%'} of total calories
- Fat: ${goals.includes('weight-loss') ? '35%' : '30%'} of total calories

## Meal Plan
### Breakfast
- Oatmeal with berries and nuts
- Greek yogurt
- Green tea or black coffee

### Mid-Morning Snack
- Apple with 1 tbsp natural peanut butter
- Handful of almonds

### Lunch
- Grilled chicken breast or tofu
- Quinoa or brown rice
- Roasted vegetables
- Olive oil dressing

### Afternoon Snack
- Protein shake
- Rice cake with avocado

### Dinner
- Baked salmon or lentils
- Sweet potato
- Steamed broccoli and carrots
- Small side salad

### Evening (optional)
- Herbal tea
- Small serving of cottage cheese if hungry

## Recommendations
- Drink at least 8 glasses of water daily
- Limit processed foods and added sugars
- Consider meal prepping to stay consistent
- Adjust portions based on hunger and energy levels

This plan is customized based on your ${goals} goals and ${activityLevel} activity level. Track your progress and adjust as needed.
    `;
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-full bg-facefit-green/20 p-2">
          <Apple className="w-5 h-5 text-facefit-green" />
        </div>
        <h2 className="text-2xl font-semibold">AI Diet Plan Generator</h2>
      </div>
      
      {dietPlan ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Your Custom Diet Plan</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => setDietPlan(null)}
              className="text-sm"
            >
              Create New Plan
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/50 rounded-lg p-5">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {dietPlan}
              </pre>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <SparkleIcon className="w-5 h-5 text-facefit-purple" />
              <CardTitle>Generate Your Custom Diet Plan</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Fill in your details below to get a personalized nutrition plan based on your goals and needs
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    name="age" 
                    type="number"
                    placeholder="Enter your age" 
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('sex', value)}
                    required
                  >
                    <SelectTrigger id="sex">
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input 
                    id="weight" 
                    name="weight" 
                    type="number"
                    placeholder="Enter your weight" 
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (in)</Label>
                  <Input 
                    id="height" 
                    name="height" 
                    type="number"
                    placeholder="Enter your height" 
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('activityLevel', value)}
                    required
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="medium">Moderate (exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="high">Active (exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-high">Very Active (twice per day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goals">Primary Goal</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('goals', value)}
                    required
                  >
                    <SelectTrigger id="goals">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Build Muscle</SelectItem>
                      <SelectItem value="maintenance">Maintain Weight</SelectItem>
                      <SelectItem value="performance">Athletic Performance</SelectItem>
                      <SelectItem value="health">General Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions or Preferences</Label>
                <Textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  placeholder="e.g., vegetarian, gluten-free, allergies, etc."
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-facefit-green hover:bg-facefit-green/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Diet Plan...
                  </>
                ) : (
                  "Generate Custom Diet Plan"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietPlanGenerator;
