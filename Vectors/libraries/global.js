//gets the inner width of the browser window which is set as canvas width
let width = window.innerWidth;
//gets the inner height of the browser window which is set as canvas height
let height = window.innerHeight;

if(localStorage.getItem("rotX")==null){
    localStorage.setItem("rotX", 1);
}
if(localStorage.getItem("rotZ")==null){
    localStorage.setItem("rotZ", 1);
}
if(localStorage.getItem("zoom")==null){
    localStorage.setItem("zoom", Math.PI / 10);
}
if(localStorage.getItem("fx")==null){
    localStorage.setItem("fx", "sin(x+y)");
}
if(localStorage.getItem("fy")==null){
    localStorage.setItem("fy", "sin(y-x)");
}
if(localStorage.getItem("fz")==null){
    localStorage.setItem("fz", "0");
}
if(localStorage.getItem("is3d")==null){
    localStorage.setItem("is3d", 0);
}
if(localStorage.getItem("n")==null){
    localStorage.setItem("n", 20);
}
if(localStorage.getItem("limit")==null){
    localStorage.setItem("limit", 5);
}
if(localStorage.getItem("arrowSize")==null){
    localStorage.setItem("arrowSize", 4);
}

//specifies if mouse is clicked or not
let mouseState = 0;

//rotation parameter variables in radians
let rotation; 
let rotX = parseFloat(localStorage.getItem("rotX"));
let rotZ = parseFloat(localStorage.getItem("rotZ"));

// zoom parameter
let zoom = parseFloat(localStorage.getItem("zoom"));
//specifies sensitivity of the zoom on mouse scroll


let zoomSensitivity = 60;

let boxSize = 100;
//specifies if the vector field should be 3d or not
let is3d;
let prevdim = 0;

//variable to store the arrow objects
let vec;

let isControlPanelClicked = false;
let isPanelMaximized = true;

let arrowSize = parseFloat(localStorage.getItem("arrowSize"));
let isArrowSizeChanged = false;

//Components of the vector field
let Fx,Fy,Fz;

let fx = localStorage.getItem("fx");
let fy = localStorage.getItem("fy"); 
let fz = localStorage.getItem("fz");

let magnitudeArr;

//specifies the limit upto which vector field should be shown
let limit = parseFloat(localStorage.getItem("limit"));

let n = parseFloat(localStorage.getItem("n"));     //describes density of the vector field(number of arrows)
let isnchanged=false;

let max,min;
let color;      //Stores the color to be assinged to a vector

let isReload = false;

let keyState = false;