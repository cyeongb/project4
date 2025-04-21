export class UI{
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }

    drawUI(context){
        context.font = this.fontSize + 'px'+this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle - this.game.fontColor;

        //점수
        context.fillText('Score : '+this.game.score,20,50);
        //???
    }
}