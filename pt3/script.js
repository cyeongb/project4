/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
const numberEnemies = 100;
const enemiesArr=[];

const enemyImage = new Image();
enemyImage.src='../assets/enemy1.png'

let gameFrame = 0;

class Enemy{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y =  Math.random()*canvas.height;
    this.speed = Math.random()*4-2;  //-2 ~ +2 
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth/2.5;
    this.height = this.spriteHeight/2.5;
    this.frame = 0; //첫번째 스프라이트
  }

  update(){
    this.x += this.speed;
    this.y += this.speed;
    if(gameFrame % 2 == 0){ // 속도조정
      this.frame > 4 ? this.frame = 0 : this.frame ++ ;
    }
  }

  draw(){
    ctx.strokeRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(enemyImage,this.frame * this.spriteWidth,0,this.spriteWidth, this.spriteHeight, //위치, 스프라이트 크기
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

//1:48:13

animate();








