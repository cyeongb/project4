/** @type {HTMLCanvasElement} */

import { Game } from "./classes/game.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
console.log(`Canvas width: ${canvas.height}, Canvas height: ${canvas.width}`);

window.addEventListener("load", () => {
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    game.update(deltaTime);
    game.draw(ctx, deltaTime);

    if (!game.gameOver) requestAnimationFrame(animate);
  };
  animate(0);
});