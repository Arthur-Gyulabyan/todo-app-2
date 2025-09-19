import React, { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateTodoForm from "@/features/todo-management/components/CreateTodoForm";
import TodoTable from "@/features/todo-management/components/TodoTable";

const Dashboard: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Todo List"
        description="Manage your daily tasks efficiently."
        actions={
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Todo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Todo</DialogTitle>
              </DialogHeader>
              <CreateTodoForm onSuccess={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        }
      />
      <TodoTable />
    </div>
  );
};

export default Dashboard;