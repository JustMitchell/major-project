// Platformer
// Matter.Common.setDecomp("poly-decomp.js");

let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;

// let decomp = require("poly-decomp");

let world;
let engine;
let player, platform1, platform2, ground, obstacle1;
let playerSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  platform1 = new Platform(width / 4, height - 50, 100, 5);
  platform2 = new Platform(width / 2, height - 100, 100, 5);
  ground = new Platform(width / 2, height - 3, width*2, 10);
  player = new Player(width/2, height - 20, 15);
  obstacle1 = new Obstacle(width / 4, height - 60, 20, 20);
 
  Engine.run(engine);
 
  World.add(world, ground);
  
}

function draw() {
  background(0);
  platform1.display();
  platform2.display();
  ground.display();
  player.movement();
  player.display();
  obstacle1.display();
  // obstacle1.killPlayer();
  // console.log(player.body.force);
}

function keyPressed() {
  player.spacePressed();
}

class Player {
  constructor (x, y, size) {
    this.body = Bodies.circle(x, y, size);
    // this.body.friction = 0.5;
    this.body.restitution = 0;
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
    // console.log(this.body.position.y, height - this.size - 10);
    
    let collision = Matter.SAT.collides(this.body, ground.body).collided;
    if(Matter.SAT.collides(this.body, platform1.body).collided || Matter.SAT.collides(this.body, platform2.body).collided) {
      collision = true;
    }
    console.log(collision);
    // if (this.body.position.y >= height - this.size - 10) {
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

    if (obstCollision === true) {
      this.body.position.x = width/2;
      this.body.position.y = height - 20;
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

    push();
    translate(pos.x, pos.y);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}