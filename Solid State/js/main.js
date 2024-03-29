// Declaration of Variables
let width = window.innerWidth;      //sets canvas width
let height = window.innerHeight;    //sets canvas height

var ele;
let A = 200;
let t;
let mouse = false;
let canvas = document.getElementById("sketch");
let e = 0;
let checkbox = document.getElementById("showAxes");
let cell = document.getElementById("box");

// Setting up of items in local strorage to restore orientation and state of the page on window resize or browser refresh
if (localStorage.getItem('n') == null) {
    localStorage.setItem("n", 1);
} else {
    let n = localStorage.getItem("n");
}

if (localStorage.getItem('h') == null) {
    localStorage.setItem("h", 0);
} else {
    let h = localStorage.getItem("h");
    document.getElementById("h").value = localStorage.getItem("h");
}

if (localStorage.getItem('k') == null) {
    localStorage.setItem("k", 0);
} else {
    let k = localStorage.getItem("k");
    document.getElementById("k").value = localStorage.getItem("k");
}

if (localStorage.getItem('l') == null) {
    localStorage.setItem("l", 0);
} else {
    let l = localStorage.getItem("l");
    document.getElementById("l").value = localStorage.getItem("l");
}

if (localStorage.getItem('xmag') == null) {
    localStorage.setItem("xmag", 7.0);
}

if (localStorage.getItem('ymag') == null) {
    localStorage.setItem("ymag", -0.65);
}

if (localStorage.getItem('newZmag') == null) {
    localStorage.setItem("newZmag", 0.0);
}

window.onresize = function (reload) {
    localStorage.setItem("n", n);
    localStorage.setItem("h", h);
    localStorage.setItem("k", k);
    localStorage.setItem("l", l);
    localStorage.setItem("xmag", xmag);
    localStorage.setItem("ymag", ymag);
    localStorage.setItem("newZmag", newZmag);
    location.reload();
}

let tn = localStorage.getItem("n");
if (tn == 1) {
    document.getElementById("sc").setAttribute('selected', 'selected');
}
else if (tn == 2) {
    document.getElementById("bcc").setAttribute('selected', 'selected');
}
else if (tn == 3) {
    document.getElementById("fcc").setAttribute('selected', 'selected');
}
else if (tn == 4) {
    document.getElementById("hcp").setAttribute('selected', 'selected');
}
else if (tn == 5) {
    document.getElementById("dc").setAttribute('selected', 'selected');
}
else if (tn == 6) {
    document.getElementById("mi").setAttribute('selected', 'selected');
}
else if (tn == 7) {
    document.getElementById("triv").setAttribute('selected', 'selected');
}
else if (tn == 8) {
    document.getElementById("tetv").setAttribute('selected', 'selected');
}
else if (tn == 9) {
    document.getElementById("octv").setAttribute('selected', 'selected');
}
else if (tn == 10) {
    document.getElementById("cubv").setAttribute('selected', 'selected');
}
else if (tn == 11) {
    document.getElementById("cscl").setAttribute('selected', 'selected');
}
else if (tn == 12) {
    document.getElementById("nacl").setAttribute('selected', 'selected');
}

canvas.onwheel = function (event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        e = -1;
        newZmag = newZmag + e * 10;
    }
    else if (event.deltaY < 0) {
        e = 1;
        newZmag = newZmag + e * 10;
    }
};

let xmag = float(localStorage.getItem("xmag"));
let ymag = float(localStorage.getItem("ymag"));
let newZmag = float(localStorage.getItem("newZmag"));
let temp = sqrt(2 / 3);
let a = 50;
let r = 50;
let bc = (2 * r) / sqrt(3);
let fcc = sqrt(2) * r;
let dc = (8 * r) / sqrt(3);
let cl;

void setup(){
    size(width, height, P3D);
    noFill();
}

