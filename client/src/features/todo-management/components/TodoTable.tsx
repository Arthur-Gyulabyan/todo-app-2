import { useState } from "react";
import { Todo } from "@/lib/validators";
import DataTable from "@/components/shared/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import UpdateTodoForm from "./UpdateTodoForm";
import DeleteTodoDialog from "./DeleteTodoDialog";

interface TodoTableProps {
  data: Todo[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const TodoTable: React.FC<TodoTableProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
}) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const columns = [
    {
      id: "task",
      header: "Task",
      cell: (row: Todo) => <div className="font-medium">{row.task}</div>,
    },
    {
      id: "createdAt",
      header: "Created At",
      cell: (row: Todo) => (
        <div className="text-sm text-muted-foreground">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
        </div>
      ),
    },
    {
      id: "updatedAt",
      header: "Updated At",
      cell: (row: Todo) => (
        <div className="text-sm text-muted-foreground">
          {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "N/A"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row: Todo) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setSelectedTodo(row);
                setIsUpdateFormOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedTodo(row);
                setIsDeleteDialogOpen(true);
              }}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
        noDataMessage="No todos found. Create one to get started!"
      />

      <UpdateTodoForm
        isOpen={isUpdateFormOpen}
        onOpenChange={setIsUpdateFormOpen}
        todo={selectedTodo}
      />

      <DeleteTodoDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        todo={selectedTodo}
      />
    </>
  );
};

export default TodoTable;