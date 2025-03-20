
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useTaskContext } from '@/context/TaskContext';

export const TaskFilter: React.FC = () => {
  const { 
    filterCompleted, 
    filterCategory, 
    filterPriority, 
    searchQuery, 
    setFilterCompleted, 
    setFilterCategory, 
    setFilterPriority, 
    setSearchQuery 
  } = useTaskContext();

  const handleResetFilters = () => {
    setFilterCompleted(false);
    setFilterCategory('all');
    setFilterPriority('all');
    setSearchQuery('');
  };

  return (
    <div className="glass rounded-xl p-5 mb-6 animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleResetFilters}
          className="text-xs hover-lift"
        >
          Reset Filters
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 glass"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Tabs 
              defaultValue={filterCompleted ? "completed" : "active"}
              className="w-full"
              onValueChange={(value) => setFilterCompleted(value === "completed")}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="active" className="transition-all">Active</TabsTrigger>
                <TabsTrigger value="completed" className="transition-all">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <Select 
              value={filterPriority} 
              onValueChange={(value) => setFilterPriority(value as any)}
            >
              <SelectTrigger className="glass">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select 
            value={filterCategory} 
            onValueChange={(value) => setFilterCategory(value as any)}
          >
            <SelectTrigger className="glass">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="glass">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="errands">Errands</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
