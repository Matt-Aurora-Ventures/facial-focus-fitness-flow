
import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MentalHealthCheck from '@/components/MentalHealthCheck';
import MentalHealthJournal from '@/components/MentalHealthJournal';
import ReportAgent from '@/components/ReportAgent';
import FitnessAdvisor from '@/components/FitnessAdvisor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { FileText, Brain, Dumbbell, Heart, Clock } from 'lucide-react';
import WorkoutPlanner from '@/components/WorkoutPlanner';
import MeditationTimer from '@/components/MeditationTimer';

const MentalHealthPage = () => {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-6 flex-1 mb-16">
        <h1 className="text-3xl font-bold mb-2">Mental Wellbeing</h1>
        <p className="text-muted-foreground mb-6">Track and improve your mental health with personalized tools and insights.</p>
        
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="journal" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="journal">
                <Brain className="mr-2 h-4 w-4" />
                Journal
              </TabsTrigger>
              <TabsTrigger value="check">
                <Heart className="mr-2 h-4 w-4" />
                Daily Check-in
              </TabsTrigger>
              <TabsTrigger value="fitness">
                <Dumbbell className="mr-2 h-4 w-4" />
                Fitness Advisor
              </TabsTrigger>
              <TabsTrigger value="planner">
                <FileText className="mr-2 h-4 w-4" />
                Workout Planner
              </TabsTrigger>
              <TabsTrigger value="meditation">
                <Clock className="mr-2 h-4 w-4" />
                Meditation
              </TabsTrigger>
            </TabsList>
            
            <Button 
              variant="outline" 
              className="ml-auto hidden sm:flex"
              onClick={() => setReportOpen(true)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            
            <TabsContent value="journal" className="mt-6">
              <MentalHealthJournal />
            </TabsContent>
            
            <TabsContent value="check" className="mt-6">
              <MentalHealthCheck />
            </TabsContent>
            
            <TabsContent value="fitness" className="mt-6">
              <FitnessAdvisor />
            </TabsContent>
            
            <TabsContent value="planner" className="mt-6">
              <WorkoutPlanner />
            </TabsContent>
            
            <TabsContent value="meditation" className="mt-6">
              <MeditationTimer />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="sm:hidden">
          <Button 
            variant="outline" 
            className="w-full mb-6"
            onClick={() => setReportOpen(true)}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <ReportAgent open={reportOpen} onOpenChange={setReportOpen} />
      <Footer />
      <Navigation />
    </div>
  );
};

export default MentalHealthPage;
