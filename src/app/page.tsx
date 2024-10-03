"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stats, StatsGl } from "@react-three/drei";

import { TailsChao } from "./models/tailsChao";

export default function Home() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 75 }}>
      <PresentationControls
        global={true}
        snap={true}
        enabled={true}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      >
        <TailsChao />
        <gridHelper />
        <axesHelper args={[5]} />
      </PresentationControls>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} color={"#ffffff"} position={[0, 1, -1]} />
      <Stats className="Stats" />
      <StatsGl className="StatsGl" />
    </Canvas>
  );
}
