export class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 30;
      this.fontFamily = "Helvetica";
    }
    draw(ctx) {
      ctx.save();
      // To use the built-in shadow of the canvas, it is better to write the text twice with a 2px offset.
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = "white";
      ctx.shadowBlur = 0;
  
      ctx.font = `${this.fontSize}px ${this.fontFamily}`;
      ctx.textAlign = "left";
      ctx.fillStyle = this.game.fontColor;
  
      // score
      ctx.fillText("Score: " + this.game.score, 20, 50);
  
      // Timer
      ctx.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
      ctx.fillText(`Time: ${(this.game.gameTimer * 0.001).toFixed(1)}`, 20, 80);
  
      // game over message
      if (this.game.gameOver) {
        ctx.textAlign = "center";
        ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
  
        if (this.game.score > this.game.winPoints) {
          ctx.fillText("Boo-yah", this.game.width * 0.5, this.game.height * 0.5 - 20);
          ctx.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
          ctx.fillText(
            "What are creatures of the night afraid of? YOU!!!",
            this.game.width * 0.5,
            this.game.height * 0.5 + 20
          );
        } else {
          ctx.fillText("Love at first bite?", this.game.width * 0.5, this.game.height * 0.5 - 20);
          ctx.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
          ctx.fillText(
            "Nope. Better luck next time!",
            this.game.width * 0.5,
            this.game.height * 0.5 + 20
          );
        }
      }
      ctx.restore();
    }
  }