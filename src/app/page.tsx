"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Image,
  Billboard,
  PresentationControls,
  Stats,
  StatsGl,
} from "@react-three/drei";

import { TailsChao } from "./models/tailsChao";
import { GrassTile } from "./models/grassTile";
import { WaterTile } from "./models/waterTile";
import { DirtTile } from "./models/dirtTile";

export default function Home() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 75 }}>
      <PresentationControls
        global={true}
        snap={true}
        enabled={true}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      >
        <WaterTile position={[1, 0, 1]} scale={10} />
        <WaterTile position={[1, 0, 3]} scale={10} />
        <GrassTile position={[1, 0, 5]} scale={10} />
        <WaterTile position={[3, 0, 1]} scale={10} />
        <WaterTile position={[3, 0, 3]} scale={10} />
        <GrassTile position={[3, 0, 5]} scale={10} />
        <GrassTile position={[5, 0, 1]} scale={10} />
        <GrassTile position={[5, 0, 3]} scale={10} />
        <GrassTile position={[5, 0, 5]} scale={10} />

        <GrassTile position={[-1, 0, 1]} scale={10} />
        <GrassTile position={[-1, 0, 3]} scale={10} />
        <GrassTile position={[-1, 0, 5]} scale={10} />
        <GrassTile position={[-3, 0, 1]} scale={10} />
        <GrassTile position={[-3, 0, 3]} scale={10} />
        <DirtTile position={[-3, 0, 5]} scale={10} />
        <GrassTile position={[-5, 0, 1]} scale={10} />
        <GrassTile position={[-5, 0, 3]} scale={10} />
        <GrassTile position={[-5, 0, 5]} scale={10} />

        <Billboard
          follow={true}
          lockX={false}
          lockY={true}
          lockZ={false}
          position={[-3, 2.3, 1]}
          scale={4}
        >
          <Image url="Images/tree_01.png" transparent={true} />
        </Billboard>

        <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
          position={[5, 2.3, -1]}
          scale={4}
        >
          <Image url="Images/tree_02.png" transparent={true} />
        </Billboard>

        <GrassTile position={[1, 0, -1]} scale={10} />
        <GrassTile position={[1, 0, -3]} scale={10} />
        <GrassTile position={[1, 0, -5]} scale={10} />
        <GrassTile position={[3, 0, -1]} scale={10} />
        <GrassTile position={[3, 0, -3]} scale={10} />
        <GrassTile position={[3, 0, -5]} scale={10} />
        <GrassTile position={[5, 0, -1]} scale={10} />
        <GrassTile position={[5, 0, -3]} scale={10} />
        <GrassTile position={[5, 0, -5]} scale={10} />

        <GrassTile position={[-1, 0, -1]} scale={10} />
        <GrassTile position={[-1, 0, -3]} scale={10} />
        <GrassTile position={[-1, 0, -5]} scale={10} />
        <GrassTile position={[-3, 0, -1]} scale={10} />
        <GrassTile position={[-3, 0, -3]} scale={10} />
        <GrassTile position={[-3, 0, -5]} scale={10} />
        <GrassTile position={[-5, 0, -1]} scale={10} />
        <GrassTile position={[-5, 0, -3]} scale={10} />
        <GrassTile position={[-5, 0, -5]} scale={10} />

        <TailsChao position={[-1, 0.8, 1]} scale={0.5} />

        <gridHelper args={[30, 30]} />
        <axesHelper args={[10]} />
      </PresentationControls>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} color={"#ffffff"} position={[0, 1, -1]} />
      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
