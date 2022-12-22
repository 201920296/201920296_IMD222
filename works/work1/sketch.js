
  let angle = 0;

  function setup() {
    let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

    background(250);
    noStroke();
    fill(0, 102);
  }
  
  function draw() {
    if (mouseIsPressed === true) {
      angle += 5;
      let val = cos(radians(angle)) * 12.0;
      for (let a = 0; a < 360; a += 75) {
        let xoff = cos(radians(a)) * val;
        let yoff = sin(radians(a)) * val;
        fill(0);
        ellipse(mouseX + xoff, mouseY + yoff, val, val);
      }
      fill(255);
      ellipse(mouseX, mouseY, 2, 2);
    }
  }
  