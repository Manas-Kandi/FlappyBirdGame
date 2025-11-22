import * as THREE from 'three';

const CITY_CONFIG = {
  blockCount: 8,
  blockSpacing: 4,
  minHeight: 1.2,
  maxHeight: 5.5,
  palette: [0xffafbd, 0xffc3a0, 0x93f5ff, 0xb28dff],
};

export class CityGenerator {
  constructor() {
    this.group = new THREE.Group();
    this.#createBlocks();
  }

  #createBlocks() {
    const geometry = new THREE.BoxGeometry(1.2, 1, 1.2);

    for (let i = 0; i < CITY_CONFIG.blockCount; i += 1) {
      const height = THREE.MathUtils.lerp(CITY_CONFIG.minHeight, CITY_CONFIG.maxHeight, Math.random());
      const material = new THREE.MeshStandardMaterial({
        color: CITY_CONFIG.palette[i % CITY_CONFIG.palette.length],
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.y = height;
      mesh.position.set(i * CITY_CONFIG.blockSpacing - CITY_CONFIG.blockCount, height / 2 - 1.5, 0);
      this.group.add(mesh);
    }
  }

  update(deltaSeconds) {
    this.group.position.x -= deltaSeconds * 0.6;
    if (this.group.position.x < -CITY_CONFIG.blockSpacing) {
      this.group.position.x = 0;
    }
  }
}
