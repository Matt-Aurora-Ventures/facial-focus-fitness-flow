
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScanFace, ChartBar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b border-border py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-facefit-purple p-1.5">
            <ScanFace className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-facefit-purple to-facefit-blue bg-clip-text text-transparent">
            FaceFit
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => navigate('/progress')}
          >
            <ChartBar className="h-4 w-4" />
            <span className="hidden sm:inline">Progress</span>
          </Button>
          <Button size="sm" className="bg-facefit-purple hover:bg-facefit-purple-dark">
            Scan Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
