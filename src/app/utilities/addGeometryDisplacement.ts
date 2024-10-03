import * as THREE from "three";

export const addGeometryDisplacement = (
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>
) => {
  const positionAttribute = geometry.attributes.position;
  const displacement = 0.1; // Adjust this value as needed

  // Map to store displacements for each unique vertex
  const vertexDisplacementMap = new Map<string, [number, number, number]>();

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    // Create a unique key for the vertex
    const key = `${x},${y},${z}`;

    // If the displacement for this vertex hasn't been computed yet, compute and store it
    if (!vertexDisplacementMap.has(key)) {
      const noiseX = (Math.random() - 0.5) * displacement;
      const noiseY = (Math.random() - 0.5) * displacement;
      const noiseZ = (Math.random() - 0.5) * displacement;
      vertexDisplacementMap.set(key, [noiseX, noiseY, noiseZ]);
    }

    // Retrieve the stored displacement
    const [noiseX, noiseY, noiseZ] = vertexDisplacementMap.get(key)!;

    // Apply the displacement
    const newX = x + noiseX;
    const newY = y + noiseY;
    const newZ = z + noiseZ;

    positionAttribute.setXYZ(i, newX, newY, newZ);
  }

  return geometry;
};
