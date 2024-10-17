import { DoubleSide, MeshStandardMaterial } from "three";

export const CARDBOARD_MATERIAL = new MeshStandardMaterial({
  color: "#9C8D7B",
  side: DoubleSide,
});
