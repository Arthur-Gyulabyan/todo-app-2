import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

import { useGetAllTodos, useCreateTodo } from "@/hooks/use-todo";
import { CreateTodoRequest } from "@/schema/todoSchema";
import { CreateTodoForm } from "@/components/todo-forms";
import { TodoList } from "@/components/todo-list";

const Index: React.FC = () => {
  const { data: todos, isLoading: isTodosLoading } = useGetAllTodos();
  const createTodoMutation = useCreateTodo();
  const isMobile = useIsMobile();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateSubmit = (data: CreateTodoRequest) => {
    createTodoMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const totalTodos = todos?.length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8 lg:p-12 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header and Quick Actions */}
        <Card className="shadow-lg border-gray-100 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Todo Dashboard
            </CardTitle>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all duration-200"
                  aria-label="Create New Todo"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {isMobile ? "New" : "Create New Todo"}
                </Button>
              </DialogTrigger>
              <DialogContent className={isMobile ? "max-w-[90vw]" : "sm:max-w-[425px]"}>
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-800">
                    Create New Todo
                  </DialogTitle>
                </DialogHeader>
                <CreateTodoForm
                  onSubmit={handleCreateSubmit}
                  isLoading={createTodoMutation.isPending}
                />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Manage your tasks efficiently.
            </p>
          </CardContent>
        </Card>

        {/* Dashboard Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          <Card className="shadow-sm border-gray-100 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                Total Todos
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-500"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </CardHeader>
            <CardContent>
              {isTodosLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold text-gray-900">{totalTodos}</div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Currently, {totalTodos} tasks are on your list.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6 bg-gray-200" />

        {/* Todo List Section */}
        <Card className="shadow-lg border-gray-100 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Your Todos</CardTitle>
            <p className="text-sm text-gray-500">
              A comprehensive list of all your active tasks.
            </p>
          </CardHeader>
          <CardContent>
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;