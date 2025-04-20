// 플레이어 정의
export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
    }

    playerUpdate(){
        // this.x++;
    }

    playerDraw(context){
     
        // context.drawImage(this.image, sx, sy, sw, sh, 
        //     this.x, this.y, this.width, this.height);
        context.drawImage(this.image, 0, 0, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }
}