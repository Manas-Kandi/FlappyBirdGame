/**
 * Handles user input (keyboard, mouse, touch) and exposes event hooks.
 */
export class Controls {
  constructor() {
    this.isAttached = false;
    this.handlers = [];
  }

  attach(onJump) {
    if (this.isAttached) return;

    const jumpHandler = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (onJump) onJump();
      }
    };

    const clickHandler = (event) => {
      event.preventDefault();
      if (onJump) onJump();
    };

    window.addEventListener('keydown', jumpHandler);
    window.addEventListener('pointerdown', clickHandler);

    this.handlers.push(['keydown', jumpHandler]);
    this.handlers.push(['pointerdown', clickHandler]);

    this.isAttached = true;
  }

  detach() {
    if (!this.isAttached) return;

    this.handlers.forEach(([type, handler]) => {
      window.removeEventListener(type, handler);
    });

    this.handlers = [];
    this.isAttached = false;
  }
}
