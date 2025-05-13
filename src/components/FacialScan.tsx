
import React, { useState, useRef, useEffect } from 'react';
import { ScanFace, Camera, Save, History, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ScanResult {
  id: string;
  timestamp: string;
  stressLevel: number;
  sleepQuality: number;
  hydrationLevel: number;
  skinHealth: number;
  recommendation: string;
}

const FacialScan: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult | null>(null);
  const [historicalScans, setHistoricalScans] = useState<ScanResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Load historical scans from storage
  useEffect(() => {
    const loadHistoricalScans = async () => {
      try {
        // Try to load from Supabase if authenticated
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          // In a production app, you would fetch from a 'facial_scans' table
          // For now, we'll use localStorage as a fallback
          const storedScans = localStorage.getItem('facialScans');
          if (storedScans) {
            setHistoricalScans(JSON.parse(storedScans));
          }
        } else {
          // Fallback to localStorage
          const storedScans = localStorage.getItem('facialScans');
          if (storedScans) {
            setHistoricalScans(JSON.parse(storedScans));
          }
        }
      } catch (error) {
        console.error('Error loading scan history:', error);
      }
    };

    loadHistoricalScans();
  }, []);

  const startScan = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setShowScanDialog(true);
      setScanning(true);
      setScanProgress(0);
      setScanComplete(false);
      
      // Simulate scanning progress
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              completeScan();
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Error",
        description: "Please ensure you've granted permission to use the camera.",
        variant: "destructive"
      });
    }
  };

  const completeScan = () => {
    setScanComplete(true);
    setScanning(false);
    
    // Capture the image from video
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        // In a real application, you would send this image to a facial analysis API
        // For now, we'll generate mock results
        generateMockResults();
      }
    }
    
    // Stop the camera stream
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const generateMockResults = () => {
    // Generate random values for demo purposes
    // In a real app, this would come from the API response
    const mockResult: ScanResult = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      stressLevel: Math.floor(Math.random() * 100),
      sleepQuality: Math.floor(Math.random() * 100),
      hydrationLevel: Math.floor(Math.random() * 100),
      skinHealth: Math.floor(Math.random() * 100),
      recommendation: getRandomRecommendation()
    };
    
    setScanResults(mockResult);
    
    // Update historical scans
    const updatedScans = [mockResult, ...historicalScans].slice(0, 10); // Keep last 10 scans
    setHistoricalScans(updatedScans);
    localStorage.setItem('facialScans', JSON.stringify(updatedScans));
    
    // Show success toast
    toast({
      title: "Scan Complete",
      description: "Your facial wellness analysis is ready to view."
    });
  };

  const getRandomRecommendation = () => {
    const recommendations = [
      "Your stress levels appear elevated. Try incorporating 10 minutes of breathing exercises into your daily routine.",
      "Your hydration levels are low. We recommend increasing your water intake by 2 glasses per day.",
      "Your skin health indicators suggest you may need more vitamin D. Consider spending 15 minutes in natural sunlight daily.",
      "Sleep quality appears suboptimal. Try establishing a consistent bedtime routine and avoid screens 1 hour before bed.",
      "Your facial muscle tension suggests you may benefit from stretching and facial relaxation exercises."
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  const closeDialog = () => {
    setShowScanDialog(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const saveResults = () => {
    toast({
      title: "Results Saved",
      description: "Your facial scan results have been saved to your profile."
    });
    closeDialog();
  };
  
  const viewPastScan = (scan: ScanResult) => {
    setScanResults(scan);
    setShowHistory(false);
    setShowScanDialog(true);
    setScanComplete(true);
    setScanning(false);
  };
  
  // Generate a wellness score based on the various metrics
  const calculateWellnessScore = (result: ScanResult) => {
    if (!result) return 0;
    
    const average = (
      (100 - result.stressLevel) + 
      result.sleepQuality + 
      result.hydrationLevel + 
      result.skinHealth
    ) / 4;
    
    return Math.round(average);
  };

  return (
    <>
      <Card className="border-2 border-facefit-purple/30">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-facefit-purple/20 flex items-center justify-center mb-4">
            <ScanFace className="w-8 h-8 text-facefit-purple" />
          </div>
          
          <h3 className="text-lg font-medium mb-1">Daily Facial Scan</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Track your wellness progress with advanced facial scanning technology
          </p>
          
          <div className="w-full flex flex-col gap-3">
            <Button 
              onClick={startScan}
              className="bg-facefit-purple hover:bg-facefit-purple-dark"
            >
              <ScanFace className="mr-2 h-4 w-4" />
              Start Facial Scan
            </Button>
            
            {historicalScans.length > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setShowHistory(true)}
              >
                <History className="mr-2 h-4 w-4" />
                View Scan History
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ScanFace className="h-5 w-5 text-facefit-purple" />
              {scanning ? "Facial Analysis In Progress" : "Facial Wellness Results"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {scanning ? (
              <div className="space-y-6">
                <div className="relative mx-auto w-64 h-64 rounded-full border-2 border-dashed border-facefit-purple/50 flex items-center justify-center overflow-hidden">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Progress value={scanProgress} className="h-2" />
                <p className="text-center text-sm font-medium">
                  {scanProgress < 30 ? "Initializing facial recognition..." :
                   scanProgress < 60 ? "Analyzing facial features..." :
                   scanProgress < 90 ? "Processing wellness indicators..." :
                   "Finalizing wellness analysis..."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Hidden canvas for capturing image */}
                <canvas ref={canvasRef} className="hidden" />
                
                {scanResults && (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Wellness Score</h3>
                      <div className="text-2xl font-bold text-facefit-purple">
                        {calculateWellnessScore(scanResults)}%
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Stress Level</p>
                          <span className="text-sm">{scanResults.stressLevel}%</span>
                        </div>
                        <Progress value={scanResults.stressLevel} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Sleep Quality</p>
                          <span className="text-sm">{scanResults.sleepQuality}%</span>
                        </div>
                        <Progress value={scanResults.sleepQuality} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Hydration Level</p>
                          <span className="text-sm">{scanResults.hydrationLevel}%</span>
                        </div>
                        <Progress value={scanResults.hydrationLevel} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Skin Health</p>
                          <span className="text-sm">{scanResults.skinHealth}%</span>
                        </div>
                        <Progress value={scanResults.skinHealth} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Personalized Recommendation</h4>
                      <p className="text-sm">{scanResults.recommendation}</p>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={closeDialog}>Close</Button>
                      <Button onClick={saveResults} className="bg-facefit-purple">
                        <Save className="mr-2 h-4 w-4" />
                        Save Results
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-facefit-purple" />
              Facial Scan History
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto space-y-3 py-4">
            {historicalScans.map((scan) => (
              <div
                key={scan.id}
                className="border rounded-md p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => viewPastScan(scan)}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">
                    {new Date(scan.timestamp).toLocaleDateString()} at {new Date(scan.timestamp).toLocaleTimeString()}
                  </p>
                  <span className="text-sm font-medium px-2 py-0.5 bg-facefit-purple/20 text-facefit-purple rounded-full">
                    {calculateWellnessScore(scan)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                  <div>Stress: {scan.stressLevel}%</div>
                  <div>Sleep: {scan.sleepQuality}%</div>
                  <div>Hydration: {scan.hydrationLevel}%</div>
                  <div>Skin: {scan.skinHealth}%</div>
                </div>
              </div>
            ))}
            
            {historicalScans.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No scan history available yet
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FacialScan;
