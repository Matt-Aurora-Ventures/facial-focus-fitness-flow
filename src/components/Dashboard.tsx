
import React from 'react';
import FacialScan from './FacialScan';
import WaterTracker from './WaterTracker';
import NutritionLog from './NutritionLog';
import MeasurementsTracker from './MeasurementsTracker';
import WorkoutLog from './WorkoutLog';
import ProgressChart from './ProgressChart';

const Dashboard: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FacialScan />
        <WaterTracker />
        <NutritionLog />
        <WorkoutLog />
        <div className="md:col-span-2">
          <ProgressChart />
        </div>
        <MeasurementsTracker />
      </div>
    </div>
  );
};

export default Dashboard;
