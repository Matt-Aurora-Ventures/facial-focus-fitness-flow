
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Filter, Clock, Phone, Star, Activity, Map, Users } from "lucide-react";

const ActivityClubFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activityType, setActivityType] = useState<string>('all');
  
  // Mock data for activity clubs
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
      details: "All levels welcome, 5k training focus"
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
      details: "Road cycling, 20-50 mile routes"
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
      details: "BJJ, Muay Thai, Wrestling classes"
    }
  ];

  const filteredClubs = activityType === 'all' 
    ? clubs
    : clubs.filter(club => club.type === activityType);

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'running':
        return <Map className="h-6 w-6" />;
      case 'cycling':
        return <Activity className="h-6 w-6" />;
      case 'mma':
        return <Users className="h-6 w-6" />;
      default:
        return <Map className="h-6 w-6" />;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Activity Clubs</h2>
      </div>

      {/* Search and Filter */}
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
            <div className="flex gap-2">
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
                <Map className="h-4 w-4 mr-2" />
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Club Listings */}
      <div className="space-y-4">
        {filteredClubs.map((club) => (
          <Card key={club.id}>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 p-4 flex items-center justify-center bg-accent/30">
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
                  <Button className="flex-1 bg-facefit-purple hover:bg-facefit-purple/90">Join Club</Button>
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
