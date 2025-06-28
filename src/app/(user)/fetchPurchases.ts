import { ProductCardProps } from "@/types/product";



export const fetchPurchases = async() => {

 try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=purchases`,
      {next: {revalidate:3600}}
    );
    if(!res.ok) throw new Error(`Ошибка получения покупок `)

    const purchases:ProductCardProps[] = await res.json();
    return purchases;

  } catch (err) {
    console.error("Ошибка в компоненте Actions", err);
    throw err;
  }

}