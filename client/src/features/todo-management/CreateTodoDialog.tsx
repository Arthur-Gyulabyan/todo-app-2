/**
 * @file src/features/todo-management/CreateTodoDialog.tsx
 * @description A dialog component for creating new todo items.
 *              Uses Shadcn/UI's Dialog and the reusable TodoForm.
 */

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TodoForm } from "./TodoForm";
import { useCreateTodo } from "@/api/todos";
import { CreateTodoRequest } from "@/lib/validators";

interface CreateTodoDialogProps {
  /** Controls the open/closed state of the dialog. */
  isOpen: boolean;
  /** Callback function to close the dialog. */
  onClose: () => void;
}

export const CreateTodoDialog: React.FC<CreateTodoDialogProps> = ({ isOpen, onClose }) => {
  const createTodoMutation = useCreateTodo();

  /**
   * Handles the submission of the todo creation form.
   * @param values The form values for the new todo.
   */
  const handleSubmit = (values: CreateTodoRequest) => {
    createTodoMutation.mutate(values, {
      onSuccess: () => {
        onClose(); // Close dialog on successful creation
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Enter the details for your new todo item.
          </DialogDescription>
        </DialogHeader>
        <TodoForm
          onSubmit={handleSubmit}
          isSubmitting={createTodoMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};