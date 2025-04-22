export class UI{
    constructor(game) {
        this.game = game;
        this.fontSize = 35;
        this.fontFamily = 'Special Gothic Expanded One';
        this.lives = document.getElementById('heart');
    }

    drawUI(context){
        context.save();
        
        // 점수 글자부분 shadow 처리
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = '#fff';
        context.shadowBlur = 0;

        context.font = this.fontSize + 'px ' + this.fontFamily;  // 수정: 'px' 앞 공백 수정
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;  // 수정: - 대신 = 사용
        
        //점수
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Score : ' + this.game.score, 20, 50);
        
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time : ' + (this.game.time * 0.001).toFixed(1), 20, 80);

        //목숨 5개
        for(let i = 0; i < this.game.lives; i++){
            context.drawImage(this.lives, 20 * i + 25, 95, 25, 25 );
        }

        // 현재 속도 표시 (1분마다 증가하는 것 확인용)
        context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily;
        context.fillText('Speed : ' + this.game.maxSpeed.toFixed(1), 20, 120);

        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px '+ this.fontFamily;
            context.fillText('게임오버 : ( ',this.game.width * 0.5, this.game.height * 0.5 - 20);    
            context.font = this.fontSize * 0.7 + 'px '+ this.fontFamily;
            context.fillText('한 판 더함???????????????? ',this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
        context.restore();
    }
}