let nodd = 0;

function drawAxes() {
    //X  - red
    let size = 100;
    stroke(192, 0, 0);
    line(-size, 0, 0, size, 0, 0);

    push();
    fill(255);
    noStroke();
    smooth();
    translate(30,20,0);
    // sphere(5);     //sphere here
    pop();

    push();
    noStroke();
    ambientMaterial(255, 0, 0);
    smooth();
    translate(boxSize,0,0);
    rotateZ(-PI/2);
    cone(2,5);
    pop();

    //Y - green
    stroke(0, 192, 0);
    line(0, -size, 0, 0, size, 0);

    push();
    noStroke();
    ambientMaterial(0, 255, 0);
    smooth();
    translate(0,boxSize,0);
    cone(2,5);
    pop();

    //Z - blue
    stroke(0, 0, 192);
    line(0, 0, -size, 0, 0, size);

    push();
    noStroke();
    ambientMaterial(0, 0, 255);
    smooth();
    translate(0,0,boxSize);
    rotateX(PI/2);
    cone(2,5);
    pop();

}

class Arrow {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = arrowSize;
        this.cylRadius = this.size / 16;
        this.cylHeight = (this.size) / 2;
        this.coneRadius = this.size / 8;
        this.coneHeight = this.size / 2;
    }

    display() {
        push();
        // rotateZ(-PI/2);
        translate(this.x, this.y, this.z);
        this.vecField();
        // rotateZ(atan(Fy/Fx));
        rotateZ(-PI/2+atan2(Fy,Fx));

        noStroke();
        ambientMaterial(245, 241, 5);
        smooth();
        
        translate(0, -this.cylHeight / 2, 0);
        //cylinder(radius, height);
        cylinder(this.cylRadius, this.cylHeight);
        
        translate(0, this.cylHeight, 0);
        //cone(radius, height);
        cone(this.coneRadius, this.coneHeight);
        
        if(nodd==0){
            console.log(this.x,this.y, atan(Fy/Fx));
            nodd++;
        }
        pop();
    }

    display2() {
        push();
        // rotateZ(PI/2);
        translate(this.x, this.y, this.z);
        // this.vecField();

        //cylinder(radius, height);
        stroke(218, 22, 224);
        strokeWeight(6);
        line(0, this.cylHeight/2, 0, -this.coneHeight/2);
        
        noStroke();
        ambientMaterial(218, 22, 224);
        smooth();
        translate(0, this.cylHeight, 0);
        //cone(radius, height);
        noStroke();
        cone(this.coneRadius/2, this.coneHeight);
        pop();
    }

    vecField(){

        // Fx = this.x*(this.x);
        // Fy = this.y*(this.y*1);
        // Fz = this.z*0;

        Fx = sin(this.x);
        Fy = sin(this.y*1);
        Fz = this.z*0;
    }
}