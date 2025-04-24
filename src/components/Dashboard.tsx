
import React, { useState } from 'react';
import FacialScan from './FacialScan';
import WaterTracker from './WaterTracker';
import NutritionLog from './NutritionLog';
import MeasurementsTracker from './MeasurementsTracker';
import WorkoutLog from './WorkoutLog';
import ProgressChart from './ProgressChart';
import Goals from './Goals';
import ReportAgent from './ReportAgent';
import { Button } from "@/components/ui/button";
import { ChartBar, MessageSquare } from "lucide-react";

const Dashboard: React.FC = () => {
  const [reportAgentOpen, setReportAgentOpen] = useState(false);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Fitness Dashboard</h2>
        <Button
          onClick={() => setReportAgentOpen(true)}
          className="bg-facefit-purple hover:bg-facefit-purple/90 gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <ChartBar className="h-4 w-4" />
          Full Analysis
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FacialScan />
        <WaterTracker />
        <NutritionLog />
        <WorkoutLog />
        <Goals />
        <div className="md:col-span-2">
          <ProgressChart />
        </div>
        <MeasurementsTracker />
      </div>
      
      <ReportAgent open={reportAgentOpen} onOpenChange={setReportAgentOpen} />
    </div>
  );
};

export default Dashboard;
