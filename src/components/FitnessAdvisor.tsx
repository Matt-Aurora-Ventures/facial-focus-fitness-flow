
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Brain, Activity, FileText, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateTextWithGemini } from "@/utils/geminiApi";
import { supabase } from "@/integrations/supabase/client";

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
};

const FitnessAdvisor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const [fitnessGoals, setFitnessGoals] = useState('');
  // Updated to match the UserData type - using union type instead of string
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('');
  const [healthConditions, setHealthConditions] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [showCompileDialog, setShowCompileDialog] = useState(false);
  const { toast } = useToast();
  
  // Get user session and stored data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          // Here we would fetch user data from Supabase
          // For now, let's just use local storage as a placeholder
          const storedData = localStorage.getItem('fitnessAdvisorData');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            setFitnessGoals(parsedData.fitnessGoals || '');
            setFitnessLevel(parsedData.fitnessLevel || '');
            setHealthConditions(parsedData.healthConditions || '');
          }
          
          // In a real implementation, you would fetch mental health journal entries
          // from the database to include in the analysis
          const { data: journalEntries } = await supabase
            .from('mental_health_journal')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
          
          if (journalEntries) {
            setUserData(prev => ({
              ...prev,
              mentalHealthEntries: journalEntries.map(entry => ({
                date: new Date(entry.created_at).toLocaleDateString(),
                content: entry.content,
                mood_rating: entry.mood_rating
              }))
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);
  
  const saveUserData = () => {
    // We need to make sure fitnessLevel is properly typed before saving
    // Only include fitnessLevel if it's not an empty string
    const updatedData: UserData = {
      ...userData,
      fitnessGoals,
      healthConditions,
    };
    
    // Only add fitnessLevel if it's a valid value
    if (fitnessLevel !== '') {
      updatedData.fitnessLevel = fitnessLevel as 'beginner' | 'intermediate' | 'advanced';
    }
    
    // Store in localStorage as a placeholder
    localStorage.setItem('fitnessAdvisorData', JSON.stringify(updatedData));
    setUserData(updatedData);
    
    toast({
      title: "Preferences saved",
      description: "Your fitness preferences have been saved."
    });
  };
  
  const compileAdvice = async () => {
    setIsLoading(true);
    
    try {
      // Build a detailed prompt based on user data
      const mentalHealthSummary = userData.mentalHealthEntries?.map(
        entry => `Date: ${entry.date}, Mood: ${entry.mood_rating}/10, Entry: "${entry.content}"`
      ).join('\n') || "No mental health entries available.";
      
      const prompt = `
        As a holistic fitness advisor, provide personalized fitness advice based on the following user data:

        MENTAL HEALTH DATA:
        ${mentalHealthSummary}

        FITNESS PROFILE:
        - Fitness Goals: ${fitnessGoals || "Not specified"}
        - Fitness Level: ${fitnessLevel || "Not specified"}
        - Health Conditions: ${healthConditions || "None mentioned"}

        Previous Advice Given: ${userData.lastAdvice ? userData.lastAdvice.content : "None"}

        Please provide:
        1. A personalized fitness plan that considers both mental and physical health
        2. Specific exercises that align with their goals and current mental state
        3. Mindfulness practices that could complement their fitness routine
        4. Nutrition recommendations that support both mental and physical wellbeing
        
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
            Save Preferences
          </Button>
          
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
        </div>
      </CardContent>
      
      {userData.lastAdvice && (
        <CardFooter className="flex flex-col items-start border-t pt-4">
          <div className="text-sm font-medium">Last Advice Generated:</div>
          <div className="text-xs text-muted-foreground">
            {new Date(userData.lastAdvice.date).toLocaleDateString()}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FitnessAdvisor;
