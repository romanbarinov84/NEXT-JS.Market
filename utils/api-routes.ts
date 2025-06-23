import { MongoClient } from "mongodb";

const clientPromise = new MongoClient(process.env.MongoURL!);

export const getDBAndRequestBody = async (
  clientPromise: Promise<MongoClient>,
  request: Request | null
) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DELIVERY_SHOP_DB_NAME);

    if (request) {
      const requestBody = await request.json();
      return { db, requestBody };
    }
    return { db };
  } catch (error) {
    console.error("Error connect from data base", error);
    throw error;
  }
};

export async function getArticles() {
  // const {db} = await getDBAndRequestBody(clientPromise,null);
  const db = clientPromise.db("deliveryshop");
  return await db.collection("articles").find({}).toArray();
}

export async function getProductsByCategory(category: string) {
  // const {db} = await getDBAndRequestBody(clientPromise,null);
  const db = clientPromise.db("deliveryshop");
  return await db
    .collection("products")
    .find({ categories: category })
    .toArray();
}

export async function getPurchases() {
  //const {db} = await getDBAndRequestBody(clientPromise,null);
  const db = clientPromise.db("deliveryshop");
  const user = await db.collection("users").findOne({});

  if (!user?.purchases?.length) return [];

  const productIds = user.purchases.map((p: { id: number }) => p.id);
  const products = await db
    .collection("products")
    .find({ id: { $in: productIds } })
    .toArray();
  return products.map((product) => {
    const { discountPercent, ...rest } = product;
    void discountPercent;
    return {
      ...rest,
    };
  });
}
