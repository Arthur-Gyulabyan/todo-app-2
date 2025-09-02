/**
 * @file src/components/shared/PageHeader.tsx
 * @description A reusable header component for pages, including title, description, and optional action buttons.
 */

import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
  /** The main title of the page. */
  title: string;
  /** An optional descriptive subtitle for the page. */
  description?: string;
  /** Any React nodes to be rendered on the right side of the header (e.g., buttons). */
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
      <Separator />
    </div>
  );
};

export default PageHeader;