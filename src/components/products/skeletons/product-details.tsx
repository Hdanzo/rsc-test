import { Skeleton } from "@/components/ui/skeleton";

export async function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto flex flex-col">
      <div className="flex gap-1">
        <p>
          <strong>Id:</strong>
        </p>
        <Skeleton className="h-5 inline-block w-10" />
      </div>
      <div className="flex gap-1">
        <p>
          <strong>Name:</strong>
        </p>
        <Skeleton className="h-5 inline-block w-40" />
      </div>
    </div>
  );
}
