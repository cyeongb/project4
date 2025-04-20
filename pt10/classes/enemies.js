export const imageEnemiesObject = {
    flyingEnemy: {
      imgTagId: "enemy_fly",
      fileName: "enemy_fly.png",
      maxFrame: 5,
      spriteWidth: 60,
      spriteHeight: 44,
    },
    groundEnemy: {
      imgTagId: "enemy_plant",
      fileName: "enemy_plant.png",
      maxFrame: 1,
      spriteWidth: 60,
      spriteHeight: 87,
    },
    climbingEnemy: {
      imgTagId: "enemy_spider_big",
      fileName: "enemy_spider_big.png",
      maxFrame: 5,
      spriteWidth: 120,
      spriteHeight: 144,
    },
  };
  
  class Enemy {
    constructor(enemyTypeData) {
      // animation parameters
      this.frameX = 0;
      this.frameY = 0;
      this.fps = 20;
      this.frameInterval = 1000 / this.fps;
      this.frameTimer = 0;
  
      // set enemy type parameters
      this.width = enemyTypeData.spriteWidth;
      this.height = enemyTypeData.spriteHeight;
      this.image = document.getElementById(enemyTypeData.imgTagId);
      this.maxFrame = enemyTypeData.maxFrame;
  
      this.markedForDeletion = false;
  
      // initial values
      this.speedX = 0;
      this.speedY = 0;
    }
    update(deltaTime) {
      // movement
      this.x -= this.speedX + this.game.gameSpeed;
      this.y += this.speedY;
  
      // animation
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
      } else this.frameTimer += deltaTime;
  
      // Checks is an enemy outside the screen.
      if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(ctx) {
      if (this.game.debug) this.debugDraw(ctx);
      ctx.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  
    // own methods
    debugDraw(ctx) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
  
  export class FlyingEnemy extends Enemy {
    constructor(game) {
      super(imageEnemiesObject.flyingEnemy);
      this.game = game;
      this.x = this.game.width + Math.random() * this.game.width * 0.5;
      this.y = Math.random() * this.game.height * 0.5;
  
      this.speedX = Math.random() + 1;
      this.angle = 0;
      this.va = Math.random() * 0.1 + 0.1; // va = velocity of angle
    }
    update(deltaTime) {
      super.update(deltaTime);
      this.angle += this.va;
      this.y += Math.sin(this.angle);
    }
  }
  
  export class GroundEnemy extends Enemy {
    constructor(game) {
      super(imageEnemiesObject.groundEnemy);
      this.game = game;
      this.x = this.game.width;
      this.y = this.game.height - this.height - this.game.groundMargin;
    }
  }
  
  export class ClimbingEnemy extends Enemy {
    constructor(game) {
      super(imageEnemiesObject.climbingEnemy);
      this.game = game;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height * 0.5;
  
      this.speedY = Math.random() * 0.5 ? 1 : -1;
    }
    update(deltaTime) {
      super.update(deltaTime);
      if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
      if (this.y < -this.height) this.markedForDeletion === true;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.width * 0.5, 0);
      ctx.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5);
      ctx.stroke();
      super.draw(ctx);
    }
  }