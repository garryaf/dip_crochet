import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hook to safely track and dispose Three.js resources (textures, materials, geometries).
 * Prevents GPU memory leaks by ensuring all allocated resources are freed on unmount
 * or when dependencies change.
 *
 * Usage:
 *   const { track } = useWebGLDispose();
 *   const texture = track(new THREE.CanvasTexture(canvas));
 *   const material = track(new THREE.MeshStandardMaterial({ map: texture }));
 */

type Disposable = { dispose: () => void };

export function useWebGLDispose() {
  const resourcesRef = useRef<Set<Disposable>>(new Set());

  const track = <T extends Disposable>(resource: T): T => {
    resourcesRef.current.add(resource);
    return resource;
  };

  const disposeAll = () => {
    resourcesRef.current.forEach((resource) => {
      try {
        resource.dispose();
      } catch {
        // Silently handle already-disposed resources
      }
    });
    resourcesRef.current.clear();
  };

  useEffect(() => {
    return () => {
      disposeAll();
    };
  }, []);

  return { track, disposeAll };
}

/**
 * Utility to dispose a Three.js material and all its associated textures.
 */
export function disposeMaterial(material: THREE.Material): void {
  if (material instanceof THREE.MeshStandardMaterial) {
    material.map?.dispose();
    material.normalMap?.dispose();
    material.roughnessMap?.dispose();
    material.metalnessMap?.dispose();
    material.aoMap?.dispose();
    material.emissiveMap?.dispose();
    material.displacementMap?.dispose();
    material.bumpMap?.dispose();
    material.alphaMap?.dispose();
    material.envMap?.dispose();
    material.lightMap?.dispose();
  }
  material.dispose();
}

/**
 * Utility to fully dispose a Three.js mesh (geometry + material + textures).
 */
export function disposeMesh(mesh: THREE.Mesh): void {
  mesh.geometry?.dispose();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach(disposeMaterial);
  } else if (mesh.material) {
    disposeMaterial(mesh.material);
  }
}

/**
 * Recursively dispose all resources in a Three.js scene graph.
 */
export function disposeSceneGraph(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      disposeMesh(child);
    }
  });
}
