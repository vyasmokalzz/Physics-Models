if(!is3d)
  vec = Create2DArray(n);
else
  ; 
let x=-limit/2,y=-limit/2,z=0;

function setup() {
  createCanvas(width, height, WEBGL);
  for(let i=0;i<n;i++){
    for(let j=0; j<n; j++){
      vec[i][j] = new Arrow(x,y,z);
      y += limit/n;
    }
    x += limit/n;
    y = -limit/2;
  }
}

function draw() {
  background(10);
  lights();
  push();
  stroke(255);
  noFill();

  if(!isControlPanelClicked){
    orbit();  // Gives control over orbit
  }
  else{
    // console.log("T");
    restoreOrientation();
    limit = document.getElementById("scale").value
    document.getElementById("scaleValue").value = limit;
    scl();
  }

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
  let arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function create3DArray(rows,cols){

}