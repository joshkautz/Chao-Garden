"use client";

import React from "react";
import { Canvas, ThreeElements } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  StatsGl,
} from "@react-three/drei";
import * as THREE from "three";

const Sphere = (props: ThreeElements["mesh"]) => {
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#254228"),
    metalness: 0.0,
  });

  return <mesh geometry={geometry} material={material} {...props} />;
};

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={75} />
      <ambientLight intensity={Math.PI / 4} />
      <pointLight position={[10, 10, -10]} decay={0} intensity={Math.PI} />

      <Sphere position={[0, 0, 0]} scale={[2, 2, 2]} />

      <OrbitControls />
      <gridHelper />
      <axesHelper args={[5]} />
      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