void draw() {
    background(20);

    n = int(document.getElementById("select").value);

    ele = document.getElementsByName("Size");
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            r = int(ele[i].value);
        }
    }

    lights();

    pushMatrix();
    translate(width / 2, height / 2, newZmag);

    orbit();

    if (n == 1) {
        SimpleCubic();
    }
    else if (n == 2) {
        BodyCentered();
    }
    else if (n == 3) {
        FaceCentered();
    }
    else if (n == 4) {
        Hexagonal();
    }
    else if (n == 5) {
        DiamondCubic();
    }
    else if (n == 6) {
        MillerIndices();
    }
    else if (n == 7) {
        triangularVoid();
    }
    else if (n == 8) {
        tetragonalVoid();
    }
    else if (n == 9) {
        octahedralVoid();
    }
    else if (n == 10) {
        cubicVoid();
    }
    else if (n == 11) {
        CsCl();
    }
    else if (n == 12) {
        NaCl();
    }
    else {
        ;
    }

    popMatrix();
}

// Function for orbit movments

function orbit(){
    if (mousePressed && (mouseButton == LEFT)) {  
        let diff = (mouseX - pmouseX) / 200 * TWO_PI;
        if (abs(diff) > 0.01) {
            xmag += diff / 4.0;
        }

        diff = (mouseY - pmouseY) / 200 * TWO_PI;
        if (abs(diff) > 0.01 && (ymag >= (-PI / 2) && ymag <= (PI / 2))) {
            ymag -= diff / 4.0;
        }
        else if (diff < 0 && ymag <= -PI / 2) {
            ymag -= diff / 4.0;
        }
        else if (diff > 0 && ymag >= -PI / 2) {
            ymag -= diff / 4.0;
        }
        if (xmag > TWO_PI) {
            xmag = xmag - TWO_PI;
        }
        else if (xmag < TWO_PI) {
            xmag = xmag + TWO_PI;
        }
    
        rotateX(ymag);
        rotateY(xmag);
    }
    else {
        rotateX(ymag);
        rotateY(xmag);
        // console.log(xmag, ymag);
    }

    // Zooms the canvas on + and - keypresses on keyboard
    if (keyPressed && key == 43) {
        newZmag = newZmag + 5;
    }
    else if (keyPressed && key == 45) {
        newZmag = newZmag - 5;
    }
}

function makeSphere(x, y, z, radius){
    pushMatrix();
    translate(x, y, z);
    sphere(radius);
    popMatrix();
}

// All drawing data below here
// contains coordinates for drawing lattices

function SimpleCubic() {
    if (checkbox.checked)
        drawOrigin(200);
    if (cell.checked)
        makeBox(100);

    noStroke();
    fill(200, 0, 0, 230);
    makeSphere(50, 50, 50, r);
    makeSphere(-50, 50, 50, r);
    makeSphere(50, -50, 50, r);
    makeSphere(50, 50, -50, r);
    makeSphere(50, -50, -50, r);
    makeSphere(-50, 50, -50, r);
    makeSphere(-50, -50, 50, r);
    makeSphere(-50, -50, -50, r);
}

function BodyCentered() {
    if (checkbox.checked)
        drawOrigin(200);
    if (cell.checked)
        makeBox((4 * 50) / sqrt(3));

    noStroke();

    fill(9, 72, 166, 230);
    makeSphere(0, 0, 0, r);
    fill(200, 0, 0, 230);
    makeSphere(bc, bc, bc, r);
    makeSphere(-bc, bc, bc, r);
    makeSphere(bc, -bc, bc, r);
    makeSphere(bc, bc, -bc, r);
    makeSphere(bc, -bc, -bc, r);
    makeSphere(-bc, bc, -bc, r);
    makeSphere(-bc, -bc, bc, r);
    makeSphere(-bc, -bc, -bc, r);
}

