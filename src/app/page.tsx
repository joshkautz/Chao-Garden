"use client";

import React from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Sphere = (props: ThreeElements["mesh"]) => {
  const displacementMap = useTexture("displacementMap.jpg");
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "brown",
    displacementMap: displacementMap,
    displacementScale: 0.5,
  });

  return <mesh geometry={geometry} material={material} {...props} />;
};

useTexture.preload("displacementMap.jpg");

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
      <Sphere position={[0, 0, 0]} scale={[2, 2, 2]} />
      <OrbitControls />
    </Canvas>
  );
}
