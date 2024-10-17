"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stats, StatsGl } from "@react-three/drei";

import { CorrugatedBoard } from "./models/corrugatedBoard";
import { Euler, Quaternion, Vector3 } from "three";

export default function Home() {
  const SCALE_X = 3;
  const SCALE_Y = 3;
  const SCALE_Z = 3;

  const cameraPosition = useMemo(() => {
    // Initial camera position
    const initialPosition = new Vector3(0, 0, 10);

    // Rotation in Euler angles
    const rotationEuler = new Euler(-Math.PI / 8, Math.PI / 4, 0);

    // Convert Euler angles to quaternion
    const rotationQuaternion = new Quaternion().setFromEuler(rotationEuler);

    // Apply the rotation to the initial position
    return initialPosition.applyQuaternion(rotationQuaternion);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }} shadows={true}>
      <PresentationControls
        global={true}
        snap={true}
        enabled={true}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      >
        <CorrugatedBoard
          position={new Vector3(2.5, SCALE_Y / 2, 2.5)}
          scale={new Vector3(SCALE_X, SCALE_Y, SCALE_Z)}
          rotation={new Euler(0, Math.PI / 4, 0)}
          thickness={0.1}
        />

        <gridHelper args={[30, 30]} />
        <axesHelper args={[10]} />

        <directionalLight
          // Directional Light at the original location of the camera.
          // position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
          position={[0, 0, 10]}
          intensity={1}
          color={"#ffffff"}
          castShadow={true}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <directionalLight
          // Directional Light at the original location of the camera.
          // position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
          position={[10, 0, 0]}
          intensity={1}
          color={"#ffffff"}
          castShadow={true}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ambientLight intensity={0.25} color={0xffffff} />
      </PresentationControls>

      {/* <pointLight intensity={1} color={0xffffff} position={[0, 0, 0]} /> */}

      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
