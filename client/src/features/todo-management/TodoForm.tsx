/**
 * @file src/features/todo-management/TodoForm.tsx
 * @description A reusable form component for creating and updating todo items.
 *              Integrates `react-hook-form` and `Zod` for validation.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateTodoRequest, createTodoRequestSchema, UpdateTodoRequest, updateTodoRequestSchema, Todo } from "@/lib/validators";

interface TodoFormProps {
  /** Optional initial values for the form, used for editing existing todos. */
  initialValues?: Todo;
  /** Callback function executed on form submission. */
  onSubmit: (values: CreateTodoRequest | UpdateTodoRequest) => void;
  /** Flag to indicate if the form is currently submitting, used to disable the submit button. */
  isSubmitting: boolean;
}

// Type definition for the form's data, which can be either a create or update request.
type FormSchema = CreateTodoRequest | UpdateTodoRequest;

export const TodoForm: React.FC<TodoFormProps> = ({ initialValues, onSubmit, isSubmitting }) => {
  const isEditMode = !!initialValues;
  const schema = isEditMode ? updateTodoRequestSchema : createTodoRequestSchema;

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
      ? { todoID: initialValues.todoID, task: initialValues.task }
      : { task: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isEditMode && (
          <FormField
            control={form.control}
            name="todoID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Todo ID</FormLabel>
                <FormControl>
                  {/* Todo ID is read-only in edit mode */}
                  <Input {...field} disabled className="bg-muted" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : (isEditMode ? "Save Changes" : "Create Todo")}
        </Button>
      </form>
    </Form>
  );
};