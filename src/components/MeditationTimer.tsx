
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Clock, Save, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SavedSession = {
  id: string;
  date: string;
  duration: number;
  completed: boolean;
};

const MeditationTimer: React.FC = () => {
  const [duration, setDuration] = useState<number>(5);
  const [timeRemaining, setTimeRemaining] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [soundType, setSoundType] = useState<string>("nature");
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Initialize audio based on selected sound type
  useEffect(() => {
    if (audioRef.current) {
      // In a real implementation, we would have actual audio files
      // For now we'll just simulate different sound types
      audioRef.current.volume = isMuted ? 0 : 0.5;
      
      // Stop any currently playing audio
      audioRef.current.pause();
      
      if (isActive && !isMuted) {
        // In a real app, this would be an actual audio file path
        audioRef.current.play().catch(e => console.error('Error playing audio:', e));
      }
    }
  }, [soundType, isActive, isMuted]);

  // Load saved sessions from localStorage
  useEffect(() => {
    const storedSessions = localStorage.getItem('meditationSessions');
    if (storedSessions) {
      setSavedSessions(JSON.parse(storedSessions));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      setTimeRemaining(duration * 60);
      
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, duration]);

  const handleStartPause = () => {
    if (isActive) {
      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsActive(false);
    } else {
      // Start timer
      setIsActive(true);
    }
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsActive(false);
    setTimeRemaining(duration * 60);
  };

  const handleComplete = () => {
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Play completion sound if not muted
    if (!isMuted && audioRef.current) {
      // In a real app, this would play a completion sound
      audioRef.current.play().catch(e => console.error('Error playing completion sound:', e));
    }
    
    setIsActive(false);
    
    // Save completed session
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      duration: duration,
      completed: true
    };
    
    const updatedSessions = [...savedSessions, newSession];
    setSavedSessions(updatedSessions);
    localStorage.setItem('meditationSessions', JSON.stringify(updatedSessions));
    
    toast({
      title: "Meditation Complete",
      description: `You've completed a ${duration} minute meditation session!`,
      duration: 5000,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-facefit-purple" />
          Meditation Timer
        </CardTitle>
        <CardDescription>
          Take a mindful break to enhance your mental wellbeing
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium">Session Length: {duration} minutes</span>
          <Slider
            value={[duration]}
            min={1}
            max={60}
            step={1}
            onValueChange={(value) => {
              setDuration(value[0]);
              setTimeRemaining(value[0] * 60);
            }}
            disabled={isActive}
            className="flex-1"
          />
        </div>
        
        <div className="text-center">
          <div className="text-5xl font-bold mb-8">
            {formatTime(timeRemaining)}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleStartPause}
              className="bg-facefit-purple hover:bg-facefit-purple/90 px-8"
            >
              {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
            </Button>
            
            {isActive && (
              <Button 
                onClick={handleReset} 
                variant="outline"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-sm font-medium">Background Sound</span>
            <div className="flex items-center gap-2">
              <Select
                value={soundType}
                onValueChange={setSoundType}
                disabled={isActive}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="rain">Rain</SelectItem>
                  <SelectItem value="whitenoise">White Noise</SelectItem>
                  <SelectItem value="silence">Silence</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {savedSessions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Sessions</h4>
            <div className="max-h-28 overflow-y-auto space-y-1">
              {savedSessions.slice(-5).reverse().map((session) => (
                <div key={session.id} className="flex justify-between items-center text-sm bg-accent/30 rounded-md p-2">
                  <span>{session.date}</span>
                  <span>{session.duration} min {session.completed ? '✓' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <audio ref={audioRef} loop />
    </Card>
  );
};

export default MeditationTimer;
