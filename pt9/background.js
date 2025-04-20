class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0; 


    }

    updateLayer(){
        if(this.x < -this.width){
            this.x = 0;
        }else{
            this.x -= this.game.speed * this.speedModifier;
        }

    }

    drawLayer(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

    }
}
export class Background{
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 600;
        this.layer5image = document.getElementById('layer5');
        this.layer1 =  new Layer(this.game, this.width, this.height, 1 , this.layer5image);
        console.log("this.layer1 => ",this.layer1)
        this.backgroundLayers = [this.layer1];
    }

    updateBackground(){
        this.backgroundLayers.forEach(layer => {
            layer.updateLayer();
        })
    }

    drawBackground(context){
        this.backgroundLayers.forEach(layer => {
            layer.drawLayer(context);
        })

    }
}

//record 8:02