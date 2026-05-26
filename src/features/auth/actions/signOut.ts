"use server";

import { signOut } from "@/lib/auth";

/**
 * Server Action: Sign Out
 */
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
