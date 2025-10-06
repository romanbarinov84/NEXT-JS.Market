"use client";



import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "../../../../../../../../store/cartStore";
import { addToCartAction } from "@/actions/addToCartActions";
import CartActionMessage from "@/components/CartActionMessage";

const CartButton = ({ productId }: { productId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const { fetchCart } = useCartStore();

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await addToCartAction(productId);
      setMessage(result);
      if (result.success) {
        await fetchCart();
      }
    } catch {
      setMessage({
        success: false,
        message: "Ошибка при добавлении в корзину",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative">
      <form action={handleSubmit}>
        <button
          disabled={isLoading}
          className="mb-2 h-10 md:h-15 w-full bg-[#ff6633] text-white text-base md:text-2xl p-4 flex justify-center items-center rounded hover:shadow-article active:shadow-button-active duration-300 cursor-pointer relative"
        >
          <Image
            src="/trashBox.png"
            alt="Корзина"
            width={32}
            height={32}
            className="absolute left-4"
          />

          <p className="text-center">В корзину</p>
        </button>
      </form>
      {message && (
        <CartActionMessage message={message} onClose={() => setMessage(null)} />
      )}
    </div>
  );
};

export default CartButton;