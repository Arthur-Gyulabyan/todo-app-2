/**
 * @file src/features/todo-management/EditTodoDialog.tsx
 * @description A dialog component for editing existing todo items.
 *              Uses Shadcn/UI's Dialog and the reusable TodoForm.
 */

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TodoForm } from "./TodoForm";
import { useUpdateTodo } from "@/api/todos";
import { Todo, UpdateTodoRequest } from "@/lib/validators";

interface EditTodoDialogProps {
  /** Controls the open/closed state of the dialog. */
  isOpen: boolean;
  /** Callback function to close the dialog. */
  onClose: () => void;
  /** The Todo object to be edited, providing initial form values. */
  todo: Todo;
}

export const EditTodoDialog: React.FC<EditTodoDialogProps> = ({ isOpen, onClose, todo }) => {
  const updateTodoMutation = useUpdateTodo();

  /**
   * Handles the submission of the todo update form.
   * @param values The form values for the updated todo.
   */
  const handleSubmit = (values: UpdateTodoRequest) => {
    updateTodoMutation.mutate(values, {
      onSuccess: () => {
        onClose(); // Close dialog on successful update
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo item here.
          </DialogDescription>
        </DialogHeader>
        <TodoForm
          initialValues={todo}
          onSubmit={handleSubmit}
          isSubmitting={updateTodoMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};