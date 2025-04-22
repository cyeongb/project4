export class UI{
    constructor(game,canvas) {
        this.game = game;
        this.fontSize = 35;
        this.fontFamily = 'Special Gothic Expanded One';
        this.lives = document.getElementById('heart');
  
        // 리스타트 버튼 설정
        this.restartButton = {
            x: this.game.width * 0.5 - 100,
            y: this.game.height * 0.5 + 60,
            width: 200,
            height: 50,
            color: '#4CAF50',
            hoverColor: '#45a049',
            isHovered: false
        };

        // 마우스 이벤트 리스너 추가
        canvas.addEventListener('mousemove', (e) => {
            if(this.game.gameOver) {
                const rect = canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                // 버튼 호버 상태 체크
                this.restartButton.isHovered = 
                    mouseX >= this.restartButton.x && 
                    mouseX <= this.restartButton.x + this.restartButton.width &&
                    mouseY >= this.restartButton.y && 
                    mouseY <= this.restartButton.y + this.restartButton.height;
                
                // 커서 변경
                canvas.style.cursor = this.restartButton.isHovered ? 'pointer' : 'default';
            }
        });
        
        canvas.addEventListener('click', (e) => {
            if(this.game.gameOver && this.restartButton.isHovered) {
                this.restartGame();
            }
        });
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
        context.fillText('Score : '+this.game.score, 20, 50);
        
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time : '+(this.game.time * 0.001).toFixed(1), 20, 80);

        //목숨 5개
        for(let i = 0; i < this.game.lives; i++){
            context.drawImage(this.lives, 20 * i + 25, 95, 25, 25 );
        }

        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px '+ this.fontFamily;
            context.fillText('G A M E   O V E R : ( ',this.game.width * 0.5, this.game.height * 0.5 - 20);    
            context.font = this.fontSize * 0.7 + 'px '+ this.fontFamily;
            context.fillText('한 판 더함???????????????? ',this.game.width * 0.5, this.game.height * 0.5 + 20);
            
            // 리스타트 버튼 그리기 - 이 부분이 빠져있었습니다!
            this.drawRestartButton(context);
        }
        context.restore();
    }
    
    //리스타트
    drawRestartButton(context) {
        // 버튼 배경
        context.fillStyle = this.restartButton.isHovered ? this.restartButton.hoverColor : this.restartButton.color;
        context.fillRect(this.restartButton.x, this.restartButton.y, this.restartButton.width, this.restartButton.height);
        
        // 버튼 텍스트
        context.fillStyle = '#ffffff';
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.textAlign = 'center';
        context.fillText('RESTART', this.restartButton.x + this.restartButton.width/2, this.restartButton.y + this.restartButton.height/2 + 10);
    }
    
    restartGame() {
        // 게임 재시작 이벤트 발생
        const restartEvent = new CustomEvent('restartGame');
        window.dispatchEvent(restartEvent);
    }
}