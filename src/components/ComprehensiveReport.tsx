
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Calendar, ChartLine, Brain, Activity, User, Dumbbell, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HealthData {
  userId?: string;
  name?: string;
  facialScans?: {
    date: string;
    stressLevel: number;
    sleepQuality: number;
    hydrationLevel: number;
    skinHealth: number;
  }[];
  mentalHealth?: {
    date: string;
    emotionalState: string;
    stressLevel: number;
    recommendations: string[];
  }[];
  workouts?: {
    date: string;
    type: string;
    duration: number;
    intensity: string;
  }[];
  fitnessGoals?: string;
  fitnessLevel?: string;
  waterIntake?: {
    date: string;
    amount: number;
    goal: number;
  }[];
  sleepData?: {
    date: string;
    hours: number;
    quality: number;
  }[];
  weight?: {
    date: string;
    value: number;
  }[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

const ComprehensiveReport: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportData, setReportData] = useState<HealthData | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [savedReports, setSavedReports] = useState<{id: string, date: string, name: string}[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Load saved reports
    const loadSavedReports = () => {
      const stored = localStorage.getItem('savedHealthReports');
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    };
    
    loadSavedReports();
  }, []);
  
  const generateReport = async () => {
    setIsGeneratingReport(true);
    setReportProgress(0);
    setReportGenerated(false);
    setShowReportDialog(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            completeReportGeneration();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const completeReportGeneration = async () => {
    try {
      setIsLoading(true);
      
      // Gather data from various sources
      const healthData: HealthData = {};
      
      // 1. Get user info from Supabase if available
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        healthData.userId = session.session.user.id;
      }
      
      // 2. Get facial scan data from local storage
      const facialScans = localStorage.getItem('facialScans');
      if (facialScans) {
        const parsedScans = JSON.parse(facialScans);
        healthData.facialScans = parsedScans.map((scan: any) => ({
          date: new Date(scan.timestamp).toLocaleDateString(),
          stressLevel: scan.stressLevel,
          sleepQuality: scan.sleepQuality,
          hydrationLevel: scan.hydrationLevel,
          skinHealth: scan.skinHealth
        }));
      }
      
      // 3. Get mental health data from Supabase if available, otherwise mock data
      if (session?.session?.user) {
        try {
          // Try to load mental health analyses
          const { data, error } = await supabase
            .from('mental_health_analyses')
            .select('*, mental_health_recommendations(recommendation)')
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (!error && data && data.length > 0) {
            healthData.mentalHealth = data.map((item: any) => ({
              date: new Date(item.created_at).toLocaleDateString(),
              emotionalState: item.emotional_state,
              stressLevel: item.stress_level,
              recommendations: item.mental_health_recommendations.map((rec: any) => rec.recommendation)
            }));
          }
        } catch (error) {
          console.error('Error fetching mental health data:', error);
          // Continue with other data sources
        }
      }
      
      // If no mental health data from Supabase, use mock data
      if (!healthData.mentalHealth) {
        healthData.mentalHealth = [
          {
            date: new Date().toLocaleDateString(),
            emotionalState: "Calm",
            stressLevel: 35,
            recommendations: [
              "Continue with your current mindfulness practices",
              "Consider adding 5 minutes of meditation before bed"
            ]
          }
        ];
      }
      
      // 4. Get fitness data from local storage
      const fitnessData = localStorage.getItem('fitnessAdvisorData');
      if (fitnessData) {
        const parsedFitness = JSON.parse(fitnessData);
        healthData.fitnessGoals = parsedFitness.fitnessGoals;
        healthData.fitnessLevel = parsedFitness.fitnessLevel;
        
        if (parsedFitness.exerciseLog) {
          healthData.workouts = parsedFitness.exerciseLog.map((exercise: any) => ({
            date: exercise.date,
            type: exercise.name,
            duration: exercise.duration,
            intensity: exercise.intensity
          }));
        }
      }
      
      // 5. Mock water intake data (in a real app, this would come from actual tracking)
      healthData.waterIntake = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toLocaleDateString(),
          amount: Math.floor(Math.random() * 2000) + 1000, // 1000-3000ml
          goal: 2500
        };
      }).reverse();
      
      // 6. Mock sleep data
      healthData.sleepData = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toLocaleDateString(),
          hours: Math.floor(Math.random() * 3) + 5, // 5-8 hours
          quality: Math.floor(Math.random() * 40) + 60 // 60-100% quality
        };
      }).reverse();
      
      // 7. Mock weight data
      healthData.weight = Array(7).fill(0).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const baseWeight = 75.0; // example base weight in kg
        const dailyVariation = (Math.random() * 1) - 0.5; // +/- 0.5 kg
        
        return {
          date: date.toLocaleDateString(),
          value: +(baseWeight + dailyVariation).toFixed(1)
        };
      }).reverse();
      
      setReportData(healthData);
      
      // Save report to saved reports
      const reportId = Date.now().toString();
      const reportDate = new Date().toISOString();
      const newReport = {
        id: reportId,
        date: reportDate,
        name: `Health Report - ${new Date().toLocaleDateString()}`
      };
      
      const updatedReports = [newReport, ...savedReports];
      setSavedReports(updatedReports);
      localStorage.setItem('savedHealthReports', JSON.stringify(updatedReports));
      
      // Also save the full report data
      localStorage.setItem(`report-${reportId}`, JSON.stringify({
        id: reportId,
        date: reportDate,
        data: healthData
      }));
      
      setIsGeneratingReport(false);
      setReportGenerated(true);
      
      toast({
        title: "Report Generated",
        description: "Your comprehensive health report is ready to view."
      });
      
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "There was an error generating your report.",
        variant: "destructive"
      });
      setIsGeneratingReport(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadReport = (reportId: string) => {
    const storedReport = localStorage.getItem(`report-${reportId}`);
    if (storedReport) {
      const parsedReport = JSON.parse(storedReport);
      setReportData(parsedReport.data);
      setShowReportDialog(true);
      setReportGenerated(true);
      setIsGeneratingReport(false);
    } else {
      toast({
        title: "Report Not Found",
        description: "The requested report could not be loaded.",
        variant: "destructive"
      });
    }
  };
  
  const downloadReport = () => {
    if (!reportData) return;
    
    // Create a formatted text report
    let reportText = `# Comprehensive Health Report\n`;
    reportText += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    // Mental Health Section
    reportText += `## Mental Health\n`;
    if (reportData.mentalHealth && reportData.mentalHealth.length > 0) {
      const latest = reportData.mentalHealth[0];
      reportText += `Latest emotional state: ${latest.emotionalState}\n`;
      reportText += `Stress level: ${latest.stressLevel}%\n`;
      reportText += `Recommendations:\n`;
      latest.recommendations.forEach(rec => {
        reportText += `- ${rec}\n`;
      });
    }
    reportText += `\n`;
    
    // Facial Analysis Section
    reportText += `## Facial Analysis\n`;
    if (reportData.facialScans && reportData.facialScans.length > 0) {
      const latest = reportData.facialScans[0];
      reportText += `Latest scan date: ${latest.date}\n`;
      reportText += `Stress indicators: ${latest.stressLevel}%\n`;
      reportText += `Sleep quality indicators: ${latest.sleepQuality}%\n`;
      reportText += `Hydration indicators: ${latest.hydrationLevel}%\n`;
      reportText += `Skin health: ${latest.skinHealth}%\n`;
    }
    reportText += `\n`;
    
    // Fitness Section
    reportText += `## Fitness\n`;
    reportText += `Fitness level: ${reportData.fitnessLevel || 'Not specified'}\n`;
    reportText += `Fitness goals: ${reportData.fitnessGoals || 'Not specified'}\n`;
    
    if (reportData.workouts && reportData.workouts.length > 0) {
      reportText += `\nRecent workouts:\n`;
      reportData.workouts.slice(0, 5).forEach(workout => {
        reportText += `- ${workout.date}: ${workout.type} (${workout.duration} minutes, ${workout.intensity})\n`;
      });
    }
    reportText += `\n`;
    
    // Water Intake
    reportText += `## Water Intake\n`;
    if (reportData.waterIntake && reportData.waterIntake.length > 0) {
      const avgIntake = reportData.waterIntake.reduce((sum, day) => sum + day.amount, 0) / reportData.waterIntake.length;
      const avgGoal = reportData.waterIntake[0].goal;
      reportText += `Average daily intake: ${Math.round(avgIntake)}ml / ${avgGoal}ml (${Math.round((avgIntake/avgGoal)*100)}%)\n`;
    }
    reportText += `\n`;
    
    // Sleep Data
    reportText += `## Sleep\n`;
    if (reportData.sleepData && reportData.sleepData.length > 0) {
      const avgSleep = reportData.sleepData.reduce((sum, day) => sum + day.hours, 0) / reportData.sleepData.length;
      const avgQuality = reportData.sleepData.reduce((sum, day) => sum + day.quality, 0) / reportData.sleepData.length;
      reportText += `Average sleep duration: ${avgSleep.toFixed(1)} hours\n`;
      reportText += `Average sleep quality: ${Math.round(avgQuality)}%\n`;
    }
    reportText += `\n`;
    
    // Weight
    reportText += `## Weight\n`;
    if (reportData.weight && reportData.weight.length > 0) {
      const latest = reportData.weight[reportData.weight.length-1];
      const first = reportData.weight[0];
      const change = latest.value - first.value;
      reportText += `Current weight: ${latest.value} kg\n`;
      reportText += `Change over period: ${change > 0 ? '+' : ''}${change.toFixed(1)} kg\n`;
    }
    reportText += `\n`;
    
    // Recommendations Section
    reportText += `## Overall Recommendations\n`;
    reportText += `Based on your comprehensive health data, we recommend:\n`;
    reportText += `1. ${reportData.mentalHealth?.[0]?.recommendations?.[0] || 'Practice mindfulness techniques daily'}\n`;
    reportText += `2. ${reportData.mentalHealth?.[0]?.recommendations?.[1] || 'Ensure adequate hydration throughout the day'}\n`;
    reportText += `3. Maintain a consistent sleep schedule for better quality rest\n`;
    reportText += `4. Continue with your current exercise regimen and gradually increase intensity\n`;
    
    // Create and download file
    const element = document.createElement('a');
    const file = new Blob([reportText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `health_report_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Report Downloaded",
      description: "Your health report has been downloaded successfully."
    });
  };
  
  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-facefit-purple" />
            Comprehensive Health Report
          </CardTitle>
          <CardDescription>
            Generate a detailed report combining data from all your health tracking activities
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center py-6 space-y-4">
            <Button 
              onClick={generateReport}
              className="bg-facefit-purple hover:bg-facefit-purple/90"
              disabled={isLoading}
            >
              <ChartLine className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
            
            {savedReports.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Saved Reports</p>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {savedReports.map(report => (
                    <div 
                      key={report.id}
                      className="border rounded-md p-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => loadReport(report.id)}
                    >
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.date).toLocaleDateString()} at {new Date(report.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-facefit-purple" />
              Health & Wellness Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {isGeneratingReport ? (
              <div className="space-y-6 py-8">
                <Progress value={reportProgress} className="h-2" />
                <p className="text-center text-sm font-medium">
                  {reportProgress < 25 ? "Gathering facial analysis data..." :
                   reportProgress < 50 ? "Processing mental health information..." :
                   reportProgress < 75 ? "Analyzing fitness and activity metrics..." :
                   "Compiling comprehensive report..."}
                </p>
              </div>
            ) : reportGenerated && reportData ? (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="overview">
                      <User className="mr-2 h-4 w-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="mental">
                      <Brain className="mr-2 h-4 w-4" />
                      Mental
                    </TabsTrigger>
                    <TabsTrigger value="fitness">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Fitness
                    </TabsTrigger>
                    <TabsTrigger value="vitals">
                      <Heart className="mr-2 h-4 w-4" />
                      Vitals
                    </TabsTrigger>
                    <TabsTrigger value="recommendations">
                      <Activity className="mr-2 h-4 w-4" />
                      Plan
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            <Brain className="inline-block mr-2 h-4 w-4" />
                            Mental Wellness
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {reportData.mentalHealth && reportData.mentalHealth.length > 0 && (
                            <div>
                              <p className="font-medium text-lg">
                                {reportData.mentalHealth[0].emotionalState}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Stress Level: {reportData.mentalHealth[0].stressLevel}%
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            <Dumbbell className="inline-block mr-2 h-4 w-4" />
                            Fitness Level
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium text-lg capitalize">
                            {reportData.fitnessLevel || 'Not specified'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {reportData.workouts && reportData.workouts.length > 0 
                              ? `${reportData.workouts.length} workouts tracked` 
                              : 'No workouts tracked'}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            <Activity className="inline-block mr-2 h-4 w-4" />
                            Overall Health
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* Calculate a composite health score based on various metrics */}
                          {(() => {
                            const facialScore = reportData.facialScans && reportData.facialScans.length > 0
                              ? (reportData.facialScans[0].sleepQuality + 
                                reportData.facialScans[0].hydrationLevel + 
                                reportData.facialScans[0].skinHealth + 
                                (100 - reportData.facialScans[0].stressLevel)) / 4
                              : 75;
                              
                            const mentalScore = reportData.mentalHealth && reportData.mentalHealth.length > 0
                              ? 100 - reportData.mentalHealth[0].stressLevel
                              : 70;
                              
                            const overallScore = Math.round((facialScore + mentalScore) / 2);
                            
                            return (
                              <>
                                <p className="font-medium text-lg">
                                  {overallScore}% - {
                                    overallScore >= 90 ? 'Excellent' :
                                    overallScore >= 75 ? 'Good' :
                                    overallScore >= 60 ? 'Fair' : 'Needs Improvement'
                                  }
                                </p>
                                <Progress value={overallScore} className="h-2 mt-2" />
                              </>
                            );
                          })()}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            <Calendar className="inline-block mr-2 h-4 w-4" />
                            Report Period
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium">
                            Last 7 Days
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {reportData.weight && reportData.weight.length > 0 
                              ? `${reportData.weight[0].date} - ${reportData.weight[reportData.weight.length - 1].date}` 
                              : new Date().toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Overall Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Based on your comprehensive health data, your overall wellness appears to be {
                            (() => {
                              const facialScore = reportData.facialScans && reportData.facialScans.length > 0
                                ? (reportData.facialScans[0].sleepQuality + 
                                  reportData.facialScans[0].hydrationLevel + 
                                  reportData.facialScans[0].skinHealth + 
                                  (100 - reportData.facialScans[0].stressLevel)) / 4
                                : 75;
                                
                              const mentalScore = reportData.mentalHealth && reportData.mentalHealth.length > 0
                                ? 100 - reportData.mentalHealth[0].stressLevel
                                : 70;
                                
                              const overallScore = Math.round((facialScore + mentalScore) / 2);
                              
                              return (
                                overallScore >= 90 ? 'excellent. Your consistent healthy habits are paying off!' :
                                overallScore >= 75 ? 'good. You\'re maintaining healthy practices in most areas.' :
                                overallScore >= 60 ? 'fair. There are several areas where improvements could be beneficial.' :
                                'needing attention. We recommend focusing on the key improvement areas below.'
                              );
                            })()
                          }
                        </p>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Key Strengths:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {reportData.facialScans && reportData.facialScans[0]?.skinHealth > 70 && (
                              <li>Excellent skin health indicators</li>
                            )}
                            {reportData.mentalHealth && reportData.mentalHealth[0]?.stressLevel < 40 && (
                              <li>Good stress management</li>
                            )}
                            {reportData.workouts && reportData.workouts.length > 2 && (
                              <li>Regular exercise habits</li>
                            )}
                            {reportData.waterIntake && 
                              reportData.waterIntake.reduce((sum, day) => sum + day.amount, 0) / reportData.waterIntake.length > 2000 && (
                              <li>Consistent hydration</li>
                            )}
                          </ul>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Improvement Areas:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {reportData.mentalHealth && reportData.mentalHealth[0]?.stressLevel > 60 && (
                              <li>High stress levels - consider stress management techniques</li>
                            )}
                            {reportData.facialScans && reportData.facialScans[0]?.sleepQuality < 60 && (
                              <li>Sleep quality indicators suggest room for improvement</li>
                            )}
                            {reportData.sleepData && 
                              reportData.sleepData.reduce((sum, day) => sum + day.hours, 0) / reportData.sleepData.length < 7 && (
                              <li>Sleep duration below recommendations</li>
                            )}
                            {reportData.waterIntake && 
                              reportData.waterIntake.reduce((sum, day) => sum + day.amount, 0) / reportData.waterIntake.length < 
                              reportData.waterIntake[0].goal * 0.8 && (
                              <li>Hydration below target levels</li>
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="mental" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Mental Health Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {reportData.mentalHealth && reportData.mentalHealth.length > 0 ? (
                          <>
                            <div>
                              <h4 className="font-medium mb-2">Current Emotional State</h4>
                              <p className="text-2xl font-bold">{reportData.mentalHealth[0].emotionalState}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Stress Level</h4>
                              <div className="flex items-center gap-2">
                                <Progress value={reportData.mentalHealth[0].stressLevel} className="h-2 flex-1" />
                                <span className="text-sm font-medium">{reportData.mentalHealth[0].stressLevel}%</span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Recommendations</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {reportData.mentalHealth[0].recommendations.map((rec, i) => (
                                  <li key={i} className="text-sm">{rec}</li>
                                ))}
                              </ul>
                            </div>
                            
                            {reportData.facialScans && reportData.facialScans.length > 0 && (
                              <div className="pt-2">
                                <h4 className="font-medium mb-2">Facial Analysis Indicators</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                      <p>Stress Indicators</p>
                                      <span>{reportData.facialScans[0].stressLevel}%</span>
                                    </div>
                                    <Progress value={reportData.facialScans[0].stressLevel} className="h-2" />
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                      <p>Sleep Quality Indicators</p>
                                      <span>{reportData.facialScans[0].sleepQuality}%</span>
                                    </div>
                                    <Progress value={reportData.facialScans[0].sleepQuality} className="h-2" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-center text-muted-foreground py-4">
                            No mental health data available
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="fitness" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Fitness Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Fitness Level</h4>
                            <p className="text-lg font-bold capitalize">{reportData.fitnessLevel || 'Not specified'}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Workout Frequency</h4>
                            <p className="text-lg font-bold">
                              {reportData.workouts ? `${reportData.workouts.length} sessions` : '0 sessions'} 
                              <span className="text-sm font-normal text-muted-foreground"> / past week</span>
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Fitness Goals</h4>
                          <p className="text-sm">{reportData.fitnessGoals || 'No fitness goals specified'}</p>
                        </div>
                        
                        {reportData.workouts && reportData.workouts.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Recent Workouts</h4>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                              {reportData.workouts.map((workout, i) => (
                                <div key={i} className="border rounded-md p-2">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">{workout.type}</p>
                                    <p className="text-xs">{workout.date}</p>
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <p>{workout.duration} minutes</p>
                                    <p>Intensity: {workout.intensity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="vitals" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Health Vitals</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Water Intake */}
                        {reportData.waterIntake && reportData.waterIntake.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Water Intake</h4>
                            <div className="h-[150px] w-full">
                              {/* In a real app, this would be a proper chart */}
                              <div className="flex items-end h-full w-full gap-1">
                                {reportData.waterIntake.map((day, i) => (
                                  <div key={i} className="flex-1 flex flex-col items-center">
                                    <div className="w-full bg-facefit-purple/20 relative" 
                                      style={{height: `${(day.amount/day.goal) * 100}%`}}>
                                      <div className="absolute bottom-0 inset-x-0 bg-facefit-purple h-[1px]"></div>
                                    </div>
                                    <p className="text-xs mt-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                                      {day.date.split('/')[1]}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <p className="text-xs text-muted-foreground">
                                Average: {Math.round(reportData.waterIntake.reduce((sum, day) => sum + day.amount, 0) / reportData.waterIntake.length)}ml
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Goal: {reportData.waterIntake[0].goal}ml
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Sleep Data */}
                        {reportData.sleepData && reportData.sleepData.length > 0 && (
                          <div className="pt-4">
                            <h4 className="font-medium mb-2">Sleep</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-center mb-1 text-sm">
                                  <p>Average Duration</p>
                                  <span>
                                    {(reportData.sleepData.reduce((sum, day) => sum + day.hours, 0) / reportData.sleepData.length).toFixed(1)} hours
                                  </span>
                                </div>
                                <Progress 
                                  value={(reportData.sleepData.reduce((sum, day) => sum + day.hours, 0) / reportData.sleepData.length) * 12.5} 
                                  className="h-2" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between items-center mb-1 text-sm">
                                  <p>Average Quality</p>
                                  <span>
                                    {Math.round(reportData.sleepData.reduce((sum, day) => sum + day.quality, 0) / reportData.sleepData.length)}%
                                  </span>
                                </div>
                                <Progress 
                                  value={Math.round(reportData.sleepData.reduce((sum, day) => sum + day.quality, 0) / reportData.sleepData.length)} 
                                  className="h-2" 
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Weight */}
                        {reportData.weight && reportData.weight.length > 0 && (
                          <div className="pt-4">
                            <h4 className="font-medium mb-2">Weight</h4>
                            <div className="h-[150px] w-full">
                              {/* In a real app, this would be a proper chart */}
                              <div className="flex items-end h-full w-full gap-1">
                                {reportData.weight.map((day, i) => {
                                  const min = Math.min(...reportData.weight!.map(d => d.value)) - 1;
                                  const max = Math.max(...reportData.weight!.map(d => d.value)) + 1;
                                  const range = max - min;
                                  const height = ((day.value - min) / range) * 100;
                                  
                                  return (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                      <div className="w-full bg-facefit-purple/20 relative" 
                                        style={{height: `${height}%`}}>
                                        <div className="absolute bottom-0 inset-x-0 bg-facefit-purple h-[1px]"></div>
                                      </div>
                                      <p className="text-xs mt-1">
                                        {day.date.split('/')[1]}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <p className="text-xs text-muted-foreground">
                                Current: {reportData.weight[reportData.weight.length-1].value} kg
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Change: {
                                  (() => {
                                    const change = reportData.weight[reportData.weight.length-1].value - reportData.weight[0].value;
                                    return `${change > 0 ? '+' : ''}${change.toFixed(1)} kg`;
                                  })()
                                }
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="recommendations" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Personalized Health Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Focus Areas</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {reportData.mentalHealth && reportData.mentalHealth[0]?.stressLevel > 50 && (
                              <li className="text-sm">Stress Management</li>
                            )}
                            {reportData.facialScans && reportData.facialScans[0]?.sleepQuality < 70 && (
                              <li className="text-sm">Sleep Quality Improvement</li>
                            )}
                            {reportData.facialScans && reportData.facialScans[0]?.hydrationLevel < 70 && (
                              <li className="text-sm">Hydration Optimization</li>
                            )}
                            {!reportData.workouts || reportData.workouts.length < 3 && (
                              <li className="text-sm">Regular Physical Activity</li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Recommended Actions</h4>
                          <div className="space-y-3">
                            {/* Mental Health Recommendations */}
                            {reportData.mentalHealth && reportData.mentalHealth[0]?.recommendations && (
                              <div className="border p-3 rounded-md">
                                <p className="font-medium mb-1 flex items-center">
                                  <Brain className="h-4 w-4 mr-2" />
                                  Mental Wellbeing
                                </p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                  {reportData.mentalHealth[0].recommendations.slice(0, 2).map((rec, i) => (
                                    <li key={i}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* Fitness Recommendations */}
                            <div className="border p-3 rounded-md">
                              <p className="font-medium mb-1 flex items-center">
                                <Dumbbell className="h-4 w-4 mr-2" />
                                Fitness Plan
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                <li>
                                  {!reportData.workouts || reportData.workouts.length < 2
                                    ? "Start with 2-3 exercise sessions per week, 20-30 minutes each"
                                    : reportData.workouts.length < 4
                                    ? "Maintain your current 2-3 weekly workouts, consider increasing duration"
                                    : "Great job maintaining regular exercise. Focus on increasing intensity"}
                                </li>
                                <li>
                                  {reportData.fitnessLevel === 'beginner'
                                    ? "Include basic bodyweight exercises and gentle cardio"
                                    : reportData.fitnessLevel === 'intermediate'
                                    ? "Mix strength training and moderate cardio workouts"
                                    : "Continue with your advanced training regimen with regular recovery periods"}
                                </li>
                              </ul>
                            </div>
                            
                            {/* Nutrition & Hydration */}
                            <div className="border p-3 rounded-md">
                              <p className="font-medium mb-1 flex items-center">
                                <Heart className="h-4 w-4 mr-2" />
                                Nutrition & Hydration
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                <li>
                                  {reportData.waterIntake && 
                                    reportData.waterIntake.reduce((sum, day) => sum + day.amount, 0) / 
                                    reportData.waterIntake.length < reportData.waterIntake[0].goal * 0.8
                                    ? `Increase water intake to reach your daily goal of ${reportData.waterIntake[0].goal}ml`
                                    : "Maintain your current hydration habits"}
                                </li>
                                <li>
                                  {reportData.facialScans && reportData.facialScans[0]?.skinHealth < 70
                                    ? "Include more antioxidant-rich foods and omega-3 fatty acids in your diet"
                                    : "Continue with balanced nutrition with focus on whole foods"}
                                </li>
                              </ul>
                            </div>
                            
                            {/* Rest & Recovery */}
                            <div className="border p-3 rounded-md">
                              <p className="font-medium mb-1 flex items-center">
                                <Activity className="h-4 w-4 mr-2" />
                                Rest & Recovery
                              </p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                <li>
                                  {reportData.sleepData && 
                                    reportData.sleepData.reduce((sum, day) => sum + day.hours, 0) / reportData.sleepData.length < 7
                                    ? "Aim for 7-8 hours of sleep consistently"
                                    : "Maintain your healthy sleep duration"}
                                </li>
                                <li>
                                  {reportData.sleepData && 
                                    reportData.sleepData.reduce((sum, day) => sum + day.quality, 0) / reportData.sleepData.length < 70
                                    ? "Improve sleep quality with a consistent bedtime routine"
                                    : "Continue your effective sleep hygiene practices"}
                                </li>
                                <li>
                                  Include at least one dedicated recovery day between intense workouts
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Next Steps</h4>
                          <p className="text-sm">
                            To effectively follow this personalized plan, we recommend:
                          </p>
                          <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
                            <li>Check in with the FacialScan feature at least twice weekly</li>
                            <li>Complete your mental health journal entry daily</li>
                            <li>Track your workouts consistently</li>
                            <li>Generate a new comprehensive report in 2-4 weeks to monitor progress</li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={downloadReport}
                    className="bg-facefit-purple hover:bg-facefit-purple/90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No report data available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComprehensiveReport;
