import * as dat from 'dat.gui';
import Stats from 'three/addons/libs/stats.module.js';

import Experience from '../Experience';

export default class Debug {
  constructor() {
    this.experience = new Experience();
    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.gui = new dat.GUI();

      this.stats = new Stats();
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = '0px';
      document.getElementById('experience').appendChild(this.stats.domElement);
    }
  }

  update() {
    this.stats.update();
  }
}
