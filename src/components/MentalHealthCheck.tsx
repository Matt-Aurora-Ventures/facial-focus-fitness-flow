
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Upload, MessageSquare, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAnalysis {
  emotionalState: string;
  stressLevel: number;
  confidence: number;
  recommendations: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MentalHealthCheck: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysis | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi there! I\'m your mental health assistant. You can upload a voice recording for analysis or chat with me directly about how you\'re feeling today.' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [overallAnalysis, setOverallAnalysis] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        
        // Stop all tracks of the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start(100);
      setIsRecording(true);
      
      // Start a timer to track recording duration
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone Access Error",
        description: "Please ensure you've granted permission to use the microphone.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast({
        title: "Recording Complete",
        description: recordingTime >= 45 
          ? "Voice recording saved. Ready for analysis." 
          : "Warning: Recordings under 45 seconds may not provide accurate analysis."
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      setAudioBlob(file);
      toast({
        title: "File Uploaded",
        description: "Your audio file is ready for analysis."
      });
    }
  };

  const analyzeVoice = async () => {
    if (!audioBlob) {
      toast({
        title: "No Audio Found",
        description: "Please record or upload an audio file first.",
        variant: "destructive"
      });
      return;
    }
    
    if (recordingTime < 45 && !audioBlob.name) {  // If it's a recording (not uploaded file) and too short
      toast({
        title: "Recording Too Short",
        description: "Please record at least 45 seconds of audio for accurate analysis.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsAnalyzing(true);
      
      // Simulate API call to Insight Genesis Voice Analysis
      // In a real implementation, you would make an actual API call here
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock analysis results
      const mockAnalysis: VoiceAnalysis = {
        emotionalState: "Mostly calm with some underlying tension",
        stressLevel: Math.floor(Math.random() * 70) + 10, // Random stress level between 10-80%
        confidence: 85,
        recommendations: [
          "Consider practicing mindfulness for 10 minutes daily",
          "Ensure you're getting adequate sleep",
          "Maintain social connections for emotional support"
        ]
      };
      
      setVoiceAnalysis(mockAnalysis);
      
      // Add a message from the AI based on the analysis
      setChatMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `Based on your voice analysis, I can detect that you're ${mockAnalysis.emotionalState.toLowerCase()}. Your stress level appears to be ${mockAnalysis.stressLevel < 30 ? 'low' : mockAnalysis.stressLevel < 70 ? 'moderate' : 'high'}. Would you like to discuss any specific concerns?` 
        }
      ]);
      
      toast({
        title: "Analysis Complete",
        description: "Your voice has been analyzed successfully."
      });
      
    } catch (error) {
      console.error("Error analyzing voice:", error);
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing your voice recording.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    
    // Add user message to chat
    const newMessage = { role: 'user' as const, content: userMessage };
    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    
    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a contextual response based on voice analysis if available
      let aiResponse = "";
      
      if (voiceAnalysis) {
        // Personalize response based on analysis
        if (userMessage.toLowerCase().includes("feel") || userMessage.toLowerCase().includes("feeling")) {
          aiResponse = `I understand you're exploring your feelings. Based on your voice analysis, I detected ${voiceAnalysis.emotionalState.toLowerCase()}. Would you like some specific techniques to help with that?`;
        } else if (userMessage.toLowerCase().includes("stress") || userMessage.toLowerCase().includes("anxious")) {
          aiResponse = `I can see you're concerned about stress. Your voice analysis indicated a stress level of ${voiceAnalysis.stressLevel}%. One recommendation is to ${voiceAnalysis.recommendations[0].toLowerCase()}.`;
        } else {
          aiResponse = `Thank you for sharing. Based on what I understand about your current mental state, it might help to focus on ${voiceAnalysis.recommendations[Math.floor(Math.random() * voiceAnalysis.recommendations.length)].toLowerCase()}. Would you like to explore this further?`;
        }
      } else {
        // Generic responses without voice analysis
        aiResponse = "I'm here to support you. To provide more personalized guidance, it would be helpful to analyze your voice patterns. Would you like to record a voice sample?";
      }
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I'm having trouble responding right now. Please try again later." }]);
    }
  };

  const generateOverallAnalysis = async () => {
    if (!voiceAnalysis) {
      toast({
        title: "Voice Analysis Required",
        description: "Please complete a voice analysis first to generate an overall fitness check.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      toast({
        title: "Generating Overall Analysis",
        description: "Combining mental and physical data..."
      });
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would combine data from other parts of the app
      const analysisText = `
        ## Comprehensive Wellness Report
        
        **Mental Wellness:**
        - Emotional State: ${voiceAnalysis.emotionalState}
        - Stress Level: ${voiceAnalysis.stressLevel}% (${voiceAnalysis.stressLevel < 30 ? 'Low' : voiceAnalysis.stressLevel < 70 ? 'Moderate' : 'High'})
        - Confidence Rating: ${voiceAnalysis.confidence}%
        
        **Physical Wellness:**
        - Activity Level: Moderate
        - Hydration: 65% of daily target
        - Recent Workouts: 2 in the last week
        
        **Recommendations:**
        1. ${voiceAnalysis.recommendations[0]}
        2. ${voiceAnalysis.recommendations[1]}
        3. Consider increasing physical activity by 15%
        4. Maintain consistent hydration throughout the day
        
        **Overall Wellness Score: ${Math.floor(70 - (voiceAnalysis.stressLevel / 5) + (Math.random() * 15))}%**
      `;
      
      setOverallAnalysis(analysisText);
      
    } catch (error) {
      console.error("Error generating overall analysis:", error);
      toast({
        title: "Analysis Generation Failed",
        description: "There was a problem creating your wellness report.",
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Mental Health Check</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Analysis Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Voice Analysis</CardTitle>
            <CardDescription>Record or upload at least 45 seconds of speech for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Recording Controls */}
              <div className="flex flex-col items-center">
                <div className="w-full mb-4">
                  {isRecording && (
                    <div className="flex flex-col items-center">
                      <div className="w-full bg-secondary rounded-full h-2 mb-2">
                        <div className="bg-facefit-purple h-2 rounded-full animate-pulse" style={{ width: `${Math.min(100, (recordingTime / 45) * 100)}%` }}></div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Recording: {formatTime(recordingTime)}</p>
                        <p className="text-xs text-muted-foreground">{recordingTime < 45 ? `${45 - recordingTime} more seconds recommended` : 'Minimum length reached'}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "default"}
                    className={isRecording ? "bg-red-500" : "bg-facefit-purple"}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                  
                  <div className="relative">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Audio
                    </Button>
                    <input
                      type="file"
                      accept="audio/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>
              
              {/* Audio Preview */}
              {audioBlob && !isRecording && (
                <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Audio Preview</p>
                  <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                </div>
              )}
              
              <Button 
                onClick={analyzeVoice} 
                disabled={!audioBlob || isRecording || isAnalyzing}
                className="w-full bg-facefit-purple hover:bg-facefit-purple/90"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    Analyzing Voice...
                  </>
                ) : (
                  'Analyze Voice'
                )}
              </Button>
            </div>
          </CardContent>
          
          {/* Analysis Results */}
          {voiceAnalysis && (
            <CardFooter className="flex flex-col items-start border-t pt-6">
              <h3 className="font-semibold text-lg mb-3">Analysis Results</h3>
              
              <div className="w-full space-y-4">
                <div>
                  <p className="text-sm font-medium">Emotional State</p>
                  <p className="text-sm text-muted-foreground">{voiceAnalysis.emotionalState}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">Stress Level</p>
                    <span className="text-sm">{voiceAnalysis.stressLevel}%</span>
                  </div>
                  <Progress value={voiceAnalysis.stressLevel} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">Analysis Confidence</p>
                    <span className="text-sm">{voiceAnalysis.confidence}%</span>
                  </div>
                  <Progress value={voiceAnalysis.confidence} className="h-2 bg-gray-200">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${voiceAnalysis.confidence}%` }}></div>
                  </Progress>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Recommendations</p>
                  <ul className="list-disc list-inside space-y-1">
                    {voiceAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>
        
        {/* AI Chat Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Mental Health Assistant</CardTitle>
            <CardDescription>Chat with your personal well-being advisor</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-facefit-purple text-white'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-facefit-purple"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                className="bg-facefit-purple hover:bg-facefit-purple/90"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Overall Analysis Section */}
      <div className="mt-8">
        <Button 
          onClick={generateOverallAnalysis} 
          disabled={!voiceAnalysis}
          className="flex gap-2 bg-facefit-purple hover:bg-facefit-purple/90"
        >
          <Activity className="h-4 w-4" />
          Generate Overall Fitness Check
        </Button>
        
        {overallAnalysis && (
          <Card className="mt-4 shadow-md">
            <CardHeader>
              <CardTitle>Comprehensive Wellness Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm">{overallAnalysis}</pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MentalHealthCheck;
