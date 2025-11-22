import * as THREE from 'three';

const CITY_CONFIG = {
  blockCount: 12,
  blockSpacing: 3.5,
  minHeight: 3,
  maxHeight: 9,
  color: 0x333333, // Dark grey for contrast against white fog
};

export class CityGenerator {
  constructor() {
    this.group = new THREE.Group();
    this.#createBlocks();
  }

  #createBlocks() {
    for (let i = 0; i < CITY_CONFIG.blockCount; i += 1) {
      this.#addBuilding(i);
    }
  }

  #addBuilding(index) {
    const height = THREE.MathUtils.lerp(CITY_CONFIG.minHeight, CITY_CONFIG.maxHeight, Math.random());
    // Thin monoliths
    const geometry = new THREE.BoxGeometry(1, height, 1);

    const material = new THREE.MeshStandardMaterial({
      color: CITY_CONFIG.color,
      roughness: 0.9, // Matte
      metalness: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      index * CITY_CONFIG.blockSpacing - (CITY_CONFIG.blockCount * CITY_CONFIG.blockSpacing) / 2,
      height / 2 - 5, // Lower them
      0
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Random slight rotation for organic feel
    mesh.rotation.y = (Math.random() - 0.5) * 0.2;

    this.group.add(mesh);
  }

  update(deltaSeconds) {
    // Move entire city group
    this.group.position.x -= deltaSeconds * 5;

    const totalWidth = CITY_CONFIG.blockCount * CITY_CONFIG.blockSpacing;

    // Recycle buildings
    this.group.children.forEach(child => {
      const worldX = child.position.x + this.group.position.x;

      if (worldX < -20) {
        child.position.x += totalWidth;
        // Reshuffle height visually? 
        // For true variation we'd need to rebuild geometry or scale, 
        // but scaling Y works if we adjust position Y too.
        const newHeight = THREE.MathUtils.lerp(CITY_CONFIG.minHeight, CITY_CONFIG.maxHeight, Math.random());
        child.scale.y = newHeight / child.geometry.parameters.height;
        child.position.y = (newHeight / 2) - 5;
      }
    });

    if (this.group.position.x < -totalWidth) {
      this.group.position.x += totalWidth;
    }
  }
}
