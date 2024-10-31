"use client";

import React, { useMemo } from "react";
import { Vector2, Vector3 } from "three";
import { GamePieceProps } from "../interfaces/gamePieceProps";
import { Gltf } from "@react-three/drei";
import { CARDBOARD_MATERIAL } from "../materials/cardboard";

export const CardboardTreeImport = ({ location }: GamePieceProps) => {
  const POSITION = useMemo(() => {
    let x = 0;
    let y = 0;
    const locationX = location instanceof Vector2 ? location.x : 0;
    const locationY = location instanceof Vector2 ? location.y : 0;
    if (locationX === 0 || locationY === 0) return new Vector3(0, 0, 0);
    if (locationX > 0) x = locationX - 0.5;
    if (locationX < 0) x = locationX + 0.5;
    if (locationY > 0) y = locationY - 0.5;
    if (locationY < 0) y = locationY + 0.5;
    return new Vector3(x, 0, y);
  }, [location]);

  return (
    <mesh
      position={POSITION}
      material={CARDBOARD_MATERIAL}
      castShadow
      receiveShadow
    >
      <Gltf src={"trees/test_tree_cleaned.gltf"} castShadow receiveShadow />
    </mesh>
  );
};
