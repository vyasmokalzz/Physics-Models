let width = window.innerWidth;
let height = window.innerHeight;
var ele,h,k,l;
let A = 100;
let t;
int mouse = false;
let canvas = document.getElementById("sketch");
int e = 0;
// canvas.addEventListener('mouseover', function event(){
//     mouse = true;
// });

canvas.onwheel = function(event){
    event.preventDefault();
    if(event.deltaY>0){
        e = -1;
        newZmag = newZmag + e*10
    }
    else if(event.deltaY<0){
        e = 1;
        newZmag = newZmag + e*10
    }
};

console.log(width, height);
float xmag, ymag = 0;
float temp = sqrt(2 / 3);
int n;
int a = 50;
float newXmag, newYmag, newZmag = 0;
float r = 50;
float bc = (2 * r) / sqrt(3);
float fcc = sqrt(2) * r;
float dc = (8*r)/sqrt(3);
PFont myFont;
float mx, my;
float cl;


void setup()  {
    size(width, height, P3D);
    noFill();
}

void draw() {
    background(20);
    mx = mouseX;
    my = mouseY;
    
    n = int(document.getElementById("select").value);
    ele = document.getElementsByName("Size");
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked){
            r = int(ele[i].value);
        }
    }
    
    lights();

    pushMatrix();
    translate(width / 2, height / 2, newZmag);

    if (mousePressed && (mouseButton == LEFT)) {
        newXmag = mouseX / float(width) * TWO_PI;
        newYmag = mouseY / float(height) * TWO_PI;    
        float diff = xmag - newXmag;
        if (abs(diff) > 0.01) {
            xmag -= diff / 4.0;
        }
        
        diff = ymag - newYmag;
        if (abs(diff) > 0.01) {
            ymag -= diff / 4.0;
        }
        
        rotateX(-ymag);
        rotateY(-xmag);
    }
    else {
        rotateX(-ymag);
        rotateY(-xmag);
    }

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
    else if (n == 10) {
        triangularVoid();
    }
    else if (n == 11) {
        tetragonalVoid();
    }
    else if (n == 12) {
        octahedralVoid();
    }
    else if (n == 13) {
        cubicVoid();
    }
    else if (n == 14) {
        CsCl();
    }
    else if (n == 15) {
        NaCl();
    }
    else {
        ;
    }
    
    if (keyPressed && key == 43) {
        newZmag = newZmag + 5;
    }
    else if (keyPressed && key == 45) {
        newZmag = newZmag - 5;
    }
    
    popMatrix();
}

void makeSphere(float x, float y, float z, float radius){
    pushMatrix();
    translate(x, y, z);
    sphere(radius);
    popMatrix();
}

