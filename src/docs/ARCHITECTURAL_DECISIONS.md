# Architectural Decisions - Cotcret

This document outlines the technical choices and architecture for the Cotcret premium crochet ecommerce platform.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (using `@theme inline` and CSS variables)
- **3D Engine**: React Three Fiber + Three.js
- **Animations**: Framer Motion
- **Headless CMS**: Sanity (Recommended for production)

## Component Structure
1.  **Three components (`src/components/three`)**:
    - `PlushModel`: Contains the procedural geometry and materials for the 3D dolls.
    - `PlushViewer`: The Canvas wrapper with lighting, controls, and environment setup.
2.  **UI components (`src/components/ui`)**:
    - `CustomizerPanel`: The state-driven controller for the 3D viewer.
3.  **Pages (`src/app`)**:
    - `page.tsx`: Landing page with hero and character showcase.
    - `customizer/page.tsx`: Interactive custom doll builder.
    - `graduation/page.tsx`: Niche collection for graduation gifts.

## State Management
- Local React state is used for the customizer preview.
- For a production scale, **Zustand** is recommended for managing the cart and global user preferences.

## Design Philosophy
The UI follows a **Kawaii-Minimal** aesthetic:
- Large border radii (1.5rem+)
- Soft pastel color palette (Cream, Soft Pink, Mint)
- High-quality glassmorphism effects (`backdrop-blur`)
- Emotional storytelling integrated into every product page.
