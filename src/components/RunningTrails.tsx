
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Filter, Mountain, Timer, Ruler, Star, Heart } from "lucide-react";

const RunningTrails: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'moderate' | 'hard'>('all');
  
  // Mock data for trails
  const trails = [
    {
      id: 1,
      name: "Riverside Loop",
      difficulty: "easy",
      rating: 4.7,
      distance: 3.2,
      elevation: 50,
      time: "30-45 min",
      location: "Riverside Park, Fitness City",
      description: "Scenic flat trail along the river with great views",
      favorite: true
    },
    {
      id: 2,
      name: "Forest Hills Track",
      difficulty: "moderate",
      rating: 4.5,
      distance: 5.8,
      elevation: 150,
      time: "50-70 min",
      location: "Forest Hills Park, Fitness City",
      description: "Beautiful wooded trail with moderate hills",
      favorite: false
    },
    {
      id: 3,
      name: "Mountain Summit Route",
      difficulty: "hard",
      rating: 4.9,
      distance: 8.5,
      elevation: 350,
      time: "90-120 min",
      location: "Mountain View Park, Fitness City",
      description: "Challenging trail with steep climbs and amazing views from the summit",
      favorite: false
    },
  ];

  const filteredTrails = difficulty === 'all'
    ? trails
    : trails.filter(trail => trail.difficulty === difficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Running Trails</h2>
        <Button className="bg-facefit-purple hover:bg-facefit-purple/90">
          <MapPin className="h-4 w-4 mr-2" />
          Map View
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for trails..."
                className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={difficulty === 'all' ? 'default' : 'outline'} 
                className={difficulty === 'all' ? 'bg-facefit-purple' : ''}
                onClick={() => setDifficulty('all')}
              >
                All
              </Button>
              <Button 
                variant={difficulty === 'easy' ? 'default' : 'outline'} 
                className={difficulty === 'easy' ? 'bg-green-600' : ''}
                onClick={() => setDifficulty('easy')}
              >
                Easy
              </Button>
              <Button 
                variant={difficulty === 'moderate' ? 'default' : 'outline'} 
                className={difficulty === 'moderate' ? 'bg-yellow-600' : ''}
                onClick={() => setDifficulty('moderate')}
              >
                Moderate
              </Button>
              <Button 
                variant={difficulty === 'hard' ? 'default' : 'outline'} 
                className={difficulty === 'hard' ? 'bg-red-600' : ''}
                onClick={() => setDifficulty('hard')}
              >
                Hard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trail Map Placeholder */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-60 bg-accent flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-facefit-purple" />
              <p className="text-lg font-medium">Trail Map</p>
              <p className="text-sm text-muted-foreground">Click to view trails on the map</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trail Listings */}
      <div className="space-y-4">
        {filteredTrails.map((trail) => (
          <Card key={trail.id}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-medium">{trail.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trail.difficulty)}`}>
                      {trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{trail.location}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-facefit-purple text-facefit-purple mr-1" />
                  <span>{trail.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="flex flex-col items-center p-2 bg-accent/30 rounded-md">
                  <Ruler className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{trail.distance} mi</span>
                  <span className="text-xs text-muted-foreground">Distance</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-accent/30 rounded-md">
                  <Mountain className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{trail.elevation} ft</span>
                  <span className="text-xs text-muted-foreground">Elevation</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-accent/30 rounded-md">
                  <Timer className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{trail.time}</span>
                  <span className="text-xs text-muted-foreground">Est. Time</span>
                </div>
              </div>
              
              <p className="text-sm mb-4">{trail.description}</p>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">View Details</Button>
                <Button 
                  variant="outline" 
                  className={`w-10 ${trail.favorite ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${trail.favorite ? 'fill-red-500' : ''}`} />
                </Button>
                <Button className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90">Start Run</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RunningTrails;
