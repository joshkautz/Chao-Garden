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
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { LoopSubdivision } from "three-subdivide";
import * as THREE from "three";

const applySubdivisionModifier = (
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>
) => {
  const iterations = 2;

  const params = {
    split: true, // optional, default: true
    uvSmooth: false, // optional, default: false
    preserveEdges: false, // optional, default: false
    flatOnly: false, // optional, default: false
    maxTriangles: 10000, // optional, default: Infinity
  };

  return LoopSubdivision.modify(geometry, iterations, params);
};

const addGeometryDisplacement = (
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>
) => {
  const positionAttribute = geometry.attributes.position;
  const displacement = 0.1; // Adjust this value as needed

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

  return geometry;
};

const addClayMaterial = (
  oldMaterial: THREE.Material | THREE.Material[],
  texture: THREE.Texture
) => {
  console.log(oldMaterial);
  const newMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.0,
    roughness: 0.9,
    bumpMap: texture,
    bumpScale: 3,
    lightMapIntensity: 0.5,
    lightMap: texture,
    sheen: 0.5,
    sheenColor: "#FFDAB9",
    map: (oldMaterial as THREE.MeshPhongMaterial).map,
  });

  if (newMaterial.bumpMap) {
    newMaterial.bumpMap.wrapS = THREE.RepeatWrapping;
    newMaterial.bumpMap.wrapT = THREE.RepeatWrapping;
    newMaterial.bumpMap.repeat.set(0.5, 0.5);
    newMaterial.bumpMap.anisotropy = 16;
  }

  return newMaterial;
};

const Model = () => {
  const texture = useLoader(
    TextureLoader,
    "test/imperfection_0002_color_2k.jpg"
  );
  const mtl = useLoader(MTLLoader, "Chao Egg.mtl");
  const obj = useLoader(OBJLoader, "Chao Egg.obj", (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  let geometry = (
    obj.children.find((child) => child instanceof THREE.Mesh) as THREE.Mesh
  ).geometry;

  let material = (
    obj.children.find((child) => child instanceof THREE.Mesh) as THREE.Mesh
  ).material;

  geometry = addGeometryDisplacement(geometry);

  geometry = applySubdivisionModifier(geometry);

  material = addClayMaterial(material, texture);

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={75} />
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
