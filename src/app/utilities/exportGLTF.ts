import { Object3D } from "three";
import {
  GLTFExporter,
  GLTFExporterOptions,
} from "three/addons/exporters/GLTFExporter.js";

const save = (blob: Blob, filename: string, link: HTMLAnchorElement) => {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const saveString = (
  text: string,
  filename: string,
  link: HTMLAnchorElement
) => {
  save(new Blob([text], { type: "text/plain" }), filename, link);
};

const saveArrayBuffer = (
  buffer: ArrayBuffer,
  filename: string,
  link: HTMLAnchorElement
) => {
  save(
    new Blob([buffer], { type: "application/octet-stream" }),
    filename,
    link
  );
};

export const exportGLTF = (
  model: Object3D,
  options: GLTFExporterOptions,
  document: Document
) => {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link); // Firefox workaround, see #6594

  const gltfExporter = new GLTFExporter();

  gltfExporter.parse(
    model,
    (result) => {
      if (result instanceof ArrayBuffer) {
        saveArrayBuffer(result, "model.glb", link);
      } else {
        saveString(JSON.stringify(result, null, 2), "model.gltf", link);
      }
    },
    (error) => {
      console.log("An error happened during parsing:", error);
    },
    options
  );
};
