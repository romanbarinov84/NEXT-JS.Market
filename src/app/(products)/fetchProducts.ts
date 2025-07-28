import { ProductCardProps } from "@/types/product";


const fetchProductsByCategory = async (category: string) => {
  try {
    //фетч запрос к роуту 
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${category}`,
      { next: { revalidate: 3600 } }
    );
    if(!res.ok){
        throw new Error(`Ошибка получения продуктов ${category}`)
    }

   const products: ProductCardProps[] = await res.json();
   return (products)

  } catch (err) {
  console.error('Ошибка в компоненте: ${category}', err);
  return []; 
}
};

export default fetchProductsByCategory;
