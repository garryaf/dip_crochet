# 🚀 Cotcret — Panduan Deployment Lengkap

## Daftar Isi
1. [Prasyarat](#prasyarat)
2. [Setup Database (Neon)](#1-setup-database-neon)
3. [Setup Google Analytics & GTM](#2-setup-google-analytics--gtm)
4. [Setup Meta Pixel](#3-setup-meta-pixel)
5. [Setup TikTok Pixel](#4-setup-tiktok-pixel)
6. [Setup Microsoft Clarity](#5-setup-microsoft-clarity)
7. [Setup Sentry](#6-setup-sentry)
8. [Generate Auth Secret](#7-generate-auth-secret)
9. [Konfigurasi Vercel](#8-konfigurasi-vercel)
10. [Deploy](#9-deploy)
11. [Setup Database Schema](#10-setup-database-schema)
12. [Verifikasi](#11-verifikasi)
13. [Google Search Console](#12-google-search-console)
14. [Troubleshooting](#troubleshooting)

---

## Prasyarat

- Akun [GitHub](https://github.com) (untuk repo)
- Akun [Vercel](https://vercel.com) (untuk hosting — gratis)
- Node.js 20+ terinstall di lokal
- Git terinstall

---

## 1. Setup Database (Neon)

### Langkah:

1. Buka **https://neon.tech** → klik "Sign Up" (gratis, bisa pakai GitHub)
2. Klik **"New Project"**
3. Isi:
   - **Project name**: `cotcret`
   - **Region**: `Asia Pacific (Singapore)` — terdekat ke Indonesia
   - **Database name**: `cotcret`
4. Klik **"Create Project"**
5. Setelah project dibuat, copy **Connection String** yang muncul:

```
postgresql://neondb_owner:AbCdEf123@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/cotcret?sslmode=require
```

> ⚠️ **SIMPAN BAIK-BAIK** — ini adalah `DATABASE_URL` kamu.

### Kenapa Neon?
- Free tier: 512MB storage (cukup untuk 10.000+ produk)
- Serverless: auto-scale, tidak perlu manage server
- Region Singapore: latency rendah ke Indonesia (~20ms)
- Auto-backup: point-in-time recovery
- Branching: bisa buat branch DB untuk testing

---

## 2. Setup Google Analytics & GTM

### A. Google Analytics 4 (GA4)

1. Buka **https://analytics.google.com**
2. Klik **"Start measuring"** → buat Account
3. Buat Property:
   - **Property name**: `dip.crochet`
   - **Timezone**: `(GMT+07:00) Jakarta`
   - **Currency**: `Indonesian Rupiah (IDR)`
4. Pilih **"Web"** sebagai platform
5. Isi:
   - **Website URL**: `https://dipcrochet-nine.vercel.app`
   - **Stream name**: `dip.crochet Web`
6. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

> Ini adalah `NEXT_PUBLIC_GA4_ID`

### B. Google Tag Manager (GTM)

1. Buka **https://tagmanager.google.com**
2. Klik **"Create Account"**
3. Isi:
   - **Account name**: `dip.crochet`
   - **Country**: `Indonesia`
4. Buat Container:
   - **Container name**: `dipcrochet-nine.vercel.app`
   - **Target platform**: `Web`
5. Copy **Container ID** (format: `GTM-XXXXXXX`)

> Ini adalah `NEXT_PUBLIC_GTM_ID`

### C. Hubungkan GA4 ke GTM

1. Di GTM → **Tags** → **New**
2. Tag type: **Google Analytics: GA4 Configuration**
3. Measurement ID: paste `G-XXXXXXXXXX`
4. Trigger: **All Pages**
5. **Save** → **Submit** → **Publish**

---

## 3. Setup Meta Pixel

1. Buka **https://business.facebook.com/events_manager**
2. Klik **"Connect Data Sources"** → pilih **"Web"**
3. Pilih **"Meta Pixel"** → klik **"Connect"**
4. Beri nama: `dip.crochet Pixel`
5. Masukkan URL: `https://dipcrochet-nine.vercel.app`
6. Pilih **"Install code manually"** (kita sudah handle di kode)
7. Copy **Pixel ID** (angka 15-16 digit)

> Ini adalah `NEXT_PUBLIC_META_PIXEL_ID`

### Konfigurasi Events di Meta:
- Buka Events Manager → **Custom Conversions**
- Buat conversion untuk:
  - `Lead` (WhatsApp click)
  - `InitiateCheckout` (Checkout page)
  - `ViewContent` (Product page)

---

## 4. Setup TikTok Pixel

1. Buka **https://ads.tiktok.com** → Login/Register
2. Buka **Assets** → **Events** → **Web Events**
3. Klik **"Create Pixel"**
4. Isi:
   - **Pixel name**: `dip.crochet`
   - **Installation method**: pilih **"Manually Install Pixel Code"**
5. Copy **Pixel ID** (format: `CXXXXXXXXXXXXXXXXX`)

> Ini adalah `NEXT_PUBLIC_TIKTOK_PIXEL_ID`

---

## 5. Setup Microsoft Clarity

1. Buka **https://clarity.microsoft.com**
2. Klik **"Sign up"** (gratis, unlimited)
3. Buat project baru:
   - **Name**: `dip.crochet`
   - **Website URL**: `https://dipcrochet-nine.vercel.app`
4. Copy **Project ID** dari Settings (format: `abcdefghij`)

> Ini adalah `NEXT_PUBLIC_CLARITY_ID`

### Fitur Clarity (gratis):
- Heatmaps (lihat di mana user klik)
- Session recordings (lihat user browsing)
- Scroll depth analysis
- Dead click detection

---

## 6. Setup Sentry

1. Buka **https://sentry.io** → Sign up (free tier: 5.000 events/bulan)
2. Buat Organization: `dip-crochet`
3. Buat Project:
   - **Platform**: `Next.js`
   - **Project name**: `cotcret`
4. Copy **DSN** (format: `https://xxx@yyy.ingest.sentry.io/zzz`)

> Ini adalah `NEXT_PUBLIC_SENTRY_DSN`

### Konfigurasi Alerts:
- Buka **Alerts** → **Create Alert Rule**
- Set alert untuk:
  - Error rate > 10/hour
  - New issue detected
  - Performance regression (LCP > 4s)

---

## 7. Generate Auth Secret

Jalankan di terminal:

```bash
openssl rand -base64 32
```

Output contoh:
```
K7xP2mN9qR4sT6uV8wY0zA3bC5dE7fG9hI1jK3lM5n=
```

> Ini adalah `AUTH_SECRET` — JANGAN share ke siapapun.

---

## 8. Konfigurasi Vercel

### A. Import Project

1. Buka **https://vercel.com/dashboard**
2. Klik **"Add New..."** → **"Project"**
3. Import dari GitHub repository `cotcret`
4. Framework Preset: **Next.js** (auto-detected)
5. **JANGAN deploy dulu** — set environment variables dulu

### B. Set Environment Variables

Buka **Settings** → **Environment Variables** → tambahkan satu per satu:

| Key | Value | Environment |
|-----|-------|-------------|
| `DATABASE_URL` | `postgresql://...@neon.tech/cotcret?sslmode=require` | Production, Preview |
| `AUTH_SECRET` | `K7xP2mN9qR4sT6u...` (hasil openssl) | Production, Preview |
| `AUTH_URL` | `https://dipcrochet-nine.vercel.app` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://dipcrochet-nine.vercel.app` | Production, Preview, Development |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Production |
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXXXXX` | Production |
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789012345` | Production |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | `CXXXXXXXXXXXXXXXXX` | Production |
| `NEXT_PUBLIC_CLARITY_ID` | `abcdefghij` | Production |
| `NEXT_PUBLIC_SENTRY_DSN` | `https://xxx@yyy.ingest.sentry.io/zzz` | Production |

> 💡 **Tips**: Set analytics variables hanya di "Production" agar tidak tracking di preview deployments.

---

## 9. Deploy

### Opsi A: Auto-deploy via Git Push

```bash
cd /home/itsec-garry/script/cotcret
git add .
git commit -m "feat: enterprise-grade e-commerce platform (Sprint 1-6)"
git push origin main
```

Vercel akan auto-deploy setiap push ke `main`.

### Opsi B: Manual Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy ke production
vercel --prod
```

---

## 10. Setup Database Schema

Setelah deploy pertama berhasil, jalankan dari lokal:

```bash
# Set DATABASE_URL lokal ke Neon
export DATABASE_URL="postgresql://...@neon.tech/cotcret?sslmode=require"

# Push schema ke database
npx prisma db push

# Seed data awal (products, colors, FAQs, testimonials)
npx prisma db seed

# Verifikasi dengan Prisma Studio
npx prisma studio
```

### Apa yang di-seed:
- 3 produk (Momo Bunny, Kopi Bear, Pip Duck)
- 6 warna yarn
- 3 eye styles
- 4 accessories
- 4 FAQs
- 3 testimonials

---

## 11. Verifikasi

### Checklist Post-Deploy:

```
□ Buka https://dipcrochet-nine.vercel.app → homepage loads
□ Buka /robots.txt → isi benar
□ Buka /sitemap.xml → semua URL terdaftar
□ Buka /products → produk tampil
□ Buka /product/momo-bunny → detail + 3D viewer
□ Buka /customizer → builder works
□ Buka /checkout → form tampil
□ Buka /dashboard → redirect ke /signin (protected)
□ Buka /contact → halaman kontak
□ Test WhatsApp button → buka wa.me
□ Test mobile responsive → semua breakpoint OK
```

### Verifikasi Analytics:

1. Buka site di browser
2. Buka **GTM Preview Mode** (tagmanager.google.com → Preview)
3. Navigasi beberapa halaman
4. Cek di GTM: events `page_view`, `gtm.js` firing
5. Buka **GA4 Realtime** → pastikan ada active users
6. Buka **Meta Events Manager** → Test Events → pastikan `PageView` muncul
7. Buka **Clarity Dashboard** → pastikan recording dimulai

### Verifikasi SEO:

```bash
# Test robots.txt
curl https://dipcrochet-nine.vercel.app/robots.txt

# Test sitemap
curl https://dipcrochet-nine.vercel.app/sitemap.xml

# Test security headers
curl -I https://dipcrochet-nine.vercel.app | grep -i "x-frame\|content-security\|strict-transport"
```

---

## 12. Google Search Console

1. Buka **https://search.google.com/search-console**
2. Klik **"Add Property"**
3. Pilih **"URL prefix"**
4. Masukkan: `https://dipcrochet-nine.vercel.app`
5. Verifikasi ownership:
   - Pilih **"HTML tag"** method
   - Copy meta tag verification code
   - Tambahkan ke Vercel env: `GOOGLE_SITE_VERIFICATION=xxxxx`
   - Atau tambahkan di `layout.tsx` metadata:
     ```typescript
     verification: { google: "your-code-here" }
     ```
6. Setelah verified:
   - Buka **Sitemaps** → submit `https://dipcrochet-nine.vercel.app/sitemap.xml`
   - Buka **URL Inspection** → test homepage
   - Tunggu 2-7 hari untuk indexing

---

## Troubleshooting

### Build gagal di Vercel

```
Error: Cannot find module '@prisma/client'
```
**Solusi**: Pastikan `postinstall: "prisma generate"` ada di package.json (sudah ada).

---

```
Error: next/font failed to fetch
```
**Solusi**: Ini terjadi jika Vercel build server tidak bisa reach Google Fonts. Kita sudah menggunakan `<link>` fallback, jadi ini aman.

---

```
Error: AUTH_SECRET is missing
```
**Solusi**: Set `AUTH_SECRET` di Vercel Environment Variables.

---

### Database connection error

```
Error: Can't reach database server at `ep-xxx.neon.tech`
```
**Solusi**:
1. Pastikan `DATABASE_URL` benar di Vercel env vars
2. Pastikan Neon project tidak di-pause (free tier auto-pause setelah 5 menit idle)
3. Tambahkan `?sslmode=require` di akhir connection string

---

### Analytics tidak tracking

1. Pastikan env vars `NEXT_PUBLIC_*` di-set di scope "Production"
2. Clear browser cache
3. Disable ad blocker saat testing
4. Gunakan GTM Preview Mode untuk debug

---

## Arsitektur Production

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET                               │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              VERCEL EDGE NETWORK                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Proxy   │  │  Static  │  │  Serverless Functions │  │
│  │  (CSP)   │  │  Pages   │  │  (API, Dashboard)    │  │
│  └──────────┘  └──────────┘  └───────────┬──────────┘  │
└───────────────────────────────────────────┼─────────────┘
                                            │
                    ┌───────────────────────┼──────────┐
                    │                       │          │
         ┌──────────▼──────┐    ┌──────────▼──────┐   │
         │   Neon (PG)     │    │   Sanity CDN    │   │
         │   Singapore     │    │   (Future CMS)  │   │
         └─────────────────┘    └─────────────────┘   │
                                                       │
         ┌─────────────────┐    ┌─────────────────┐   │
         │   Sentry        │    │   GTM/GA4       │   │
         │   Error Track   │    │   Analytics     │   │
         └─────────────────┘    └─────────────────┘   │
```

---

## Biaya Bulanan (Estimasi)

| Service | Plan | Biaya |
|---------|------|-------|
| Vercel | Hobby (Free) | **$0** |
| Neon | Free Tier | **$0** |
| Google Analytics | Free | **$0** |
| GTM | Free | **$0** |
| Meta Pixel | Free | **$0** |
| TikTok Pixel | Free | **$0** |
| Clarity | Free | **$0** |
| Sentry | Free (5K events) | **$0** |
| **TOTAL** | | **$0/bulan** |

> Semua service yang digunakan memiliki free tier yang cukup untuk small-medium business.

---

## Maintenance Rutin

### Mingguan:
- Cek Sentry untuk error baru
- Review Clarity heatmaps
- Cek GA4 untuk traffic anomaly

### Bulanan:
- Update dependencies: `npm update`
- Review security: `npm audit`
- Backup database (Neon auto-backup)
- Review Core Web Vitals di Search Console

### Per Deploy:
- CI/CD otomatis lint + type-check + build
- Preview deployment untuk review sebelum production
- Rollback tersedia via Vercel dashboard