void SimpleCubic(){
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

void BodyCentered(){
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

void FaceCentered(){
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

void Hexagonal(){
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

void DiamondCubic(){
    makeBox(dc);
    t = dc/2;
    noStroke();
    fill(200, 0, 0, 230);
    //  Inner 1/4 Spheres
    makeSphere(-0.5*t,0.5*t,0.5*t,r);
    makeSphere(0.5*t,0.5*t,-0.5*t,r);
    makeSphere(0.5*t,-0.5*t,0.5*t,r);
    makeSphere(-0.5*t,-0.5*t,-0.5*t,r);

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
    stroke(255);
    line(-t, -t, -t, -0.5*t,-0.5*t,-0.5*t);
    line(-0.5*t,-0.5*t,-0.5*t, 0, -t, 0);
    line(0, -t, 0, 0.5*t,-0.5*t,0.5*t);
    line(0.5*t,-0.5*t,0.5*t, t, -t, t);

    line(0.5*t,-0.5*t,0.5*t,t, 0, 0);
    line(0.5*t,-0.5*t,0.5*t,0, 0, t);
    line(t, 0, 0, 0.5*t,0.5*t,-0.5*t);
    line(0, 0, t, -0.5*t,0.5*t,0.5*t);

    line(-0.5*t,0.5*t,0.5*t,-t, 0, 0);
    line(0.5*t,0.5*t,-0.5*t,0, t, 0);
    line(-0.5*t,0.5*t,0.5*t, 0, t, 0);

    line(-0.5*t,0.5*t,0.5*t, -t, t, t);
    line(.5*t,0.5*t,-0.5*t, t, t, -t);
    
    line(-t, 0, 0, -0.5*t,-0.5*t,-0.5*t);
    
    line(0.5*t,0.5*t,-0.5*t, 0, 0, -t);
    line(0, 0, -t, -0.5*t,-0.5*t,-0.5*t);
}

void MillerIndices(){
    // h=k=1;
    // l=0;
    h = int(document.getElementById("h").value);
    k = int(document.getElementById("k").value);
    l = int(document.getElementById("l").value);
    // h=l=k=1;
    drawAxes(200);
    noStroke();
    makeBox(200);
    beginShape();
    fill(243, 247, 2);
    //  a a a type
    if(h!=0 && k!=0 && l!=0){
        vertex((200/h)-A,-A,-A);  //x
        vertex(-A,-A,(200/k)-A);  //y
        vertex(-A,(200/l)-A,-A);  //z
    }
    //  0 a a type
    else if(h==0 && k!=0 && l!=0){
        vertex(-A,-A,(200/k)-A);  //y
        vertex(A,-A,(200/k)-A);  //y'
        vertex(A,(200/l)-A,-A);  //z'
        vertex(-A,(200/l)-A,-A);  //z
    }
    //  a 0 a type
    else if(h!=0 && k==0 && l!=0){
        vertex((200/h)-A,-A,-A);  //x
        vertex((200/h)-A,-A,A);  //x'
        vertex(-A,(200/l)-A,A);  //z'
        vertex(-A,(200/l)-A,-A);  //z
    }
    //  a a 0 type
    else if(h!=0 && k!=0 && l==0){
        vertex((200/h)-A,-A,-A);  //x
        vertex((200/h)-A,A,-A);  //x'
        vertex(-A,A,(200/k)-A);  //y'
        vertex(-A,-A,(200/k)-A);  //y
    }
    //  a 0 0 type
    else if(h!=0 && k==0 && l==0){
        vertex((200/h)-A,-A,-A);  //x1
        vertex((200/h)-A,A,-A);  //x2
        vertex((200/h)-A,A,A);  //x4
        vertex((200/h)-A,-A,A);  //x3
    }
    //  0 a 0 type
    else if(h==0 && k!=0 && l==0){
        vertex(-A,-A,(200/k)-A);  //y1
        vertex(A,-A,(200/k)-A);  //y2
        vertex(A,A,(200/k)-A);  //y3
        vertex(-A,A,(200/k)-A);  //y4
    }
    //  0 0 a type
    else if(h==0 && k==0 && l!=0){
        vertex(-A,(200/l)-A,-A);  //z1
        vertex(A,(200/l)-A,-A);  //z2
        vertex(A,(200/l)-A,A);  //z3
        vertex(-A,(200/l)-A,A);  //z4
    }
    endShape();
}

void triangularVoid(){
    noStroke();
    fill(0, 200, 0, 230);

    makeSphere(a / sqrt(3), -a, 0, r);
    makeSphere((-2 * a) / sqrt(3), 0, 0, r);
    makeSphere(a / sqrt(3), a, 0, r);
}

void tetragonalVoid(){
    noStroke();
    fill(0, 200, 0, 230);

    makeSphere(a / sqrt(3), -a, 0, r);
    makeSphere((-2 * a) / sqrt(3), 0, 0, r);
    makeSphere(a / sqrt(3), a, 0, r);
    makeSphere(0, 0, a * (sqrt(8) / sqrt(3)), r);
}

void octahedralVoid(){
    //Face Centered Spheres
    fill(0, 200, 0, 230);
    makeSphere(fcc, 0, 0, r);
    makeSphere(-fcc, 0, 0, r);
    makeSphere(0, fcc, 0, r);
    makeSphere(0, -fcc, 0, r);
    makeSphere(0, 0, fcc, r);
    makeSphere(0, 0, -fcc, r);
}

void cubicVoid(){
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

void makeBox(float len){
    noFill();
    stroke(255);
    box(len);
}

void CsCl(){
    makeBox(100);

    cl = 0.7320*r;
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

    fill(0,0,200,230);
    makeSphere(0,0,0,cl);
}

void NaCl(){
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

    fill(200,0,0);
    makeSphere(0,0,0,cl);
    makeSphere(0,fcc,fcc,cl);
    makeSphere(fcc,0,fcc,cl);
    makeSphere(fcc,fcc,0,cl);

    makeSphere(0,-fcc,fcc,cl);
    makeSphere(0,fcc,-fcc,cl);
    makeSphere(0,-fcc,-fcc,cl);

    makeSphere(-fcc,0,fcc,cl);
    makeSphere(fcc,0,-fcc,cl);
    makeSphere(-fcc,0,-fcc,cl);

    makeSphere(-fcc,fcc,0,cl);
    makeSphere(fcc,-fcc,0,cl);
    makeSphere(-fcc,-fcc,0,cl);
}

void drawAxes(float size){
    // (X,Z,Y)
    //X  - red
    stroke(192,0,0);
    line(-2*size,-100,-100,size,-100,-100);
    //Y - blue
    stroke(0,0,192);
    line(-100,-100,-2*size,-100,-100,size);
    //Z - green
    stroke(0,192,0);
    line(-100,-2*size,-100,-100,size,-100);
}

void mouseWheel() {
    newZmag = newZmag - e*10;
}