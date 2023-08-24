import Experience from '../Experience.js';

// scenes
import Blocker from './Blocker.js';
import Environment from './Environment.js';
import Landscape from './Landscape.js';
import Character from './Character.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.parameters = {
      gravity: 30,
    };

    this.resources.on('ready', () => {
      this.blocker = new Blocker();
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
    if (this.blocker) {
      this.blocker.update();
    }
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
