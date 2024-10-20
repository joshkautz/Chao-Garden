"use client";

import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

export const GrassTile = (props: GroupProps) => {
  const GLTF = useGLTF("grassTile/grassTile.gltf");

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
