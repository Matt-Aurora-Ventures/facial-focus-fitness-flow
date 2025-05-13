import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Search, Filter, Star, Dumbbell, Users, Clock, Phone, 
  Locate, Heart, ChevronDown, CheckSquare, X 
} from "lucide-react";
import Map from './Map';
import { useToast } from '@/hooks/use-toast';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { toggleFavorite, isFavorite } from '@/lib/favorites';

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

// Available amenities for filtering
const availableAmenities = [
  "24/7 Access", "Pool", "Classes", "Sauna", "Free Weights", 
  "Cardio Zone", "CrossFit", "Personal Training", "Juice Bar",
  "Group Classes", "Showers", "Lockers", "Towel Service", "Childcare"
];

const GymFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapView, setMapView] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState(false);
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
    {
      id: 4,
      name: "Urban Fitness Hub",
      rating: 4.3,
      distance: 2.1,
      address: "101 Downtown Plaza, Metro City",
      hours: "6:00 AM - 10:00 PM",
      phone: "(555) 321-7890",
      amenities: ["24/7 Access", "Cardio Zone", "Showers", "Lockers"],
      image: "/placeholder.svg",
      location: { lat: 34.042235, lng: -118.263683 }
    },
    {
      id: 5,
      name: "Wellness Center Plus",
      rating: 4.9,
      distance: 3.0,
      address: "555 Health Blvd, Vitality Heights",
      hours: "5:30 AM - 11:00 PM",
      phone: "(555) 555-1234",
      amenities: ["Pool", "Sauna", "Classes", "Juice Bar", "Childcare"],
      image: "/placeholder.svg",
      location: { lat: 34.062235, lng: -118.273683 }
    }
  ];

  const filteredGyms = searchQuery || selectedAmenities.length > 0
    ? gyms.filter(gym => {
        const matchesSearch = searchQuery 
          ? gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gym.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gym.amenities.some(amenity => amenity.toLowerCase().includes(searchQuery.toLowerCase()))
          : true;
          
        const matchesAmenities = selectedAmenities.length > 0
          ? selectedAmenities.every(amenity => gym.amenities.includes(amenity))
          : true;
          
        return matchesSearch && matchesAmenities;
      })
    : gyms;

  // Update activeFilters state when amenities are selected
  useEffect(() => {
    setActiveFilters(selectedAmenities.length > 0);
  }, [selectedAmenities]);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Auto switch to map view when location is found
          if (!mapView) {
            setMapView(true);
          }
          
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

  // Handle favorite toggling
  const handleToggleFavorite = (gym: Gym) => {
    const isFav = toggleFavorite({
      id: gym.id,
      type: 'gym',
      name: gym.name,
      address: gym.address,
      savedAt: new Date().toISOString(),
    });
    
    toast({
      title: isFav ? "Added to favorites" : "Removed from favorites",
      description: isFav ? `${gym.name} has been saved to your favorites` : `${gym.name} has been removed from your favorites`,
    });
  };

  // Toggle an amenity filter
  const toggleAmenityFilter = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedAmenities([]);
  };

  // Prepare markers for the map
  const mapMarkers = filteredGyms.map(gym => ({
    position: gym.location || { lat: 34.052235, lng: -118.243683 },
    title: gym.name
  }));

  // Handle map marker click
  const handleMapMarkerClick = (position: { lat: number; lng: number }) => {
    const clickedGym = gyms.find(
      gym => gym.location?.lat === position.lat && gym.location?.lng === position.lng
    );
    
    if (clickedGym) {
      setSelectedGym(clickedGym);
    }
  };

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
            
            {/* Amenities Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant={activeFilters ? "default" : "outline"} 
                  className={cn("gap-2", activeFilters && "bg-facefit-purple hover:bg-facefit-purple/90")}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilters && <span className="ml-1 rounded-full bg-white text-facefit-purple w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {selectedAmenities.length}
                  </span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filter by Amenities</h4>
                    {selectedAmenities.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-1 text-xs"
                        onClick={clearFilters}
                      >
                        <X className="h-3 w-3" />
                        Clear all
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {availableAmenities.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenityFilter(amenity)}
                          className="rounded text-facefit-purple focus:ring-facefit-purple"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
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
              onMapClick={(e) => {
                if (e.latLng) {
                  const position = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                  };
                  handleMapMarkerClick(position);
                }
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Gym Listings */}
      <div className="space-y-4">
        {filteredGyms.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <Dumbbell className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-1">No gyms found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find gyms
            </p>
          </div>
        ) : (
          filteredGyms.map((gym) => (
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
                  
                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(gym);
                    }}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4", 
                        isFavorite(gym.id, 'gym') 
                          ? "fill-rose-500 text-rose-500" 
                          : "text-muted-foreground"
                      )}
                    />
                  </Button>
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
                        <span className="truncate">{gym.amenities.slice(0, 3).join(", ")}</span>
                        {gym.amenities.length > 3 && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 p-0">
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2">
                              <ul className="text-sm space-y-1">
                                {gym.amenities.map((amenity, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <CheckSquare className="h-3 w-3 text-facefit-purple" />
                                    {amenity}
                                  </li>
                                ))}
                              </ul>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">More Info</Button>
                      <Button 
                        className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90"
                        onClick={(e) => {
                          e.stopPropagation();
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
          ))
        )}
      </div>
    </div>
  );
};

export default GymFinder;
