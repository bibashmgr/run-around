import * as THREE from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';

import Experience from '../Experience.js';

export default class Blocker {
  constructor() {
    this.experience = new Experience();
    this.keys = this.experience.keys;

    this.isVisible = true;

    this.blocker = document.getElementById('blocker');
    this.instructions = document.getElementById('instructions');

    this.instructions.addEventListener('click', () => {
      this.blocker.style.display = 'none';
      this.instructions.style.display = 'none';
      this.isVisible = false;
    });
  }

  update() {
    if (this.keys.states['Escape']) {
      this.blocker.style.display = 'block';
      this.instructions.style.display = '';
      this.isVisible = true;
    }
  }
}
