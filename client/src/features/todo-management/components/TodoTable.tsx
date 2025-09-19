import React, { useState } from "react";
import DataTable from "@/components/shared/DataTable";
import { Todo } from "@/lib/validators";
import { useGetTodos } from "@/api/todos";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdateTodoForm from "./UpdateTodoForm";
import DeleteTodoDialog from "./DeleteTodoDialog";

const TodoTable: React.FC = () => {
  const { data: todos, isLoading, isError } = useGetTodos();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const columns = [
    {
      header: "Task",
      accessorKey: "task",
      className: "font-medium",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (todo: Todo) => (
        <span className="text-sm text-muted-foreground">
          {todo.createdAt ? format(new Date(todo.createdAt), "PPP p") : "N/A"}
        </span>
      ),
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      cell: (todo: Todo) => (
        <span className="text-sm text-muted-foreground">
          {todo.updatedAt ? format(new Date(todo.updatedAt), "PPP p") : "N/A"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (todo: Todo) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedTodo(todo);
              setIsUpdateDialogOpen(true);
            }}
            aria-label={`Edit ${todo.task}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <DeleteTodoDialog todoId={todo.id} onSuccess={() => {}}>
            <Button variant="ghost" size="icon" aria-label={`Delete ${todo.task}`}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </DeleteTodoDialog>
        </div>
      ),
      className: "w-24",
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={todos || []}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="No todos found. Create one to get started!"
      />

      {selectedTodo && (
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Todo</DialogTitle>
            </DialogHeader>
            <UpdateTodoForm todo={selectedTodo} onSuccess={() => setIsUpdateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TodoTable;