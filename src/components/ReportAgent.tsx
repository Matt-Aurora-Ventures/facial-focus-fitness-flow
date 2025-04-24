
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChartLine, Send, FileText, Download } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
};

type ReportAgentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const initialMessages = [
  {
    id: "welcome",
    content: "Hello! I'm your FaceFit Health Advisor. I can help analyze your progress and create personalized health reports. How are you feeling today?",
    sender: 'agent',
    timestamp: new Date(),
  },
];

// Questions we'll ask during the report compilation
const reportQuestions = [
  "How has your energy level been this week?",
  "Have you noticed any changes in your sleep patterns?",
  "How consistent have you been with your workouts?",
  "Have you been following your nutrition plan?",
  "Are you experiencing any unusual stress?",
  "What improvements have you noticed since starting your fitness journey?",
  "What are the biggest challenges you're facing right now?",
];

const ReportAgent: React.FC<ReportAgentProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [compiledReport, setCompiledReport] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    // Simulate agent response after a short delay
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for sharing. I'll keep that in mind for your health analysis. Is there anything else you'd like to tell me?",
        sender: 'agent' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const startCompileReport = () => {
    setIsCompiling(true);
    setCurrentQuestionIndex(0);
    
    // Add a message to start the report compilation process
    const startMessage = {
      id: Date.now().toString(),
      content: "Let's compile a comprehensive health and fitness report. I'll ask you a series of questions to better understand your progress.",
      sender: 'agent' as const,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, startMessage]);
    
    // Ask the first question
    setTimeout(() => {
      const questionMessage = {
        id: (Date.now() + 1).toString(),
        content: reportQuestions[0],
        sender: 'agent' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, questionMessage]);
    }, 1000);
  };

  const handleQuestionResponse = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    // Move to next question or finish compile
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    if (nextIndex < reportQuestions.length) {
      // Ask next question after a short delay
      setTimeout(() => {
        const questionMessage = {
          id: (Date.now() + 1).toString(),
          content: reportQuestions[nextIndex],
          sender: 'agent' as const,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, questionMessage]);
      }, 1000);
    } else {
      // Finished all questions, generate report
      setTimeout(() => {
        const finishMessage = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for answering all the questions. I'm now generating your comprehensive health and fitness report...",
          sender: 'agent' as const,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, finishMessage]);
        
        // Simulate report generation
        setTimeout(() => {
          setIsCompiling(false);
          generateReport();
        }, 2000);
      }, 1000);
    }
  };

  const generateReport = () => {
    // In a real app, this would analyze all the user data
    const reportContent = `
# FaceFit Health & Fitness Report
## Generated on ${new Date().toLocaleDateString()}

### Facial Analysis Trends
Based on your facial scans, we've observed a 15% improvement in your wellness indicators over the past 8 weeks. Your skin tone has become more even, and facial symmetry has improved, suggesting better sleep quality and reduced stress levels.

### Body Composition
Starting weight: 187 lbs
Current weight: 180 lbs
Total loss: 7 lbs (3.7%)

Your body measurements show consistent progress, particularly in waist circumference reduction (35" to 34").

### Nutrition Insights
Your protein intake has been consistent at 65-80% of your daily goal, which supports your muscle development goals. Consider increasing hydration, as you've met your water intake goal only 4 out of 7 days last week.

### Workout Adherence
You've completed 85% of scheduled workouts, with notable progress in upper body strength. Consider adding more lower body exercises to create balanced development.

### Goal Progress
You're making excellent progress toward your "Grow Bigger Biceps" goal, with consistent upper body workouts.

### Recommendations
1. Increase water intake to at least 8 glasses daily
2. Add two lower-body focused workout sessions per week
3. Continue with facial scanning to track wellness metrics
4. Consider adding 1-2 recovery days to your workout schedule

Keep up the great work! Your consistency is showing results across all measured parameters.
    `;
    
    setCompiledReport(reportContent);
    
    // Add message about the completed report
    const reportMessage = {
      id: Date.now().toString(),
      content: "Your health and fitness report is ready! You can view it and download it below.",
      sender: 'agent' as const,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, reportMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isCompiling) {
        handleQuestionResponse();
      } else {
        handleSendMessage();
      }
    }
  };

  const downloadReport = () => {
    if (!compiledReport) return;
    
    const element = document.createElement("a");
    const file = new Blob([compiledReport], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `FaceFit_Report_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-facefit-purple" />
            Health & Fitness Analysis Agent
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 h-[60vh]">
          {/* Chat window */}
          <div className="flex-1 overflow-y-auto border rounded-md p-4 bg-background">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-facefit-purple text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Report preview if available */}
          {compiledReport && (
            <Card className="max-h-[200px] overflow-y-auto">
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Generated Report
                  </h3>
                  <Button size="sm" variant="outline" onClick={downloadReport} className="gap-1">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </div>
                <div className="text-xs whitespace-pre-line font-mono bg-muted p-2 rounded">
                  {compiledReport}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Input area */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isCompiling ? "Type your answer..." : "Type your message..."}
              className="flex-1"
            />
            <Button 
              onClick={isCompiling ? handleQuestionResponse : handleSendMessage}
              className="bg-facefit-purple hover:bg-facefit-purple/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Report compile button */}
          {!isCompiling && !compiledReport && (
            <Button 
              onClick={startCompileReport}
              variant="outline"
              className="border-facefit-purple text-facefit-purple hover:bg-facefit-purple/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              Compile Health & Fitness Report
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportAgent;
