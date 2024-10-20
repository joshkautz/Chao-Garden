import * as THREE from "three";
import { LoopSubdivision } from "three-subdivide";

export const applySubdivisionModifier = (
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>
) => {
  const iterations = 2;

  const params = {
    split: true, // optional, default: true
    uvSmooth: false, // optional, default: false
    preserveEdges: false, // optional, default: false
    flatOnly: false, // optional, default: false
    maxTriangles: 10000, // optional, default: Infinity
  };

  return LoopSubdivision.modify(geometry, iterations, params);
};
