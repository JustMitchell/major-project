// Platformer

let player, platform1;
let isJumping = false;
let playerSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width/2, height - playerSize, playerSize);
  platform1 = new Platform(width / 4, height - 50, 100, 5);
}

function draw() {
  background(220);
  player.display();
  player.movement();
  player.keyPressed();
  platform1.display();
}

class Player {
  constructor (x, y, playerSize) {
    this.x = x;
    this.y = y;
    this.playerSize = playerSize;
    this.speedY = 1;
    this.speedX = 5;
    this.color = "red";
    this.gravity = 0.2;
    this.isJumping = false;
    this.acceleration = 0.3;
  }

  display() {
    fill("red");
    rect(this.x, this.y, this.playerSize, this.playerSize);
  }

  movement() {
    if (keyIsDown(68)) { //d
      this.x += this.speedX;
    }
    if (keyIsDown(65)) { // a
      this.x -= this.speedX;
    }
    // tp player to other size when they go off screen
    if (this.x > windowWidth) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = windowWidth;
    }
  
    //jumping
    if (this.y === height - this.playerSize) {
      this.gravity = 0;
      this.isJumping = false;
    } 
    else {
      this.gravity = 0.2;
    }
  
    if (this.y > height - this.playerSize) {
      this.y = height - this.playerSize;
      this.speedY = 0;
    } 
    else {
      this.y += this.speedY;
      this.speedY += this.gravity;
    }
  }

  keyPressed() {
    if (this.isJumping === false) {
      if (keyCode === 32) {
        this.isJumping = true;
        console.log(isJumping);
        this.speedY = -5;
      }
    }
  }
}

class Platform {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "blue";
  }
  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}