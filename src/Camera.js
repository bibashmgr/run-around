import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// src
import Experience from './Experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      10000
    );
    this.perspectiveCamera.position.y = 8;
    this.perspectiveCamera.position.z = 19;

    this.scene.add(this.perspectiveCamera);
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.orbitControls.enableDamping = false;
    this.orbitControls.enableZoom = false;
    this.orbitControls.enablePan = false;
    this.orbitControls.enableRotate = true;
    this.orbitControls.maxPolarAngle = Math.PI / 2.1;
    this.orbitControls.target.set(0, 0, 0);
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update() {
    this.orbitControls.update();
  }
}
