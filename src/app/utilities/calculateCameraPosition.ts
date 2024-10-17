import { Euler, Quaternion, Vector3 } from "three";

export const calculateCameraPosition = (initialCameraPosition?: Vector3) => {
  // Default camera position
  initialCameraPosition = initialCameraPosition || new Vector3(0, 0, 10);

  // Rotation in Euler angles
  const rotationEuler = new Euler(-Math.PI / 8, Math.PI / 4, 0);

  // Convert Euler angles to quaternion
  const rotationQuaternion = new Quaternion().setFromEuler(rotationEuler);

  // Apply the rotation to the initial position
  return initialCameraPosition.applyQuaternion(rotationQuaternion);
};
