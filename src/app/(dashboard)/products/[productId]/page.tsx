import { Suspense } from "react";

import Link from "next/link";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { ProductDetails } from "@/components/products/product-details";
import { ProductDetailsSkeleton } from "@/components/products/skeletons/product-details";
import { Button } from "@/components/ui/button";

export default function Product({ params }: { params: { productId: string } }) {
  const { productId } = params;

  return (
    <div className="flex flex-col">
      <Link href="/products">
        <ArrowLeftIcon className="inline" /> Go back
      </Link>

      <Button
        asChild
        className="self-end"
      >
        <Link href={`/products/${productId}/edit`}>Edit product</Link>
      </Button>

      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={Number(productId)} />
      </Suspense>
    </div>
  );
}
