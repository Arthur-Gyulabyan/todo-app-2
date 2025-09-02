import React from "react";
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
import { CreateTodoRequest, createTodoRequestSchema } from "@/lib/validators";
import { useCreateTodo } from "@/api/todos";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CreateTodoFormProps {
  onSuccess?: () => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const createTodoMutation = useCreateTodo();

  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoRequestSchema),
    defaultValues: {
      task: "",
    },
  });

  const onSubmit = async (values: CreateTodoRequest) => {
    try {
      await createTodoMutation.mutateAsync(values);
      toast({
        title: "Todo created!",
        description: "Your new todo has been successfully added.",
      });
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Failed to create todo",
        description: error?.response?.data?.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Buy groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={createTodoMutation.isPending}>
          {createTodoMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Todo"
          )}
        </Button>
      </form>
    </Form>
  );
};