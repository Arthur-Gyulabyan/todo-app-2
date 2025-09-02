import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { Todo } from "@/lib/validators";
import { useGetAllTodos } from "@/api/todos";
import { useToast } from "@/hooks/use-toast";
import { EditTodoDialog } from "./EditTodoDialog";
import { DeleteTodoDialog } from "./DeleteTodoDialog";

export const TodoListTable: React.FC = () => {
  const { toast } = useToast();
  const { data: todos, isLoading, isError, error } = useGetAllTodos();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDeleteDialogOpen(true);
  };

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: "task",
      header: "Task",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return format(date, "MMM dd, yyyy HH:mm");
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => {
        const date = row.original.updatedAt ? new Date(row.original.updatedAt) : null;
        return date ? format(date, "MMM dd, yyyy HH:mm") : "N/A";
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const todo = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(todo.id)}>
                Copy Todo ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(todo)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(todo)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isError) {
    toast({
      title: "Error fetching todos",
      description: error?.message || "An unknown error occurred.",
      variant: "destructive",
    });
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        Failed to load todos.
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={todos || []}
        isLoading={isLoading}
        filterableColumnId="task"
        emptyState={
          <div className="text-center p-4">
            <p className="text-muted-foreground">No todos found.</p>
            <p className="text-muted-foreground text-sm">Create a new todo to get started!</p>
          </div>
        }
      />

      {selectedTodo && (
        <EditTodoDialog
          todo={selectedTodo}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}

      {selectedTodo && (
        <DeleteTodoDialog
          todo={selectedTodo}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      )}
    </>
  );
};