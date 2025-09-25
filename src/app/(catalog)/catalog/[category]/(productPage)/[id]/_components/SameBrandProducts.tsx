import ProductSection from "@/app/(products)/ProductsSection";
import { ProductCardProps } from "@/types/product";


interface SameBrandProductsProps {
  currentProduct: ProductCardProps;
}

const SameBrandProducts = async ({ currentProduct }: SameBrandProductsProps) => {
  if (!currentProduct.title) return null;

  let sameBrandProducts: ProductCardProps[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/brand?brand=${currentProduct.title}&productId=${currentProduct.id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (response.ok) {
      const data = await response.json();
      sameBrandProducts = data.sameBrandProducts || [];
    }
    
  } catch (error) {
    console.error('Ошибка при получении товаров этого же бренда:', error);
  }

  if (!sameBrandProducts || sameBrandProducts.length === 0) return null;

  return (
    <ProductSection
      title="Хіт продажів"
      products={sameBrandProducts}
    />
  );
};

export default SameBrandProducts;