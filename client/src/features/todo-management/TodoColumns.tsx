/**
 * @file src/features/todo-management/TodoColumns.tsx
 * @description Defines the column structure and rendering logic for the Todo data table.
 *              Includes action buttons for editing and deleting todos.
 */

import { ColumnDef } from "@/components/shared/DataTable";
import { Todo } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

/**
 * Interface defining the actions that can be performed on a todo item from the table.
 */
interface TodoActions {
  onEdit: (todo: Todo) => void;
  onDelete: (todoID: string) => void;
}

/**
 * Generates the column definitions for the Todo DataTable.
 * @param actions An object containing callback functions for edit and delete actions.
 * @returns An array of ColumnDef objects configured for Todo data.
 */
export const getTodoColumns = (actions: TodoActions): ColumnDef<Todo>[] => {
  return [
    {
      accessorKey: "todoID",
      header: "ID",
      cell: ({ row }) => <div className="font-medium text-xs text-muted-foreground hidden sm:block">{row.todoID}</div>,
      headClassName: "hidden sm:table-cell",
      cellClassName: "hidden sm:table-cell",
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => <div className="font-medium">{row.task}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        row.createdAt ? format(new Date(row.createdAt), "PPP HH:mm") : "N/A"
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => (
        row.updatedAt ? format(new Date(row.updatedAt), "PPP HH:mm") : "N/A"
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => actions.onEdit(row)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => actions.onDelete(row.todoID)} className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};