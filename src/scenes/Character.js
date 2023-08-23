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
    this.blocker = this.experience.world.blocker;

    this.modelSource = this.resources.items.gltfModel.toonCharacterModel;
    this.textureSource = this.resources.items.texture.toonCharacterTexture;

    this.parameters = {
      currentState: 'idle',
      onFloor: false,
      fadeDuration: 0.2,
      walkVelocity: 3.5,
      runVelocity: 7,
      rotateAngle: new THREE.Vector3(0, 1, 0),
      rotateQuarternion: new THREE.Quaternion(),
      direction: new THREE.Vector3(),
      cameraTarget: new THREE.Vector3(),
    };

    this.directionKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

    this.bakeModel();
    this.setModel();
    this.setAnimation();
  }

  bakeModel() {
    this.bakeModel = new BakeModel(this.modelSource, this.textureSource, 1);
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

      this.animation.actions.current
        .fadeOut(this.parameters.fadeDuration)
        .play();
      this.animation.actions.current = nextAction;
      this.animation.actions.current
        .reset()
        .fadeIn(this.parameters.fadeDuration)
        .play();
    }

    if (
      this.parameters.currentState == 'run' ||
      this.parameters.currentState == 'walk'
    ) {
      let angleYCameraDirection = Math.atan2(
        this.camera.perspectiveCamera.position.x - this.model.position.x,
        this.camera.perspectiveCamera.position.z - this.model.position.z
      );
      let directionOffset = this.getDirectionOffset(this.keys.states);

      this.parameters.rotateQuarternion.setFromAxisAngle(
        this.parameters.rotateAngle,
        angleYCameraDirection + directionOffset
      );
      this.model.quaternion.rotateTowards(
        this.parameters.rotateQuarternion,
        0.2
      );

      this.camera.perspectiveCamera.getWorldDirection(
        this.parameters.direction
      );
      this.parameters.direction.y = 0;
      this.parameters.direction.normalize();
      this.parameters.direction.applyAxisAngle(
        this.parameters.rotateAngle,
        directionOffset
      );

      let velocity =
        this.parameters.currentState == 'walk'
          ? this.parameters.walkVelocity
          : this.parameters.runVelocity;

      let moveX =
        this.parameters.direction.x * velocity * this.time.delta * 0.001;
      let moveZ =
        this.parameters.direction.z * velocity * this.time.delta * 0.001;
      this.model.position.x += moveX;
      this.model.position.z += moveZ;

      this.updateCameraTarget(moveX, moveZ);
    }
  }

  getDirectionOffset(keysPressed) {
    let directionOffset = 0;

    if (keysPressed['KeyW']) {
      if (keysPressed['KeyA']) {
        directionOffset = Math.PI / 4;
      } else if (keysPressed['KeyD']) {
        directionOffset = -Math.PI / 4;
      }
    } else if (keysPressed['KeyS']) {
      if (keysPressed['KeyA']) {
        directionOffset = Math.PI / 4 + Math.PI / 2;
      } else if (keysPressed['KeyD']) {
        directionOffset = -Math.PI / 4 - Math.PI / 2;
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (keysPressed['KeyA']) {
      directionOffset = Math.PI / 2;
    } else if (keysPressed['KeyD']) {
      directionOffset = -Math.PI / 2;
    }

    return directionOffset;
  }

  updateCameraTarget(moveX, moveZ) {
    this.camera.perspectiveCamera.position.x += moveX;
    this.camera.perspectiveCamera.position.z += moveZ;

    this.parameters.cameraTarget.x = this.model.position.x;
    this.parameters.cameraTarget.y = this.model.position.y;
    this.parameters.cameraTarget.z = this.model.position.z;

    this.camera.orbitControls.target.set(
      this.parameters.cameraTarget.x,
      this.parameters.cameraTarget.y,
      this.parameters.cameraTarget.z
    );
  }

  resize() {}

  update() {
    if (this.animation.mixer) {
      this.animation.mixer.update(this.time.delta * 0.001);
    }

    if (!this.blocker.isVisible) {
      this.control();
    }
  }
}
