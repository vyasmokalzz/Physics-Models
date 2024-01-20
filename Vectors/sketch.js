let x, y, z;

vec = Create2DArray(n + 1);
magnitudeArr = Create2DArray(n + 1);
color = Create2DArray(n + 1);

function setup() {
  document.getElementById("loader").style.display = "none";
  createCanvas(width, height, WEBGL);
  
  x = -limit / 2, y = -limit / 2, z = 0;
  
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      // These conditions sets vector fields on Axes and Origin due to limit/n problems
      if (abs(x) < 1e-5) {
        x = 0;
      }
      if (abs(y) < 1e-5) {
        y = 0;
      }

      vec[i][j] = new Arrow(x, y, z);
      vec[i][j].vecField();
      magnitudeArr[i][j] = getMagnitude(Fx, Fy, Fz);
      y += limit / n;
    }
    x += limit / n;
    y = -limit / 2;
  }
  colorSetter();
}

function draw() {
  background(10);
  lights();
  push();
  stroke(255);
  noFill();

  is3d = document.getElementById("3d").checked;
  
  if (is3d != prevdim) {
    n = int(document.getElementById("density").value);
    dimSelector();
    prevdim = is3d;
  }

  
  if (!isControlPanelClicked) {
    orbit();  // Gives control over orbit
  }
  else {
    restoreOrientation();
    limit = document.getElementById("scale").value
    document.getElementById("scaleValue").value = limit;
    scl();
    arrowSizeChange();
  }

  drawAxes();
  stroke(255);
  box(boxSize);

  if (is3d) {
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        for (let k = 0; k <= n; k++) {
          vec[i][j][k].display3d(i, j, k);
        }
      }
    }
  }
  else {
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        vec[i][j].display(i, j);
      }
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