"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stats, StatsGl } from "@react-three/drei";

import { CorrugatedBoard } from "./models/corrugatedBoard";
import { Euler, Vector2, Vector3 } from "three";
import { CorrugatedBoardTree } from "./models/corrugatedBoardTree";
import { calculateCameraPosition } from "./utilities/calculateCameraPosition";

export default function Home() {
  console.log(calculateCameraPosition());

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }} shadows={true}>
      <PresentationControls
        global={true}
        snap={true}
        enabled={true}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      >
        <CorrugatedBoard
          location={new Vector2(2, 2)}
          scale={new Vector3(3, 3, 1)}
          rotation={new Euler(0, Math.PI / 4, 0)}
          thickness={0.1}
        />

        <CorrugatedBoardTree
          location={new Vector2(2, 2)}
          scale={new Vector3(1, 1, 1)}
          rotation={new Euler(0, Math.PI / 4, 0)}
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
