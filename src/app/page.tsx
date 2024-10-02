"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  StatsGl,
  useTexture,
} from "@react-three/drei";
// import * as THREE from "three";

const Sphere = () => {
  const normalMap = useTexture("RaZum_Clay_Nm15.png");
  const displacementMap = useTexture("RaZum_Clay_Dm15.png");

  return (
    <mesh position={[0, 0, 0]} scale={[3, 3, 3]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#C29F8A"
        metalness={0.0}
        roughness={0.9}
        normalMap={normalMap}
        // normalScale={[0.5, 0.5]}
        displacementMap={displacementMap}
        displacementScale={0.2}
      />
    </mesh>
  );
};

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[4, 4, 4]} fov={75} />
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
