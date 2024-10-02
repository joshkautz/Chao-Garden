"use client";

import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  StatsGl,
} from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import * as THREE from "three";
import { LoopSubdivision } from "three-subdivide";

const applySubdivisionModifier = (obj: THREE.Group<THREE.Object3DEventMap>) => {
  const iterations = 2;

  const params = {
    split: true, // optional, default: true
    uvSmooth: false, // optional, default: false
    preserveEdges: false, // optional, default: false
    flatOnly: false, // optional, default: false
    maxTriangles: 10000, // optional, default: Infinity
  };

  const mesh = obj.children.find(
    (child) => child instanceof THREE.Mesh
  ) as THREE.Mesh;

  if (mesh) {
    mesh.geometry = LoopSubdivision.modify(mesh.geometry, iterations, params);
  }
};

const addGeometryDisplacement = (obj: THREE.Group<THREE.Object3DEventMap>) => {
  const mesh = obj.children.find(
    (child) => child instanceof THREE.Mesh
  ) as THREE.Mesh;

  if (!mesh) return;

  const geometry = mesh.geometry;
  const positionAttribute = geometry.attributes.position;
  const displacement = 2; // Adjust this value as needed

  // Map to store displacements for each unique vertex
  const vertexDisplacementMap = new Map<string, [number, number, number]>();

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    // Create a unique key for the vertex
    const key = `${x},${y},${z}`;

    // If the displacement for this vertex hasn't been computed yet, compute and store it
    if (!vertexDisplacementMap.has(key)) {
      const noiseX = (Math.random() - 0.5) * displacement;
      const noiseY = (Math.random() - 0.5) * displacement;
      const noiseZ = (Math.random() - 0.5) * displacement;
      vertexDisplacementMap.set(key, [noiseX, noiseY, noiseZ]);
    }

    // Retrieve the stored displacement
    const [noiseX, noiseY, noiseZ] = vertexDisplacementMap.get(key)!;

    // Apply the displacement
    const newX = x + noiseX;
    const newY = y + noiseY;
    const newZ = z + noiseZ;

    positionAttribute.setXYZ(i, newX, newY, newZ);
  }
};

const Model = () => {
  const mtl = useLoader(MTLLoader, "Chao Egg.mtl");
  const obj = useLoader(OBJLoader, "Chao Egg.obj", (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  addGeometryDisplacement(obj);

  applySubdivisionModifier(obj);

  return (
    <primitive object={obj} position={[0, -0.5, 0]} scale={[0.3, 0.3, 0.3]} />
  );
};

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[1.25, 1.25, 1.25]} fov={75} />
      <ambientLight intensity={1} />
      <directionalLight intensity={1} color={"#ffffff"} position={[0, 1, -1]} />

      <Model />

      <OrbitControls />
      <gridHelper />
      <axesHelper args={[5]} />
      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
