"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn, generatePagination } from "@/lib/utils";

const RootPagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    role="navigation"
    {...props}
  />
);
RootPagination.displayName = "RootPagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    className={cn("flex flex-row items-center gap-1", className)}
    ref={ref}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    className={cn("", className)}
    ref={ref}
    {...props}
  />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps<IsDisabled extends boolean> = {
  isActive?: boolean;
  isDisabled?: IsDisabled;
} & Pick<ButtonProps, "size"> &
  (IsDisabled extends false
    ? React.ComponentProps<typeof Link>
    : React.ComponentProps<"div">);

const PaginationLink = <IsDisabled extends boolean>({
  className: propsClassName,
  isActive,
  isDisabled,
  size = "icon",
  ...props
}: PaginationLinkProps<IsDisabled>) => {
  const className = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
    propsClassName,
    {
      "hover:bg-transparent cursor-default": isActive,
      "pointer-events-none opacity-50": isDisabled,
    }
  );

  return isDisabled || isActive ? (
    <div
      aria-current={isActive ? "page" : undefined}
      className={className}
      {...(props as React.ComponentProps<"div">)}
    />
  ) : (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...(props as React.ComponentProps<typeof Link>)}
    />
  );
};

PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    size="default"
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    size="default"
    {...props}
  >
    <span>Next</span>
    <ChevronRightIcon className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <RootPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          if (page != "...") {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </RootPagination>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
