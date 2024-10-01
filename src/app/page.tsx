"use client";

import React, { useMemo } from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { LoopSubdivision } from "three-subdivide";
import * as THREE from "three";

const Model = (props: ThreeElements["group"]) => {
  const { scene } = useGLTF("clay.glb");

  // Apply subdivision modifier to smooth the model
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const iterations = 5;
        const params = {
          split: false,
          uvSmooth: true,
          preserveEdges: false,
          flatOnly: false,
          maxTriangles: Infinity,
        };
        child.geometry = LoopSubdivision.modify(
          child.geometry,
          iterations,
          params
        );
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
};

useGLTF.preload("clay.glb");

export default function Home() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Model position={[0, 0, 0]} scale={[2, 2, 2]} />
      <OrbitControls />
    </Canvas>
  );
}
