import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Todo, updateTodoRequestSchema } from "@/lib/validators";
import { useUpdateTodo } from "@/api/todos";
import { Loader2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { useEffect } from "react";

interface UpdateTodoFormProps {
  todo: Todo;
  onSuccess: () => void;
}

const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ todo, onSuccess }) => {
  const { toast } = useToast();
  const updateTodoMutation = useUpdateTodo();

  const form = useForm<z.infer<typeof updateTodoRequestSchema>>({
    resolver: zodResolver(updateTodoRequestSchema),
    defaultValues: {
      id: todo.id,
      task: todo.task,
    },
  });

  useEffect(() => {
    if (todo) {
      form.reset({
        id: todo.id,
        task: todo.task,
      });
    }
  }, [todo, form]);

  const onSubmit = async (values: z.infer<typeof updateTodoRequestSchema>) => {
    try {
      await updateTodoMutation.mutateAsync(values);
      onSuccess();
    } catch (error) {
      toast({
        title: "Failed to update todo",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="Update task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={updateTodoMutation.isPending}>
            {updateTodoMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Pencil className="mr-2 h-4 w-4" />
            )}
            Update Todo
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateTodoForm;