
import React from 'react';
import Header from '../components/Header';
import FoodDiary from '../components/FoodDiary';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NutritionTrackingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6">Nutrition Tracking</h2>
        <FoodDiary />
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default NutritionTrackingPage;
