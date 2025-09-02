import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Todo, UpdateTodoRequest, updateTodoRequestSchema } from "@/lib/validators";
import { useUpdateTodo } from "@/api/todos";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface EditTodoFormProps {
  todo: Todo;
  onSuccess?: () => void;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, onSuccess }) => {
  const { toast } = useToast();
  const updateTodoMutation = useUpdateTodo();

  const form = useForm<UpdateTodoRequest>({
    resolver: zodResolver(updateTodoRequestSchema),
    defaultValues: {
      id: todo.id,
      task: todo.task,
    },
  });

  // Reset form with new todo data if the todo prop changes
  useEffect(() => {
    form.reset({
      id: todo.id,
      task: todo.task,
    });
  }, [todo, form]);

  const onSubmit = async (values: UpdateTodoRequest) => {
    try {
      await updateTodoMutation.mutateAsync(values);
      toast({
        title: "Todo updated!",
        description: "Your todo has been successfully modified.",
      });
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Failed to update todo",
        description: error?.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden field for ID, as it's required by the API but not user editable */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <Input type="hidden" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Review project proposal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={updateTodoMutation.isPending}>
          {updateTodoMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
};