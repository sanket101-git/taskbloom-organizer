
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Edit, Trash } from 'lucide-react';
import { Task, TaskPriority, useTaskContext } from '@/context/TaskContext';
import { cn } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { CreateTaskDialog } from './CreateTaskDialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const isOverdue = task.dueDate && !task.completed && new Date() > task.dueDate;
  
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-500 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-500 border-amber-200';
      case 'low': return 'bg-green-50 text-green-500 border-green-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-50 text-blue-500 border-blue-200';
      case 'personal': return 'bg-purple-50 text-purple-500 border-purple-200';
      case 'errands': return 'bg-orange-50 text-orange-500 border-orange-200';
      case 'health': return 'bg-emerald-50 text-emerald-500 border-emerald-200';
      case 'finance': return 'bg-indigo-50 text-indigo-500 border-indigo-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  return (
    <div 
      className={cn(
        'glass rounded-xl p-5 transition-all duration-300 group animate-scale-in',
        task.completed ? 'opacity-60' : 'hover-lift',
        isOverdue && !task.completed ? 'border-red-300' : ''
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            className={cn(
              'h-5 w-5 transition-colors duration-200',
              task.completed ? 'bg-gray-400' : '',
              isOverdue && !task.completed ? 'border-red-400' : ''
            )}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className={cn('text-xs px-2 py-0.5 rounded-md font-medium', getPriorityColor(task.priority))}>
              {task.priority}
            </Badge>
            
            <Badge className={cn('text-xs px-2 py-0.5 rounded-md font-medium', getCategoryColor(task.category))}>
              {task.category}
            </Badge>
            
            {isOverdue && !task.completed && (
              <Badge className="bg-red-50 text-red-500 border-red-200 text-xs px-2 py-0.5 rounded-md font-medium">
                overdue
              </Badge>
            )}
          </div>
          
          <h3 className={cn(
            'text-lg font-medium mb-1 transition-opacity duration-200',
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          )}>
            {task.title}
          </h3>
          
          <p className={cn(
            'text-sm mb-3 line-clamp-2 transition-opacity duration-200',
            task.completed ? 'text-gray-400' : 'text-gray-600'
          )}>
            {task.description}
          </p>
          
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-1',
                isOverdue && !task.completed ? 'text-red-500' : ''
              )}>
                <Calendar className="h-3 w-3" />
                <span>Due: {format(task.dueDate, 'MMM d, yyyy')}</span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Created: {format(task.createdAt, 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => setShowEditDialog(true)}
            className="p-2 hover:bg-secondary rounded-full transition-colors duration-200"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4 text-gray-500" />
          </button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button 
                className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                aria-label="Delete task"
              >
                <Trash className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the task: "{task.title}"
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover-lift">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 hover-lift"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {showEditDialog && (
        <CreateTaskDialog 
          isOpen={showEditDialog} 
          onClose={() => setShowEditDialog(false)} 
          taskToEdit={task}
        />
      )}
    </div>
  );
};
