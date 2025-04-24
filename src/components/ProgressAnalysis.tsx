
import React from 'react';
import { ChartBar, ImagePlus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProgressAnalysis: React.FC = () => {
  // In a real app, this would come from your database
  const weeklyProgress = [
    {
      week: "Week 8",
      date: "Apr 17-23",
      facialScore: 82,
      weight: 180,
      photos: 2,
    },
    {
      week: "Week 7",
      date: "Apr 10-16",
      facialScore: 80,
      weight: 182,
      photos: 1,
    }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="grid gap-6">
        {/* Photo Upload Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Progress Photos</h3>
              <Button size="sm" className="gap-2">
                <ImagePlus className="h-4 w-4" />
                Add Photos
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Placeholder for progress photos */}
              <div className="aspect-square rounded-lg bg-accent flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Front View</p>
              </div>
              <div className="aspect-square rounded-lg bg-accent flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Side View</p>
              </div>
              <div className="aspect-square rounded-lg bg-accent flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Back View</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Analysis Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-facefit-purple/20 flex items-center justify-center">
                <ChartBar className="w-4 h-4 text-facefit-purple" />
              </div>
              <h3 className="font-medium">Weekly Analysis</h3>
            </div>
            
            <div className="space-y-4">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="p-4 rounded-lg bg-accent/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{week.week}</h4>
                      <p className="text-sm text-muted-foreground">{week.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Facial Score</p>
                      <p className="font-medium">{week.facialScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{week.weight} lbs</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Photos</p>
                      <p className="font-medium">{week.photos}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressAnalysis;
