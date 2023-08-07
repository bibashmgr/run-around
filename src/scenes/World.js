import Experience from '../Experience.js';

// scenes
import Environment from './Environment.js';
import Plane from './Plane.js';
import Character from './Character.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment();
      this.plane = new Plane();
      this.character = new Character();
    });
  }

  resize() {
    if (this.environment) {
      this.environment.resize();
    }
    if (this.plane) {
      this.plane.resize();
    }
  }

  update() {
    if (this.environment) {
      this.environment.update();
    }
    if (this.plane) {
      this.plane.update();
    }
    if (this.character) {
      this.character.update();
    }
  }
}
