export class FloatingMsg {
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x;
        this.y = y;

        this.targetX = targetX;
        this.targetY = targetY;

        this.markedForDeletion = false;
        this.timer = 0;

    };

    updateFloating(){
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03;

        this.timer ++;
        if(this.timer > 100){
            this.markedForDeletion = true;
        }
    };

    drawFloating(context){
        context.font = '20px Special Gothic Expanded One';
        context.fillStyle = '#fff';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = '#000';
        context.fillText(this.value, this.x + 2, this.y + 2);
    };
}