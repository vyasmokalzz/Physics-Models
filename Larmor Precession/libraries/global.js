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

let boxSize = 100;