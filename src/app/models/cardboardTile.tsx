"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box3,
  BufferGeometry,
  ExtrudeGeometry,
  Mesh,
  Vector2,
  Vector3,
} from "three";
import { Addition, Base, Geometry, Intersection } from "@react-three/csg";
import { createCorrugatedBoardGeometry } from "../utilities/createCorrugatedBoardGeometry";
import { CARDBOARD_MATERIAL } from "../materials/cardboard";
import { GamePieceProps } from "../interfaces/gamePieceProps";

export const CardboardTile = ({ location }: GamePieceProps) => {
  const [corrugatedBoardGeometry, setCorrugatedBoardGeometry] =
    useState<BufferGeometry>();
  const [corrugatedBoardGeometryLoading, setCorrugatedBoardGeometryLoading] =
    useState<boolean>(true);
  const [corrugatedBoardGeometryError, setCorrugatedBoardGeometryError] =
    useState<Error>();

  const THICKNESS = 0.1;
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
    return new Vector3(x, -THICKNESS, y);
  }, [location, corrugatedBoardGeometry]);

  useEffect(() => {
    // Load the corrugated board geometry.
    createCorrugatedBoardGeometry()
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

  useEffect(() => {
    // Rotate and Position
    if (corrugatedBoardGeometry) {
      corrugatedBoardGeometry.rotateY(-Math.PI / 4);
      corrugatedBoardGeometry.rotateX(Math.PI / 2);
      corrugatedBoardGeometry.center();
      Math.random() < 0.5 && corrugatedBoardGeometry.rotateY(-Math.PI / 2);
      corrugatedBoardGeometry.translate(POSITION.x, POSITION.y, POSITION.z);
    }
  }, [corrugatedBoardGeometry]);

  // TODO: Handle the loading and error states for the extruded tree geometry and corrugated board geometry.

  return (
    <mesh
      castShadow
      receiveShadow
      material={CARDBOARD_MATERIAL}
      geometry={corrugatedBoardGeometry}
    />
  );
};