function FaceCentered() {
    if (checkbox.checked)
        drawOrigin(200);
    if (cell.checked)
        makeBox(2 * sqrt(2) * 50);

    noStroke();
    fill(200, 0, 0, 230);

    //Corner Spheres
    makeSphere(fcc, fcc, fcc, r);
    makeSphere(-fcc, fcc, fcc, r);
    makeSphere(fcc, -fcc, fcc, r);
    makeSphere(-fcc, -fcc, fcc, r);
    makeSphere(fcc, fcc, -fcc, r);
    makeSphere(-fcc, fcc, -fcc, r);
    makeSphere(fcc, -fcc, -fcc, r);
    makeSphere(-fcc, -fcc, -fcc, r);

    //Face Centered Spheres
    fill(9, 72, 166, 230);
    makeSphere(fcc, 0, 0, r);
    makeSphere(-fcc, 0, 0, r);
    makeSphere(0, fcc, 0, r);
    makeSphere(0, -fcc, 0, r);
    makeSphere(0, 0, fcc, r);
    makeSphere(0, 0, -fcc, r);
}

function Hexagonal() {
    if (checkbox.checked)
        drawOrigin(200);

    rotateX(PI / 2);
    noStroke();
    fill(200, 0, 0, 200);

    makeSphere(a / sqrt(3), -a, 0, r);
    makeSphere((-2 * a) / sqrt(3), 0, 0, r);
    makeSphere(a / sqrt(3), a, 0, r);

    fill(0, 200, 0, 230);
    makeSphere(0, 0, a * (sqrt(8) / sqrt(3)), r);
    makeSphere(a * sqrt(3), a, a * (sqrt(8) / sqrt(3)), r);
    makeSphere(0, 2 * a, a * (sqrt(8) / sqrt(3)), r);
    makeSphere(-a * sqrt(3), a, a * (sqrt(8) / sqrt(3)), r);
    makeSphere(-a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)), r);
    makeSphere(0, -2 * a, a * (sqrt(8) / sqrt(3)), r);
    makeSphere(a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)), r);

    makeSphere(0, 0, -a * (sqrt(8) / sqrt(3)), r);
    makeSphere(a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)), r);
    makeSphere(0, 2 * a, -a * (sqrt(8) / sqrt(3)), r);
    makeSphere(-a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)), r);
    makeSphere(-a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)), r);
    makeSphere(0, -2 * a, -a * (sqrt(8) / sqrt(3)), r);
    makeSphere(a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)), r);

    stroke(255);

    if (cell.checked) {
        //red Spheres conn.
        line(a / sqrt(3), -a, 0, (-2 * a) / sqrt(3), 0, 0);
        line((-2 * a) / sqrt(3), 0, 0, a / sqrt(3), a, 0);
        line(a / sqrt(3), a, 0, a / sqrt(3), -a, 0);

        //up horiz conn.
        line(a * sqrt(3), a, a * (sqrt(8) / sqrt(3)), 0, 2 * a, a * (sqrt(8) / sqrt(3)));
        line(0, 2 * a, a * (sqrt(8) / sqrt(3)), -a * sqrt(3), a, a * (sqrt(8) / sqrt(3)));
        line(-a * sqrt(3), a, a * (sqrt(8) / sqrt(3)), -a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)));
        line(-a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)), 0, -2 * a, a * (sqrt(8) / sqrt(3)));
        line(0, -2 * a, a * (sqrt(8) / sqrt(3)), a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)));
        line(a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)), a * sqrt(3), a, a * (sqrt(8) / sqrt(3)));

        line(0, 0, a * (sqrt(8) / sqrt(3)), a * sqrt(3), a, a * (sqrt(8) / sqrt(3)));
        line(0, 0, a * (sqrt(8) / sqrt(3)), 0, 2 * a, a * (sqrt(8) / sqrt(3)));
        line(0, 0, a * (sqrt(8) / sqrt(3)), -a * sqrt(3), a, a * (sqrt(8) / sqrt(3)));
        line(0, 0, a * (sqrt(8) / sqrt(3)), -a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)));
        line(0, 0, a * (sqrt(8) / sqrt(3)), 0, -2 * a, a * (sqrt(8) / sqrt(3)));
        line(0, 0, a * (sqrt(8) / sqrt(3)), a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)));

        //down horiz conn.
        line(a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)), 0, 2 * a, -a * (sqrt(8) / sqrt(3)));
        line(0, 2 * a, -a * (sqrt(8) / sqrt(3)), -a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)));
        line(-a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)), -a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)));
        line(-a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)), 0, -2 * a, -a * (sqrt(8) / sqrt(3)));
        line(0, -2 * a, -a * (sqrt(8) / sqrt(3)), a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)));
        line(a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)), a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)));

        line(0, 0, -a * (sqrt(8) / sqrt(3)), a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)));
        line(0, 0, -a * (sqrt(8) / sqrt(3)), 0, 2 * a, -a * (sqrt(8) / sqrt(3)));
        line(0, 0, -a * (sqrt(8) / sqrt(3)), -a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)));
        line(0, 0, -a * (sqrt(8) / sqrt(3)), -a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)));
        line(0, 0, -a * (sqrt(8) / sqrt(3)), 0, -2 * a, -a * (sqrt(8) / sqrt(3)));
        line(0, 0, -a * (sqrt(8) / sqrt(3)), a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)));

        //vertical conn.
        line(a * sqrt(3), a, a * (sqrt(8) / sqrt(3)), a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)));
        line(0, 2 * a, a * (sqrt(8) / sqrt(3)), 0, 2 * a, -a * (sqrt(8) / sqrt(3)));
        line(-a * sqrt(3), a, a * (sqrt(8) / sqrt(3)), -a * sqrt(3), a, -a * (sqrt(8) / sqrt(3)));
        line(-a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)), -a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)));
        line(0, -2 * a, a * (sqrt(8) / sqrt(3)), 0, -2 * a, -a * (sqrt(8) / sqrt(3)));
        line(a * sqrt(3), -a, a * (sqrt(8) / sqrt(3)), a * sqrt(3), -a, -a * (sqrt(8) / sqrt(3)));
    }
}

