
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskCard } from './TaskCard';
import { useTaskContext } from '@/context/TaskContext';
import { CreateTaskDialog } from './CreateTaskDialog';

export const TaskList: React.FC = () => {
  const { filteredTasks } = useTaskContext();
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Tasks</h2>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-1 hover-lift"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="glass text-center p-8 rounded-xl animate-fade-in">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">
              {!useTaskContext().tasks.length 
                ? "You don't have any tasks yet." 
                : "No tasks match your current filters."}
            </p>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="hover-lift"
            >
              Create your first task
            </Button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>

      {showCreateDialog && (
        <CreateTaskDialog 
          isOpen={showCreateDialog} 
          onClose={() => setShowCreateDialog(false)} 
        />
      )}
    </div>
  );
};
