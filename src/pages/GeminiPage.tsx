
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import GeminiDemo from '@/components/GeminiDemo';
import Footer from '@/components/Footer';

const GeminiPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Gemini AI Assistant</h1>
        <p className="mb-8 text-muted-foreground">
          This page demonstrates how to use the Google Gemini API to generate text responses.
          Try asking questions about fitness, nutrition, workouts, or anything else!
        </p>
        
        <GeminiDemo />
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default GeminiPage;
