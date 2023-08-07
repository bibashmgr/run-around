import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.parameters = {
      sunlight: {
        color: '#ffffff',
        intensity: 1,
        position: {
          x: 1,
          y: 5,
          z: 0,
        },
      },
      ambientlight: {
        color: '#ffffff',
        intensity: 1,
      },
    };

    this.setSunlight();
    this.setAmbientLight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight(
      this.parameters.sunlight.color,
      this.parameters.sunlight.intensity
    );
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(
      this.parameters.sunlight.position.x,
      this.parameters.sunlight.position.y,
      this.parameters.sunlight.position.z
    );
    this.scene.add(this.sunLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(
      this.parameters.ambientlight.color,
      this.parameters.ambientlight.intensity
    );
    this.scene.add(this.ambientLight);
  }

  resize() {}

  update() {}
}
