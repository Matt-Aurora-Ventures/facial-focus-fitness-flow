
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScanFace, ChartBar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-10 w-full">
      <div className="relative h-24 bg-gradient-to-r from-facefit-purple to-facefit-purple/70">
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-white/20 p-1.5">
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
    </header>
  );
};

export default Header;
