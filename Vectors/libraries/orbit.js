function orbit() {
    // Zoom Control
    perspective(zoom, width / height, 1, 1000);

    // Rotation Contol
    if (mouseState && (mouseButton == LEFT)) {
        rotation = (mouseX - pmouseX) / 200 * TWO_PI;
        if (abs(rotation) > 0.01) {
            rotZ -= rotation / 4.0;
        }

        rotation = (mouseY - pmouseY) / 200 * TWO_PI;
        if (abs(rotation) > 0.01 && (rotX >= (0) && rotX <= (PI))) {
            rotX -= rotation / 4.0;
        }
        else if (rotation < 0 && rotX <= PI) {
            rotX -= rotation / 4.0;
        }
        else if (rotation > 0 && rotX >= 0) {
            rotX -= rotation / 4.0;
        }
        if (rotZ > TWO_PI) {
            rotZ = rotZ - TWO_PI;
        }
        else if (rotZ < TWO_PI) {
            rotZ = rotZ + TWO_PI;
        }

        rotateX(rotX);
        rotateZ(rotZ);
    }
    else {
        rotateX(rotX);
        rotateZ(rotZ);
    }
}

function mousePressed() {
    mouseState = 1;
}

function mouseReleased() {
    mouseState = 0;
}

function mouseWheel(event) {
    let e = event.delta;
    e = (e > 0) ? -1 : 1;
    e = e / zoomSensitivity;
    if (zoom < PI && zoom > 0) {
        zoom -= e;
    }
    if(zoom <= 0){
        zoom = 1/zoomSensitivity;
    }
    if(zoom>=PI){
        zoom = PI - 1/zoomSensitivity; 
    }
}

//additional functionality to restore the orientations when control panel is being dragged
function restoreOrientation(){
    perspective(zoom, width / height, 1, 1000);
    rotateX(rotX);
    rotateZ(rotZ);
}