function drawAxes() {
    //X  - red
    let size = 100;
    stroke(192, 0, 0);
    line(-size, 0, 0, size, 0, 0);

    push();
    fill(255);
    noStroke();
    smooth();
    translate(30, 20, 0);
    pop();

    push();
    noStroke();
    ambientMaterial(255, 0, 0);
    smooth();
    translate(boxSize, 0, 0);
    rotateZ(-PI / 2);
    cone(2, 5);
    pop();

    //Y - green
    stroke(0, 192, 0);
    line(0, -size, 0, 0, size, 0);

    push();
    noStroke();
    ambientMaterial(0, 255, 0);
    smooth();
    translate(0, boxSize, 0);
    cone(2, 5);
    pop();

    //Z - blue
    stroke(0, 0, 192);
    line(0, 0, -size, 0, 0, size);

    push();
    noStroke();
    ambientMaterial(0, 0, 255);
    smooth();
    translate(0, 0, boxSize);
    rotateX(PI / 2);
    cone(2, 5);
    pop();
}

function orbit() {
    // Zoom Control
    perspective(zoom, width / height, 1, 1000);
    // Rotation Contol
    if (mouseState && (mouseButton == LEFT)) {
        // rotation offset in azimuthal direction
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