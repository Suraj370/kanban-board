import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/components/TaskCard';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [
        { id: '1', title: 'Complete project proposal', status: 'todo' },
        { id: '2', title: 'Review code changes', status: 'progress' },
        { id: '3', title: 'Update documentation', status: 'completed' },
      ],
      addTask: (title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title,
              status: 'todo',
            },
          ],
        })),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);