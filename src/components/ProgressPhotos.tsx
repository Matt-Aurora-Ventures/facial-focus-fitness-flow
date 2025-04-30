
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Calendar, Image, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhotoEntry {
  id: string;
  date: Date;
  category: 'front' | 'side' | 'back';
  imageUrl: string;
}

const ProgressPhotos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'front' | 'side' | 'back'>('front');
  
  // Mock photo data for demonstration
  const [photos, setPhotos] = useState<PhotoEntry[]>([
    { 
      id: '1', 
      date: new Date(2025, 3, 1), 
      category: 'front', 
      imageUrl: '/placeholder.svg' 
    },
    { 
      id: '2', 
      date: new Date(2025, 3, 15), 
      category: 'front', 
      imageUrl: '/placeholder.svg' 
    },
    { 
      id: '3', 
      date: new Date(2025, 4, 1), 
      category: 'front', 
      imageUrl: '/placeholder.svg' 
    },
    { 
      id: '4', 
      date: new Date(2025, 3, 1), 
      category: 'side', 
      imageUrl: '/placeholder.svg' 
    },
    { 
      id: '5', 
      date: new Date(2025, 4, 1), 
      category: 'side', 
      imageUrl: '/placeholder.svg' 
    },
    { 
      id: '6', 
      date: new Date(2025, 3, 1), 
      category: 'back', 
      imageUrl: '/placeholder.svg' 
    }
  ]);
  
  // Filter photos by active tab
  const filteredPhotos = photos.filter(photo => photo.category === activeTab);
  
  // Simulate capturing a new photo
  const handleCapturePhoto = () => {
    const newPhoto: PhotoEntry = {
      id: Date.now().toString(),
      date: new Date(),
      category: activeTab,
      imageUrl: '/placeholder.svg'
    };
    
    setPhotos([...photos, newPhoto]);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5 text-facefit-purple" />
          Progress Photos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="front" value={activeTab} onValueChange={(value) => setActiveTab(value as 'front' | 'side' | 'back')}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="front">Front View</TabsTrigger>
              <TabsTrigger value="side">Side View</TabsTrigger>
              <TabsTrigger value="back">Back View</TabsTrigger>
            </TabsList>
            <Button onClick={handleCapturePhoto} className="bg-facefit-purple hover:bg-facefit-purple/90">
              <Camera className="mr-2 h-4 w-4" />
              Add Photo
            </Button>
          </div>
          
          <TabsContent value="front" className="pt-4">
            {renderPhotoGallery('front')}
          </TabsContent>
          <TabsContent value="side" className="pt-4">
            {renderPhotoGallery('side')}
          </TabsContent>
          <TabsContent value="back" className="pt-4">
            {renderPhotoGallery('back')}
          </TabsContent>
        </Tabs>
        
        {filteredPhotos.length >= 2 && (
          <div className="mt-8">
            <h3 className="font-medium mb-4">Compare Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {format(filteredPhotos[0].date, "MMM d, yyyy")}
                </p>
                <div className="aspect-square bg-accent relative flex items-center justify-center border rounded-md">
                  <Image className="h-12 w-12 text-muted-foreground/40" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {format(filteredPhotos[filteredPhotos.length - 1].date, "MMM d, yyyy")}
                </p>
                <div className="aspect-square bg-accent relative flex items-center justify-center border rounded-md">
                  <Image className="h-12 w-12 text-muted-foreground/40" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Compare with Slider View
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
  
  // Helper function to render photo gallery for each tab
  function renderPhotoGallery(category: 'front' | 'side' | 'back') {
    const categoryPhotos = photos.filter(photo => photo.category === category);
    
    if (categoryPhotos.length === 0) {
      return (
        <div className="text-center py-12 border rounded-md bg-muted/30">
          <Camera className="h-12 w-12 mx-auto text-muted-foreground/60" />
          <p className="mt-2 text-muted-foreground">No photos yet</p>
          <Button onClick={handleCapturePhoto} className="mt-4 bg-facefit-purple hover:bg-facefit-purple/90">
            <Plus className="mr-2 h-4 w-4" />
            Add First Photo
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categoryPhotos.map((photo) => (
            <div key={photo.id} className="space-y-1">
              <div className="aspect-square bg-accent relative flex items-center justify-center border rounded-md">
                <Image className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {format(photo.date, "MMM d, yyyy")}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Newer
          </Button>
          <Button variant="outline" size="sm">
            Older
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
};

export default ProgressPhotos;
