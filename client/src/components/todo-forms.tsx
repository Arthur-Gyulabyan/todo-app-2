import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

import {
  createTodoRequestSchema,
  updateTodoRequestSchema,
  CreateTodoRequest,
  UpdateTodoRequest,
  Todo,
} from "@/schema/todoSchema";

interface CreateTodoFormProps {
  onSubmit: (data: CreateTodoRequest) => void;
  isLoading: boolean;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoRequestSchema),
    defaultValues: {
      task: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Task</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What needs to be done?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Todo"}
        </Button>
      </form>
    </Form>
  );
};

interface UpdateTodoFormProps {
  todo: Todo;
  onSubmit: (data: UpdateTodoRequest) => void;
  isLoading: boolean;
}

export const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({
  todo,
  onSubmit,
  isLoading,
}) => {
  const form = useForm<UpdateTodoRequest>({
    resolver: zodResolver(updateTodoRequestSchema),
    defaultValues: {
      todoID: todo.todoID,
      task: todo.task,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Task</FormLabel>
              <FormControl>
                <Input placeholder="Update task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Todo"}
        </Button>
      </form>
    </Form>
  );
};