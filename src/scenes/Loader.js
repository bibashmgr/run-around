import Experience from '../Experience.js';

export default class Loader {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.loader = document.getElementById('loader');
    this.title = document.getElementById('loader-title');
    this.barFill = document.getElementById('loader-bar-fill');
    this.percent = document.getElementById('loader-percent');
    this.instructions = document.getElementById('instructions');

    this.resources.on('progress', (progress) => {
      this.setProgress(progress);
    });
    this.resources.on('ready', () => {
      this.hide();
    });
    this.resources.on('error', () => {
      this.title.textContent = 'Failed to load assets';
    });
  }

  setProgress(progress) {
    this.barFill.style.transform = `scaleX(${progress})`;
    this.percent.textContent = `${Math.round(progress * 100)}%`;
  }

  hide() {
    this.setProgress(1);
    this.loader.classList.add('loaded');
    // ignore transitionend bubbling up from the progress bar
    const onTransitionEnd = (event) => {
      if (event.target !== this.loader) return;
      this.loader.style.display = 'none';
      this.loader.removeEventListener('transitionend', onTransitionEnd);
    };
    this.loader.addEventListener('transitionend', onTransitionEnd);
    this.instructions.style.display = '';
  }
}
