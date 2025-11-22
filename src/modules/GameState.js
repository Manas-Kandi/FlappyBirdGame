const UI_IDS = {
  score: 'scoreDisplay',
  startCard: 'startCard',
  gameOverCard: 'gameOverCard',
  finalScore: 'finalScore',
};

const GAME_STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  GAME_OVER: 'game-over',
};

export class GameState {
  constructor() {
    this.state = GAME_STATES.READY;
    this.score = 0;

    this.scoreDisplay = document.getElementById(UI_IDS.score);
    this.startCard = document.getElementById(UI_IDS.startCard);
    this.gameOverCard = document.getElementById(UI_IDS.gameOverCard);
    this.finalScore = document.getElementById(UI_IDS.finalScore);

    this.#updateUI();
  }

  start() {
    this.state = GAME_STATES.PLAYING;
    this.score = 0;
    this.#updateUI();
  }

  endGame() {
    this.state = GAME_STATES.GAME_OVER;
    this.#updateUI();
  }

  addScore(amount = 1) {
    this.score += amount;
    this.#updateScoreUI();
  }

  reset() {
    this.state = GAME_STATES.READY;
    this.score = 0;
    this.#updateUI();
  }

  isPlaying() {
    return this.state === GAME_STATES.PLAYING;
  }

  #updateUI() {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = String(this.score);
    }

    if (this.startCard) {
      this.startCard.classList.toggle('hidden', this.state !== GAME_STATES.READY);
    }

    if (this.gameOverCard) {
      this.gameOverCard.classList.toggle('hidden', this.state !== GAME_STATES.GAME_OVER);
    }

    if (this.finalScore) {
      this.finalScore.textContent = `Score: ${this.score}`;
    }
  }

  #updateScoreUI() {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = String(this.score);
    }

    if (this.finalScore && this.state === GAME_STATES.GAME_OVER) {
      this.finalScore.textContent = `Score: ${this.score}`;
    }
  }
}
