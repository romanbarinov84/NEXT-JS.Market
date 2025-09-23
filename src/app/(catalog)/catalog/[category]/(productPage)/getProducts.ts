import { ProductCardProps } from "@/types/product";

export async function getProduct(id: string): Promise<ProductCardProps> {
  if (!id) throw new Error("Product ID is required");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("Ошибка ответа API:", text);
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const product: ProductCardProps = await response.json();
  return product;
}
