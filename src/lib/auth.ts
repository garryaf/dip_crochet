import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

/**
 * Auth.js (NextAuth v5) Configuration
 *
 * Supports:
 * - Credentials (email/password) authentication
 * - Role-based access control (CUSTOMER, ADMIN, ARTISAN)
 * - JWT sessions (stateless, no DB session table needed)
 *
 * In production, add OAuth providers (Google, etc.) as needed.
 */

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // TODO: Replace with real DB lookup when PostgreSQL is connected
        // For now, use a demo admin account
        if (
          email === "admin@dipcrochet.com" &&
          password === "admin123456"
        ) {
          return {
            id: "admin-001",
            email: "admin@dipcrochet.com",
            name: "dip.crochet Admin",
            role: "ADMIN",
          };
        }

        if (
          email === "artisan@dipcrochet.com" &&
          password === "artisan123456"
        ) {
          return {
            id: "artisan-001",
            email: "artisan@dipcrochet.com",
            name: "dip.crochet Artisan",
            role: "ARTISAN",
          };
        }

        // In production: lookup user in DB, verify bcrypt hash
        // const user = await db.customer.findUnique({ where: { email } });
        // if (!user || !user.passwordHash) return null;
        // const valid = await bcrypt.compare(password, user.passwordHash);
        // if (!valid) return null;
        // return { id: user.id, email: user.email, name: user.name, role: user.role };

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Attach role to JWT token on sign-in
      if (user) {
        token.role = (user as { role?: string }).role || "CUSTOMER";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose role and id in the session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      // Protected routes
      const protectedPaths = ["/dashboard"];
      const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        return false; // Redirect to sign-in
      }

      // Admin-only routes
      const adminPaths = ["/dashboard/products", "/dashboard/orders", "/dashboard/analytics"];
      const isAdminRoute = adminPaths.some((path) =>
        pathname.startsWith(path)
      );

      if (isAdminRoute && auth?.user?.role !== "ADMIN" && auth?.user?.role !== "ARTISAN") {
        return false;
      }

      return true;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  trustHost: true,
});
