import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditTodoForm } from "./EditTodoForm";
import { Todo } from "@/lib/validators";

interface EditTodoDialogProps {
  todo: Todo;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditTodoDialog: React.FC<EditTodoDialogProps> = ({
  todo,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Modify the details of your todo item.
          </DialogDescription>
        </DialogHeader>
        <EditTodoForm todo={todo} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};