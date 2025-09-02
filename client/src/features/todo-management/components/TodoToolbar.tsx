import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateTodoDialog } from "./CreateTodoDialog";
import { PlusCircle } from "lucide-react";

export const TodoToolbar: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="flex justify-end mb-4">
      <Button onClick={() => setIsCreateDialogOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Todo
      </Button>
      <CreateTodoDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};