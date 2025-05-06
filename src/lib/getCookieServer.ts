"use server";

import { cookies } from "next/headers";

export async function getCookieServer(
  name: string
): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}
