import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useGetAllTodos } from "@/api/todos";
import TodoTable from "@/features/todo-management/components/TodoTable";
import CreateTodoForm from "@/features/todo-management/components/CreateTodoForm";

const Dashboard = () => {
  const { data: todos, isLoading, isError, error } = useGetAllTodos();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Todo Management"
          description="Manage your daily tasks and keep track of your progress."
          actions={
            <Button onClick={() => setIsCreateFormOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Todo
            </Button>
          }
          className="mb-6"
        />

        <div className="mb-8">
          {/* You could add more dashboard elements here like stats, charts etc. */}
          {/* For now, we'll directly show the todo table. */}
          <h2 className="text-xl font-semibold mb-4">All Todos</h2>
          <TodoTable
            data={todos || []}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
          />
        </div>
      </div>
      <CreateTodoForm
        isOpen={isCreateFormOpen}
        onOpenChange={setIsCreateFormOpen}
      />
    </div>
  );
};

export default Dashboard;