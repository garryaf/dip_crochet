# 3D Optimization Guide - Cotcret

## Current Implementation
The current 3D viewer uses procedural primitives (Spheres, Capsules, etc.) to ensure instant loading and maximum compatibility.

## Performance Strategies
1.  **Lazy Loading**: The `PlushViewer` should be lazy-loaded using `next/dynamic` to prevent it from blocking the main thread during initial page load.
    ```tsx
    const DynamicViewer = dynamic(() => import('@/components/three/PlushViewer'), { ssr: false });
    ```
2.  **Environment Presets**: We use `@react-three/drei` Environment presets (`soft`) which are lightweight compared to loading custom HDRI files.
3.  **Low Mesh Density**: Primitive segments are kept at a balanced level (32 segments for head/body) to ensure high FPS on mobile devices.

## Future Recommendations
- **Texture Compression**: If moving to GLB models, use KTX2 compression for textures.
- **Draco Compression**: Use Draco for geometry compression to reduce file size by up to 90%.
- **LOD (Level of Detail)**: Implement different models for different zoom levels if models become more complex.
