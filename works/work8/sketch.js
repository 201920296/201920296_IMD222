var x = 100,
  y = 200,
  radius = 30,
  xspd, yspd;
var i;
var j;
var targetX;
var targetY;
var score;

function setup() { 
  let boundingRects = document
  .getElementById("p5Canvas")
  .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  xspd = random(1, 30);
  yspd = random(1, 30);
  targetX = random(width - 30);
  targetY = random(height - 30);
  score = 0;
}

function draw() {
  background(0);

  fill(255);
  noStroke();
  ellipse(x, y, radius * 2, radius * 2);

  x = x + xspd;
  y = y + yspd;

  if ((xspd > 0 && x >= width - radius) || (xspd < 0 && x <= radius)) {
    xspd = xspd * -1;
  }
  if ((yspd > 0 && y >= height - radius) || (yspd < 0 && y <= radius)) {
    yspd = yspd * -1;
  }
  if (mouseIsPressed) {

    var dx = mouseX - pmouseX;
    var dy = mouseY - pmouseY;
    var dt = 1000 / frameRate(); 

    xspd = dx / dt * 10;
    yspd = dy / dt * 10;

    x = mouseX;
    y = mouseY;

  }

  noFill();
  stroke(0, 200, 0);


  for (var i = 0; i < 7; i++) {

    ellipse(targetX, targetY, 5 + i * 7, 5 + i * 7);
  }
  fill(255);
  textSize(30);
  textAlign(CENTER)
  
	text("Score= " + score, width / 2, 30);
  var d = dist(x, y, targetX, targetY);
  if ( d < 20){
    score = score + 1;
    targetX = random(width);
    targetY = random(height);
  }

}