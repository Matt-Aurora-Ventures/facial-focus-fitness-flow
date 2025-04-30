
import React from 'react';
import Header from '../components/Header';
import NutritionGoals from '../components/NutritionGoals';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NutritionGoalsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6">Nutrition Goals</h2>
        <NutritionGoals />
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default NutritionGoalsPage;
