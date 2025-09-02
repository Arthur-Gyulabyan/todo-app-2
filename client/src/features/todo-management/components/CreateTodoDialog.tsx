import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateTodoForm } from "./CreateTodoForm";

interface CreateTodoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateTodoDialog: React.FC<CreateTodoDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
          <DialogDescription>
            Enter the details for your new todo item.
          </DialogDescription>
        </DialogHeader>
        <CreateTodoForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};