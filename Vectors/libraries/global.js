let width = window.innerWidth;
let height = window.innerHeight;

let mouseState = 0;
let rotation, rotZ = 1, rotX = 1;
let zoom = Math.PI / 10;
let zoomSensitivity = 32;

let isControlPanelClicked = false;
let isPanelMaximized = true;

let arrowSize = 4;
let boxSize = 100;

let Fx,Fy,Fz;

let limit = 100;