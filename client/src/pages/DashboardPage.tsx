/**
 * @file src/pages/DashboardPage.tsx
 * @description The main dashboard page of the Todo application.
 *              Displays a header and integrates the TodoManagement feature component.
 */

import PageHeader from "@/components/shared/PageHeader";
import { TodoManagement } from "@/features/todo-management/TodoManagement";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PageHeader
        title="Todo Dashboard"
        description="Manage your daily tasks and boost your productivity."
      />
      <TodoManagement />
    </div>
  );
};

export default DashboardPage;