function DiamondCubic() {
    if (checkbox.checked)
        drawOrigin(200);
    if (cell.checked)
        makeBox(dc);
    t = dc / 2;
    noStroke();
    fill(200, 0, 0, 230);
    //  Inner 1/4 Spheres
    makeSphere(-0.5 * t, 0.5 * t, 0.5 * t, r);
    makeSphere(0.5 * t, 0.5 * t, -0.5 * t, r);
    makeSphere(0.5 * t, -0.5 * t, 0.5 * t, r);
    makeSphere(-0.5 * t, -0.5 * t, -0.5 * t, r);

    fill(0, 230, 0, 230);
    makeSphere(-t, -t, -t, r);
    makeSphere(-t, t, t, r);
    makeSphere(t, -t, t, r);
    makeSphere(-t, -t, t, r);
    makeSphere(t, t, -t, r);
    makeSphere(-t, t, -t, r);
    makeSphere(t, -t, -t, r);
    makeSphere(t, t, t, r);

    makeSphere(t, 0, 0, r);
    makeSphere(-t, 0, 0, r);
    makeSphere(0, t, 0, r);
    makeSphere(0, -t, 0, r);
    makeSphere(0, 0, t, r);
    makeSphere(0, 0, -t, r);

    //connections
    if (cell.checked) {
        stroke(255);
        line(-t, -t, -t, -0.5 * t, -0.5 * t, -0.5 * t);
        line(-0.5 * t, -0.5 * t, -0.5 * t, 0, -t, 0);
        line(0, -t, 0, 0.5 * t, -0.5 * t, 0.5 * t);
        line(0.5 * t, -0.5 * t, 0.5 * t, t, -t, t);

        line(0.5 * t, -0.5 * t, 0.5 * t, t, 0, 0);
        line(0.5 * t, -0.5 * t, 0.5 * t, 0, 0, t);
        line(t, 0, 0, 0.5 * t, 0.5 * t, -0.5 * t);
        line(0, 0, t, -0.5 * t, 0.5 * t, 0.5 * t);

        line(-0.5 * t, 0.5 * t, 0.5 * t, -t, 0, 0);
        line(0.5 * t, 0.5 * t, -0.5 * t, 0, t, 0);
        line(-0.5 * t, 0.5 * t, 0.5 * t, 0, t, 0);

        line(-0.5 * t, 0.5 * t, 0.5 * t, -t, t, t);
        line(.5 * t, 0.5 * t, -0.5 * t, t, t, -t);

        line(-t, 0, 0, -0.5 * t, -0.5 * t, -0.5 * t);

        line(0.5 * t, 0.5 * t, -0.5 * t, 0, 0, -t);
        line(0, 0, -t, -0.5 * t, -0.5 * t, -0.5 * t);
    }
}

