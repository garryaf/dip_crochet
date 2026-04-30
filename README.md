# 🧸 Cotcret — Premium Handmade Crochet

Welcome to the **Cotcret** ecommerce platform. This is a high-end, modern web application designed for a handmade crochet (amigurumi) brand.

## ✨ Features
- **3D Product Viewer**: Interactive 360 viewer with real-time color switching.
- **Custom Builder**: Build your own doll with custom yarn, eyes, and accessories.
- **Graduation Series**: Specialized personalization for graduation gifts.
- **Premium UI**: Kawaii-minimal design using Tailwind CSS v4 and Framer Motion.
- **Performance Optimized**: Lazy-loaded 3D assets and static site generation for blog/products.

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (LTS recommended).

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Development Mode
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run start
```

## 📂 Project Structure
- `/src/app`: App router pages (`/products`, `/customizer`, `/graduation`, `/product/[id]`).
- `/src/components/three`: React Three Fiber components for the 3D viewers.
- `/src/components/ui`: Custom UI components and layout elements.
- `/src/lib`: Constants, types, and utility functions.
- `/src/docs`: Tech documentation and design standards.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **3D Engine**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

---
*Handmade with love by the Cotcret Team.*
