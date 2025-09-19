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
import { createTodoRequestSchema } from "@/lib/validators";
import { useCreateTodo } from "@/api/todos";
import { Loader2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "@/components/ui/dialog";

interface CreateTodoFormProps {
  onSuccess: () => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const createTodoMutation = useCreateTodo();

  const form = useForm<z.infer<typeof createTodoRequestSchema>>({
    resolver: zodResolver(createTodoRequestSchema),
    defaultValues: {
      task: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createTodoRequestSchema>) => {
    try {
      await createTodoMutation.mutateAsync(values);
      onSuccess();
      form.reset();
    } catch (error) {
      // Error handled by useCreateTodo hook already, just prevent dialog from closing
      toast({
        title: "Failed to create todo",
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
                <Input placeholder="Enter your todo task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={createTodoMutation.isPending}>
            {createTodoMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="mr-2 h-4 w-4" />
            )}
            Create Todo
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateTodoForm;