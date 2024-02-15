import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProductsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead className="w-full">Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }).map((_, index) => (
          <TableRow
            className="h-[69px]"
            key={index}
          >
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
