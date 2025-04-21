export class UI{
    constructor(game) {
        this.game = game;
        this.fontSize = 35;
        this.fontFamily = 'Special Gothic Expanded One';
    }

    drawUI(context){
        context.save();
        
        // 점수 글자부분 shadow 처리
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = '#fff';
        context.shadowBlur = 0;

        context.font = this.fontSize + ' px'+this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle - this.game.fontColor;
        console.log("this.game.score =>>",this.game.score);  //undefined

        //점수
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Score : '+this.game.score, 20, 50);
        
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;

        context.fillText('Time : '+(this.game.time * 0.001).toFixed(1), 20, 80);

        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px '+ this.fontFamily;
            if(this.game.score > 5){
                context.fillText('게임오버 : ( ',this.game.width * 0.5, this.game.height * 0.5 - 20);    
                context.font = this.fontSize * 0.7 + 'px '+ this.fontFamily;
                context.fillText('한 판 더함???????????????? ',this.game.width * 0.5, this.game.height * 0.5 + 20);
            }else{
                context.fillText('게임오버 : ( ',this.game.width * 0.5, this.game.height * 0.5 - 20);    
                context.font = this.fontSize * 0.7 + 'px '+ this.fontFamily;
                context.fillText('한 판 더함???????????????? ',this.game.width * 0.5, this.game.height * 0.5 + 20);
                //보고 필요없으면 하나로 합치기..
            }
        }
        context.restore();
    }
}