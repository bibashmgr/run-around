import Experience from '../Experience.js';

export default class Keys {
  constructor() {
    this.experience = new Experience();

    this.states = {};

    window.addEventListener('keydown', (event) => {
      this.states[event.code] = true;
    });

    window.addEventListener('keyup', (event) => {
      this.states[event.code] = false;
    });
  }
}
