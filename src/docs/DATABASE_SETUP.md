# Database & CMS Setup Guide

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Next.js App (Server Components)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Product Svc  │  │  Order Svc   │  │   CMS Svc    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                  │                  │          │
│  ┌──────▼──────────────────▼──────┐  ┌───────▼───────┐  │
│  │     Prisma ORM (db.ts)         │  │  Sanity SDK   │  │
│  └──────────────┬─────────────────┘  └───────┬───────┘  │
└─────────────────┼────────────────────────────┼──────────┘
                  │                            │
         ┌───────▼───────┐            ┌───────▼───────┐
         │  PostgreSQL   │            │  Sanity CDN   │
         │  (Neon/Supabase)│          │  (Headless)   │
         └───────────────┘            └───────────────┘
```

## PostgreSQL Setup

### Option 1: Local Development (Docker)

```bash
docker run --name cotcret-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=cotcret \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### Option 2: Cloud (Recommended for Production)

| Provider | Free Tier | Recommendation |
|----------|-----------|----------------|
| [Neon](https://neon.tech) | 512MB, branching | ✅ Best for serverless |
| [Supabase](https://supabase.com) | 500MB, auth included | Good alternative |
| [Railway](https://railway.app) | $5 credit/month | Simple setup |

### Connection String

```bash
# .env
DATABASE_URL="postgresql://user:password@host:5432/cotcret?schema=public"
```

## Prisma Commands

```bash
# Generate client after schema changes
npm run db:generate

# Push schema to database (development)
npm run db:push

# Create migration (production)
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Open Prisma Studio (visual DB editor)
npm run db:studio

# Reset database (WARNING: deletes all data)
npm run db:reset
```

## Schema Overview

### Core Tables

| Table | Purpose | Records |
|-------|---------|---------|
| `Product` | All crochet products | ~10-50 |
| `ColorOption` | Available yarn colors | ~6-12 |
| `EyeStyle` | Eye style options | ~3-5 |
| `Accessory` | Add-on accessories | ~4-8 |
| `Customer` | Registered users | Growing |
| `Order` | Purchase orders | Growing |
| `OrderItem` | Line items per order | Growing |
| `Cart` | Shopping carts | Session-based |
| `CartItem` | Items in cart | Session-based |
| `Review` | Customer reviews | Growing |

### CMS Tables

| Table | Purpose | Editable By |
|-------|---------|-------------|
| `ContentBlock` | Individual text blocks | Marketing |
| `FAQ` | FAQ questions & answers | Marketing |
| `Testimonial` | Customer testimonials | Marketing |
| `Banner` | Promotional banners | Marketing |

### Analytics Tables

| Table | Purpose |
|-------|---------|
| `NewsletterSubscriber` | Email list |
| `AnalyticsEvent` | Server-side event log |

## Service Layer Pattern

All database access goes through service layers:

```typescript
// ❌ WRONG — Direct Prisma in components
import { db } from "@/lib/db";
const products = await db.product.findMany();

// ✅ CORRECT — Through service layer
import { getProducts } from "@/services/product";
const products = await getProducts();
```

This pattern allows:
- Easy mocking for tests
- Caching at the service level
- Business logic separation
- Future CMS migration without UI changes

## Zustand Cart Store

The cart uses Zustand with localStorage persistence:

```typescript
import { useCartStore } from "@/features/cart/store/cartStore";

// In a component
const { items, addItem, removeItem, getSubtotal } = useCartStore();

addItem({
  productId: "momo-bunny",
  productName: "Momo — Secret-Keeper Bunny",
  price: 95000,
  quantity: 1,
  config: { color: "#ff8fb1", eyeStyle: "cute", accessory: "none" },
});
```

## Zod Validation

All inputs are validated with Zod schemas:

```typescript
import { createOrderSchema } from "@/schemas/order";

// In a Server Action or Route Handler
const result = createOrderSchema.safeParse(formData);
if (!result.success) {
  return { error: result.error.flatten() };
}
// result.data is fully typed and validated
```

## Migration Path

### Phase 1 (Current): Static Data
- Products from `constants.ts`
- Content from CMS service (static returns)
- Cart in localStorage (Zustand)

### Phase 2: Database Connected
- Products from PostgreSQL via Prisma
- Orders persisted to database
- Customer accounts stored

### Phase 3: Sanity CMS Connected
- Homepage content from Sanity
- FAQs from Sanity
- Testimonials from Sanity
- Blog posts from Sanity
- Marketing team has full control

### Phase 4: Full E-commerce
- Real-time inventory
- Payment gateway integration
- Order status webhooks
- Email notifications
