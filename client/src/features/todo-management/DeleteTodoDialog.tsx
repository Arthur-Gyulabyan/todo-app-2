/**
 * @file src/features/todo-management/DeleteTodoDialog.tsx
 * @description A confirmation dialog for deleting a todo item.
 *              Uses Shadcn/UI's AlertDialog.
 */

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useDeleteTodo } from "@/api/todos";

interface DeleteTodoDialogProps {
  /** Controls the open/closed state of the dialog. */
  isOpen: boolean;
  /** Callback function to close the dialog. */
  onClose: () => void;
  /** The ID of the todo item to be deleted. */
  todoID: string;
}

export const DeleteTodoDialog: React.FC<DeleteTodoDialogProps> = ({ isOpen, onClose, todoID }) => {
  const deleteTodoMutation = useDeleteTodo();

  /**
   * Handles the deletion confirmation.
   */
  const handleDelete = () => {
    deleteTodoMutation.mutate({ todoID }, {
      onSuccess: () => {
        onClose(); // Close dialog on successful deletion
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the todo item with ID: <span className="font-semibold text-foreground">{todoID}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTodoMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteTodoMutation.isPending} className="bg-red-600 hover:bg-red-700">
            {deleteTodoMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};