import { MeshProps, Vector2 } from "@react-three/fiber";

export interface GamePieceProps extends MeshProps {
  location?: Vector2;
}
