import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteTodo } from "@/api/todos";
import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeleteTodoDialogProps {
  todoId: string;
  onSuccess: () => void;
  children: React.ReactNode;
}

const DeleteTodoDialog: React.FC<DeleteTodoDialogProps> = ({ todoId, onSuccess, children }) => {
  const { toast } = useToast();
  const deleteTodoMutation = useDeleteTodo();

  const handleDelete = async () => {
    try {
      await deleteTodoMutation.mutateAsync({ id: todoId });
      onSuccess();
    } catch (error) {
      toast({
        title: "Failed to delete todo",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo and remove its data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTodoMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteTodoMutation.isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {deleteTodoMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodoDialog;