
import React from 'react';
import { Dumbbell, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkoutLog: React.FC = () => {
  const workouts = [
    { 
      name: "Upper Body Strength", 
      completed: true, 
      date: "Yesterday", 
      exercises: [
        "Bench Press: 3×10",
        "Pull-ups: 3×8",
        "Shoulder Press: 3×12"
      ]
    },
    { 
      name: "HIIT Cardio", 
      completed: true, 
      date: "2 days ago", 
      exercises: [
        "Jumping Jacks",
        "Burpees",
        "Mountain Climbers"
      ]
    }
  ];

  const upcomingWorkout = {
    name: "Lower Body Day",
    scheduled: "Today",
    exercises: [
      "Squats: 4×10",
      "Lunges: 3×12",
      "Leg Press: 3×15"
    ]
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-facefit-purple/20 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-facefit-purple" />
            </div>
            <h3 className="font-medium">Workouts</h3>
          </div>
          <Button size="sm" className="gap-1 bg-facefit-purple hover:bg-facefit-purple-dark">
            <Plus className="h-3.5 w-3.5" />
            <span>Create</span>
          </Button>
        </div>
        
        {/* Upcoming workout */}
        <div className="mb-5 p-3 bg-accent rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold">{upcomingWorkout.name}</h4>
            <span className="text-xs bg-facefit-purple text-white px-2 py-0.5 rounded-full">
              {upcomingWorkout.scheduled}
            </span>
          </div>
          
          <div className="space-y-1 mb-3">
            {upcomingWorkout.exercises.map((exercise, index) => (
              <div key={index} className="text-xs flex items-center gap-2">
                <ArrowRight className="h-3 w-3 text-facefit-purple" />
                <span>{exercise}</span>
              </div>
            ))}
          </div>
          
          <Button size="sm" className="w-full bg-facefit-purple/20 text-facefit-purple hover:bg-facefit-purple/30">
            Start Workout
          </Button>
        </div>
        
        {/* Workout history */}
        <h4 className="text-xs font-medium text-muted-foreground mb-2">WORKOUT HISTORY</h4>
        <div className="space-y-3">
          {workouts.map((workout, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{workout.name}</h4>
                <p className="text-xs text-muted-foreground">{workout.date}</p>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutLog;
