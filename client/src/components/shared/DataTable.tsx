import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Define a Column interface for type safety and flexibility
interface Column<T> {
  id: string; // Unique identifier for the column
  header: string | React.ReactNode; // Content for the table header
  cell: (row: T) => React.ReactNode; // Function to render the cell content
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  noDataMessage?: string;
  skeletonRowCount?: number;
}

const DataTable = <T,>({
  columns,
  data,
  isLoading = false,
  isError = false,
  errorMessage = "Failed to load data.",
  noDataMessage = "No data available.",
  skeletonRowCount = 5,
}: DataTableProps<T>) => {
  if (isError) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    );
  }

  const renderSkeletons = () => {
    return Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {columns.map((column) => (
          <TableCell key={column.id}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const hasData = data && data.length > 0;

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeletons()
          ) : hasData ? (
            data.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.cell(row)}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noDataMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;