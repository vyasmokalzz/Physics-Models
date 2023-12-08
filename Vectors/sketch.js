let vec = Create2DArray(500);
let x=-50,y=-50,z=0;
let test;
let n = 20;

function setup() {
  createCanvas(width, height, WEBGL);
  for(let i=0;i<n;i++){
    for(let j=0; j<n; j++){
      vec[i][j] = new Arrow(x,y,z);
      y += 5;
    }
    x += 5;
    y = -50;
  }
}

function draw() {
  background(10);
  lights();
  push();
  stroke(255);
  noFill();
  orbit();  // Gives control over orbit
  drawAxes();
  stroke(255);
  box(100);
  for(let i=0;i<n;i++){
    for(let j=0; j<n; j++){
      vec[i][j].display();
    }
  }

  pop();
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}