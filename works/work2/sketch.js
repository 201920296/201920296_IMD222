let paths = [];
let painting = false;
let next = 0;
let current;
let previous;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  
  current = createVector(0,0);
  previous = createVector(0,0);
};

function draw() {
  background(250);
  if (millis() > next && painting) {
   
    current.x = mouseX;
    current.y = mouseY;

    let force = p5.Vector.sub(current, previous);
    force.mult(0.05);
    paths[paths.length - 1].add(current, force);
    next = millis() + random(100);
    previous.x = current.x;
    previous.y = current.y;
  }

  for( let i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

function mouseReleased() {
  painting = false;
}

class Path {
  constructor() {
    this.particles = [];
    this.hue = random(100);
  }

  add(position, force) {
    this.particles.push(new Particle(position, force, this.hue));
  }
  
  update() {  
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }  
  
  display() {    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].display(this.particles[i+1]);
      }
    }
  
  }  
}

class Particle {
  constructor(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    this.drag = 0.95;
    this.lifespan = 255;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(this.drag);
    this.lifespan--;
  }

  display(other) {
    stroke(0, this.lifespan);
    fill(0, this.lifespan/2);    
    ellipse(this.position.x,this.position.y, 8, 8);    
    if (other) {
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }
}
