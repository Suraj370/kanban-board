import KanbanBoard from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Kanban Board</h1>
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Index;