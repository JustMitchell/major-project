// Platformer

let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;


let world;
let engine;
let player, platform1, platform2, ground, obstacle1, block1;
let playerSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // creating matter.js environment
  engine = Engine.create();
  world = engine.world;
 
  // creating objects
  platform1 = new Platform(width / 4, height - 50, 100, 5);
  platform2 = new Platform(width / 1.5, height - 140, 100, 5);
  ground = new Platform(width / 2, height - 3, width*2, 10);
  player = new Player(width/2, height - 20, 15);
  obstacle1 = new Obstacle(width / 4, height - 60, 20, 20);
  block1 = new Block(width / 7, height - 100, 30);
 
  Engine.run(engine);
  engine.world.gravity.y = 1;
}

function draw() {
  background(0);
  platform1.display();
  platform2.display();
  ground.display();
  player.movement();
  player.display();
  player.hitObstacle();
  obstacle1.display();
  block1.display();
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
    let collision = Matter.SAT.collides(this.body, ground.body).collided;
    if(Matter.SAT.collides(this.body, platform1.body).collided || Matter.SAT.collides(this.body, platform2.body).collided || Matter.SAT.collides(this.body, block1.body).collided) {
      collision = true;
    }
  
    if (collision === true) {
      this.isJumping = false;
    }
  }
  spacePressed() {
    if (this.isJumping === false) {
      if (keyCode === 32) {
        this.isJumping = true;
        Body.applyForce(this.body, {x:this.body.position.x, y:this.body.position.y}, {x:0, y:-0.02});
      }
    }
  }
  hitObstacle() {
    let obstCollision = Matter.SAT.collides(this.body, obstacle1.body).collided;
  
    // die if obstacle hit
    if (obstCollision === true) {
      Body.set(this.body, "position", {x: width/2, y: height - 20});
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