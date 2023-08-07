import * as THREE from 'three';

import Experience from '../Experience.js';

export default class Plane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setModel();
  }

  setModel() {
    this.geometry = new THREE.PlaneGeometry(10, 10);
    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      color: '#47A992',
    });
    this.model = new THREE.Mesh(this.geometry, this.material);
    this.model.rotation.x = Math.PI / 2;
    this.model.receiveShadow = true;
    this.scene.add(this.model);
  }

  resize() {}

  update() {}
}
