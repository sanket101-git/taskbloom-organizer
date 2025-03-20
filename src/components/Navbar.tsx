
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={cn(
      "w-full px-6 py-4 glass sticky top-0 z-10 backdrop-blur-lg border-b border-white/20",
      className
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/90 flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">TaskMaster</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover-lift cursor-pointer">
            <span className="text-primary font-bold text-sm">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
