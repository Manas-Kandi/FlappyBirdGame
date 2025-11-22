import * as THREE from 'three';

const BIRD_CONFIG = {
  bodyColor: 0x222222,
  wingColor: 0x444444,
  emissiveColor: 0x00ffff,
  idleAmplitude: 0.1,
  idleSpeed: 2,
  trailLength: 20,
};

export class Bird {
  constructor() {
    this.group = new THREE.Group();
    this.velocityY = 0;
    this.trailPoints = [];
    this.#buildGeometry();
    this.#buildTrail();
  }

  #buildGeometry() {
    // Main Fuselage
    const bodyGeo = new THREE.ConeGeometry(0.2, 1.2, 8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: BIRD_CONFIG.bodyColor,
      roughness: 0.4,
      metalness: 0.8,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.rotation.x = Math.PI / 2;
    body.castShadow = true;
    this.group.add(body);

    // Wings
    const wingGeo = new THREE.BufferGeometry();
    const wingVertices = new Float32Array([
      0, 0, 0.2,   // center front
      1.2, 0, -0.4, // right tip
      0, 0, -0.8,  // center back
      -1.2, 0, -0.4 // left tip
    ]);
    wingGeo.setAttribute('position', new THREE.BufferAttribute(wingVertices, 3));
    wingGeo.computeVertexNormals();

    const wingMat = new THREE.MeshStandardMaterial({
      color: BIRD_CONFIG.wingColor,
      roughness: 0.5,
      metalness: 0.7,
      side: THREE.DoubleSide,
    });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.y = 0.1;
    wings.castShadow = true;
    this.group.add(wings);

    // Engine Glow
    const engineGeo = new THREE.CylinderGeometry(0.1, 0.05, 0.2, 8);
    const engineMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: BIRD_CONFIG.emissiveColor,
      emissiveIntensity: 2,
    });
    const engine = new THREE.Mesh(engineGeo, engineMat);
    engine.rotation.x = Math.PI / 2;
    engine.position.z = -0.6;
    this.group.add(engine);

    // Cockpit Glow
    const cockpitGeo = new THREE.BoxGeometry(0.15, 0.1, 0.4);
    const cockpitMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0xff00ff,
      emissiveIntensity: 1.5,
    });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 0.15, 0.1);
    this.group.add(cockpit);
  }

  #buildTrail() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(BIRD_CONFIG.trailLength * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: BIRD_CONFIG.emissiveColor,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.trail = new THREE.Points(geometry, material);
    this.trail.frustumCulled = false; // Always render
    // Note: We don't add trail to this.group because it shouldn't move WITH the bird, 
    // but rather follow it in world space. However, for simplicity in this architecture,
    // we might need to handle it in the scene or just accept local space trails for now.
    // Better approach: Add to group but update positions in world space relative to group?
    // Actually, let's just add it to the group for now and simulate a local trail effect
    // or simpler: just emit particles.

    // Let's try a simple local trail for visual flair
    this.group.add(this.trail);
  }

  jump() {
    this.velocityY = 5; // Jump force
  }

  update(deltaSeconds, elapsedSeconds, gameState) {
    // Physics
    if (gameState.isPlaying()) {
      this.velocityY -= 15 * deltaSeconds; // Gravity
      this.group.position.y += this.velocityY * deltaSeconds;

      // Floor collision
      if (this.group.position.y < -3) {
        this.group.position.y = -3;
        this.velocityY = 0;
        gameState.endGame();
      }

      // Ceiling collision
      if (this.group.position.y > 8) {
        this.group.position.y = 8;
        this.velocityY = 0;
      }
    } else if (gameState.state === 'ready') {
      // Idle hover
      const bob = Math.sin(elapsedSeconds * BIRD_CONFIG.idleSpeed) * BIRD_CONFIG.idleAmplitude;
      this.group.position.y = 0 + bob;
    }

    // Visuals
    // Rotate slightly based on velocity (fake banking)
    this.group.rotation.z = -this.velocityY * 0.1;
    this.group.rotation.x = this.velocityY * 0.05;

    this.#updateTrail(elapsedSeconds);
  }

  #updateTrail(time) {
    const positions = this.trail.geometry.attributes.position.array;
    // Shift positions back
    for (let i = BIRD_CONFIG.trailLength - 1; i > 0; i--) {
      positions[i * 3] = positions[(i - 1) * 3];
      positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
      positions[i * 3 + 2] = positions[(i - 1) * 3 + 2] + 0.1; // Move back relative to bird
    }
    // New point at engine
    positions[0] = (Math.random() - 0.5) * 0.1;
    positions[1] = (Math.random() - 0.5) * 0.1;
    positions[2] = -0.6; // Engine Z

    this.trail.geometry.attributes.position.needsUpdate = true;
  }
}
