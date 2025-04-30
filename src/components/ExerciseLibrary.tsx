
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Dumbbell, Search, Plus, Play } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  instructions: string[];
  imageUrl?: string;
}

const exerciseData: Exercise[] = [
  {
    id: '1',
    name: 'Barbell Squats',
    muscleGroup: 'legs',
    difficulty: 'intermediate',
    equipment: 'Barbell',
    instructions: [
      'Stand with feet shoulder-width apart, barbell across upper back',
      'Bend knees and lower body as if sitting in a chair',
      'Keep chest up and back straight',
      'Lower until thighs are parallel to ground',
      'Return to starting position'
    ]
  },
  {
    id: '2',
    name: 'Push-ups',
    muscleGroup: 'chest',
    difficulty: 'beginner',
    equipment: 'Bodyweight',
    instructions: [
      'Start in plank position with hands slightly wider than shoulders',
      'Keep body in a straight line from head to heels',
      'Lower chest to the ground by bending elbows',
      'Push back up to starting position'
    ]
  },
  {
    id: '3',
    name: 'Deadlifts',
    muscleGroup: 'back',
    difficulty: 'advanced',
    equipment: 'Barbell',
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Bend at hips and knees, keeping back straight',
      'Grip bar with hands just outside legs',
      'Lift bar by driving hips forward',
      'Lower bar by hinging at hips and bending knees'
    ]
  },
  {
    id: '4',
    name: 'Shoulder Press',
    muscleGroup: 'shoulders',
    difficulty: 'intermediate',
    equipment: 'Dumbbells',
    instructions: [
      'Sit on bench with back support',
      'Hold dumbbells at shoulder height with palms facing forward',
      'Press weights up until arms are extended',
      'Lower weights back to shoulder level'
    ]
  },
  {
    id: '5',
    name: 'Bicep Curls',
    muscleGroup: 'arms',
    difficulty: 'beginner',
    equipment: 'Dumbbells',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold dumbbells with arms extended and palms facing forward',
      'Curl weights toward shoulders by bending elbows',
      'Lower weights back to starting position'
    ]
  }
];

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const muscleGroups = ['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
  
  const filteredExercises = exerciseData.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || exercise.muscleGroup === activeTab;
    return matchesSearch && matchesTab;
  });
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-purple/20 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-facefit-purple" />
            </div>
            <CardTitle>Exercise Library</CardTitle>
          </div>
          
          <Button size="sm" className="gap-1 bg-facefit-purple hover:bg-facefit-purple/90">
            <Plus className="h-3.5 w-3.5" />
            <span>Add to Workout</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tabs for muscle groups */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex-wrap justify-start">
            {muscleGroups.map((group) => (
              <TabsTrigger 
                key={group} 
                value={group}
                className="capitalize"
              >
                {group}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {muscleGroups.map((group) => (
            <TabsContent key={group} value={group} className="mt-4 space-y-2">
              {filteredExercises.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No exercises found</p>
                </div>
              ) : (
                filteredExercises.map((exercise) => (
                  <Dialog key={exercise.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-md cursor-pointer"
                        onClick={() => setSelectedExercise(exercise)}
                      >
                        <div>
                          <h3 className="font-medium">{exercise.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-accent px-2 py-0.5 rounded-full capitalize">
                              {exercise.muscleGroup}
                            </span>
                            <span className="text-xs bg-accent px-2 py-0.5 rounded-full capitalize">
                              {exercise.difficulty}
                            </span>
                            <span className="text-xs bg-accent px-2 py-0.5 rounded-full">
                              {exercise.equipment}
                            </span>
                          </div>
                        </div>
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{exercise.name}</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="aspect-video bg-accent rounded-md flex items-center justify-center">
                          <Dumbbell className="h-12 w-12 text-muted-foreground" />
                          <span className="sr-only">Exercise demonstration</span>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs bg-accent px-2 py-1 rounded-full capitalize">
                            {exercise.muscleGroup}
                          </span>
                          <span className="text-xs bg-accent px-2 py-1 rounded-full capitalize">
                            {exercise.difficulty}
                          </span>
                          <span className="text-xs bg-accent px-2 py-1 rounded-full">
                            {exercise.equipment}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Instructions:</h4>
                          <ol className="space-y-1 ml-5 list-decimal">
                            {exercise.instructions.map((step, i) => (
                              <li key={i} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90">
                            Add to Workout
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Save to Favorites
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExerciseLibrary;
