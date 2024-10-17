import { Box3, ExtrudeGeometry, Mesh } from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

export const createExtrudedTree02Geometry = () => {
  const URL = "trees/tree_02.svg";
  return new SVGLoader().loadAsync(URL).then((svgResult) => {
    const geometry = new ExtrudeGeometry(
      svgResult.paths.map((path) => SVGLoader.createShapes(path)).flat(),
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
