import { Octree } from 'three/addons/math/Octree.js';

import Experience from '../Experience.js';

// scenes
import Environment from './Environment.js';
import Landscape from './Landscape.js';
import Character from './Character.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.parameters = {
      gravity: 30,
    };

    this.worldOctree = new Octree();

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.landscape = new Landscape();
      this.character = new Character();
    });
  }

  resize() {
    if (this.environment) {
      this.environment.resize();
    }
    if (this.landscape) {
      this.landscape.resize();
    }
  }

  update() {
    if (this.environment) {
      this.environment.update();
    }
    if (this.landscape) {
      this.landscape.update();
    }
    if (this.character) {
      this.character.update();
    }
  }
}
