import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.parameters = {
      directionalLight: {
        color: '#ffffff',
        intensity: 2,
        position: {
          x: -5,
          y: 25,
          z: -1,
        },
      },
      ambientLight: {
        color: '#ffffff',
        intensity: 0.8,
      },
    };

    this.setDirectionalLight();
    this.setAmbientLight();
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(
      this.parameters.directionalLight.color,
      this.parameters.directionalLight.intensity
    );
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.near = 0.01;
    this.directionalLight.shadow.camera.far = 500;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = -30;
    this.directionalLight.shadow.camera.top = 30;
    this.directionalLight.shadow.camera.bottom = -30;
    this.directionalLight.shadow.mapSize.set(1024, 1024);
    this.directionalLight.shadow.normalBias = -0.005;
    this.directionalLight.shadow.radius = 4;

    this.directionalLight.position.set(
      this.parameters.directionalLight.position.x,
      this.parameters.directionalLight.position.y,
      this.parameters.directionalLight.position.z
    );
    this.scene.add(this.directionalLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(
      this.parameters.ambientLight.color,
      this.parameters.ambientLight.intensity
    );
    this.scene.add(this.ambientLight);
  }

  resize() {}

  update() {}
}
