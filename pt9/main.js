//게임 실행 시 메인으로 실행되는 js

import { Player } from "./player.js";

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 500;


    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
        }

        update(){
            this.player.playerUpdate();
        }

        draw(cotext){
            this.player.playerDraw(cotext);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log("game =>> ",game);

    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas,height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});