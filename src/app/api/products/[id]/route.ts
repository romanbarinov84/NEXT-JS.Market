import { NextRequest, NextResponse } from "next/server";
import { getDB } from "../../../../../utils/APIRotes";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: "Неверный id" }, { status: 400 });
    }

    const db = await getDB();

    const product = await db.collection("products").findOne({
      id: parseInt(id),
    });

    if (!product) {
      return NextResponse.json({ message: "Продукт не найден" }, { status: 404 });
    }

    const reviewsCount = await db.collection("reviews").countDocuments({
      productId: parseInt(id),
    });

    const updatedProduct = {
      ...product,
      rating: product.rating ? { ...product.rating, count: reviewsCount } : undefined,
    };

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Ошибка при получении продукта:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
