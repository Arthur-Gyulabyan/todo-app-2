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
import { useCreateTodo } from "@/api/todos";
import { createTodoRequestSchema } from "@/lib/validators";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CreateTodoFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);

  // Sync internal state with prop
  if (isOpen !== localIsOpen) {
    setLocalIsOpen(isOpen);
  }

  const form = useForm<z.infer<typeof createTodoRequestSchema>>({
    resolver: zodResolver(createTodoRequestSchema),
    defaultValues: {
      task: "",
    },
  });

  const { mutate: createTodo, isPending } = useCreateTodo();

  const onSubmit = (values: z.infer<typeof createTodoRequestSchema>) => {
    createTodo(values, {
      onSuccess: () => {
        form.reset();
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
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Enter the task details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
                  "Save Todo"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoForm;