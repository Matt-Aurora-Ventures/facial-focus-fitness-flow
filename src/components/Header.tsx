
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScanFace, ChartBar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-10 w-full">
      <div className="relative h-24 bg-cover bg-center" style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=200&q=80')",
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
          <div className="container h-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-facefit-purple p-1.5">
                <ScanFace className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">
                  Insightly
                </h1>
                <p className="text-sm text-white/80">
                  AI Insights from InsightGenesis.ai
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate('/progress')}
              >
                <ChartBar className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </Button>
              <Button 
                size="sm" 
                className="bg-facefit-purple hover:bg-facefit-purple-dark"
              >
                Scan Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
