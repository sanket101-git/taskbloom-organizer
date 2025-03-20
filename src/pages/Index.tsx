
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { TaskList } from '@/components/TaskList';
import { TaskFilter } from '@/components/TaskFilter';
import { TaskStats } from '@/components/TaskStats';
import { TaskProvider } from '@/context/TaskContext';

const Index = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 flex-1">
          <TaskStats />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <TaskFilter />
            </div>
            
            <div className="md:col-span-2">
              <TaskList />
            </div>
          </div>
        </div>
        
        <footer className="w-full py-4 text-center text-gray-500 text-sm border-t border-gray-100 glass">
          <p>TaskMaster &copy; {new Date().getFullYear()} • Your Tasks, Organized</p>
        </footer>
      </div>
    </TaskProvider>
  );
};

export default Index;
