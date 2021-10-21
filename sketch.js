// Platformer

let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;

// const drawbody = Helpers.drawbody;

let world;
let engine;
let player, platform1, ground;
let isJumping = false;
let playerSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  platform1 = new Platform(width / 4, height - 50, 100, 5);
  ground = Bodies.rectangle(width / 2, height - 3, width, 10, {isStatic: true});
  player = new Player(width/2, height - 50, 20);
 
  Engine.run(engine);
 
  World.add(world, ground);
  
  
}

function draw() {
  background(0);
  platform1.display();
  // ground.display();
  player.movement();
  player.display();
  
  stroke(255);
  fill("blue");
  strokeWeight(4);
  rectMode(CENTER);
  rect(width / 2, height - 3, width, 10);
  

}

// class Player {
//   constructor (x, y, playerSize) {
//     this.x = x;
//     this.y = y;
//     this.playerSize = playerSize;
//     this.speedY = 1;
//     this.speedX = 5;
//     this.color = "red";
//     this.gravity = 0.2;
//     this.isJumping = false;
//     this.acceleration = 0.3;
//   }

//   display() {
//     fill("red");
//     rect(this.x, this.y, this.playerSize, this.playerSize);
//   }

//   movement() {
//     if (keyIsDown(68)) { //d
//       this.x += this.speedX;
//     }
//     if (keyIsDown(65)) { // a
//       this.x -= this.speedX;
//     }
//     // tp player to other size when they go off screen
//     if (this.x > windowWidth) {
//       this.x = 0;
//     }
//     if (this.x < 0) {
//       this.x = windowWidth;
//     }
  
//     //jumping
//     if (this.y === height - this.playerSize) {
//       this.gravity = 0;
//       this.isJumping = false;
//     } 
//     else {
//       this.gravity = 0.2;
//     }
  
//     if (this.y > height - this.playerSize) {
//       this.y = height - this.playerSize;
//       this.speedY = 0;
//     } 
//     else {
//       this.y += this.speedY;
//       this.speedY += this.gravity;
//     }
//   }

//   keyPressed() {
//     if (this.isJumping === false) {
//       if (keyCode === 32) {
//         this.isJumping = true;
//         console.log(isJumping);
//         this.speedY = -5;
//       }
//     }
//   }
// }
class Player {
  constructor (x, y, size) {
    this.body = Bodies.rectangle(x, y, size, size);
    this.size = size;
    this.color = "red";
    this.x = x;
    this.y = y;
    this.speedX = 2;
    World.add(world, this.body);
  }
  display () {
    let pos = this.body.position;

    strokeWeight(1);
    push();
    translate(pos.x, pos.y);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
  }
  movement () {
    if (keyIsDown(68)) { //d
      this.x += this.speedX;
    }
    if (keyIsDown(65)) { // a
      this.x -= this.speedX;
    }
  }
}


class Platform {
  constructor (x, y, width, height) {
    this.body = Bodies.rectangle(x, y, width, height, {
      isStatic: true
    });
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