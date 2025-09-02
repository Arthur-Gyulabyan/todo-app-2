import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import { TodoToolbar } from "@/features/todo-management/components/TodoToolbar";
import { TodoListTable } from "@/features/todo-management/components/TodoListTable";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Todo List"
        description="Manage your daily tasks and keep track of your progress."
      />
      <TodoToolbar />
      <TodoListTable />
    </div>
  );
};

export default DashboardPage;