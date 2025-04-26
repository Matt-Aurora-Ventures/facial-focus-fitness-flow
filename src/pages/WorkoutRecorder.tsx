
import React from 'react';
import Header from '../components/Header';
import WorkoutRecorderComponent from '../components/WorkoutRecorder';
import Navigation from '../components/Navigation';

const WorkoutRecorderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkoutRecorderComponent />
      <Navigation />
    </div>
  );
};

export default WorkoutRecorderPage;
