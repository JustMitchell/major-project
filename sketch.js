// Platformer

let player;
let isJumping = false;
let diameter = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width/2, height - diameter, 20);
}

function draw() {
  background(220);
  player.display();
  player.movement();
}

class Player {
  constructor (x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speedY = 1;
    this.speedX = 5;
    this.color = "red";
    this.gravity = 0.2;
    this.isJumping = false;
  }
  display() {
    fill("red");
    rect(this.x, this.y, this.diameter, this.diameter);
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
    // jumping
    if (this.y === height - this.diameter) {
      this.gravity = 0;
      this.isJumping = false;
    } 
    else {
      this.gravity = 0.2;
    }
  
    if (this.y > height - this.diameter) {
      this.y = height - this.diameter;
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
        console.log(this.isJumping);
        this.speedY = -5;
      }
    }
  }
}