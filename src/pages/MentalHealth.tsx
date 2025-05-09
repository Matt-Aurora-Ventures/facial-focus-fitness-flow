
import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MentalHealthCheck from '@/components/MentalHealthCheck';
import MentalHealthJournal from '@/components/MentalHealthJournal';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, BookText } from "lucide-react";

const MentalHealthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("voice");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Mental Health Center</h1>
        
        <Tabs defaultValue="voice" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice Analysis
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookText className="h-4 w-4" />
              Journal
            </TabsTrigger>
          </TabsList>
          <TabsContent value="voice">
            <MentalHealthCheck />
          </TabsContent>
          <TabsContent value="journal">
            <MentalHealthJournal />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default MentalHealthPage;
