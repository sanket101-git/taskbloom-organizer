
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskCategory = 'work' | 'personal' | 'errands' | 'health' | 'finance' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  createdAt: Date;
  completedAt: Date | null;
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  filterCompleted: boolean;
  filterCategory: TaskCategory | 'all';
  filterPriority: TaskPriority | 'all';
  searchQuery: string;
  setFilterCompleted: (value: boolean) => void;
  setFilterCategory: (category: TaskCategory | 'all') => void;
  setFilterPriority: (priority: TaskPriority | 'all') => void;
  setSearchQuery: (query: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  filteredTasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  getTaskStats: () => {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    highPriority: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Sample tasks data
const generateSampleTasks = (): Task[] => {
  return [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the project proposal for the client meeting',
      dueDate: new Date(Date.now() + 86400000 * 2),
      createdAt: new Date(),
      completedAt: null,
      priority: 'high',
      category: 'work',
      completed: false
    },
    {
      id: '2',
      title: 'Go grocery shopping',
      description: 'Buy fruits, vegetables, and other essentials',
      dueDate: new Date(Date.now() + 86400000),
      createdAt: new Date(Date.now() - 86400000),
      completedAt: null,
      priority: 'medium',
      category: 'errands',
      completed: false
    },
    {
      id: '3',
      title: 'Schedule doctor appointment',
      description: 'Annual check-up with Dr. Smith',
      dueDate: new Date(Date.now() + 86400000 * 5),
      createdAt: new Date(Date.now() - 86400000 * 2),
      completedAt: null,
      priority: 'low',
      category: 'health',
      completed: false
    },
    {
      id: '4',
      title: 'Pay utility bills',
      description: 'Electricity and water bills for the month',
      dueDate: new Date(Date.now() - 86400000),
      createdAt: new Date(Date.now() - 86400000 * 3),
      completedAt: null,
      priority: 'medium',
      category: 'finance',
      completed: false
    },
    {
      id: '5',
      title: 'Clean kitchen',
      description: 'Deep clean the kitchen and organize pantry',
      dueDate: new Date(Date.now() + 86400000 * 3),
      createdAt: new Date(Date.now() - 86400000),
      completedAt: new Date(),
      priority: 'low',
      category: 'personal',
      completed: true
    }
  ];
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with sample tasks or stored tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks, (key, value) => {
      if (key === 'dueDate' || key === 'createdAt' || key === 'completedAt') {
        return value ? new Date(value) : null;
      }
      return value;
    }) : generateSampleTasks();
  });

  // Filter states
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterCategory, setFilterCategory] = useState<TaskCategory | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      completedAt: null
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success('Task added successfully');
  };

  // Update an existing task
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, ...updates } 
          : task
      )
    );
    toast.success('Task updated successfully');
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully');
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : null
            }
          : task
      )
    );
  };

  // Get a task by ID
  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  // Get task statistics
  const getTaskStats = () => {
    const now = new Date();
    
    return {
      total: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      pending: tasks.filter(task => !task.completed).length,
      overdue: tasks.filter(task => 
        !task.completed && task.dueDate && task.dueDate < now
      ).length,
      highPriority: tasks.filter(task => 
        !task.completed && task.priority === 'high'
      ).length
    };
  };

  // Apply filters to get filtered tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (filterCompleted && !task.completed) return false;
    if (!filterCompleted && task.completed) return false;
    
    // Filter by category
    if (filterCategory !== 'all' && task.category !== filterCategory) return false;
    
    // Filter by priority
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    
    // Filter by search query
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  }).sort((a, b) => {
    // Sort by completion status (incomplete first)
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    // Then by due date (closest due date first, null dates last)
    if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime();
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    // Then by priority (high > medium > low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const value = {
    tasks,
    filterCompleted,
    filterCategory,
    filterPriority,
    searchQuery,
    setFilterCompleted,
    setFilterCategory,
    setFilterPriority,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    filteredTasks,
    getTaskById,
    getTaskStats
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
