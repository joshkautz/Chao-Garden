"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BufferGeometry, ExtrudeGeometry, Mesh, Vector2, Vector3 } from "three";
import { Addition, Base, Geometry, Intersection } from "@react-three/csg";
import { createCorrugatedBoardGeometry } from "../utilities/createCorrugatedBoardGeometry";
import { createExtrudedTree02Geometry } from "../utilities/createExtrudedTree02Geometry";
import { CARDBOARD_MATERIAL } from "../materials/cardboard";
import { GamePieceProps } from "../interfaces/gamePieceProps";
import { addExportTool } from "../utilities/addExportTool";
import { Line } from "./line";

// prettier-ignore
const LINES = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2]

export const CardboardTree02 = ({ location }: GamePieceProps) => {
  const meshRef = useRef<Mesh>(null);

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

  const [extrudedTree02Geometry, setExtrudedTree02Geometry] =
    useState<ExtrudeGeometry>();
  const [extrudedTree02GeometryLoading, setExtrudedTree02GeometryLoading] =
    useState<boolean>(true);
  const [extrudedTree02GeometryError, setExtrudedTree02GeometryError] =
    useState<Error>();

  const [corrugatedBoardGeometry, setCorrugatedBoardGeometry] =
    useState<BufferGeometry>();
  const [corrugatedBoardGeometryLoading, setCorrugatedBoardGeometryLoading] =
    useState<boolean>(true);
  const [corrugatedBoardGeometryError, setCorrugatedBoardGeometryError] =
    useState<Error>();

  const [lineGeometry, setLineGeometry] = useState<BufferGeometry>();
  const [lineGeometryLoading, setLineGeometryLoading] = useState<boolean>(true);
  const [lineGeometryError, setLineGeometryError] = useState<Error>();

  useEffect(() => {
    // Add Export Tool to UI.
    addExportTool(meshRef.current as Mesh, document);

    // Load the extruded tree geometry.s
    createExtrudedTree02Geometry()
      .then((geometry) => {
        setExtrudedTree02Geometry(geometry);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setExtrudedTree02GeometryError(err);
        }
      })
      .finally(() => {
        setExtrudedTree02GeometryLoading(false);
      });

    // Load the corrugated board geometry.
    createCorrugatedBoardGeometry(4)
      .then((geometry) => {
        setCorrugatedBoardGeometry(geometry);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setCorrugatedBoardGeometryError(err);
        }
      })
      .finally(() => {
        setCorrugatedBoardGeometryLoading(false);
      });
  }, []);

  // TODO: Handle the loading and error states for the extruded tree geometry and corrugated board geometry.

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      material={CARDBOARD_MATERIAL}
      position={POSITION}
    >
      {LINES.map((line, index) => (
        <Line
          start={new Vector3(-1, line, 1)}
          end={new Vector3(1, line, -1)}
          key={index}
        />
      ))}

      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh> */}

      <Geometry>
        <Base geometry={corrugatedBoardGeometry} />
        <Intersection geometry={extrudedTree02Geometry} />
        {/* <Addition geometry={lineGeometry} /> */}
      </Geometry>
    </mesh>
  );
};
