"use client";

import { GroupProps } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface CorrugatedBoardProps extends GroupProps {
  thickness?: number;
}

export const CorrugatedBoard = (props: CorrugatedBoardProps) => {
  const WAVES = 4;
  const SCALE_Y = props.scale instanceof THREE.Vector3 ? props.scale.y : 1;
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.BufferGeometry;
      const positionAttribute = geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;

      // Modify vertices to create a wave effect

      // Controls the frequency of the waves
      const waveFrequency = WAVES * (Math.PI * 2) * SCALE_Y;

      // Controls the height of the waves
      const waveAmplitude = props.thickness ?? 0.1;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] =
          Math.sin(positions[i + 1] * waveFrequency + Math.PI / 2) *
          waveAmplitude;
      }

      // Mark the positions attribute as needing an update
      positionAttribute.needsUpdate = true;
    }
  }, [SCALE_Y, props]);

  return (
    <group {...props}>
      <mesh
        position={[0, 0, props.thickness ?? 0.1]}
        castShadow={true}
        receiveShadow={true}
      >
        <planeGeometry />
        <meshStandardMaterial color="#9C8D7B" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={meshRef} castShadow={true} receiveShadow={true}>
        <planeGeometry args={[1, 1, 1, SCALE_Y * (WAVES * 2)]} />
        <meshStandardMaterial color="#9C8D7B" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, 0, -(props.thickness ?? 0.1)]}
        castShadow={true}
        receiveShadow={true}
      >
        <planeGeometry />
        <meshStandardMaterial color="#9C8D7B" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
