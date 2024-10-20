import { MeshProps } from "@react-three/fiber";

export interface LineProps extends MeshProps {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
}
