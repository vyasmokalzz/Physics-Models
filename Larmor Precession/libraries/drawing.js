class Arrow {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = arrowSize;
        this.cylRadius = this.size / 32;
        this.cylHeight = (this.size) / 2;
        this.coneRadius = this.size / 8;
        this.coneHeight = this.size / 2;
    }

    display() {
        magnitude = getMagnitude(Fx,Fy,Fz);
        if (isFinite(magnitude) && magnitude!=0) {
            push();
            // rotateZ(-PI/2);
            translate(this.x * (boxSize / limit), this.y * (boxSize / limit), this.z * (boxSize / limit));
            rotateZ(-PI / 2 + atan2(Fy, Fx));

            noStroke();

            ambientMaterial(250,0,0);

            smooth();

            translate(0, -this.cylHeight / 2, 0);
            //cylinder(radius, height);
            cylinder(this.cylRadius, this.cylHeight);

            translate(0, this.cylHeight, 0);
            //cone(radius, height);
            cone(this.coneRadius, this.coneHeight);

            pop();
        }
    }
}