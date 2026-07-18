'use client';

import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

/**
 * PostProcessing adds bloom, depth-of-field, and enhanced light effects to the
 * birthday intro 3D scene. Uses @react-three/postprocessing for R3F integration.
 *
 * - Bloom: Creates a soft glow on bright elements (particles, lights, gold accents)
 * - DepthOfField: Adds cinematic bokeh to distant/near objects
 * - Light rays are simulated via enhanced bloom settings rather than GodRays
 *   (which requires a reference mesh and adds complexity)
 */
export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={0.01}
        focalLength={0.02}
        bokehScale={3}
      />
    </EffectComposer>
  );
}
