"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  StatsGl,
} from "@react-three/drei";

const Sphere = () => {
  return (
    <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* <meshStandardMaterial color="#254228" metalness={0.0} /> */}
      <meshPhysicalMaterial color="#254228" metalness={0.0} ior={1.45} />
    </mesh>
  );
};

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={75} />
      <ambientLight intensity={Math.PI / 4} />
      <pointLight position={[10, 10, -10]} decay={0} intensity={Math.PI} />

      <Sphere />

      <OrbitControls />
      <gridHelper />
      <axesHelper args={[5]} />
      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
