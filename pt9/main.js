//게임 실행 시 메인으로 실행되는 js

import { Player } from "./player.js";
import {InputHandler} from "./input.js";

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;


    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();
        }

        update(deltaTime){
            this.player.playerUpdate(this.input.keys , deltaTime);
        }

        draw(cotext){
            this.player.playerDraw(cotext);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log("game =>> ",game);

    let lastTime = 0;


    function animate(timeStamp){  //requestAnimationFrame 에 의해 생성되는 timeStamp
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;   //??
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});