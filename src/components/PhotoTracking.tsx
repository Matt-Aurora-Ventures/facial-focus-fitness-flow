
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const PhotoTracking: React.FC = () => {
  const [activeView, setActiveView] = useState<'front' | 'side' | 'back'>('front');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock photo data - in a real app this would come from a database
  const photos = {
    front: [{ id: 1, date: '2025-04-20', url: '/placeholder.svg' }],
    side: [{ id: 2, date: '2025-04-20', url: '/placeholder.svg' }],
    back: [{ id: 3, date: '2025-04-20', url: '/placeholder.svg' }]
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const previousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Body Tracking Photos</h2>
      </div>

      {/* View Selector */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button 
                variant={activeView === 'front' ? 'default' : 'outline'} 
                className={activeView === 'front' ? 'bg-facefit-purple' : ''}
                onClick={() => setActiveView('front')}
              >
                Front View
              </Button>
              <Button 
                variant={activeView === 'side' ? 'default' : 'outline'} 
                className={activeView === 'side' ? 'bg-facefit-purple' : ''}
                onClick={() => setActiveView('side')}
              >
                Side View
              </Button>
              <Button 
                variant={activeView === 'back' ? 'default' : 'outline'} 
                className={activeView === 'back' ? 'bg-facefit-purple' : ''}
                onClick={() => setActiveView('back')}
              >
                Back View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month Selector */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="icon" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-medium">{formatDate(currentDate)}</h3>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {photos[activeView].map(photo => (
          <Card key={photo.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative flex items-center justify-center">
              <Image className="w-12 h-12 text-muted-foreground/40" />
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{photo.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="overflow-hidden border-dashed">
          <div className="aspect-square bg-accent/30 flex flex-col items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground mb-4" />
            <Button className="bg-facefit-purple hover:bg-facefit-purple/90">
              Take New Photo
            </Button>
          </div>
        </Card>
      </div>

      {/* Comparison Feature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Compare Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground mb-4">Select two dates to compare your progress over time</p>
            <Button className="bg-facefit-purple hover:bg-facefit-purple/90">
              Compare Photos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoTracking;
