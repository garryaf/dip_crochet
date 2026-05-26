"use server";

import { signIn } from "@/lib/auth";
import { signInSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";

/**
 * Server Action: Sign In
 *
 * Validates credentials with Zod, then delegates to Auth.js.
 * Returns structured error messages for the form.
 */

export interface SignInState {
  error?: string;
  success?: boolean;
}

export async function signInAction(
  _prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate input
  const result = signInSchema.safeParse(rawData);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    const firstError =
      errors.email?.[0] || errors.password?.[0] || "Data tidak valid";
    return { error: firstError };
  }

  try {
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah" };
        default:
          return { error: "Terjadi kesalahan. Coba lagi." };
      }
    }
    throw error;
  }
}
