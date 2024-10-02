"use client";

import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  StatsGl,
} from "@react-three/drei";
import * as THREE from "three";

import { LoopSubdivision } from "three-subdivide";

const addSphereGeometryDisplacement = (geometry: THREE.SphereGeometry) => {
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
          geometry.attributes.position.array[index] += Math.random() * 0.1; // x coordinate of the vertex
          geometry.attributes.position.array[index + 1] += Math.random() * 0.1; // y coordinate
          geometry.attributes.position.array[index + 2] += Math.random() * 0.1; // z coordinate
        }
      }
    }
  }
};

const Sphere = () => {
  const [bumpMap, displacementMap] = useLoader(THREE.TextureLoader, [
    "Fingerprints01_3K_Bump.png",
    "displacementMap.jpg",
  ]);

  const iterations = 2;

  const params = {
    split: true, // optional, default: true
    uvSmooth: false, // optional, default: false
    preserveEdges: false, // optional, default: false
    flatOnly: false, // optional, default: false
    maxTriangles: 10000, // optional, default: Infinity
  };

  let sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

  // NOTE: This doesn't introduce any problems. I think it's a good way to add some irregularity to the surface.
  addSphereGeometryDisplacement(sphereGeometry);

  // NOTE: This BY FAR does the best job of smoothing the vertices on the geometry.
  sphereGeometry = LoopSubdivision.modify(
    sphereGeometry,
    iterations,
    params
  ) as THREE.SphereGeometry;

  // NOTE: This makes the seam noticeable. Might not matter if it's always on the back side away from the camera...
  // sphereGeometry.computeVertexNormals();

  const clayMaterial = new THREE.MeshPhysicalMaterial({
    // wireframe: true,
    color: "#C29F8A",
    metalness: 0.0,
    roughness: 0.9,
    bumpMap: bumpMap,
    bumpScale: 3,
    sheen: 0.5,
    sheenColor: "#FFDAB9",
    // NOTE: Additional displacement map is actually adding some good irregularity to the surface.
    displacementMap: displacementMap,
    displacementScale: 0.2,
  });

  if (clayMaterial.bumpMap) {
    clayMaterial.bumpMap.wrapS = THREE.RepeatWrapping;
    clayMaterial.bumpMap.wrapT = THREE.RepeatWrapping;
    clayMaterial.bumpMap.repeat.set(2, 2);
    clayMaterial.bumpMap.anisotropy = 16;
  }

  return (
    <mesh
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      geometry={sphereGeometry}
      material={clayMaterial}
    />
  );
};

export default function Home() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[1.25, 1, 1.25]} fov={75} />
      <directionalLight
        intensity={0.8}
        color={"#ffffff"}
        position={[0, 10, 0]}
      />

      <Sphere />

      <OrbitControls />
      <gridHelper />
      <axesHelper args={[5]} />
      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
