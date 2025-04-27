
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Clock, Activity, Star } from "lucide-react";

const RunningTrails: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  const trails = [
    {
      id: 1,
      name: "Riverside Path",
      difficulty: "easy",
      distance: "3.2 miles",
      elevation: "50 ft",
      rating: 4.7,
      location: "Downtown Riverfront",
      estimatedTime: "45 min",
      description: "Scenic riverside trail perfect for beginners and casual runners"
    },
    {
      id: 2,
      name: "Mountain Ridge Loop",
      difficulty: "hard",
      distance: "8.5 miles",
      elevation: "1,200 ft",
      rating: 4.9,
      location: "North Mountain Park",
      estimatedTime: "2.5 hrs",
      description: "Challenging trail with steep inclines and technical terrain"
    },
    {
      id: 3,
      name: "Forest Valley Circuit",
      difficulty: "moderate",
      distance: "5.7 miles",
      elevation: "400 ft",
      rating: 4.5,
      location: "Forest Valley Reserve",
      estimatedTime: "1.5 hrs",
      description: "Mixed terrain trail through scenic forest paths"
    }
  ];

  const filteredTrails = selectedDifficulty === 'all' 
    ? trails 
    : trails.filter(trail => trail.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'text-green-500 bg-green-100';
      case 'moderate':
        return 'text-yellow-500 bg-yellow-100';
      case 'hard':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Running Trails</h2>
        <div className="flex gap-2">
          <Button 
            variant={selectedDifficulty === 'all' ? 'default' : 'outline'} 
            className={selectedDifficulty === 'all' ? 'bg-facefit-purple' : ''}
            onClick={() => setSelectedDifficulty('all')}
          >
            All
          </Button>
          <Button 
            variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
            className={selectedDifficulty === 'easy' ? 'bg-facefit-purple' : ''}
            onClick={() => setSelectedDifficulty('easy')}
          >
            Easy
          </Button>
          <Button 
            variant={selectedDifficulty === 'moderate' ? 'default' : 'outline'}
            className={selectedDifficulty === 'moderate' ? 'bg-facefit-purple' : ''}
            onClick={() => setSelectedDifficulty('moderate')}
          >
            Moderate
          </Button>
          <Button 
            variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
            className={selectedDifficulty === 'hard' ? 'bg-facefit-purple' : ''}
            onClick={() => setSelectedDifficulty('hard')}
          >
            Hard
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTrails.map((trail) => (
          <Card key={trail.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-facefit-purple/20 flex items-center justify-center">
                    <Map className="h-10 w-10 text-facefit-purple" />
                  </div>
                </div>
                <div className="sm:w-3/4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium">{trail.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-facefit-purple text-facefit-purple mr-1" />
                      <span>{trail.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{trail.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{trail.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{trail.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm px-2 py-0.5 rounded-full capitalize ${getDifficultyColor(trail.difficulty)}`}>
                        {trail.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{trail.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90">Start Run</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RunningTrails;
