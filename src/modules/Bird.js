import * as THREE from 'three';

const BIRD_CONFIG = {
  color: 0xff7f50, // Coral/Salmon color for contrast against white
  roughness: 0.2,
  metalness: 0.1,
  idleAmplitude: 0.1,
  idleSpeed: 2,
};

export class Bird {
  constructor() {
    this.group = new THREE.Group();
    this.velocityY = 0;
    this.#buildGeometry();
  }

  #buildGeometry() {
    // Abstract shape: Icosahedron
    const geometry = new THREE.IcosahedronGeometry(0.4, 0); // Low poly look
    const material = new THREE.MeshPhysicalMaterial({
      color: BIRD_CONFIG.color,
      roughness: BIRD_CONFIG.roughness,
      metalness: BIRD_CONFIG.metalness,
      flatShading: true, // Faceted look
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    this.group.add(mesh);

    // No trail, pure form
  }

  jump() {
    this.velocityY = 5;
  }

  update(deltaSeconds, elapsedSeconds, gameState) {
    // Physics
    if (gameState.isPlaying()) {
      this.velocityY -= 15 * deltaSeconds;
      this.group.position.y += this.velocityY * deltaSeconds;

      if (this.group.position.y < -3) {
        this.group.position.y = -3;
        this.velocityY = 0;
        gameState.endGame();
      }

      if (this.group.position.y > 8) {
        this.group.position.y = 8;
        this.velocityY = 0;
      }

      // Rotation based on velocity
      this.group.rotation.z = -this.velocityY * 0.05;
      this.group.rotation.x = this.velocityY * 0.05;

    } else if (gameState.state === 'ready') {
      const bob = Math.sin(elapsedSeconds * BIRD_CONFIG.idleSpeed) * BIRD_CONFIG.idleAmplitude;
      this.group.position.y = 0 + bob;

      // Slow rotation in idle
      this.group.rotation.y += deltaSeconds * 0.5;
      this.group.rotation.z = Math.sin(elapsedSeconds) * 0.1;
    }
  }
}
