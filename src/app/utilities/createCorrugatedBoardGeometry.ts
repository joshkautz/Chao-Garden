import { Box3, Mesh, NormalBufferAttributes, PlaneGeometry } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { BufferGeometry } from "three";

export const createCorrugatedBoardGeometry = (
  scale?: number
): Promise<BufferGeometry<NormalBufferAttributes>> => {
  const SCALE = scale ?? 1;
  const WAVES = 4 * SCALE;
  const THICKNESS = 0.1;
  const waveFrequency = WAVES * (Math.PI * 2); // Controls the frequency of the waves.
  const waveAmplitude = THICKNESS + 0.005; // Controls the height of the waves. Add a small extra to clip and add texture.

  const frontPlane = new PlaneGeometry(1, 1);
  const backPlane = new PlaneGeometry(1, 1);
  const middlePlane = new PlaneGeometry(1, 1, 1, WAVES * 2);

  const positionAttribute = middlePlane.attributes.position;
  const positions = positionAttribute.array as Float32Array;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] =
      Math.sin(positions[i + 1] * waveFrequency + Math.PI / 2) * waveAmplitude;
  }

  positionAttribute.needsUpdate = true;

  frontPlane.translate(0, 0, THICKNESS);
  backPlane.translate(0, 0, -THICKNESS);

  const geometry = mergeGeometries([middlePlane, frontPlane, backPlane]);

  geometry.scale(SCALE, SCALE, 1);
  geometry.rotateY(Math.PI / 4);

  // Compute the bounding box
  const boundingBox = new Box3().setFromObject(new Mesh(geometry));
  const yOffset = boundingBox.min.y;

  // Adjust the position to align the bottom of the mesh at Y = 0
  geometry.translate(0, -yOffset, 0);

  return Promise.resolve(geometry);
};