function MillerIndices() {
    if (checkbox.checked)
        drawOrigin(300);

    // xmag = 0.9738937226126296;
    // ymag = -0.60475658581605;
    translate(-A / 2, -A / 2, A / 2);
    makeBox(200);

    h = int(document.getElementById("h").value);
    k = int(document.getElementById("k").value);
    l = int(document.getElementById("l").value);

    noStroke();
    beginShape();
    fill(243, 247, 2);
    let a = 100;
    //  a a a type
    if (h != 0 && k != 0 && l != 0) {
        translate(A / 2, A / 2, -A / 2);
        textSize(20);
        vertex(-A / h, 0, 0);  //X
        vertex(0, 0, A / k);  //Y
        vertex(0, -A / l, 0);  //Z
    }
    //  0 a a type
    else if (h == 0 && k != 0 && l != 0) {
        translate(A / 2, A / 2, -A / 2);
        vertex(0, 0, A / k);  //Y
        vertex(-A, 0, A / k);  //Y'
        vertex(-A, -A / l, 0);  //Z
        vertex(0, -A / l, 0);  //Z
    }
    //  a 0 a type
    else if (h != 0 && k == 0 && l != 0) {
        translate(A / 2, A / 2, -A / 2);
        vertex(-A / h, 0, 0);  //X
        vertex(-A / h, 0, A);  //X'
        vertex(0, -A / l, A);  //Z'
        vertex(0, -A / l, 0);  //Z
    }
    //  a a 0 type
    else if (h != 0 && k != 0 && l == 0) {
        translate(A / 2, A / 2, -A / 2);
        vertex(-A / h, 0, 0);  //X
        vertex(-A / h, -A, 0);  //X'
        vertex(0, -A, A / k);  //Y'
        vertex(0, 0, A / k);  //Y
    }
    //  a 0 0 type
    else if (h != 0 && k == 0 && l == 0) {
        translate(A / 2, A / 2, -A / 2);
        vertex(-A / h, 0, 0);  //X1
        vertex(-A / h, 0, A);  //X2
        vertex(-A / h, -A, A);  //X3
        vertex(-A / h, -A, 0);  //X4
    }
    //  0 a 0 type
    else if (h == 0 && k != 0 && l == 0) {
        translate(A / 2, A / 2, -A / 2);
        vertex(0, 0, A / k);  //Y1
        vertex(-A, 0, A / k);  //Y2
        vertex(-A, -A, A / k);  //Y3
        vertex(0, -A, A / k);  //Y4
    }
    //  0 0 a type
    else if (h == 0 && k == 0 && l != 0) {
        translate(A / 2, A / 2, -A / 2);
        vertex(0, -A / l, 0);  //Z
        vertex(-A, -A / l, 0);  //Z
        vertex(-A, -A / l, A);  //Z
        vertex(0, -A / l, A);  //Z
    }
    endShape();
}

function triangularVoid() {
    if (checkbox.checked)
        drawOrigin(200);
    noStroke();
    fill(0, 200, 0, 230);

    makeSphere(a / sqrt(3), -a, 0, r);
    makeSphere((-2 * a) / sqrt(3), 0, 0, r);
    makeSphere(a / sqrt(3), a, 0, r);
}

function tetragonalVoid() {
    if (checkbox.checked)
        drawOrigin(200);
    translate(0, 0, -0.2278 * 2 * r);
    noStroke();
    fill(0, 200, 0, 230);
    makeSphere(a / sqrt(3), -a, 0, r);
    makeSphere((-2 * a) / sqrt(3), 0, 0, r);
    makeSphere(a / sqrt(3), a, 0, r);
    makeSphere(0, 0, a * (sqrt(8) / sqrt(3)), r);
}

