export const EInputKeys = {
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_DOWN: "ArrowDown",
    ARROW_UP: "ArrowUp",
    ENTER: "Enter",
    DEBUG_D: "d",
  };
  
  export class InputHander {
    constructor(game) {
      this.game = game;
      this.keys = [];
      window.addEventListener("keydown", (e) => this.handleKeyDown(e));
      window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }
    handleKeyDown(e) {
      if (
        (e.key === EInputKeys.ARROW_DOWN ||
          e.key === EInputKeys.ARROW_UP ||
          e.key === EInputKeys.ARROW_LEFT ||
          e.key === EInputKeys.ARROW_RIGHT ||
          e.key === EInputKeys.ENTER) &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === EInputKeys.DEBUG_D) this.game.debug = !this.game.debug;
    }
    handleKeyUp(e) {
      if (
        e.key === EInputKeys.ARROW_DOWN ||
        e.key === EInputKeys.ARROW_UP ||
        e.key === EInputKeys.ARROW_LEFT ||
        e.key === EInputKeys.ARROW_RIGHT ||
        e.key === EInputKeys.ENTER
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    }
  }