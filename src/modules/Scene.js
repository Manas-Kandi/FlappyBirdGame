import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { Bird } from './Bird.js';
import { CityGenerator } from './City.js';

const CAMERA_CONFIG = {
  fov: 60,
  near: 0.1,
  far: 200,
  startPosition: new THREE.Vector3(0, 2, 8),
};

const LIGHTING_CONFIG = {
  ambient: 0.2,
  directional: 1.5,
  directionalColor: 0xffffff,
  fogColor: 0x0b001a,
  fogDensity: 0.02,
};

/**
 * Manages Three.js scene, camera, renderer, and core game objects.
 */
export class SceneManager {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    if (!this.canvas) {
      throw new Error('Unable to find game canvas element.');
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false, // Post-processing usually requires antialias false or SMAA
      alpha: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(LIGHTING_CONFIG.fogColor);
    this.scene.fog = new THREE.FogExp2(LIGHTING_CONFIG.fogColor, LIGHTING_CONFIG.fogDensity);

    this.camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      window.innerWidth / window.innerHeight,
      CAMERA_CONFIG.near,
      CAMERA_CONFIG.far,
    );
    this.camera.position.copy(CAMERA_CONFIG.startPosition);

    // Post-processing setup
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    this.composer.addPass(bloomPass);

    this.bird = new Bird();
    this.city = new CityGenerator();

    this.overlay = document.getElementById('loadingOverlay');
    
    this.#createEnvironment();
  }

  /** Initializes base scene elements. */
  async init() {
    this.#addLights();
    this.scene.add(this.bird.group);
    this.scene.add(this.city.group);
    this.handleResize();
    this.#hideOverlay();
  }

  /**
   * Updates all scene actors.
   * @param {number} delta - Milliseconds since last frame.
   * @param {import('./GameState.js').GameState} gameState
   */
  update(delta, gameState) {
    const seconds = delta / 1000;
    const elapsed = performance.now() / 1000;
    this.bird.update(seconds, elapsed, gameState);
    this.city.update(seconds, elapsed, gameState);
    this.#updateEnvironment(seconds);
  }

  /** Renders the scene. */
  render() {
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }

  /** Handles viewport resize. */
  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.composer.setSize(width, height);
  }

  #addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, LIGHTING_CONFIG.ambient);
    this.scene.add(ambient);

    const directional = new THREE.DirectionalLight(
      LIGHTING_CONFIG.directionalColor,
      LIGHTING_CONFIG.directional,
    );
    directional.position.set(10, 20, 10);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 2048;
    directional.shadow.mapSize.height = 2048;
    directional.shadow.camera.near = 0.5;
    directional.shadow.camera.far = 50;
    directional.shadow.camera.left = -20;
    directional.shadow.camera.right = 20;
    directional.shadow.camera.top = 20;
    directional.shadow.camera.bottom = -20;
    this.scene.add(directional);

    // Add some colorful point lights for that neon feel
    const p1 = new THREE.PointLight(0x00ffff, 50, 20);
    p1.position.set(-5, 2, 0);
    this.scene.add(p1);

    const p2 = new THREE.PointLight(0xff00ff, 50, 20);
    p2.position.set(5, 5, -5);
    this.scene.add(p2);
  }

  #createEnvironment() {
    // Grid Floor
    const gridHelper = new THREE.GridHelper(200, 100, 0xff00ff, 0x220044);
    gridHelper.position.y = -4;
    this.scene.add(gridHelper);
    this.grid = gridHelper;
  }

  #updateEnvironment(delta) {
    // Move grid to simulate speed
    if (this.grid) {
      this.grid.position.z += delta * 10;
      if (this.grid.position.z > 2) {
        this.grid.position.z = -2; // Loop it
      }
    }
  }

  #hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
    }
  }
}
