import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/schemas/customer";
import { newsletterLimiter, getClientIP } from "@/lib/rateLimit";

/**
 * POST /api/newsletter — Subscribe to newsletter
 *
 * Features:
 * - Zod validation
 * - Rate limiting (3 per hour per IP)
 * - Sanitized input
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request.headers);
    const { success, remaining } = newsletterLimiter.check(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi nanti." },
        {
          status: 429,
          headers: { "X-RateLimit-Remaining": "0" },
        }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Data tidak valid", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, name, source } = result.data;

    // TODO: Save to database when connected
    // await db.newsletterSubscriber.upsert({
    //   where: { email },
    //   update: { name, source },
    //   create: { email, name, source },
    // });

    console.log(`📧 Newsletter signup: ${email} (${name || "anonymous"}) from ${source || "unknown"}`);

    return NextResponse.json(
      { success: true, message: "Berhasil berlangganan!" },
      {
        status: 200,
        headers: { "X-RateLimit-Remaining": remaining.toString() },
      }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
