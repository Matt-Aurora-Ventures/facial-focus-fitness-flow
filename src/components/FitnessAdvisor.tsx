
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Brain, Activity, FileText, Clock, Save, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateTextWithGemini } from "@/utils/geminiApi";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserData = {
  mentalHealthEntries?: {
    date: string;
    content: string;
    mood_rating: number;
  }[];
  fitnessGoals?: string;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  healthConditions?: string;
  lastAdvice?: {
    date: string;
    content: string;
  };
  exerciseLog?: {
    id: string;
    date: string;
    name: string;
    duration: number;
    intensity: 'low' | 'moderate' | 'high';
    notes: string;
  }[];
};

type Exercise = {
  id: string;
  date: string;
  name: string;
  duration: number;
  intensity: 'low' | 'moderate' | 'high';
  notes: string;
};

const FitnessAdvisor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('');
  const [healthConditions, setHealthConditions] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [showCompileDialog, setShowCompileDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('preferences');
  const { toast } = useToast();
  
  // Exercise logging states
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState<number>(30);
  const [exerciseIntensity, setExerciseIntensity] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [exerciseNotes, setExerciseNotes] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  
  // Get user session and stored data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        // Load from localStorage first as a fallback
        const storedData = localStorage.getItem('fitnessAdvisorData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setFitnessGoals(parsedData.fitnessGoals || '');
          setFitnessLevel(parsedData.fitnessLevel || '');
          setHealthConditions(parsedData.healthConditions || '');
          setExercises(parsedData.exerciseLog || []);
        }
        
        // If user is authenticated, try to load from database
        if (sessionData?.session?.user) {
          try {
            // In a real implementation with a proper database schema, 
            // you would fetch user fitness data from a dedicated table
            
            // For now, we'll get mental health entries to include in analysis
            const { data: journalEntries, error } = await supabase
              .from('mental_health_journal')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(5);
            
            if (error) throw error;
            
            if (journalEntries && journalEntries.length > 0) {
              setUserData(prev => ({
                ...prev,
                mentalHealthEntries: journalEntries.map(entry => ({
                  date: new Date(entry.created_at).toLocaleDateString(),
                  content: entry.content,
                  mood_rating: entry.mood_rating
                }))
              }));
            }
          } catch (dbError) {
            console.error('Error fetching from database:', dbError);
            // Continue with localStorage data if database fetch fails
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error loading data",
          description: "Could not load your fitness data. Using local storage instead.",
          variant: "destructive"
        });
      }
    };
    
    fetchUserData();
  }, [toast]);
  
  const saveUserData = () => {
    if (!fitnessGoals.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your fitness goals before saving.",
        variant: "destructive"
      });
      return;
    }

    // Create updated user data object with proper typing
    const updatedData: UserData = {
      ...userData,
      fitnessGoals,
      healthConditions,
      exerciseLog: exercises
    };
    
    // Only add fitnessLevel if it's a valid value
    if (fitnessLevel !== '') {
      updatedData.fitnessLevel = fitnessLevel as 'beginner' | 'intermediate' | 'advanced';
    }
    
    // Store in localStorage as a placeholder
    localStorage.setItem('fitnessAdvisorData', JSON.stringify(updatedData));
    setUserData(updatedData);
    
    // Optionally save to database if user is authenticated
    const saveToDatabase = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          // In a production app, you would save to a fitness_profiles table
          // For now we'll just show a success message
          toast({
            title: "Preferences saved",
            description: "Your fitness preferences have been saved."
          });
        }
      } catch (error) {
        console.error('Error saving to database:', error);
      }
    };
    
    saveToDatabase();
    
    toast({
      title: "Preferences saved",
      description: "Your fitness preferences have been saved."
    });
  };

  const addExercise = () => {
    if (!exerciseName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter an exercise name before adding.",
        variant: "destructive"
      });
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      name: exerciseName,
      duration: exerciseDuration,
      intensity: exerciseIntensity,
      notes: exerciseNotes
    };
    
    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);
    
    // Update userData with the new exercise
    const updatedData = {
      ...userData,
      exerciseLog: updatedExercises
    };
    
    setUserData(updatedData);
    localStorage.setItem('fitnessAdvisorData', JSON.stringify(updatedData));
    
    // Reset form
    setExerciseName('');
    setExerciseDuration(30);
    setExerciseIntensity('moderate');
    setExerciseNotes('');
    
    toast({
      title: "Exercise added",
      description: "Your workout has been recorded successfully."
    });
  };
  
  const deleteExercise = (id: string) => {
    const updatedExercises = exercises.filter(exercise => exercise.id !== id);
    setExercises(updatedExercises);
    
    // Update userData with the filtered exercises
    const updatedData = {
      ...userData,
      exerciseLog: updatedExercises
    };
    
    setUserData(updatedData);
    localStorage.setItem('fitnessAdvisorData', JSON.stringify(updatedData));
    
    toast({
      title: "Exercise removed",
      description: "The exercise has been deleted from your log."
    });
  };
  
  const compileAdvice = async () => {
    if (!fitnessGoals) {
      toast({
        title: "Missing information",
        description: "Please enter your fitness goals before generating advice.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Build a detailed prompt based on user data
      const mentalHealthSummary = userData.mentalHealthEntries?.map(
        entry => `Date: ${entry.date}, Mood: ${entry.mood_rating}/10, Entry: "${entry.content}"`
      ).join('\n') || "No mental health entries available.";
      
      const exercisesSummary = exercises?.map(
        exercise => `Date: ${exercise.date}, Exercise: ${exercise.name}, Duration: ${exercise.duration} minutes, Intensity: ${exercise.intensity}, Notes: ${exercise.notes || "None"}`
      ).join('\n') || "No exercise entries available.";
      
      const prompt = `
        As a holistic fitness advisor, provide personalized fitness advice based on the following user data:

        MENTAL HEALTH DATA:
        ${mentalHealthSummary}

        FITNESS PROFILE:
        - Fitness Goals: ${fitnessGoals || "Not specified"}
        - Fitness Level: ${fitnessLevel || "Not specified"}
        - Health Conditions: ${healthConditions || "None mentioned"}

        RECENT EXERCISE ACTIVITY:
        ${exercisesSummary}

        Previous Advice Given: ${userData.lastAdvice ? userData.lastAdvice.content : "None"}

        Please provide:
        1. A personalized fitness plan that considers both mental and physical health
        2. Specific exercises that align with their goals and current mental state
        3. Mindfulness practices that could complement their fitness routine
        4. Nutrition recommendations that support both mental and physical wellbeing
        5. Suggestions for progression based on their current activity level
        
        Format the response in markdown with clear sections.
      `;
      
      const response = await generateTextWithGemini({
        model: "gemini-1.5-pro",
        prompt: prompt,
        temperature: 0.7,
        maxOutputTokens: 2048
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Store the advice in state and user data
      setAdvice(response.text);
      const updatedData = {
        ...userData,
        lastAdvice: {
          date: new Date().toISOString(),
          content: response.text
        }
      };
      
      setUserData(updatedData);
      localStorage.setItem('fitnessAdvisorData', JSON.stringify(updatedData));
      
      toast({
        title: "Advice Generated",
        description: "Your personalized fitness plan is ready to view."
      });
      
    } catch (error) {
      console.error('Error compiling fitness advice:', error);
      toast({
        title: "Error",
        description: "Failed to compile fitness advice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setShowCompileDialog(true);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-facefit-purple" />
          Personalized Fitness Advisor
        </CardTitle>
        <CardDescription>
          Get AI-powered fitness recommendations based on your mental health and fitness data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="preferences">Fitness Profile</TabsTrigger>
            <TabsTrigger value="exercises">Exercise Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fitnessGoals">Your Fitness Goals</Label>
              <Textarea
                id="fitnessGoals"
                placeholder="e.g., lose weight, build muscle, improve endurance..."
                value={fitnessGoals}
                onChange={(e) => setFitnessGoals(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fitnessLevel">Your Fitness Level</Label>
              <Select 
                value={fitnessLevel} 
                onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setFitnessLevel(value)}
              >
                <SelectTrigger id="fitnessLevel">
                  <SelectValue placeholder="Select your fitness level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="healthConditions">Health Concerns or Conditions</Label>
              <Textarea
                id="healthConditions"
                placeholder="e.g., back pain, asthma, high blood pressure..."
                value={healthConditions}
                onChange={(e) => setHealthConditions(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                onClick={saveUserData}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="exercises" className="space-y-4">
            <div className="border rounded-md p-4 bg-accent/20">
              <h3 className="text-sm font-medium mb-2">Add New Exercise</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="exerciseName">Exercise Name</Label>
                  <Input
                    id="exerciseName"
                    placeholder="e.g., Running, Yoga, Weight Training"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="exerciseDuration">Duration (minutes)</Label>
                    <Input
                      id="exerciseDuration"
                      type="number"
                      min={1}
                      value={exerciseDuration}
                      onChange={(e) => setExerciseDuration(parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exerciseIntensity">Intensity</Label>
                    <Select 
                      value={exerciseIntensity} 
                      onValueChange={(value: 'low' | 'moderate' | 'high') => setExerciseIntensity(value)}
                    >
                      <SelectTrigger id="exerciseIntensity">
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="exerciseNotes">Notes</Label>
                  <Textarea
                    id="exerciseNotes"
                    placeholder="How did you feel? Any achievements?"
                    value={exerciseNotes}
                    onChange={(e) => setExerciseNotes(e.target.value)}
                    className="mt-1 min-h-[60px]"
                  />
                </div>
                
                <Button
                  onClick={addExercise}
                  className="w-full bg-facefit-purple hover:bg-facefit-purple/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exercise
                </Button>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium mb-2">Your Exercise History</h3>
              {exercises.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No exercises recorded yet
                </div>
              ) : (
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {exercises.map((exercise) => (
                    <div key={exercise.id} className="border rounded-md p-3 flex justify-between">
                      <div>
                        <div className="flex gap-2 items-center">
                          <h4 className="font-medium">{exercise.name}</h4>
                          <span className={`text-xs rounded-full px-2 py-0.5 ${
                            exercise.intensity === 'high' ? 'bg-rose-200 text-rose-800' : 
                            exercise.intensity === 'moderate' ? 'bg-amber-200 text-amber-800' : 
                            'bg-green-200 text-green-800'
                          }`}>
                            {exercise.intensity}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{exercise.date} • {exercise.duration} min</div>
                        {exercise.notes && <div className="text-xs mt-1">{exercise.notes}</div>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteExercise(exercise.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={showCompileDialog} onOpenChange={setShowCompileDialog}>
          <DialogTrigger asChild>
            <Button 
              onClick={compileAdvice} 
              className="w-full bg-facefit-purple hover:bg-facefit-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Compile Personalized Fitness Advice
                </>
              )}
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-facefit-purple" />
                Your Personalized Fitness Plan
              </DialogTitle>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                Generated on {new Date().toLocaleDateString()}
              </div>
            </DialogHeader>
            
            {advice ? (
              <div className="prose prose-sm max-w-full dark:prose-invert mt-4">
                <div className="whitespace-pre-wrap">{advice}</div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowCompileDialog(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      
      {userData.lastAdvice && (
        <CardFooter className="flex flex-col items-start border-t pt-4">
          <div className="text-sm font-medium">Last Advice Generated:</div>
          <div className="text-xs text-muted-foreground">
            {new Date(userData.lastAdvice.date).toLocaleDateString()}
          </div>
          <Button 
            variant="link" 
            className="p-0 h-auto text-facefit-purple"
            onClick={() => {
              setAdvice(userData.lastAdvice?.content || null);
              setShowCompileDialog(true);
            }}
          >
            View Previous Advice
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FitnessAdvisor;
