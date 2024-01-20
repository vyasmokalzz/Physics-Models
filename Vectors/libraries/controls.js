let panel = document.getElementById("panel");
let minButton = document.getElementById("minbutton");
let controls = document.getElementById("controls");
let errBox = document.getElementById("error");

document.getElementById("funcx").value = fx;
document.getElementById("funcy").value = fy;
document.getElementById("funcz").value = fz;
document.getElementById("density").value = n;
document.getElementById("scale").value = limit;
document.getElementById("scaleValue").value = limit;
document.getElementById("arrowSize").value = arrowSize;

// Make the DIV element draggable:
dragElement(controls);

controls.onmousedown = preventRotation;
controls.onmouseup = preventRotation;

// setting up of vector field when box is scaled
function scl() {
  if (isnchanged) {
    if (is3d) {
      n = int(document.getElementById("density").value);
      vec = [];
      magnitudeArr = [];
      color = [];
      for (let i = 0; i <= n; i++) {
        vec[i] = Create2DArray(n + 1);
        magnitudeArr[i] = Create2DArray(n + 1);
        color[i] = Create2DArray(n + 1);
      }
      isnchanged = false;
    }
    else {
      n = int(document.getElementById("density").value);
      vec = Create2DArray(n + 1);
      color = Create2DArray(n + 1);
      magnitudeArr = Create2DArray(n + 1)
      isnchanged = false;
    }
  }
  if (is3d) {
    x = -limit / 2, y = -limit / 2, z = -limit / 2;

    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        for (let k = 0; k <= n; k++) {
          // These conditions sets vector fields on Axes and Origin due to limit/n problems
          if (abs(x) < 1e-5) {
            x = 0;
          }
          if (abs(y) < 1e-5) {
            y = 0;
          }
          if (abs(z) < 1e-5) {
            z = 0;
          }

          vec[i][j][k] = new Arrow(x, y, z);
          vec[i][j][k].vecField();
          magnitudeArr[i][j][k] = getMagnitude(Fx, Fy, Fz);
          z += limit / n;
        }
        z = -limit / 2;
        y += limit / n;
      }
      z = -limit / 2;
      y = -limit / 2;
      x += limit / n;
    }
    colorSetter3d();
  }
  else {
    x = -limit / 2, y = -limit / 2, z = 0;
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        if (abs(x) < 1e-10) {
          x = 0;
        }
        if (abs(y) < 1e-10) {
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
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//function to minimize or maximize the panel
function minimize() {
  if (isPanelMaximized) {
    panel.style.display = "none";
    isPanelMaximized = false;
  }
  else {
    panel.style.display = "flex";
    isPanelMaximized = true;
  }
}

// Prevents the rotation of the model while cotrol panel is clicked
function preventRotation() {
  if (isControlPanelClicked) {
    isControlPanelClicked = false;
  }
  else {
    isControlPanelClicked = true;
  }
}

function nchanged() {
  isnchanged = true;
  scl();
}

function arrowSizeChange() {
  arrowSize = document.getElementById("arrowSize").value;
}

function dimSelector() {
  if (is3d) {
    vec = [];
    magnitudeArr = [];
    color = [];
    for (let i = 0; i <= n; i++) {
      vec[i] = Create2DArray(n + 1);
      magnitudeArr[i] = Create2DArray(n + 1);
      color[i] = Create2DArray(n + 1);
    }

    x = -limit / 2, y = -limit / 2, z = -limit / 2;

    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        for (let k = 0; k <= n; k++) {
          // These conditions sets vector fields on Axes and Origin due to limit/n problems
          if (abs(x) < 1e-5) {
            x = 0;
          }
          if (abs(y) < 1e-5) {
            y = 0;
          }
          if (abs(z) < 1e-5) {
            z = 0;
          }

          vec[i][j][k] = new Arrow(x, y, z);
          vec[i][j][k].vecField();
          magnitudeArr[i][j][k] = getMagnitude(Fx, Fy, Fz);
          z += limit / n;
        }
        z = -limit / 2;
        y += limit / n;
      }
      z = -limit / 2;
      y = -limit / 2;
      x += limit / n;
    }
    colorSetter3d();
  }

  else {
    vec = Create2DArray(n + 1);
    magnitudeArr = Create2DArray(n + 1);
    color = Create2DArray(n + 1);

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
}

function reset(){
  localStorage.clear();
  location.reload();
}