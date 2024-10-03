"use client";

import React from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import * as THREE from "three";

import { applySubdivisionModifier } from "../utilities/applySubdivisionModifier";
import { addGeometryDisplacement } from "../utilities/addGeometryDisplacement";

export const TailsChao = () => {
  const texture = useLoader(
    TextureLoader,
    "Textures/imperfection_0002_color_2k.jpg"
  );
  const mtl = useLoader(MTLLoader, "Tails/Tails.mtl");
  const obj = useLoader(OBJLoader, "Tails/Tails.obj", (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry = addGeometryDisplacement(child.geometry);
      child.geometry = applySubdivisionModifier(child.geometry);
      child.material.bumpMap = texture;
      child.material.bumpScale = 10;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {obj.children
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
