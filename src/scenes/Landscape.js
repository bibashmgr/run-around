import * as THREE from 'three';

import Experience from '../Experience.js';

// helpers
import BakeModel from '../helpers/BakeModel.js';

export default class Landscape {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.modelSource = this.resources.items.gltfModel.landscapeModel;
    this.textureSource = this.resources.items.texture.landscapeTexture;

    this.bakeModel();
    this.setModel();
  }

  bakeModel() {
    this.bakeModel = new BakeModel(this.modelSource, this.textureSource, 0.08);
  }

  setModel() {
    this.model = this.bakeModel.getModel();
    this.model.position.y = -7.5 * 0.08 * 0.1;
    this.scene.add(this.model);
  }

  resize() {}

  update() {}
}
