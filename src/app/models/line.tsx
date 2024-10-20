"use client";

import React, { useEffect, useRef } from "react";
import {
  BufferGeometry,
  LineBasicMaterial,
  Mesh,
  Vector3,
  Line as _Line,
} from "three";
import { LineProps } from "../interfaces/lineProps";

export const Line = ({ start, end }: LineProps) => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      // Define two points
      const points = [];
      points.push(new Vector3(start.x, start.y, start.z)); // First point
      points.push(new Vector3(end.x, end.y, end.z)); // Second point

      // Create geometry and material
      const geometry = new BufferGeometry().setFromPoints(points);
      const material = new LineBasicMaterial({ color: 0x0000ff });

      // Create the line
      const line = new _Line(geometry, material);
      meshRef.current.add(line);
    }
  }, [start, end]);

  return <mesh ref={meshRef} />;
};
