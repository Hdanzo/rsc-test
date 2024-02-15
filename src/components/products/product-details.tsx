import { getProduct } from "@/actions/product";

export async function ProductDetails({ productId }: { productId: number }) {
  const product = await getProduct(productId);

  return (
    <div className="mx-auto flex flex-col">
      <span>
        <strong>Id:</strong> {product.id}
      </span>
      <span>
        <strong>Name:</strong> {product.name}
      </span>
    </div>
  );
}
