class Particle{
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;

    };

    updateParticles(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;

        if(this.size < 0.5){
            this.markedForDeletion = true;
        }
    };

    drawParticle(context){

    };
};

//먼지(강쥐 달릴 때 먼지 튀는거..)
export class Dust extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    };

    drawParticle(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }

};

//물 튀김
export class Splash extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 6 - 4;
        this.speedY = Math.random() * 2 + 1;
        this.gravity = 0;
        this.image = document.getElementById('fire');
    };

    updateParticles(){
        super.updateParticles();
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    drawParticle(context){
        context.drawImage(this.image, this.x, this.y, this.size ,this.size);
    }

};

//불효과
export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this.image = document.getElementById('fire');
        this.size = Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;

    };

    updateParticles(){
        super.updateParticles();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5 );
    }

    drawParticle(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }

};
// record 9:00:51