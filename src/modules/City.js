import * as THREE from 'three';

const CITY_CONFIG = {
  blockCount: 10,
  blockSpacing: 4,
  minHeight: 2,
  maxHeight: 7,
  palette: [0x00aaff, 0xff00ff, 0xaa00ff, 0x00ffaa],
};

export class CityGenerator {
  constructor() {
    this.group = new THREE.Group();
    this.#createBlocks();
  }

  #createBlocks() {
    // We'll use InstancedMesh for performance if we had many, but for 10 blocks, simple meshes are fine.
    // Actually, let's make them look like skyscrapers.

    for (let i = 0; i < CITY_CONFIG.blockCount; i += 1) {
      this.#addBuilding(i);
    }
  }

  #addBuilding(index) {
    const height = THREE.MathUtils.lerp(CITY_CONFIG.minHeight, CITY_CONFIG.maxHeight, Math.random());
    const geometry = new THREE.BoxGeometry(1.5, height, 1.5);

    // Create a material with a "window" texture or just emissive grid
    // Procedural texture for windows
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 64, 64);

    // Random windows
    ctx.fillStyle = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
    if (Math.random() > 0.8) ctx.fillStyle = '#ffffff'; // rare white windows

    for (let y = 4; y < 64; y += 8) {
      for (let x = 4; x < 64; x += 8) {
        if (Math.random() > 0.3) {
          ctx.fillRect(x, y, 4, 6);
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;

    const material = new THREE.MeshStandardMaterial({
      color: 0x222222,
      map: texture,
      emissive: 0x222222,
      emissiveMap: texture,
      emissiveIntensity: 2,
      roughness: 0.2,
      metalness: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      index * CITY_CONFIG.blockSpacing - (CITY_CONFIG.blockCount * CITY_CONFIG.blockSpacing) / 2,
      height / 2 - 4, // Lower them so they look like they rise from below
      0
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Add a roof glow
    const roofGeo = new THREE.BoxGeometry(1.52, 0.1, 1.52);
    const roofMat = new THREE.MeshBasicMaterial({ color: CITY_CONFIG.palette[index % CITY_CONFIG.palette.length] });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = height / 2;
    mesh.add(roof);

    this.group.add(mesh);
  }

  update(deltaSeconds) {
    // Move entire city group
    this.group.position.x -= deltaSeconds * 5; // Faster speed

    const totalWidth = CITY_CONFIG.blockCount * CITY_CONFIG.blockSpacing;

    // Recycle buildings
    this.group.children.forEach(child => {
      // Calculate world position X
      const worldX = child.position.x + this.group.position.x;

      if (worldX < -20) {
        // Move to back
        child.position.x += totalWidth;
        // Randomize height again? Hard with current setup, but we can just scale Y
        // For now, just loop them.
      }
    });

    // Reset group position to avoid float precision issues eventually
    if (this.group.position.x < -totalWidth) {
      this.group.position.x += totalWidth;
    }
  }
}
