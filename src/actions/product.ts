"use server";

import type { Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import { formatError } from "@/lib/errorFormatter";
import { prisma } from "@/prisma";

const ITEMS_PER_PAGE = 6;

export async function getProducts({
  currentPage,
  sort,
}: {
  currentPage: number;
  sort: "asc" | "desc";
}) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await prisma.product.findMany({
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: { name: sort },
    });

    return products;
  } catch (error) {
    console.error(error);
    throw "Failed to fetch products";
  }
}

export async function getProductsPages() {
  try {
    const productsCount = await prisma.product.count();

    return Math.ceil(Number(productsCount) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error(error);
    throw "Failed to fetch products";
  }
}

export async function getProduct(productId: number) {
  await new Promise((resolve) => setTimeout(resolve, 30000));

  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    return product;
  } catch (error) {
    console.error(error);
    throw "Failed to get product";
  }
}

type ProductCreateBody = Prisma.Args<typeof prisma.product, "create">["data"];

export async function addProduct(
  _prevState: State,
  productData: ProductCreateBody
): Promise<State> {
  const validatedFields = productSchema.safeParse(productData);

  if (!validatedFields.success) {
    return {
      errors: formatError(validatedFields.error),
    };
  }

  try {
    const { name } = productData;
    await prisma.product.create({ data: { name } });

    revalidatePath("/products");
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add product. Please try again",
    };
  }

  redirect("/products");
}

const productSchema = z.object({
  name: z.string().min(2).max(100).trim(),
});

export async function updateProduct(
  productId: number,
  _prevState: State,
  payload: Omit<Product, "id">
): Promise<State> {
  const validatedFields = productSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      errors: formatError(validatedFields.error),
    };
  }

  let updatedProduct;

  try {
    const { name } = payload;

    updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name },
    });

    revalidatePath("/products");

    revalidatePath(`/products/${updatedProduct.id}`);
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to update product. Please try again",
    };
  }

  redirect(`/products/${updatedProduct.id}`);
}

export async function deleteProduct(productId: number) {
  try {
    await prisma.product.delete({ where: { id: productId } });

    revalidatePath("/products");
    return "Success";
  } catch (error) {
    console.error(error);
    throw "Failed to delete product";
  }
}
