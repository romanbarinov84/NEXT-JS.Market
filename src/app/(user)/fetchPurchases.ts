import { ProductCardProps } from "@/types/product";


const fetchPurchases = async () => {
  try {
    //фетч запрос к роуту 
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/purchases`,
      { next: { revalidate: 3600 } }
    );
    if(!res.ok){
        throw new Error(`Ошибка получения покупок`)
    }

   const purchases: ProductCardProps[] = await res.json();
   return purchases

  } catch (err) {
  console.error("Ошибка в компоненте AllActions", err);
  return []; 
}
};

export default fetchPurchases;
