const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// const CANVAS_WIDTH = (canvas.width = 500);
// const CANVAS_HEIGHT = (canvas.height = 700);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
let gameOver = false;
ctx.font = '50px Impact';


let ravens = [];

//까마귀 몹
class Raven{
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random()*0.6 + 0.4;
        
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random()* canvas.height - this.height;
        this.directionX = Math.random()*5+3;
        
        this.directionY = Math.random()*5-2.5;
        this.markedForDelete = false;
        this.image = new Image();
        this.image.src = '../assets/img/raven.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap =0;  
        
        this.flapInterval = Math.random()*50+50;  
        this.randomColors = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),
            Math.floor(Math.random()*255)];
        this.color = 'rgb('+this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')';
        this.hasTrail = Math.random() > 0.5;
    }

    update(deltaTime){ //?
        if(this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY *-1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if(this.x <0 -this.width){this.markedForDelete = true;}
        this.timeSinceFlap += deltaTime;
        if(this.timeSinceFlap > this.flapInterval){
            if( this.frame>this.maxFrame){ this.frame =0;}
            else{ this.frame++; };
            this.timeSinceFlap = 0; 
            if(this.hasTrail){
                for(let i=0;i<5;i++){
                    particles.push(new Particle(this.x,this.y,this.width,this.color))
                }
            }
        };
        if(this.x < 0 - this.width){
            gameOver = true;
        }
    }


    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x ,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth,this.spriteHeight,
            this.x,this.y,this.width,this.height);
    }
};

let explosions = [];

// 폭발효과 
class Explosions {
    constructor(x,y,size) {
        this.image = new Image();
        this.image.src = '../assets/img/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = '../assets/audio/boom2.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 70;
        this.markedForDelete = false;
    }
//3:34:23
    update(deltaTime){
        if(this.frame === 0){ this.sound.play(); };
        this.timeSinceLastFrame += deltaTime;
        if(this.timeSinceLastFrame > this.frameInterval){ 
            this.frame ++; 
            this.timeSinceLastFrame = 0;
            // console.log("this.frame=>",this.frame)
            if(this.frame >5){
                this.markedForDelete = true;
            }
        };

    }

    draw(){
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
            this.x,this.y - this.size/4,this.size,this.size);
    }
}

let particles = [];

// raven 몹 지나가는 trail 만들기
class Particle{
    constructor(x, y, size, color){
        this.size = size;
        this.x = x + this.size/2 + Math.random()*50 - 25;
        this.y = y + this.size/3 + Math.random()*50 - 25;
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random() *20 + 35;
        this.markedForDelete = false;
        this.speedX = Math.random() *1 + 0.5;
        this.color = color;
    }

    update(){
        this.x += this.speedX;
        this.radius += 0.7;
        if(this.radius > this.maxRadius - 5){
            this.markedForDelete = true;
        }
    }

    draw(){
        ctx.save();
        ctx.globalAlpha = 1 - this.radius/this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore(){
    ctx.fillStyle = '#000';
    ctx.fillText('점수 : '+score,50,75);
    ctx.fillStyle = '#fff';
    ctx.fillText('점수 : '+score,55,80);
}

function drawGameOver(){
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('Game Over  최종점수: '+score,canvas.width/2-5,canvas.height/2-5);
    ctx.fillStyle = '#fff';
    ctx.fillText('Game Over  최종점수: '+score,canvas.width/2,canvas.height/2);
}

window.addEventListener('click',function(e){
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    console.log("detectPixelColor=>",detectPixelColor);
    const pc = detectPixelColor.data;
    console.log("pc =>",pc);
    ravens.forEach(obj=>{ //색상비교
        if(obj.randomColors[0] === pc[0] && obj.randomColors[1] === pc[1] &&  obj.randomColors[2] === pc[2] ){
            obj.markedForDelete = true;
            console.log('obj =>',obj)
            score++;

            //충돌시 효과 추가
            explosions.push(new Explosions(obj.x,obj.y,obj.width));

        }
    });
})



function animate(timeStamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime = timeStamp - lastTime; //?
    lastTime = timeStamp;
    timeToNextRaven += deltaTime;

    if(timeToNextRaven>ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function(a,b){ // 작은걸 뒤로
            return a.width - b.width;
        });
    };
    drawScore();
    [...particles, ...ravens, ...explosions].forEach(obj => obj.update(deltaTime));
    [...particles, ...ravens, ...explosions].forEach(obj => obj.draw());
    ravens = ravens.filter(obj => !obj.markedForDelete); //?
    explosions = explosions.filter(obj => !obj.markedForDelete); //?
    particles = particles.filter(obj => !obj.markedForDelete); //?
    if(!gameOver){
        requestAnimationFrame(animate);
    }else{
        drawGameOver();
    }
}

animate(0);

