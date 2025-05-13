
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Filter, Star, Dumbbell, Users, Clock, Phone, Locate } from "lucide-react";
import Map from './Map';
import { useToast } from '@/hooks/use-toast';

interface Gym {
  id: number;
  name: string;
  rating: number;
  distance: number;
  address: string;
  hours: string;
  phone: string;
  amenities: string[];
  image: string;
  location?: { lat: number; lng: number };
}

const GymFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapView, setMapView] = useState(false);
  const { toast } = useToast();
  
  // Mock data for gyms with locations
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
      image: "/placeholder.svg",
      location: { lat: 34.052235, lng: -118.243683 }
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
      image: "/placeholder.svg",
      location: { lat: 34.058235, lng: -118.253683 }
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
      image: "/placeholder.svg",
      location: { lat: 34.048235, lng: -118.233683 }
    },
  ];

  const filteredGyms = searchQuery 
    ? gyms.filter(gym => 
        gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gym.amenities.some(amenity => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : gyms;

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location found",
            description: "Using your current location to find nearby gyms",
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location access to find gyms near you",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Select first gym as default when view changes to map
    if (mapView && filteredGyms.length > 0 && !selectedGym) {
      setSelectedGym(filteredGyms[0]);
    }
  }, [mapView, filteredGyms, selectedGym]);

  // Prepare markers for the map
  const mapMarkers = filteredGyms.map(gym => ({
    position: gym.location || { lat: 34.052235, lng: -118.243683 },
    title: gym.name
  }));

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gym Finder</h2>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-2">
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
            <Button 
              className={`gap-2 ${!mapView ? "bg-facefit-purple hover:bg-facefit-purple/90" : ""}`}
              variant={mapView ? "outline" : "default"}
              onClick={() => setMapView(!mapView)}
            >
              <MapPin className="h-4 w-4" />
              {mapView ? "List View" : "Map View"}
            </Button>
            <Button 
              onClick={getUserLocation}
              variant="outline"
              className="gap-2"
            >
              <Locate className="h-4 w-4" />
              Find Near Me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      {mapView && (
        <Card className="mb-6">
          <CardContent className="p-0 overflow-hidden">
            <Map 
              markers={mapMarkers} 
              center={selectedGym?.location || userLocation || undefined} 
              height="400px"
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {/* Gym Listings */}
      <div className="space-y-4">
        {filteredGyms.map((gym) => (
          <Card 
            key={gym.id} 
            className={`overflow-hidden ${selectedGym?.id === gym.id ? "ring-2 ring-facefit-purple" : ""}`}
            onClick={() => setSelectedGym(gym)}
          >
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
                    <Button 
                      className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90"
                      onClick={() => {
                        if (gym.location) {
                          window.open(`https://maps.google.com/maps?daddr=${gym.location.lat},${gym.location.lng}`, '_blank');
                        }
                      }}
                    >
                      Get Directions
                    </Button>
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
