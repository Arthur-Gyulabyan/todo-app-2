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
import { Button } from "@/components/ui/button";
import { useDeleteTodo } from "@/api/todos";
import { Todo } from "@/lib/validators";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteTodoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo | null;
}

const DeleteTodoDialog: React.FC<DeleteTodoDialogProps> = ({
  isOpen,
  onOpenChange,
  todo,
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);

  // Sync internal state with prop
  if (isOpen !== localIsOpen) {
    setLocalIsOpen(isOpen);
  }

  const { mutate: deleteTodo, isPending } = useDeleteTodo();

  const handleDelete = () => {
    if (todo) {
      deleteTodo(
        { id: todo.id },
        {
          onSuccess: () => {
            onOpenChange(false); // Close dialog on success
          },
        }
      );
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!isPending) { // Prevent closing while pending
      setLocalIsOpen(open);
      onOpenChange(open);
    }
  };

  return (
    <AlertDialog open={localIsOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the todo{" "}
            <span className="font-medium text-foreground">"{todo?.task}"</span>{" "}
            (ID: {todo?.id}) from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodoDialog;