import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { Bird } from './Bird.js';
import { CityGenerator } from './City.js';

const CAMERA_CONFIG = {
  fov: 50, // Slightly narrower for a more cinematic/portrait feel
  near: 0.1,
  far: 100,
  startPosition: new THREE.Vector3(0, 1, 10),
};

const LIGHTING_CONFIG = {
  ambient: 0.6,
  directional: 1.2,
  directionalColor: 0xfff0dd, // Warm white
  fogColor: 0xf0f0f0, // Soft white/grey
  fogDensity: 0.035,
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
      antialias: true, // True for smoother edges in minimal style
      alpha: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

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

    // Post-processing setup (Subtle bloom for softness)
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, // Very low strength, just for softness
      0.8, // radius
      0.9  // threshold
    );
    this.composer.addPass(bloomPass);

    this.bird = new Bird();
    this.city = new CityGenerator();

    this.overlay = document.getElementById('loadingOverlay');

    // No environment grid anymore
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
  }

  /** Renders the scene. */
  render() {
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
    directional.shadow.bias = -0.0001;
    this.scene.add(directional);

    // Soft fill light from opposite side
    const fillLight = new THREE.DirectionalLight(0xeef0ff, 0.5);
    fillLight.position.set(-10, 10, -10);
    this.scene.add(fillLight);
  }

  #hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
    }
  }
}
