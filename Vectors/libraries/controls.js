let panel = document.getElementById("panel");
let minButton = document.getElementById("minbutton");
let controls = document.getElementById("controls");
let errBox = document.getElementById("error");

// Make the DIV element draggable:
dragElement(controls);

controls.onmousedown = preventRotation;
controls.onmouseup = preventRotation;

function scl(){
  if(isnchanged){
    n = document.getElementById("density").value;
    vec = Create2DArray(n+1);
    color = Create2DArray(n+1);
    magnitudeArr = Create2DArray(n+1)
    isnchanged = false;
  }
  x=-limit/2,y=-limit/2,z=0;
  for(let i=0;i<=n;i++){
    for(let j=0; j<=n; j++){
      if(abs(x)<1e-10){
        x = 0;
      }
      if(abs(y)<1e-10){
        y=0;
      }
      vec[i][j] = new Arrow(x,y,z);
      vec[i][j].vecField();
      magnitudeArr[i][j] = getMagnitude(Fx,Fy,Fz);
      y += limit/n;
    }
    x += limit/n;
    y = -limit/2;
  }
  colorSetter(vec);
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
function minimize(){
  if(isPanelMaximized){
    panel.style.display = "none";
    isPanelMaximized = false;
  }
  else{
    panel.style.display = "flex";
    isPanelMaximized = true;
  }
}

// Prevents the rotation of the model while cotrol panel is clicked
function preventRotation(){
  if(isControlPanelClicked){
    isControlPanelClicked = false;
  }
  else{
    isControlPanelClicked=true;
  }
}

function nchanged(){
  isnchanged = true;
  scl();
}

function arrowSizeChange(){
  arrowSize = document.getElementById("arrowSize").value;
}

function dimSelector(){
  is3d = document.getElementById("3d").checked;
}