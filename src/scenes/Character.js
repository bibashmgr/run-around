import * as THREE from 'three';

import Experience from '../Experience.js';

// helpers
import BakeModel from '../helpers/BakeModel.js';

export default class Character {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.modelSource = this.resources.items.gltfModel.toonCharacterModel;
    this.textureSource = this.resources.items.texture.toonCharacterTexture;

    this.bakeModel();
    this.setModel();
    this.setAnimation();
  }

  bakeModel() {
    this.bakeModel = new BakeModel(this.modelSource, this.textureSource, 0.5);
  }

  setModel() {
    this.model = this.bakeModel.getModel();
    this.scene.add(this.model);
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.modelSource.animations[0]
    );
    this.animation.actions.jump = this.animation.mixer.clipAction(
      this.modelSource.animations[1]
    );
    this.animation.actions.run = this.animation.mixer.clipAction(
      this.modelSource.animations[2]
    );
    this.animation.actions.walk = this.animation.mixer.clipAction(
      this.modelSource.animations[3]
    );
    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();
  }

  resize() {}

  update() {
    if (this.animation.mixer) {
      this.animation.mixer.update(this.time.delta * 0.001);
    }
  }
}
