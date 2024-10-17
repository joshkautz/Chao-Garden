"use client";

import { GroupProps, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import React, { useMemo } from "react";

import {
  Box3,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  Mesh,
  Vector2,
  Vector3,
} from "three";

export interface ExtrudedTreeProps extends GroupProps {
  location?: Vector2;
}

export const ExtrudedTree = ({
  location,
  scale,
  rotation,
}: ExtrudedTreeProps) => {
  const SCALE = 0.05;
  const SCALE_X = scale instanceof Vector3 ? scale.x : 1;
  const SCALE_Y = scale instanceof Vector3 ? scale.y : 1;
  const SCALE_Z = scale instanceof Vector3 ? scale.z : 1;

  const ROTATION = rotation instanceof Euler ? rotation : new Euler(0, 0, 0);

  const locationX = location instanceof Vector2 ? location.x : 0;
  const locationY = location instanceof Vector2 ? location.y : 0;

  const POSITION = useMemo(() => {
    let x = 0;
    let y = 0;
    if (locationX === 0 || locationY === 0) return new Vector3(0, 0, 0);
    if (locationX > 0) x = locationX - 0.5;
    if (locationX < 0) x = locationX + 0.5;
    if (locationY > 0) y = locationY - 0.5;
    if (locationY < 0) y = locationY + 0.5;
    return new Vector3(x, 0, y);
  }, [locationX, locationY]);

  const { paths } = useLoader(SVGLoader, "trees/tree_01.svg");

  const geometry = useMemo(() => {
    const tempGeometry = new ExtrudeGeometry(
      paths.map((path) => SVGLoader.createShapes(path)).flat(),
      {
        depth: 20, // Depth of extrusion
      }
    );

    // Rotate the geometry 180 degrees around the X-axis and center it
    tempGeometry.rotateX(Math.PI);
    tempGeometry.center();

    // Compute the bounding box
    const boundingBox = new Box3().setFromObject(new Mesh(tempGeometry));
    const yOffset = boundingBox.min.y;

    // Adjust the position to align the bottom of the mesh at Y = 0
    tempGeometry.translate(0, -yOffset, 0);

    return tempGeometry;
  }, [paths]);

  return (
    <mesh
      position={POSITION}
      scale={[SCALE_X * SCALE, SCALE_Y * SCALE, SCALE_Z * SCALE]}
      rotation={ROTATION}
      geometry={geometry}
      castShadow={true}
      receiveShadow={true}
    >
      <meshStandardMaterial color="#9C8D7B" side={DoubleSide} />
    </mesh>
  );
};

export const extrudedTreeGeometry = async () => {
  const loader = new SVGLoader();
  return loader.loadAsync("trees/tree_01.svg").then((data) => {
    const paths = data.paths;
    const geometry = new ExtrudeGeometry(
      paths.map((path) => SVGLoader.createShapes(path)).flat(),
      {
        depth: 20, // Depth of extrusion
      }
    );

    // Rotate the geometry 180 degrees around the X-axis and center it
    geometry.scale(0.05, 0.05, 0.05);
    geometry.rotateX(Math.PI);
    geometry.rotateY(Math.PI / 4);
    geometry.center();

    // Compute the bounding box
    const boundingBox = new Box3().setFromObject(new Mesh(geometry));
    const yOffset = boundingBox.min.y;

    // Adjust the position to align the bottom of the mesh at Y = 0
    geometry.translate(0, -yOffset, 0);

    return geometry;
  });
};
