//gets the inner width of the browser window which is set as canvas width
let width = window.innerWidth;
//gets the inner height of the browser window which is set as canvas height
let height = window.innerHeight;

//specifies if mouse is clicked or not
let mouseState = 0;

//rotation parameter variables in radians
let rotation, rotZ = 1, rotX = 1;
// zoom parameter
let zoom = Math.PI / 10;
//specifies sensitivity of the zoom on mouse scroll

let zoomSensitivity = 60;

//specifies if the vector field should be 3d or not
let is3d = false;
// let is3d = true;

//variable to store the arrow objects
let vec;

let isControlPanelClicked = false;
let isPanelMaximized = true;

let arrowSize = 4;
let isArrowSizeChanged = false;
let boxSize = 100;

//Components of the vector field
let Fx,Fy,Fz;
let magnitudeArr;

//specifies the limit upto which vector field should be shown
let limit = 5;

let n = 20;     //describes density of the vector field(number of arrows)
let isnchanged=false;

let max,min;
let color;      //Stores the color to be assinged to a vector