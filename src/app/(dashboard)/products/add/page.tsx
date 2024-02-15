import Link from "next/link";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

import AddProductForm from "./add-product-form";

export default function AddProduct() {
  return (
    <div className="flex flex-col">
      <Link href="/products">
        <ArrowLeftIcon className="inline" /> Go back
      </Link>
      <div className="w-2/4 self-center">
        <h2 className="text-2xl pb-4">Add product</h2>
        <AddProductForm />
      </div>
    </div>
  );
}
