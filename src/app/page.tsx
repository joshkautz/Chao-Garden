"use client";

import React from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { useGLTF, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const Sphere = (props: ThreeElements["mesh"]) => {
  const displacementMap = useTexture("displacementMap.jpg");
  const map = useTexture("clown.jpg");

  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "darkgreen",
    map: map,
    displacementMap: displacementMap,
    displacementScale: 0.25,
  });

  return <mesh geometry={geometry} material={material} {...props} />;
};

const Model = (props: ThreeElements["group"]) => {
  const { scene } = useGLTF("clay.glb");
  const displacementMap = useTexture("displacementMap.jpg");
  const map = useTexture("clown.jpg");

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.map = map;
      child.material.displacementMap = displacementMap;
      child.material.displacementScale = 0.2; // Adjust the scale as needed
      child.material.needsUpdate = true;
    }
  });

  return <primitive object={scene} {...props} />;
};

useGLTF.preload("clay.glb");
useTexture.preload("displacementMap.jpg");
useTexture.preload("clown.jpg");

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
      <Sphere position={[-1.5, 0, 0]} scale={[1, 1, 1]} />
      <Model position={[1.5, 0, 0]} scale={[1, 1, 1]} />
      <OrbitControls />
    </Canvas>
  );
}
