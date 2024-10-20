import { Object3D } from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFExporterOptions } from "three/addons/exporters/GLTFExporter.js";
import { exportGLTF } from "./exportGLTF";

export const addExportTool = (model: Object3D, document: Document) => {
  const gui = new GUI({ title: "Export Tool" });

  const params = {
    trs: false,
    onlyVisible: true,
    binary: false,
    maxTextureSize: 4096,
    exportModel: () => exportGLTF(model, options, document),
  };

  const options: GLTFExporterOptions = {
    trs: params.trs,
    onlyVisible: params.onlyVisible,
    binary: params.binary,
    maxTextureSize: params.maxTextureSize,
  };

  gui
    .add(params, "trs")
    .name("Use TRS")
    .onChange((value) => {
      options.trs = value;
    });
  gui
    .add(params, "onlyVisible")
    .name("Only Visible Objects")
    .onChange((value) => {
      options.onlyVisible = value;
    });
  gui
    .add(params, "binary")
    .name("Binary (GLB)")
    .onChange((value) => {
      options.binary = value;
    });
  gui
    .add(params, "maxTextureSize", 2, 8192)
    .name("Max Texture Size")
    .step(1)
    .onChange((value) => {
      options.maxTextureSize = value;
    });
  gui.add(params, "exportModel").name("Export Model");
};
