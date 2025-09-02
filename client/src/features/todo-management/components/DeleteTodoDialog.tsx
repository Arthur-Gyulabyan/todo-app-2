import React from "react";
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
import { Todo } from "@/lib/validators";
import { useDeleteTodo } from "@/api/todos";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface DeleteTodoDialogProps {
  todo: Todo;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteTodoDialog: React.FC<DeleteTodoDialogProps> = ({
  todo,
  isOpen,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const deleteTodoMutation = useDeleteTodo();

  const handleDeleteConfirm = async () => {
    try {
      await deleteTodoMutation.mutateAsync({ id: todo.id });
      toast({
        title: "Todo deleted!",
        description: "The todo has been successfully removed.",
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Failed to delete todo",
        description: error?.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the todo
            <span className="font-semibold"> "{todo.task}" </span>
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTodoMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            disabled={deleteTodoMutation.isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {deleteTodoMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};