// Platformer

let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;


let world, engine, player, platform1, platform2, platform3, platform4, ground, obstacle1, block1, jumpSound, hitSound, musicButton, backgroundMusic;
let playerSize = 20;
let isMusicPlaying = false;
let theBodies = [];

function preload () {
  jumpSound = loadSound("assets/Jump.wav");
  hitSound = loadSound("assets/hit.wav");
  backgroundMusic = loadSound("assets/Music.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // creating matter.js environment
  engine = Engine.create();
  world = engine.world;
 
  // creating objects
  platform1 = new Platform(width / 4, height - 50, 100, 5);
  theBodies.push(platform1);
  platform2 = new Platform(width / 1.5, height - 140, 100, 5);
  theBodies.push(platform2);
  platform3 = new Platform(width / 7, height - 350, 100, 5);
  theBodies.push(platform3);
  platform4 = new Platform(width / 2, height - 250, 60, 5);
  theBodies.push(platform4);
  ground = new Platform(width / 2, height - 3, width*2, 10);
  theBodies.push(ground);
  player = new Player(width/2, height - 20, 15);
  obstacle1 = new Obstacle(width / 4, height - 60, 20, 20);
  block1 = new Block(width / 7, height - 350, 30);
  theBodies.push(block1);
  musicButton = new Button (0, 0, width / 10, height / 20);
 
  Engine.run(engine);

}

function draw() {
  background(0);
  player.movement();
  player.display();
  player.hitObstacle();
  obstacle1.display();
  musicButton.display();
  for (let someBody of theBodies) {
    someBody.display();
  }
}

function keyPressed() {
  player.spacePressed();
}

class Player {
  constructor (x, y, size) {
    this.body = Bodies.circle(x, y, size);
    this.body.restitution = 0.5;
    this.body.friction = 0.5;
    this.size = size;
    this.color = "green";
    this.x = x;
    this.y = y;
    this.speedX = 2;
    this.isJumping = false;
    this.hit = false;
    World.add(world, this.body);
  }
  display () {

    let pos = this.body.position;
    let angle = this.body.angle;

    // syncing p5.js shapes to matter.js
    push();
    translate(pos.x, pos.y);
    fill(this.color);
    rotate(angle);
    circle(0, 0, this.size*2);
    pop();
  }
  movement () {
    if (keyIsDown(68)) { //d
      Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y}, {x:0.001, y:0});
    }
    else if (keyIsDown(65)) { // a
      Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y}, {x:-0.001, y:0});
    }
    
    // jumping 
    let collision = false;
    for (let someBody of theBodies) {
      if (Matter.SAT.collides(this.body, someBody.body).collided) {
        collision = true;
      }
      if (collision === true) {
        this.isJumping = false;
      }
    }
  }
  spacePressed() {
    if (this.isJumping === false) {
      if (keyCode === 32) {
        this.isJumping = true;
        jumpSound.play();
        Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y}, {x:0, y:-0.02});
      }
    }
  }
  hitObstacle() {
    let obstCollision = Matter.SAT.collides(this.body, obstacle1.body).collided;
  
    // die if obstacle hit
    if (obstCollision === true) {
      hitSound.play();
      Body.set(this.body, "position", {x: width/2, y: height - 20});
      Body.set(block1.body, "position", {x: width/7, y: height - 100});
    }
  }
}

class Platform {
  constructor (x, y, width, height) {
    this.body = Bodies.rectangle(x, y, width, height, {isStatic: true});
    this.body.friction = 0.3;
    this.body.restitution = 0;
    this.w = width;
    this.h = height;
    this.color = "white";
    World.add(world, this.body);

  }
  display() {

    let pos = this.body.position;

    // syncing p5.js shapes to matter.js
    push();
    translate(pos.x, pos.y);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

class Obstacle {
  constructor (x, y, width, height) {
    this.body = Bodies.rectangle(x,y,width,height, {isStatic: true});
    this.color = "purple";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.hit = false;
    World.add(world, this.body);
  }
  display() {

    let pos = this.body.position;

    // syncing p5.js shapes to matter.js
    push();
    translate(pos.x, pos.y);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}

class Block {
  constructor (x, y, size) {
    this.body = Bodies.rectangle(x, y, size, size);
    this.body.friction = 0.01;
    this.color = "brown";
    this.size = size;
    World.add(world, this.body);
  }
  display () {

    let pos = this.body.position;
    let angle = this.body.angle;
    // syncing p5.js shapes to matter.js
    push();
    translate(pos.x, pos.y);
    fill(this.color);
    rectMode(CENTER);
    rotate(angle);
    rect(0, 0, this.size, this.size);
    pop();
  }
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.hoverColor = "#dccfec";
    this.notHoveredColor = "#4f517d";
  }

  display() {
    if (this.checkIfInside(mouseX, mouseY)) {
      fill(this.hoverColor);
    }
    else {
      fill(this.notHoveredColor);
    }
    rect(this.x, this.y, this.width, this.height);
    textSize(20);
    fill("white");
    text("Music!", this.x + 2, this.y + 25);
  }

  checkIfInside(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}

function mousePressed() {
  if (musicButton.checkIfInside(mouseX, mouseY)) {
    isMusicPlaying =  !isMusicPlaying;
  }
  if (isMusicPlaying === true) {
    backgroundMusic.loop();
  }
  else {
    backgroundMusic.pause();
  }
}