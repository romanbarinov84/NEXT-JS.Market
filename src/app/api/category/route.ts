<<<<<<< HEAD
import { NextResponse } from "next/server";
import { getDB } from "../../../../utils/APIRotes";
import { CONFIG } from "../../../../config/config";

=======
import { CONFIG } from "../../../../config/config";
import { getDB } from "../../../../utils/APIRotes";
import { NextResponse } from "next/server";

export const revalidate = 3600;
export const dynamic = "force-dynamic";
>>>>>>> 9a657c6b57106cfc76f747e0bde5a1abfebdae63

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const url = new URL(request.url);
<<<<<<< HEAD

=======
>>>>>>> 9a657c6b57106cfc76f747e0bde5a1abfebdae63
    const category = url.searchParams.get("category");
    const startIdx = parseInt(url.searchParams.get("startIdx") || "0");
    const perPage = parseInt(
      url.searchParams.get("perPage") ||
<<<<<<< HEAD
        CONFIG.ITEMS_PER_PAGE.toString()
=======
        CONFIG.ITEMS_PER_PAGE_CATEGORY.toString()
>>>>>>> 9a657c6b57106cfc76f747e0bde5a1abfebdae63
    );

    if (!category) {
      return NextResponse.json(
        { message: "Параметр категории обязателен" },
        { status: 400 }
      );
    }

    const query = {
      categories: category,
    };

    const totalCount = await db.collection("products").countDocuments(query);

    const products = await db
      .collection("products")
      .find(query)
      .sort({ _id: 1 })
      .skip(startIdx)
      .limit(perPage)
      .toArray();

    return NextResponse.json({ products, totalCount });
  } catch (error) {
<<<<<<< HEAD
    console.error("Ошибка сервера:", error);
=======
    console.error("Ошибка сервера", error);
>>>>>>> 9a657c6b57106cfc76f747e0bde5a1abfebdae63
    return NextResponse.json(
      { message: "Ошибка при загрузке продуктов" },
      { status: 500 }
    );
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 9a657c6b57106cfc76f747e0bde5a1abfebdae63
