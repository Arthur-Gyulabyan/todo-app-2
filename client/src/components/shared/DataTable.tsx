/**
 * @file src/components/shared/DataTable.tsx
 * @description A simplified generic data table component using Shadcn/UI table primitives.
 *              Provides basic display for data, loading states, and error messages.
 *              For a more advanced table with sorting, filtering, and pagination,
 *              integration with `@tanstack/react-table` would be necessary.
 */

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Defines the structure for a column in the DataTable.
 * @template TData The type of the data object for each row.
 */
export interface ColumnDef<TData> {
  /** A key to identify the column, often corresponding to a property in TData. */
  accessorKey: keyof TData | string;
  /** The header content for the column. Can be a string or a React node. */
  header: string | React.ReactNode;
  /**
   * A function that renders the cell content for a given row.
   * @param props An object containing the current row data and its index.
   * @returns The React node to render in the cell.
   */
  cell: (props: { row: TData; index: number }) => React.ReactNode;
  /** Optional class name for the column header. */
  headClassName?: string;
  /** Optional class name for the column cells. */
  cellClassName?: string;
}

interface DataTableProps<TData> {
  /** An array of column definitions to configure the table's structure. */
  columns: ColumnDef<TData>[];
  /** The array of data objects to display in the table. */
  data: TData[];
  /** Flag to indicate if data is currently being loaded. */
  isLoading?: boolean;
  /** An error object to display if data fetching failed. */
  error?: Error | null;
  /** An optional message to display when no data is available. */
  noDataMessage?: string;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  error,
  noDataMessage = "No data available.",
}: DataTableProps<TData>) {
  if (error) {
    return (
      <div className="flex items-center justify-center h-48 border border-red-200 bg-red-50 text-red-700 rounded-md p-4" role="alert">
        <p className="text-lg font-medium">Error: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground border rounded-md p-4">
        {noDataMessage}
      </div>
    );
  }

  return (
    <div className="rounded-md border w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={cn("whitespace-nowrap", column.headClassName)}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={`row-${(row as any).todoID || rowIndex}`}> {/* Use todoID if available for a more stable key */}
              {columns.map((column, colIndex) => (
                <TableCell key={`cell-${(row as any).todoID || rowIndex}-${colIndex}`} className={column.cellClassName}>
                  {column.cell({ row, index: rowIndex })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}