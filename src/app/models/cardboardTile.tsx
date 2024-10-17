"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BufferGeometry, ExtrudeGeometry, Vector2, Vector3 } from "three";
import { Addition, Base, Geometry, Intersection } from "@react-three/csg";
import { createCorrugatedBoardGeometry } from "../utilities/createCorrugatedBoardGeometry";
import { createExtrudedTree02Geometry } from "../utilities/createExtrudedTree02Geometry";
import { CARDBOARD_MATERIAL } from "../materials/cardboard";
import { GamePieceProps } from "../interfaces/gamePieceProps";

export const CardboardTile = ({ location }: GamePieceProps) => {
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

  const [corrugatedBoardGeometry, setCorrugatedBoardGeometry] =
    useState<BufferGeometry>();
  const [corrugatedBoardGeometryLoading, setCorrugatedBoardGeometryLoading] =
    useState<boolean>(true);
  const [corrugatedBoardGeometryError, setCorrugatedBoardGeometryError] =
    useState<Error>();

  const LOADING: boolean = useMemo<boolean>(
    () => corrugatedBoardGeometryLoading,
    [corrugatedBoardGeometryLoading]
  );

  useEffect(() => {
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

  return LOADING ? (
    <mesh
      castShadow
      receiveShadow
      material={CARDBOARD_MATERIAL}
      position={POSITION}
    >
      <sphereGeometry />
    </mesh>
  ) : (
    <mesh
      castShadow
      receiveShadow
      material={CARDBOARD_MATERIAL}
      position={POSITION}
    >
      <Geometry>
        <Base geometry={corrugatedBoardGeometry} />
        <Addition>
          <boxGeometry args={[1, 1, 1]} />
        </Addition>
      </Geometry>
    </mesh>
  );
};
