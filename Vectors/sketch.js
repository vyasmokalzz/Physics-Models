let x,y,z;

if (!is3d) {
  vec = Create2DArray(n+1);
  magnitudeArr = Create2DArray(n+1);
  color = Create2DArray(n+1);
}
else{
  create3DArray(n+1);
}

x=-limit/2,y=-limit/2,z=0;

function setup() {
  createCanvas(width, height, WEBGL);
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      // These conditions sets vector fields on Axes and Origin due to limit/n problems
      if(abs(x)<1e-5){
        x = 0;
      }
      if(abs(y)<1e-5){
        y=0;
      }

      vec[i][j] = new Arrow(x, y, z);
      vec[i][j].vecField();
      magnitudeArr[i][j] = getMagnitude(Fx,Fy,Fz);
      y += limit / n;
    }
    x += limit / n;
    y = -limit / 2;
  }
  colorSetter(vec);
}

function draw() {
  background(10);
  lights();
  push();
  stroke(255);
  noFill();

  if (!isControlPanelClicked) {
    orbit();  // Gives control over orbit
  }
  else {
    restoreOrientation();
    dimSelector();
    limit = document.getElementById("scale").value
    document.getElementById("scaleValue").value = limit;
    scl();
    arrowSizeChange();
  }

  drawAxes();
  stroke(255);
  box(boxSize);

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      vec[i][j].display(i,j);
    }
  }

  pop();
}

function Create2DArray(rows) {
  let arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}

function create3DArray(len) {
  let arr = []
  for(i=0;i<n;i++){
    arr[i] = Create2DArray(len);
  }
}