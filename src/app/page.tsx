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
import * as THREE from "three";

const addSphereGeometryDisplacement = (geometry: THREE.SphereGeometry) => {
  console.log(geometry.attributes.position.count);
  for (let i = 0; i < geometry.attributes.uv.array.length / 2; i++) {
    // u is stored at even indices (v is stored at odd indices)
    const u = geometry.attributes.uv.array[i * 2];

    // Vertices where u = 0 or u = 1 are on the seam
    if (u !== 0 && u !== 1) {
      // Vertices at the top of the sphere.
      if (i >= geometry.parameters.widthSegments) {
        // Vertices at the bottom of the sphere.
        if (
          i <
          geometry.attributes.position.count - geometry.parameters.widthSegments
        ) {
          const index = i * 3;
          geometry.attributes.position.array[index] += Math.random() * 0.025; // x coordinate of the vertex
          geometry.attributes.position.array[index + 1] +=
            Math.random() * 0.025; // y coordinate
          geometry.attributes.position.array[index + 2] +=
            Math.random() * 0.025; // z coordinate
          console.log(i);
        }
      }
    }
  }
};

const Sphere = () => {
  const normalMap = useTexture("RaZum_Clay_Nm15.png");

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  addSphereGeometryDisplacement(sphereGeometry);

  return (
    <mesh position={[0, 0, 0]} scale={[3, 3, 3]} geometry={sphereGeometry}>
      <meshStandardMaterial
        // wireframe={true}
        color="#C29F8A"
        metalness={0.0}
        roughness={0.9}
        normalMap={normalMap}
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
