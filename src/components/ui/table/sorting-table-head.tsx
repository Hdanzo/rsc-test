"use client";

import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import { TableHead } from ".";

export const SortingTableHead = React.forwardRef<
  HTMLTableCellElement,
  Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "name"> & {
    name: string;
  }
>(({ name }, ref) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentOrder = params?.get("sort");

  function handleSort() {
    params.set("sort", currentOrder === "asc" ? "desc" : "asc");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <TableHead
      className="cursor-pointer"
      onClick={handleSort}
      ref={ref}
    >
      {name}{" "}
      {currentOrder === "asc" ? (
        <ArrowUpIcon className="inline-block" />
      ) : (
        <ArrowDownIcon className="inline-block" />
      )}
    </TableHead>
  );
});

SortingTableHead.displayName = "SortingTableHeader";
