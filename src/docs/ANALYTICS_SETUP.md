# Analytics & Digital Marketing Setup Guide

## Overview

Cotcret uses a layered analytics architecture:

```
┌─────────────────────────────────────────────┐
│  Google Tag Manager (GTM)                    │
│  ┌─────────┐ ┌──────────┐ ┌─────────────┐  │
│  │  GA4    │ │Meta Pixel│ │TikTok Pixel │  │
│  └─────────┘ └──────────┘ └─────────────┘  │
└─────────────────────────────────────────────┘
         ▲
         │ dataLayer.push()
         │
┌─────────────────────────────────────────────┐
│  Analytics Service Layer                     │
│  src/services/analytics/index.ts             │
└─────────────────────────────────────────────┘
         ▲
         │
┌─────────────────────────────────────────────┐
│  React Components                            │
│  useAnalytics() hook                         │
│  <WhatsAppButton /> component                │
│  <TrackableLink /> component                 │
└─────────────────────────────────────────────┘
```

## Environment Variables

Set these in your `.env.local` (development) or Vercel Environment Variables (production):

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
NEXT_PUBLIC_TIKTOK_PIXEL_ID=CXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=abcdefghij
```

## GTM Container Setup

### Required Tags

1. **GA4 Configuration Tag**
   - Type: Google Analytics: GA4 Configuration
   - Measurement ID: `{{GA4 Measurement ID}}`
   - Trigger: All Pages

2. **GA4 E-commerce Events**
   - Type: Google Analytics: GA4 Event
   - Event Name: `{{Event}}`
   - Trigger: Custom Event matches `view_item|add_to_cart|begin_checkout|purchase`

3. **Meta Pixel Base Code** (if not using direct integration)
   - Type: Custom HTML
   - Trigger: All Pages

4. **TikTok Pixel Base Code** (if not using direct integration)
   - Type: Custom HTML
   - Trigger: All Pages

### Required DataLayer Variables

| Variable Name | Type | Description |
|---------------|------|-------------|
| `ecommerce.items` | Data Layer Variable | E-commerce items array |
| `ecommerce.value` | Data Layer Variable | Transaction value |
| `ecommerce.currency` | Data Layer Variable | Currency (IDR) |
| `event_category` | Data Layer Variable | Event category |
| `event_label` | Data Layer Variable | Event label |

### Required Triggers

| Trigger Name | Type | Condition |
|--------------|------|-----------|
| `view_item` | Custom Event | Event equals `view_item` |
| `add_to_cart` | Custom Event | Event equals `add_to_cart` |
| `begin_checkout` | Custom Event | Event equals `begin_checkout` |
| `whatsapp_click` | Custom Event | Event equals `whatsapp_click` |
| `customizer_interaction` | Custom Event | Event equals `customizer_interaction` |
| `cta_click` | Custom Event | Event equals `cta_click` |
| `social_click` | Custom Event | Event equals `social_click` |
| `newsletter_signup` | Custom Event | Event equals `newsletter_signup` |
| `web_vitals` | Custom Event | Event equals `web_vitals` |

## Events Tracked

### E-commerce Events (GA4 Enhanced E-commerce)

| Event | When | Data |
|-------|------|------|
| `view_item_list` | Products page loaded | All products |
| `view_item` | Product detail page loaded | Single product |
| `select_item` | Product card clicked | Product + list context |
| `add_to_cart` | "Adopt" button clicked | Product + variant |
| `begin_checkout` | WhatsApp order initiated | Cart items + total |
| `generate_lead` | WhatsApp message sent | Value + source |

### Custom Events

| Event | When | Data |
|-------|------|------|
| `whatsapp_click` | Any WhatsApp CTA clicked | Product name, value |
| `customizer_interaction` | Color/eye/accessory changed | Action, detail |
| `customizer_complete` | Custom order submitted | Full config, value |
| `cta_click` | Any CTA button clicked | CTA name, destination |
| `social_click` | Social media link clicked | Platform name |
| `newsletter_signup` | Email submitted | Source section |

### Performance Events

| Event | When | Data |
|-------|------|------|
| `web_vitals` | Core Web Vitals measured | LCP, CLS, INP, FCP, TTFB |
| `js_error` | JavaScript error occurs | Message, source, line |

## UTM Tracking

UTM parameters are automatically captured on first page load and stored in `sessionStorage`.

Supported parameters:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

UTM data is:
1. Pushed to dataLayer as `utm_captured` event
2. Appended to WhatsApp messages for offline attribution
3. Available via `getUTMParams()` utility

### Example Campaign URLs

```
https://dipcrochet-nine.vercel.app/products?utm_source=instagram&utm_medium=story&utm_campaign=graduation_2024
https://dipcrochet-nine.vercel.app/customizer?utm_source=tiktok&utm_medium=bio&utm_campaign=custom_doll
```

## Conversion Tracking Setup

### Meta Pixel Conversions

| Standard Event | Mapped From | When |
|----------------|-------------|------|
| `ViewContent` | `view_item` | Product page viewed |
| `AddToCart` | `add_to_cart` | Added to cart |
| `InitiateCheckout` | `begin_checkout` | WhatsApp order started |
| `Lead` | `whatsapp_click` | WhatsApp message sent |
| `CustomizeProduct` | `customizer_complete` | Custom order submitted |

### TikTok Pixel Conversions

| Event | Mapped From | When |
|-------|-------------|------|
| `ViewContent` | `view_item` | Product page viewed |
| `AddToCart` | `add_to_cart` | Added to cart |
| `InitiateCheckout` | `begin_checkout` | WhatsApp order started |
| `Contact` | `whatsapp_click` | WhatsApp message sent |
| `CompletePayment` | `purchase` | Order confirmed |
| `SubmitForm` | `customizer_complete` | Custom order submitted |

## Usage in Components

### Using the hook

```tsx
"use client";
import { useAnalytics } from "@/shared/hooks/useAnalytics";

function ProductCard({ product }) {
  const { trackViewItem, trackWhatsAppClick } = useAnalytics();

  useEffect(() => {
    trackViewItem({
      item_id: product.id,
      item_name: product.name,
      price: product.price,
    });
  }, []);

  return (
    <button onClick={() => trackWhatsAppClick(product.name, product.price)}>
      Order
    </button>
  );
}
```

### Using WhatsAppButton component

```tsx
import WhatsAppButton from "@/shared/components/analytics/WhatsAppButton";

<WhatsAppButton
  message="Hi! I want to order Momo Bunny"
  productName="Momo Bunny"
  productId="momo-bunny"
  value={95000}
  source="product_detail"
  className="btn-primary"
>
  <Heart /> Bawa Pulang Sekarang
</WhatsAppButton>
```

### Using TrackableLink component

```tsx
import TrackableLink from "@/shared/components/analytics/TrackableLink";

<TrackableLink
  href="/products"
  trackAs="cta"
  trackLabel="Hero Primary CTA"
  className="btn-primary"
>
  Adopt a Companion
</TrackableLink>
```

## Testing

1. Install [GTM/GA4 Debug Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Enable GTM Preview Mode
3. Open browser DevTools → Console
4. Type `dataLayer` to inspect all pushed events
5. Verify events appear in GA4 DebugView (Realtime → DebugView)
6. Verify Meta Pixel events in [Facebook Events Manager](https://business.facebook.com/events_manager)
7. Verify TikTok events in [TikTok Events Manager](https://ads.tiktok.com/marketing_api/docs)
