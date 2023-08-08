import * as THREE from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';

import Experience from '../Experience.js';

// helpers
import BakeModel from '../helpers/BakeModel.js';

export default class Character {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.keys = this.experience.keys;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    this.modelSource = this.resources.items.gltfModel.toonCharacterModel;
    this.textureSource = this.resources.items.texture.toonCharacterTexture;

    this.parameters = {
      currentState: 'idle',
      onFloor: false,
      velocity: new THREE.Vector3(),
      direction: new THREE.Vector3(),
    };

    this.directionKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

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

  control() {
    let currentState;
    let nextAction;
    let directionKeyPressed = this.directionKeys.some(
      (key) => this.keys.states[key] === true
    );

    if (directionKeyPressed) {
      if (this.keys.states['ShiftLeft']) {
        currentState = 'run';
      } else {
        currentState = 'walk';
      }
    } else {
      currentState = 'idle';
    }

    if (this.parameters.currentState !== currentState) {
      if (currentState === 'walk') {
        nextAction = this.animation.actions.walk;
      } else if (currentState === 'run') {
        nextAction = this.animation.actions.run;
      } else {
        nextAction = this.animation.actions.idle;
      }

      this.parameters.currentState = currentState;

      this.animation.actions.current.fadeOut(0.2).play();
      this.animation.actions.current = nextAction;
      this.animation.actions.current.reset().fadeIn(0.2).play();
    }
  }

  resize() {}

  update() {
    if (this.animation.mixer) {
      this.animation.mixer.update(this.time.delta * 0.001);
    }

    this.control();
  }
}
