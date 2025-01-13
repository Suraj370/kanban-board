import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TaskCard, { Task } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useTaskStore } from '@/store/useTaskStore';

const KanbanBoard = () => {
  const { tasks, addTask, moveTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(draggableId, destination.droppableId as Task['status']);
    toast.success('Task moved successfully!');
  };

  const handleAddNewTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    addTask(newTaskTitle);
    setNewTaskTitle('');
    toast.success('Task added successfully!');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNewTask();
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Enter new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-white/10 text-white"
        />
        <Button onClick={handleAddNewTask}>Add Task</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['todo', 'progress', 'completed'] as const).map((status) => (
            <div key={status} className="bg-white/5 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 text-white capitalize">
                {status === 'progress' ? 'In Progress' : status}
              </h2>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px]"
                  >
                    {getTasksByStatus(status).map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;