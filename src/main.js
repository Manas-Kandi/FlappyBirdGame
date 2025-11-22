import './style.css';
import { SceneManager } from './modules/Scene.js';
import { GameState } from './modules/GameState.js';
import { Controls } from './modules/Controls.js';

const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS;

const sceneManager = new SceneManager();
const gameState = new GameState();
const controls = new Controls();

let lastTime = 0;

async function init() {
  try {
    await sceneManager.init();
    controls.attach();
    window.addEventListener('resize', () => sceneManager.handleResize());
    requestAnimationFrame(loop);
  } catch (error) {
    console.error('Failed to initialize game', error);
  }
}

function loop(timestamp) {
  const delta = timestamp - lastTime;

  if (delta >= FRAME_DURATION) {
    sceneManager.update(delta, gameState);
    sceneManager.render();
    lastTime = timestamp;
  }

  requestAnimationFrame(loop);
}

init();
