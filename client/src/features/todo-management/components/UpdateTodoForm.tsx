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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUpdateTodo } from "@/api/todos";
import { updateTodoRequestSchema, Todo } from "@/lib/validators";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface UpdateTodoFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo | null; // The todo data to pre-fill the form
}

const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({
  isOpen,
  onOpenChange,
  todo,
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);

  // Sync internal state with prop
  if (isOpen !== localIsOpen) {
    setLocalIsOpen(isOpen);
  }

  const form = useForm<z.infer<typeof updateTodoRequestSchema>>({
    resolver: zodResolver(updateTodoRequestSchema),
    defaultValues: {
      id: "",
      task: "",
    },
  });

  // Populate form with todo data when it changes
  useEffect(() => {
    if (todo && isOpen) {
      form.reset({
        id: todo.id,
        task: todo.task,
      });
    } else if (!isOpen) {
      form.reset(); // Reset form when dialog closes
    }
  }, [todo, isOpen, form]);

  const { mutate: updateTodo, isPending } = useUpdateTodo();

  const onSubmit = (values: z.infer<typeof updateTodoRequestSchema>) => {
    updateTodo(values, {
      onSuccess: () => {
        onOpenChange(false); // Close dialog on success
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!isPending) { // Prevent closing while pending
      setLocalIsOpen(open);
      onOpenChange(open);
      if (!open) {
        form.reset(); // Reset form on close
      }
    }
  };

  return (
    <Dialog open={localIsOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={() => ( // Render as a hidden field or read-only
                <FormItem className="hidden">
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input readOnly {...form.register("id")} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="e.g., Buy groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoForm;