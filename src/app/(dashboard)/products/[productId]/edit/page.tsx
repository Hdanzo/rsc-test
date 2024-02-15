import Link from "next/link";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { getProduct } from "@/actions/product";

import EditProductForm from "./edit-product-form";

export default async function EditProduct({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(Number(params.productId));

  return (
    <div className="flex flex-col">
      <Link href={`/products/${params.productId}`}>
        <ArrowLeftIcon className="inline" /> Go back
      </Link>
      <div className="w-2/4 self-center">
        <h2 className="text-2xl pb-4">Update product</h2>
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
