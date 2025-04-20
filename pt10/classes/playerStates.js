import { EInputKeys } from "./input.js";
import { Dust, Fire, Splash } from "./particles.js";
import { imagePlayerObject } from "./player.js";

/**
 * Represents the order of the states[] in the player class.
 */
export const EStates = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

export const EAnimatioStates = {
  SITTING: "SITTING",
  RUNNING: "RUNNING",
  JUMPING: "JUMPING",
  FALLING: "FALLING",
  ROLLING: "ROLLING",
  DIVING: "DIVING",
  HIT: "HIT",
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(game) {
    super(EAnimatioStates.SITTING, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Sitting.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Sitting.maxFrame;
  }
  handleInput(inputKeys) {
    if (inputKeys.includes(EInputKeys.ARROW_LEFT) || inputKeys.includes(EInputKeys.ARROW_RIGHT)) {
      this.game.player.setState(EStates.RUNNING, 1);
    } else if (inputKeys.includes(EInputKeys.ENTER)) {
      this.game.player.setState(EStates.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(game) {
    super(EAnimatioStates.RUNNING, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Running.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Running.maxFrame;
  }
  handleInput(inputKeys) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    );
    if (inputKeys.includes(EInputKeys.ARROW_DOWN)) {
      this.game.player.setState(EStates.SITTING, 0);
    } else if (inputKeys.includes(EInputKeys.ARROW_UP)) {
      this.game.player.setState(EStates.JUMPING, 1);
    } else if (inputKeys.includes(EInputKeys.ENTER)) {
      this.game.player.setState(EStates.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super(EAnimatioStates.JUMPING, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Jumping.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Jumping.maxFrame;
    if (this.game.player.onGround()) this.game.player.vy -= this.game.player.maxJumpHeight;
  }
  handleInput(inputKeys) {
    if (this.game.player.isFalling()) {
      this.game.player.setState(EStates.FALLING, 1);
    } else if (inputKeys.includes(EInputKeys.ENTER)) {
      this.game.player.setState(EStates.ROLLING, 2);
    } else if (inputKeys.includes(EInputKeys.ARROW_DOWN)) {
      this.game.player.setState(EStates.DIVING, 0);
    }
  }
}

export class Falling extends State {
  constructor(game) {
    super(EAnimatioStates.FALLING, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Falling.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Falling.maxFrame;
  }
  handleInput(inputKeys) {
    if (this.game.player.onGround()) {
      this.game.player.setState(EStates.RUNNING, 1);
    } else if (inputKeys.includes(EInputKeys.ARROW_DOWN)) {
      this.game.player.setState(EStates.DIVING, 0);
    }
  }
}

export class Rolling extends State {
  constructor(game) {
    super(EAnimatioStates.ROLLING, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Rolling.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Rolling.maxFrame;
  }
  handleInput(inputKeys) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (!inputKeys.includes(EInputKeys.ENTER) && this.game.player.onGround()) {
      this.game.player.setState(EStates.RUNNING, 1);
    } else if (!inputKeys.includes(EInputKeys.ENTER) && !this.game.player.onGround()) {
      this.game.player.setState(EStates.FALLING, 1);
    } else if (
      inputKeys.includes(EInputKeys.ENTER) &&
      inputKeys.includes(EInputKeys.ARROW_UP) &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= this.game.player.maxJumpHeight;
    } else if (inputKeys.includes(EInputKeys.ARROW_DOWN) && !this.game.player.onGround()) {
      this.game.player.setState(EStates.DIVING, 0);
    }
  }
}
export class Diving extends State {
  constructor(game) {
    super(EAnimatioStates.DIVING, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Rolling.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Rolling.maxFrame;
    this.game.player.vy = 15;
  }
  handleInput(inputKeys) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(EStates.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.width * 0.5
          )
        );
      }
    } else if (inputKeys.includes(EInputKeys.ENTER) && !this.game.player.onGround()) {
      this.game.player.setState(EStates.ROLLING, 2);
    }
  }
}
export class Hit extends State {
  constructor(game) {
    super(EAnimatioStates.HIT, game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = imagePlayerObject.movements.Hit.frameY;
    this.game.player.maxFrame = imagePlayerObject.movements.Hit.maxFrame;
  }
  handleInput(inputKeys) {
    if (this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) {
      this.game.player.setState(EStates.RUNNING, 1);
    } else if (
      this.game.player.frameX >= this.game.player.maxFrame &&
      !this.game.player.onGround()
    ) {
      this.game.player.setState(EStates.FALLING, 1);
    }
  }
}