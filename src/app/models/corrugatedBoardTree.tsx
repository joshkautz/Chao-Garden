"use client";

import { GroupProps } from "@react-three/fiber";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  Mesh,
  DoubleSide,
  Vector2,
  Vector3,
  BufferGeometry,
  Euler,
  Group,
} from "three";

export interface CorrugatedBoardTreeProps extends GroupProps {
  location?: Vector2;
  thickness?: number;
}

export const CorrugatedBoardTree = ({
  location,
  scale,
  rotation,
  thickness,
}: CorrugatedBoardTreeProps) => {
  const SCALE = 1;
  const SCALE_X = scale instanceof Vector3 ? scale.x : 1;
  const SCALE_Y = scale instanceof Vector3 ? scale.y : 1;
  const SCALE_Z = scale instanceof Vector3 ? scale.z : 1;

  const ROTATION = rotation instanceof Euler ? rotation : new Euler(0, 0, 0);

  const locationX = location instanceof Vector2 ? location.x : 0;
  const locationY = location instanceof Vector2 ? location.y : 0;

  const POSITION = useMemo(() => {
    let x = 0;
    let y = 0;
    if (locationX === 0 || locationY === 0) return new Vector3(0, 0, 0);
    if (locationX > 0) x = locationX - 0.5;
    if (locationX < 0) x = locationX + 0.5;
    if (locationY > 0) y = locationY - 0.5;
    if (locationY < 0) y = locationY + 0.5;
    return new Vector3(x, SCALE_Y / 2, y);
  }, [locationX, locationY, SCALE_Y]);

  const WAVES = 4;
  const THICKNESS = thickness ?? 0.1;
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as BufferGeometry;
      const positionAttribute = geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;

      // Modify vertices to create a wave effect
      const waveFrequency = WAVES * (Math.PI * 2) * SCALE_Y; // Controls the frequency of the waves
      const waveAmplitude = THICKNESS + 0.01; // Controls the height of the waves. Add a small extra to clip and add texture.

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] =
          Math.sin(positions[i + 1] * waveFrequency + Math.PI / 2) *
          waveAmplitude;
      }

      // Mark the positions attribute as needing an update
      positionAttribute.needsUpdate = true;
    }
  }, [SCALE_Y, THICKNESS]);

  return (
    <group
      position={POSITION}
      scale={[SCALE_X * SCALE, SCALE_Y * SCALE, SCALE_Z * SCALE]}
      rotation={ROTATION}
    >
      <mesh position={[0, 0, THICKNESS]} castShadow={true} receiveShadow={true}>
        <planeGeometry />
        <meshStandardMaterial color="#9C8D7B" side={DoubleSide} />
      </mesh>
      <mesh ref={meshRef} castShadow={true} receiveShadow={true}>
        <planeGeometry args={[1, 1, 1, SCALE_Y * (WAVES * 2)]} />
        <meshStandardMaterial color="#9C8D7B" side={DoubleSide} />
      </mesh>
      <mesh
        position={[0, 0, -THICKNESS]}
        castShadow={true}
        receiveShadow={true}
      >
        <planeGeometry />
        <meshStandardMaterial color="#9C8D7B" side={DoubleSide} />
      </mesh>
    </group>
  );
};
