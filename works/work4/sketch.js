
let squareX, squareY;
let circleX, circleY;
let squareSize = 90;
let circleSize = 93;

let squareColor;
let circleColor;
let baseColor;

let squareOver = false;
let circleOver = false;

function setup() {
  let boundingRects = document
  .getElementById("p5Canvas")
  .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  
  squareColor = color(0);
  circleColor = color(255);
  baseColor = color(102);
  circleX = width/2+circleSize/2+10;
  circleY = height/2;
  squareX = width/2-squareSize-10;
  squareY = height/2-squareSize/2;
}

function draw() {
  update(mouseX, mouseY);

  noStroke();
  if (squareOver) {
    background(squareColor);
  } else if (circleOver) {
    background(circleColor);
  } else {
    background(baseColor);
  }

  stroke(255);
  fill(squareColor);
  square(squareX, squareY, squareSize);
  stroke(0);
  fill(circleColor);
  circle(circleX, circleY, circleSize);
}

function update(x, y) {
  if( overCircle(circleX, circleY, circleSize) ) {
    circleOver = true;
    squareOver = false;
  } else if ( overSquare(squareX, squareY, squareSize) ) {
    squareOver = true;
    circleOver = false;
  } else {
    circleOver = squareOver = false;
  }
}

function overSquare(x, y, size) {
  if (mouseX >= x && mouseX <= x+size && 
      mouseY >= y && mouseY <= y+size) {
    return true;
  } else {
    return false;
  }
}

function overCircle(x, y, diameter) {
  const disX = x - mouseX;
  const disY = y - mouseY;
  if(sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
    return true;
  } else {
    return false;
  }
}