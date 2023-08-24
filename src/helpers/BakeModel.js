import * as THREE from 'three';

export default class BakeModel {
  constructor(model, texture, scale) {
    this.model = model;
    this.texture = texture;

    this.texture.flipY = false;
    this.texture.colorSpace = THREE.SRGBColorSpace;

    this.material = new THREE.MeshStandardMaterial({
      map: this.texture,
    });

    if (scale) this.model.scene.scale.set(scale, scale, scale);

    this.model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (scale) child.scale.set(scale, scale, scale);
        child.material.map = this.texture;
        child.material.map.anisotropy = 4;

        child.material = this.material;

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return this;
  }

  getModel() {
    return this.model.scene;
  }
}
