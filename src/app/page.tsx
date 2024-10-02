"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Billboard,
  Image,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={75} />
      <ambientLight intensity={Math.PI / 2} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <OrbitControls />
      <gridHelper />
      <axesHelper args={[5]} />

      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[1, 0, 1]}
      >
        <Image url="paper_tree_1.png" transparent position={[0, 0.5, 0]} />
      </Billboard>
    </Canvas>
  );
}
