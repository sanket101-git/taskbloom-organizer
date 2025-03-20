
import React from 'react';
import { Clock, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => (
  <div className={cn("glass rounded-xl p-4 flex items-center gap-4 animate-scale-in hover-lift transition-all", colorClass)}>
    <div className="p-3 rounded-full bg-white/50 backdrop-blur-sm">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export const TaskStats: React.FC = () => {
  const { getTaskStats } = useTaskContext();
  const stats = getTaskStats();

  return (
    <div className="glass rounded-xl p-5 mb-6 animate-slide-in">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Overview</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<Clock className="h-6 w-6 text-blue-500" />}
          colorClass="border-blue-100"
        />
        
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          colorClass="border-green-100"
        />
        
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={<AlertCircle className="h-6 w-6 text-red-500" />}
          colorClass="border-red-100"
        />
        
        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon={<Star className="h-6 w-6 text-amber-500" />}
          colorClass="border-amber-100"
        />
      </div>
    </div>
  );
};
