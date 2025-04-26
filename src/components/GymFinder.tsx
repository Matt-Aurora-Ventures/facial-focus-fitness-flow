
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Filter, Star, Dumbbell, Users, Clock, Phone } from "lucide-react";

const GymFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for gyms
  const gyms = [
    {
      id: 1,
      name: "FitZone Elite",
      rating: 4.7,
      distance: 0.8,
      address: "123 Fitness Ave, Workout City",
      hours: "5:00 AM - 11:00 PM",
      phone: "(555) 123-4567",
      amenities: ["24/7 Access", "Pool", "Classes", "Sauna"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "PowerLift Center",
      rating: 4.5,
      distance: 1.2,
      address: "456 Muscle St, Strength Town",
      hours: "6:00 AM - 10:00 PM",
      phone: "(555) 987-6543",
      amenities: ["Free Weights", "Cardio Zone", "CrossFit"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Fitness Revolution",
      rating: 4.8,
      distance: 1.5,
      address: "789 Cardio Blvd, Wellness Springs",
      hours: "5:00 AM - 12:00 AM",
      phone: "(555) 456-7890",
      amenities: ["Group Classes", "Personal Training", "Juice Bar"],
      image: "/placeholder.svg"
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gym Finder</h2>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for gyms near you..."
                className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button className="bg-facefit-purple hover:bg-facefit-purple/90">
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-60 bg-accent flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-facefit-purple" />
              <p className="text-lg font-medium">Map View</p>
              <p className="text-sm text-muted-foreground">Click to see gyms on the map</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gym Listings */}
      <div className="space-y-4">
        {gyms.map((gym) => (
          <Card key={gym.id} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 h-40 sm:h-auto bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Dumbbell className="w-12 h-12 text-muted-foreground/40" />
                </div>
              </div>
              <div className="sm:w-2/3">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{gym.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-facefit-purple text-facefit-purple" />
                      <span className="font-medium">{gym.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{gym.distance} miles away • {gym.address}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{gym.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{gym.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm col-span-2">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{gym.amenities.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">More Info</Button>
                    <Button className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90">Get Directions</Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GymFinder;
