"use client";

import React from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Model = (props: ThreeElements["group"]) => {
  const { scene } = useGLTF("clay-shader.gltf");
  return <primitive object={scene} {...props} />;
};

useGLTF.preload("clay-shader.gltf");

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
