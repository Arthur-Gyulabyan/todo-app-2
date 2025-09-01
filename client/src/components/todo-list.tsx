import React, { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

import { Todo } from "@/schema/todoSchema";
import { useGetAllTodos, useUpdateTodo, useDeleteTodo } from "@/hooks/use-todo";
import { UpdateTodoForm } from "./todo-forms";

export const TodoList: React.FC = () => {
  const { data: todos, isLoading, isError, error } = useGetAllTodos();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const isMobile = useIsMobile();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateSubmit = (data: { todoID: string; task: string }) => {
    updateTodoMutation.mutate(data, {
      onSuccess: () => {
        setIsUpdateDialogOpen(false);
        setSelectedTodo(null);
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (selectedTodo) {
      deleteTodoMutation.mutate(
        { todoID: selectedTodo.todoID },
        {
          onSuccess: () => {
            setIsDeleteDialogOpen(false);
            setSelectedTodo(null);
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
        Error loading todos: {error?.message}
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
        No todos found. Start by creating a new one!
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="w-[40%]">Task</TableHead>
              <TableHead className="w-[20%]">Created At</TableHead>
              <TableHead className="w-[20%]">Updated At</TableHead>
              <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.todoID} className="hover:bg-gray-50">
                <TableCell className="font-medium">{todo.task}</TableCell>
                <TableCell>
                  {todo.createdAt ? format(new Date(todo.createdAt), "PPP") : "N/A"}
                </TableCell>
                <TableCell>
                  {todo.updatedAt ? format(new Date(todo.updatedAt), "PPP") : "N/A"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(todo)}
                    aria-label="Edit Todo"
                  >
                    <Pencil className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(todo)}
                    aria-label="Delete Todo"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className={isMobile ? "max-w-[90vw]" : "sm:max-w-[425px]"}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Todo</DialogTitle>
          </DialogHeader>
          {selectedTodo && (
            <UpdateTodoForm
              todo={selectedTodo}
              onSubmit={handleUpdateSubmit}
              isLoading={updateTodoMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className={isMobile ? "max-w-[90vw]" : "sm:max-w-[425px]"}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete your todo:{" "}
              <span className="font-semibold text-gray-800">{selectedTodo?.task}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleteTodoMutation.isPending}
              >
                {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};