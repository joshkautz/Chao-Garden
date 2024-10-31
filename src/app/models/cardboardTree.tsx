"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { BufferGeometry, ExtrudeGeometry, Mesh, Vector2, Vector3 } from "three";
import { Base, Geometry, Intersection } from "@react-three/csg";
import { createCorrugatedBoardGeometry } from "../utilities/createCorrugatedBoardGeometry";
import { createExtrudedTreeGeometry } from "../utilities/createExtrudedTreeGeometry";
import { CARDBOARD_MATERIAL } from "../materials/cardboard";
import { GamePieceProps } from "../interfaces/gamePieceProps";
import { addExportTool } from "../utilities/addExportTool";

export const CardboardTree = ({ location }: GamePieceProps) => {
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

  const [extrudedTreeGeometry, setExtrudedTreeGeometry] =
    useState<ExtrudeGeometry>();
  const [extrudedTreeGeometryLoading, setExtrudedTreeGeometryLoading] =
    useState<boolean>(true);
  const [extrudedTreeGeometryError, setExtrudedTreeGeometryError] =
    useState<Error>();

  const [corrugatedBoardGeometry, setCorrugatedBoardGeometry] =
    useState<BufferGeometry>();
  const [corrugatedBoardGeometryLoading, setCorrugatedBoardGeometryLoading] =
    useState<boolean>(true);
  const [corrugatedBoardGeometryError, setCorrugatedBoardGeometryError] =
    useState<Error>();

  useEffect(() => {
    // Add Export Tool to UI.
    // addExportTool(meshRef.current as Mesh, document);

    // Load the extruded tree geometry.s
    createExtrudedTreeGeometry()
      .then((geometry) => {
        setExtrudedTreeGeometry(geometry);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setExtrudedTreeGeometryError(err);
        }
      })
      .finally(() => {
        setExtrudedTreeGeometryLoading(false);
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
      <Geometry>
        <Base geometry={corrugatedBoardGeometry} />
        <Intersection geometry={extrudedTreeGeometry} />
      </Geometry>
    </mesh>
  );
};
