"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stats, StatsGl } from "@react-three/drei";
import { CardboardTree01 } from "./models/cardboardTree01";
import { CardboardTree02 } from "./models/cardboardTree02";
import { CardboardTile } from "./models/cardboardTile";
import { Vector2 } from "three";

export default function Home() {
  // prettier-ignore
  const TILES_X = [-5,-4,-3,-2,-1,1,2,3,4,5]
  // prettier-ignore
  const TILES_Z = [-5,-4,-3,-2,-1,1,2,3,4,5]

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }} shadows={true}>
      <PresentationControls
        global={true}
        snap={true}
        enabled={true}
        rotation={[Math.PI / 8, -Math.PI / 4, 0]}
      >
        <CardboardTree01 location={new Vector2(-4, 3)} />
        <CardboardTree02 location={new Vector2(4, 1)} />

        {TILES_X.map((x) =>
          TILES_Z.map((z) => (
            <CardboardTile key={`${x}${z}`} location={new Vector2(x, z)} />
          ))
        )}

        {/* <gridHelper args={[30, 30]} />
        <axesHelper args={[10]} /> */}

        <directionalLight
          // Directional Light at the original location of the camera.
          // position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
          position={[0, 2, 10]}
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
          position={[10, 2, 0]}
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
