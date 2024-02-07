let width = window.innerWidth;
let height = window.innerHeight;

//radius of the circles
let r1 = 150;
let r2 = 150;
let rate = 0.04;

//centres of the circles
let cx1 = 2 * r1;
let cy1 = r1;
let cx2 = 4 * r2;
let cy2 = 3 * r2;

// frequencies
let w1 = 2, w2 = 1;
// w1 for y and w2 for x

//phase differences
let d1 = 0;
let d2 = 0;

//time
let t1 = 0, t2 = 0;

let x1, y1, x2, y2;
let x = [], y = [];

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(0);

  push();
  translate(width / 2, 0);
  stroke(255);
  noFill();
  circle(-cx1, cy1, r1);
  translate(-cx1, cy1);
  fill(250);
  x1 = r1 * cos((w1 * t1) + (d1 * PI) - PI / 2) / 2;
  y1 = r1 * sin((w1 * t1) + (d1 * PI) - PI / 2) / 2;
  circle(x1, y1, 10);
  line(0, 0, x1, y1);
  line(x1, y1, cx1 + x2, y1);
  pop();

  push();
  translate(width / 2, 0);
  stroke(255);
  noFill();
  circle(0, cy2, r1);
  translate(0, cy2);
  fill(250);
  x2 = r2 * cos((w2 * t2) + (d2 * PI)) / 2;
  y2 = r2 * sin((w2 * t2) + (d2 * PI)) / 2;
  circle(x2, y2, 10);
  line(0, 0, x2, y2);
  line(x2, y2, x2, -cy2 + cy1 + y1);
  pop();

  push();
  translate(width / 2, cy1);
  stroke(25, 113, 255);
  beginShape();
  noFill();
  for (i = 0; i < x.length; i++) {
    vertex(x[i], y[i]);
  }
  endShape();
  pop();

  push();
  stroke(250);

  // line(x2, y2, x2, y2 - 500);
  translate(width / 2, cy1);
  circle(x2, y1, 10);
  x.unshift(x2);
  y.unshift(y1);
  pop();

  if (w1 * t1 <= -TWO_PI) {
    t1 = 0;
  }
  if (w2 * t2 <= -TWO_PI) {
    t2 = 0;
  }
  if (x.length > 200) {
    x.pop();
    y.pop();
  }

  t1 = t1 - rate;
  t2 = t2 - rate;
}

function refetch() {
  w2 = document.getElementById("w1").value;
  w1 = document.getElementById("w2").value;
  d1 = document.getElementById("d2").value;
  d2 = document.getElementById("d1").value;
  rate = document.getElementById("range").value;
  x = [];
  y = [];
  t1 = t2 = 0;
}