function octahedralVoid() {
    if (checkbox.checked)
        drawOrigin(200);
    //Face Centered Spheres
    noStroke();
    fill(0, 200, 0, 230);
    makeSphere(fcc, 0, 0, r);
    makeSphere(-fcc, 0, 0, r);
    makeSphere(0, fcc, 0, r);
    makeSphere(0, -fcc, 0, r);
    makeSphere(0, 0, fcc, r);
    makeSphere(0, 0, -fcc, r);
}

function cubicVoid() {
    if (checkbox.checked)
        drawOrigin(200);
    noStroke();
    fill(0, 200, 0, 230);
    makeSphere(50, 50, 50, r);
    makeSphere(-50, 50, 50, r);
    makeSphere(50, -50, 50, r);
    makeSphere(50, 50, -50, r);
    makeSphere(50, -50, -50, r);
    makeSphere(-50, 50, -50, r);
    makeSphere(-50, -50, 50, r);
    makeSphere(-50, -50, -50, r);
}

function makeBox(len) {
    noFill();
    stroke(255);
    box(len);
}

function CsCl() {
    if (checkbox.checked)
        drawOrigin(200);
    if (cell.checked)
        makeBox(100);

    cl = 0.7320 * r;
    noStroke();
    fill(0, 200, 0, 230);
    makeSphere(50, 50, 50, r);
    makeSphere(-50, 50, 50, r);
    makeSphere(50, -50, 50, r);
    makeSphere(50, 50, -50, r);
    makeSphere(50, -50, -50, r);
    makeSphere(-50, 50, -50, r);
    makeSphere(-50, -50, 50, r);
    makeSphere(-50, -50, -50, r);

    fill(0, 0, 200, 230);
    makeSphere(0, 0, 0, cl);
}

function NaCl() {
    if (checkbox.checked)
        drawOrigin(200);
    if (cell.checked)
        makeBox(2 * sqrt(2) * 50);
    cl = 0.4142 * r;

    noStroke();
    fill(0, 200, 0, 230);

    //Corner Spheres
    makeSphere(fcc, fcc, fcc, r);
    makeSphere(-fcc, fcc, fcc, r);
    makeSphere(fcc, -fcc, fcc, r);
    makeSphere(-fcc, -fcc, fcc, r);
    makeSphere(fcc, fcc, -fcc, r);
    makeSphere(-fcc, fcc, -fcc, r);
    makeSphere(fcc, -fcc, -fcc, r);
    makeSphere(-fcc, -fcc, -fcc, r);

    //Face Centered Spheres
    makeSphere(fcc, 0, 0, r);
    makeSphere(-fcc, 0, 0, r);
    makeSphere(0, fcc, 0, r);
    makeSphere(0, -fcc, 0, r);
    makeSphere(0, 0, fcc, r);
    makeSphere(0, 0, -fcc, r);

    fill(200, 0, 0);
    makeSphere(0, 0, 0, cl);
    makeSphere(0, fcc, fcc, cl);
    makeSphere(fcc, 0, fcc, cl);
    makeSphere(fcc, fcc, 0, cl);

    makeSphere(0, -fcc, fcc, cl);
    makeSphere(0, fcc, -fcc, cl);
    makeSphere(0, -fcc, -fcc, cl);

    makeSphere(-fcc, 0, fcc, cl);
    makeSphere(fcc, 0, -fcc, cl);
    makeSphere(-fcc, 0, -fcc, cl);

    makeSphere(-fcc, fcc, 0, cl);
    makeSphere(fcc, -fcc, 0, cl);
    makeSphere(-fcc, -fcc, 0, cl);
}

function drawOrigin(size) {
    pushMatrix();
    // (X,Z,Y)
    //X  - red
    stroke(192, 0, 0);
    line(-size, 0, 0, size, 0, 0);
    
    //Y - blue
    stroke(0, 0, 192);
    line(0, 0, -size, 0, 0, size);
    //Z - green
    stroke(0, 192, 0);
    line(0, -size, 0, 0, size, 0);
    popMatrix();
}

function mouseWheel() {
    newZmag = newZmag - e * 10;
}