let t = 0;
let radius = 100;
let cylHeight = radius/2;
let cylRadius = radius/(2*radius);
let coneRadus = cylRadius * 5;
let coneHeight = cylHeight / 5;

function setup() {
  createCanvas(width, height, WEBGL);
}

function draw() {
  background(10);
  lights();
  stroke(255);

  orbit();  // Gives control over orbit

  drawAxes();

  // Precessing disc
  noStroke();
  push();
  fill(250, 250, 0);
  rotateX(0.3*sin(t));
  rotateY(0.5*cos(t));
  circle(0,0,radius);

  //making arrow
  //arrow cylinder
  push();
  fill(250, 0, 0);
  translate(0, 0, (cylHeight / 2) - (coneHeight/2));
  rotateX(PI / 2);
  cylinder(cylRadius, cylHeight-(coneHeight));
  rotateX(-PI / 2);
  translate(0, 0, cylHeight / 2);
  pop();
  //arrow cone
  push();
  fill(0,250,0);
  translate(0,0,radius/2 - coneHeight/2);
  rotateX(PI/2);
  cone(coneRadus, coneHeight);
  pop();
  //making arrow compelete
  pop();

  //reference circle
  push();
  noFill();
  stroke(255);
  rotateY(PI/2);
  rotateX(rotZ);
  rotateX(PI/2);
  smooth();
  circle(0,0,radius);
  pop();

  //timings
  if (t > TWO_PI) {
    t = t - TWO_PI;
  }
  t += 0.05;
}
