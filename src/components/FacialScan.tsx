
import React, { useState } from 'react';
import { ScanFace, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const FacialScan: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  
  const startScan = () => {
    setScanning(true);
    // In a real app, this would start the camera and connect to the facial scan API
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <Card className="border-2 border-facefit-purple/30">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-facefit-purple/20 flex items-center justify-center mb-4">
          <ScanFace className="w-8 h-8 text-facefit-purple" />
        </div>
        
        <h3 className="text-lg font-medium mb-1">Daily Facial Scan</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Track your wellness progress with advanced facial scanning technology
        </p>
        
        {scanning ? (
          <div className="w-full space-y-4">
            <div className="relative mx-auto w-48 h-48 rounded-full border-2 border-dashed border-facefit-purple/50 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full animate-pulse-soft bg-facefit-purple/20 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-facefit-purple/70" />
                </div>
              </div>
            </div>
            <Progress value={45} className="h-2 bg-facefit-purple/20" />
            <p className="text-sm font-medium">Scanning your facial features...</p>
          </div>
        ) : (
          <Button 
            onClick={startScan}
            className="bg-facefit-purple hover:bg-facefit-purple-dark"
          >
            <ScanFace className="mr-2 h-4 w-4" />
            Start Facial Scan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FacialScan;
