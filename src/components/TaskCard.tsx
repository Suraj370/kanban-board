import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { X } from 'lucide-react';
import { useTaskStore } from '@/store/useTaskStore';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'progress' | 'completed';
}

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const getBackgroundColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-todo/10 border-todo/30';
      case 'progress':
        return 'bg-progress/10 border-progress/30';
      case 'completed':
        return 'bg-completed/10 border-completed/30';
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
    toast.success('Task deleted successfully!');
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 rounded-lg border ${getBackgroundColor(task.status)} backdrop-blur-sm transition-all duration-300 hover:scale-105 relative group`}
        >
          <button
            onClick={handleDelete}
            className="absolute right-2 top-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-opacity"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <h3 className="text-white font-medium pr-6">{task.title}</h3>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;