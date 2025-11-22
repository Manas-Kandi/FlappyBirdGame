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

    controls.attach(() => {
      if (gameState.state === 'ready') {
        gameState.start();
        sceneManager.bird.jump();
      } else if (gameState.isPlaying()) {
        sceneManager.bird.jump();
      } else if (gameState.state === 'game-over') {
        gameState.reset();
        // Reset bird position
        sceneManager.bird.group.position.y = 0;
        sceneManager.bird.velocityY = 0;
        sceneManager.bird.group.rotation.set(0, 0, 0);
        // Reset city
        sceneManager.city.group.position.x = 0;
      }
    });

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
