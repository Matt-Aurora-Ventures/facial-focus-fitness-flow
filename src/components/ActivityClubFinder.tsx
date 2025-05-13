
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Clock, Phone, Star, Activity, Map as MapIcon, Users, Locate } from "lucide-react";
import Map from './Map';
import { useToast } from "@/hooks/use-toast";

interface Club {
  id: number;
  name: string;
  type: string;
  rating: number;
  distance: number;
  address: string;
  schedule: string;
  phone: string;
  details: string;
  location?: { lat: number; lng: number };
}

const ActivityClubFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activityType, setActivityType] = useState<string>('all');
  const [mapView, setMapView] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const { toast } = useToast();
  
  const clubs = [
    {
      id: 1,
      name: "Downtown Runners",
      type: "running",
      rating: 4.8,
      distance: 0.5,
      address: "123 Park Ave, Fitness City",
      schedule: "Mon, Wed, Fri 6:00 AM",
      phone: "(555) 123-4567",
      details: "All levels welcome, 5k training focus",
      location: { lat: 34.057235, lng: -118.243683 }
    },
    {
      id: 2,
      name: "City Cycling Club",
      type: "cycling",
      rating: 4.6,
      distance: 1.3,
      address: "456 Mountain Rd, Fitness City",
      schedule: "Sat, Sun 7:00 AM",
      phone: "(555) 987-6543",
      details: "Road cycling, 20-50 mile routes",
      location: { lat: 34.052235, lng: -118.263683 }
    },
    {
      id: 3,
      name: "Elite MMA Academy",
      type: "mma",
      rating: 4.9,
      distance: 2.1,
      address: "789 Combat Way, Fitness City",
      schedule: "Mon-Fri 5:00 PM - 9:00 PM",
      phone: "(555) 456-7890",
      details: "BJJ, Muay Thai, Wrestling classes",
      location: { lat: 34.047235, lng: -118.253683 }
    }
  ];

  const filteredClubs = activityType === 'all' 
    ? clubs
    : clubs.filter(club => club.type === activityType);

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'running':
        return <MapIcon className="h-6 w-6 text-facefit-purple" />;
      case 'cycling':
        return <Activity className="h-6 w-6 text-facefit-purple" />;
      case 'mma':
        return <Users className="h-6 w-6 text-facefit-purple" />;
      default:
        return <MapIcon className="h-6 w-6 text-facefit-purple" />;
    }
  };

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
            description: "Using your current location to find nearby clubs",
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location access to find clubs near you",
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
    // Select first club as default when view changes to map
    if (mapView && filteredClubs.length > 0 && !selectedClub) {
      setSelectedClub(filteredClubs[0]);
    }
  }, [mapView, filteredClubs, selectedClub]);

  // Prepare markers for the map
  const mapMarkers = filteredClubs.map(club => ({
    position: club.location || { lat: 34.052235, lng: -118.243683 },
    title: club.name
  }));

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Activity Clubs</h2>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for activity clubs..."
                className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activityType === 'all' ? 'default' : 'outline'} 
                className={activityType === 'all' ? 'bg-facefit-purple' : ''}
                onClick={() => setActivityType('all')}
              >
                All
              </Button>
              <Button 
                variant={activityType === 'running' ? 'default' : 'outline'} 
                className={activityType === 'running' ? 'bg-facefit-purple' : ''}
                onClick={() => setActivityType('running')}
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Running
              </Button>
              <Button 
                variant={activityType === 'cycling' ? 'default' : 'outline'} 
                className={activityType === 'cycling' ? 'bg-facefit-purple' : ''}
                onClick={() => setActivityType('cycling')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Cycling
              </Button>
              <Button 
                variant={activityType === 'mma' ? 'default' : 'outline'} 
                className={activityType === 'mma' ? 'bg-facefit-purple' : ''}
                onClick={() => setActivityType('mma')}
              >
                <Users className="h-4 w-4 mr-2" />
                MMA
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
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      {mapView && (
        <Card className="mb-6">
          <CardContent className="p-0 overflow-hidden">
            <Map 
              markers={mapMarkers} 
              center={selectedClub?.location || userLocation || undefined} 
              height="400px"
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {filteredClubs.map((club) => (
          <Card 
            key={club.id} 
            className={`${selectedClub?.id === club.id ? "ring-2 ring-facefit-purple" : ""}`}
            onClick={() => setSelectedClub(club)}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 p-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-facefit-purple/20 flex items-center justify-center">
                  {getActivityIcon(club.type)}
                </div>
              </div>
              <div className="sm:w-3/4 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium">{club.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-facefit-purple text-facefit-purple mr-1" />
                    <span>{club.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{club.distance} miles • {club.address}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{club.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{club.phone}</span>
                  </div>
                </div>
                <p className="text-sm mb-4">{club.details}</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">More Info</Button>
                  <Button 
                    className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90"
                    onClick={() => {
                      if (club.location) {
                        window.open(`https://maps.google.com/maps?daddr=${club.location.lat},${club.location.lng}`, '_blank');
                      }
                    }}
                  >
                    Join Club
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityClubFinder;
