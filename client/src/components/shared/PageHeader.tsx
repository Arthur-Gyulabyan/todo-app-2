import { cn } from "@/lib/utils";
import React from "react";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 pb-4",
        className
      )}
      {...props}
    >
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};

export default PageHeader;