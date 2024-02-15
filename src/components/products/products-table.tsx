import Link from "next/link";

import { ArrowRightIcon } from "@radix-ui/react-icons";

import { deleteProduct, getProducts } from "@/actions/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { SortingTableHead } from "../ui/table/sorting-table-head";

export const dynamic = "force-dynamic";

export async function ProductsTable({
  currentPage,
  sort,
}: {
  currentPage: number;
  sort: "asc" | "desc";
}) {
  const products = await getProducts({ currentPage, sort });

  if (!products.length) {
    return (
      <div className="pt-10 text-center">
        No products found . Add one{" "}
        <ArrowRightIcon className="inline -rotate-45" />
      </div>
    );
  }

  return (
    <div className="min-h-[461.5px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <SortingTableHead
              className="w-full"
              name="name"
            >
              Name
            </SortingTableHead>
            <TableHead className="w-1/5">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              className="cursor-pointer"
              key={product.id}
            >
              <TableCell>{product.id}</TableCell>
              <TableCell className="p-0">
                <Link
                  className="block w-full p-4"
                  href={`/products/${product.id}`}
                >
                  {product.name}
                </Link>
              </TableCell>
              <TableCell className="grid lg:grid-flow-col gap-2 lg:auto-cols-fr">
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                >
                  <Link href={`/products/${product.id}/edit`}>Edit</Link>
                </Button>
                <form
                  action={async () => {
                    "use server";
                    deleteProduct(product.id);
                  }}
                >
                  <Button
                    className="w-full"
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
