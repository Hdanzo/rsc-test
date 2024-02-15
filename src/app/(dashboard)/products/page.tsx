import { Suspense } from "react";

import Link from "next/link";

import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";

import { auth } from "~/auth";

import { getProductsPages } from "@/actions/product";
import { ProductsTable } from "@/components/products/products-table";
import { ProductsTableSkeleton } from "@/components/products/skeletons/products-table";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { hasPermissions } from "@/lib/auth";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; sort?: "asc" | "desc" };
}) {
  const session = await auth();

  const currentPage = Number(searchParams?.page) || 1;
  const currentSort = searchParams?.sort || "asc";
  const totalPages = await getProductsPages();

  return (
    <main>
      <Link href="/">
        <ArrowLeftIcon className="inline" /> Go back
      </Link>
      <div className="flex flex-col gap-4">
        <div className="h-10 flex">
          {session && hasPermissions(session.user.permissions, ["create"]) ? (
            <Button
              asChild
              className="ml-auto"
            >
              <Link href="/products/add">
                <PlusIcon
                  className="inline"
                  fontSize={16}
                />
                Add product
              </Link>
            </Button>
          ) : null}
        </div>

        <Suspense
          fallback={<ProductsTableSkeleton />}
          key={currentPage}
        >
          <ProductsTable
            currentPage={currentPage}
            sort={currentSort}
          />
        </Suspense>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
