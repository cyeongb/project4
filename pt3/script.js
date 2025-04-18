/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberEnemies = 10;
const enemiesArr=[];

// const enemyImage = new Image();
// enemyImage.src='../assets/enemy1.png'

let gameFrame = 0;

class Enemy{
  constructor(){
    this.image = new Image();
    this.image.src = '../assets/img/enemy4.png'
    this.speed = Math.random() * 4+1;  //-2 ~ +2 
    this.spriteWidth = 213;
    this.spriteHeight = 213;

    this.width = this.spriteWidth/2;
    this.height = this.spriteHeight/2;
    this.x = Math.random() * (canvas.width - this.width);
    this.newX = Math.random() * (canvas.width - this.width);
    this.y =  Math.random() * (canvas.height - this.height);
    this.newY =  Math.random() * (canvas.height - this.height);

    this.frame = 0; //첫번째 스프라이트
    this.flapSpeed = Math.floor(Math.random()*3+1); 
    this.interval = Math.floor(Math.random()*200+50);
    // this.angle = Math.random() * 2;
    // this.angle = Math.random() *500;
    // this.angleSpeed = Math.random() * 0.5+0.5;
    // this.curve = Math.random()*200+50;
  }

  update(){
    if(gameFrame % this.interval === 0){
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY =  Math.random() * (canvas.height - this.height);
    }

    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    this.x -= dx/70;
    this.y -= dy/20;
    // this.x = canvas.width/2* Math.sin(this.angle * Math.PI/90)+(canvas.width/2-this.width/2);
    // this.y = canvas.height/2* Math.cos(this.angle * Math.PI/90)+(canvas.height/2-this.height/2);
    // this.x = 0;
    // this.y = 0;
    // this.angle += this.angleSpeed;
    if(this.x + this.width <0){ this.x = canvas.width;}
    if(gameFrame % this.flapSpeed === 0){ // 속도조정
      this.frame > 4 ? this.frame = 0 : this.frame ++ ;
    }
  }

  draw(){
    // ctx.strokeRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth, this.spriteHeight, //위치, 스프라이트 크기
      this.x, this.y, this.width,this.height);  //퍼지는 경로
  }
};

for(let i =0;i<numberEnemies;i++){
  enemiesArr.push(new Enemy());
}

console.log(enemiesArr);


function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  enemiesArr.forEach((enemy)=>{
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

//2:24:59

animate();








