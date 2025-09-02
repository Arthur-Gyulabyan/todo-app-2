/**
 * @file src/features/todo-management/TodoManagement.tsx
 * @description The main feature component for managing todo items.
 *              Orchestrates the DataTable, Create/Edit/Delete dialogs, and API interactions.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { useGetAllTodos } from "@/api/todos";
import { CreateTodoDialog } from "./CreateTodoDialog";
import { EditTodoDialog } from "./EditTodoDialog";
import { DeleteTodoDialog } from "./DeleteTodoDialog";
import { getTodoColumns } from "./TodoColumns";
import { Todo } from "@/lib/validators";

export const TodoManagement: React.FC = () => {
  // Fetch all todos using TanStack Query
  const { data: todos, isLoading, isError, error } = useGetAllTodos();

  // State for controlling dialog visibility and data for selected todo
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);

  /**
   * Handler for initiating the edit process for a specific todo.
   * @param todo The todo object to be edited.
   */
  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  /**
   * Handler for initiating the delete process for a specific todo ID.
   * @param todoID The ID of the todo to be deleted.
   */
  const handleDelete = (todoID: string) => {
    setDeleteTodoId(todoID);
  };

  // Generate table columns, passing the action handlers
  const columns = getTodoColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Todo
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={todos || []}
        isLoading={isLoading}
        error={isError ? error : null}
        noDataMessage="No todo items found. Start by creating a new one!"
      />

      {/* Dialog for creating a new todo */}
      <CreateTodoDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      {/* Dialog for editing an existing todo (conditionally rendered) */}
      {editTodo && (
        <EditTodoDialog
          isOpen={true} // Dialog is open when `editTodo` is not null
          onClose={() => setEditTodo(null)} // Close by setting `editTodo` to null
          todo={editTodo}
        />
      )}

      {/* Dialog for confirming deletion of a todo (conditionally rendered) */}
      {deleteTodoId && (
        <DeleteTodoDialog
          isOpen={true} // Dialog is open when `deleteTodoId` is not null
          onClose={() => setDeleteTodoId(null)} // Close by setting `deleteTodoId` to null
          todoID={deleteTodoId}
        />
      )}
    </div>
  );
};