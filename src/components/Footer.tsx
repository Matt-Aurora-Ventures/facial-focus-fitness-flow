
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 bg-background/80 backdrop-blur-sm border-t border-border mt-auto">
      <div className="container flex items-center justify-center gap-2">
        <img 
          src="/lovable-uploads/1d1cca94-8dc9-4810-8b14-0934a71fcddd.png"
          alt="Insight Genesis Logo"
          className="h-6 w-auto"
        />
        <span className="text-sm text-muted-foreground">Made with Insight Genesis</span>
      </div>
    </footer>
  );
};

export default Footer;
