
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Star, User } from "lucide-react";

interface TrainerWorkout {
  id: string;
  title: string;
  trainer: string;
  price: number;
  rating: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
}

const workouts: TrainerWorkout[] = [
  {
    id: '1',
    title: 'Full Body Power',
    trainer: 'Alex Johnson',
    price: 19.99,
    rating: 4.8,
    category: 'Strength',
    level: 'Intermediate',
    duration: '45 min',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Core Crusher',
    trainer: 'Maria Silva',
    price: 14.99,
    rating: 4.7,
    category: 'Core',
    level: 'Advanced',
    duration: '30 min',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Beginner HIIT',
    trainer: 'John Doe',
    price: 9.99,
    rating: 4.9,
    category: 'Cardio',
    level: 'Beginner',
    duration: '20 min',
    image: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Yoga Flow',
    trainer: 'Emma Wilson',
    price: 12.99,
    rating: 4.6,
    category: 'Flexibility',
    level: 'Intermediate',
    duration: '60 min',
    image: '/placeholder.svg'
  }
];

const WorkoutMarketplace: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Workout Marketplace</h2>
        <Button variant="outline" className="gap-2">
          <Dumbbell className="w-4 h-4" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden hover:shadow-md transition-all">
            <div className="h-40 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                <Dumbbell className="w-12 h-12 text-muted-foreground/40" />
              </div>
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                ${workout.price}
              </div>
            </div>
            <CardHeader className="py-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{workout.title}</CardTitle>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-facefit-purple text-facefit-purple" />
                  <span className="text-sm font-medium">{workout.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{workout.trainer}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex gap-2 mb-2">
                <span className="bg-accent text-xs px-2 py-1 rounded-full">{workout.category}</span>
                <span className="bg-accent text-xs px-2 py-1 rounded-full">{workout.level}</span>
                <span className="bg-accent text-xs px-2 py-1 rounded-full">{workout.duration}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-facefit-purple hover:bg-facefit-purple/90">
                Purchase Workout
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutMarketplace;
