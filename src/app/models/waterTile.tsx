"use client";

import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export const WaterTile = (props: GroupProps) => {
  const GLTF = useGLTF("waterTile/waterTile.gltf");
  console.log(GLTF);
  console.log(GLTF.scene);

  return (
    <group {...props}>
      {GLTF.scene.children
        .filter((child) => child instanceof THREE.Mesh)
        .map((child, index) => (
          <mesh
            key={index}
            geometry={child.geometry}
            material={child.material}
          />
        ))}
    </group>
  );
};
