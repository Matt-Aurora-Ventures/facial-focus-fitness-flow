
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Save, Trash, Edit, Dumbbell, Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  date: Date;
  exercises: Exercise[];
}

const WorkoutPlanner: React.FC = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    {
      id: '1',
      name: 'Upper Body Day',
      date: new Date(2025, 3, 25),
      exercises: [
        { id: '101', name: 'Bench Press', sets: 3, reps: 10, weight: '165' },
        { id: '102', name: 'Pull-ups', sets: 3, reps: 8, weight: 'BW' },
        { id: '103', name: 'Shoulder Press', sets: 3, reps: 12, weight: '45' }
      ]
    },
    {
      id: '2',
      name: 'Lower Body Day',
      date: new Date(2025, 4, 2),
      exercises: [
        { id: '201', name: 'Squats', sets: 4, reps: 10, weight: '225' },
        { id: '202', name: 'Lunges', sets: 3, reps: 12, weight: '65' },
        { id: '203', name: 'Calf Raises', sets: 3, reps: 15, weight: '150' }
      ]
    }
  ]);
  
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [newExercise, setNewExercise] = useState<Omit<Exercise, 'id'>>({
    name: '',
    sets: 3,
    reps: 10,
    weight: ''
  });

  const handleAddExercise = () => {
    if (newExercise.name.trim() === '') return;
    
    const exercise = {
      ...newExercise,
      id: Date.now().toString()
    };
    
    setExercises([...exercises, exercise]);
    setNewExercise({
      name: '',
      sets: 3,
      reps: 10,
      weight: ''
    });
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setNewExercise({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight
    });
  };

  const handleUpdateExercise = () => {
    if (!editingExercise) return;
    
    setExercises(exercises.map(exercise => 
      exercise.id === editingExercise.id 
        ? { ...exercise, name: newExercise.name, sets: newExercise.sets, reps: newExercise.reps, weight: newExercise.weight } 
        : exercise
    ));
    
    setEditingExercise(null);
    setNewExercise({
      name: '',
      sets: 3,
      reps: 10,
      weight: ''
    });
  };

  const handleSaveWorkout = () => {
    if (workoutName.trim() === '' || exercises.length === 0 || !date) return;
    
    const newWorkout: WorkoutPlan = {
      id: Date.now().toString(),
      name: workoutName,
      date: date,
      exercises: [...exercises]
    };
    
    setWorkoutPlans([...workoutPlans, newWorkout]);
    setWorkoutName('');
    setExercises([]);
    setDate(new Date());
  };

  const handleSelectWorkout = (workout: WorkoutPlan) => {
    if (selectedWorkout === workout.id) {
      setSelectedWorkout(null);
    } else {
      setSelectedWorkout(workout.id);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-facefit-purple" />
            Create Workout Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="workout-name">Workout Name</Label>
            <Input 
              id="workout-name"
              placeholder="e.g., Upper Body Strength"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Scheduled Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Exercises</h4>
            </div>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <Label htmlFor="exercise-name">Exercise</Label>
                  <Input 
                    id="exercise-name"
                    placeholder="e.g., Bench Press"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="sets">Sets</Label>
                  <Input 
                    id="sets"
                    type="number"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({...newExercise, sets: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="reps">Reps</Label>
                  <Input 
                    id="reps"
                    type="number"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({...newExercise, reps: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input 
                    id="weight"
                    placeholder="lbs/kg"
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise({...newExercise, weight: e.target.value})}
                  />
                </div>
                <div className="col-span-2 flex items-end">
                  {editingExercise ? (
                    <Button onClick={handleUpdateExercise} className="w-full bg-facefit-purple hover:bg-facefit-purple/90">
                      Update
                    </Button>
                  ) : (
                    <Button onClick={handleAddExercise} className="w-full bg-facefit-purple hover:bg-facefit-purple/90">
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {exercises.map((exercise) => (
                <div 
                  key={exercise.id}
                  className="flex justify-between items-center p-2 rounded-md hover:bg-accent/50"
                >
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets x {exercise.reps} reps {exercise.weight && `@ ${exercise.weight}`}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditExercise(exercise)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveExercise(exercise.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {exercises.length > 0 && (
              <Button 
                className="w-full bg-facefit-purple hover:bg-facefit-purple/90"
                onClick={handleSaveWorkout}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Workout Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-facefit-purple" />
            Scheduled Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workoutPlans.map((workout) => (
              <div 
                key={workout.id}
                className={`border rounded-md overflow-hidden ${selectedWorkout === workout.id ? 'ring-2 ring-facefit-purple' : ''}`}
              >
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => handleSelectWorkout(workout)}
                >
                  <div>
                    <h3 className="font-medium">{workout.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(workout.date, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-accent px-2 py-0.5 rounded-full">
                      {workout.exercises.length} Exercises
                    </span>
                    <Button variant="ghost" size="icon">
                      {selectedWorkout === workout.id ? (
                        <span className="text-xs">Hide</span>
                      ) : (
                        <span className="text-xs">Show</span>
                      )}
                    </Button>
                  </div>
                </div>
                
                {selectedWorkout === workout.id && (
                  <div className="border-t p-4 bg-accent/30">
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, index) => (
                        <div key={exercise.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{index + 1}. {exercise.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {exercise.sets} sets x {exercise.reps} reps {exercise.weight && `@ ${exercise.weight}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90">
                        Start Workout
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Export
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlanner;
