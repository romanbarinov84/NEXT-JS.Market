import { headers } from "next/headers";
import { getCustomSessionToken } from "./auth-helpers";
import { getValidCustomSession } from "./validatons/auth-helpers";


export async function getServerUserId() {
  try {
    const headersList = await headers();
    const cookies = headersList.get("cookie");
    const sessionToken = getCustomSessionToken(cookies);
    if (!sessionToken) return null;
    const session = await getValidCustomSession(sessionToken);
    return session?.userId || null;
  } catch {
    return null;
  }
}