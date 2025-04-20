const imageBackroundObjects = {
    imageWidth: 1667,
    imageHeight: 500,
    images: {
      layer1: { imgTagId: "layer1", filename: "layer-1.jpg" },
      layer2: { imgTagId: "layer2", filename: "layer-2.jpg" },
      layer3: { imgTagId: "layer3", filename: "layer-3.jpg" },
      layer4: { imgTagId: "layer4", fileName: "layer-4.png" },
      layer5: { imgTagId: "layer5", fileName: "layer-5.png" },
    },
  };
  
  class Layer {
    constructor(game, width, height, speedModfier, image) {
      this.game = game;
      this.width = width;
      this.height = height;
      this.speedModfier = speedModfier;
      this.image = image;
  
      this.x = 0;
      this.y = 0;
    }
    update() {
      if (this.x < -this.width) this.x = 0;
      else this.x -= this.game.gameSpeed * this.speedModfier;
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }
  
  export class Background {
    constructor(game) {
      this.game = game;
      this.width = imageBackroundObjects.imageWidth;
      this.height = imageBackroundObjects.imageHeight;
  
      this.layer5image = document.getElementById(imageBackroundObjects.images.layer5.imgTagId);
      this.layer4image = document.getElementById(imageBackroundObjects.images.layer4.imgTagId);
      this.layer3image = document.getElementById(imageBackroundObjects.images.layer3.imgTagId);
      this.layer2image = document.getElementById(imageBackroundObjects.images.layer2.imgTagId);
      this.layer1image = document.getElementById(imageBackroundObjects.images.layer1.imgTagId);
  
      this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
      this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
      this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
      this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);
      this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
  
      this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
    }
    update() {
      this.backgroundLayers.forEach((layer) => {
        layer.update();
      });
    }
    draw(ctx) {
      this.backgroundLayers.forEach((layer) => {
        layer.draw(ctx);
      });
    }
  }