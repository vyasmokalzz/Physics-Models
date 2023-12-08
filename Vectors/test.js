let vec = Create2DArray(100);
// let x=-50,y=-50,z=0;
let arr;
let x=50,y=50,z=50;
let test;
let n = 10;

function setup() {
  createCanvas(width, height, WEBGL);
  for(let i=0;i<n;i++){
    for(let j=0; j<n; j++){
      vec[i][j] = new Arrow(x,y,z);
      console.log(x,y);
      y -= 10;
    }
    x -= 10;
    y = +50;
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
  box(boxSize);
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