
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Upload, Edit, Share, Camera, Image, Play, Pause } from "lucide-react";

const WorkoutRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [recordedVideos, setRecordedVideos] = useState([
    { id: 1, title: "Upper Body Workout", duration: "1:45", thumbnail: "/placeholder.svg", date: "2025-04-23" },
    { id: 2, title: "HIIT Session", duration: "2:30", thumbnail: "/placeholder.svg", date: "2025-04-20" }
  ]);
  
  // Mock function to toggle recording state
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Reset timer when starting new recording
      setRecordedTime(0);
    }
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Workout Recorder</h2>
      </div>

      {/* Camera Preview */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="aspect-video bg-black relative flex items-center justify-center">
            <Camera className="h-16 w-16 text-white/40" />
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-white font-medium">{formatTime(recordedTime)}</span>
              </div>
            )}
            
            {/* Recording controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/20 border-white h-12 w-12 rounded-full"
                onClick={toggleRecording}
              >
                {isRecording ? 
                  <Pause className="h-6 w-6 text-white" /> : 
                  <Play className="h-6 w-6 text-white ml-1" />
                }
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recording Options */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Recording Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex flex-col py-6 items-center justify-center gap-2">
              <Video className="h-6 w-6" />
              <span>Change Camera</span>
            </Button>
            <Button variant="outline" className="flex flex-col py-6 items-center justify-center gap-2">
              <Upload className="h-6 w-6" />
              <span>Upload Video</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto Editor */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Auto Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Branding Style</label>
              <select className="w-full p-2 rounded-md border border-input bg-background">
                <option>Minimalist</option>
                <option>Bold & Energetic</option>
                <option>Professional Athlete</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Auto-Trim Duration</label>
              <select className="w-full p-2 rounded-md border border-input bg-background">
                <option>15 seconds</option>
                <option>30 seconds</option>
                <option>60 seconds</option>
                <option>Full Length</option>
              </select>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">Preview</Button>
              <Button className="bg-facefit-purple hover:bg-facefit-purple/90">
                <Share className="h-4 w-4 mr-2" />
                Edit & Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Recordings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Recordings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recordedVideos.map(video => (
              <div key={video.id} className="flex gap-3">
                <div className="w-24 h-16 bg-accent relative flex-shrink-0">
                  <Image className="absolute inset-0 m-auto h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{video.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{video.date} • {video.duration}</span>
                    <Button size="sm" variant="ghost">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutRecorder;
