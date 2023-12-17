let nodd = 0;
let fx = "sin(x)", fy = "sin(y)", fz = "0";

function getFieldX() {
    fx = document.getElementById("funcx").value;
    calcMagnitude = true;
}

function getFieldY() {
    fy = document.getElementById("funcy").value;
    calcMagnitude = true;
}

function getFieldZ() {
    fz = document.getElementById("funcz").value;
    calcMagnitude = true;
}

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

    display(i,j) {
        this.vecField();
        if (isFinite(Fx) && isFinite(Fy) && isFinite(Fz) && getMagnitude(Fx, Fy, Fz) != 0) {
            push();
            // rotateZ(-PI/2);
            translate(this.x * (boxSize / limit), this.y * (boxSize / limit), this.z * (boxSize / limit));
            rotateZ(-PI / 2 + atan2(Fy, Fx));

            noStroke();

            ambientMaterial(color[i][j]);

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

    display2() {
        push();
        // rotateZ(PI/2);
        translate(this.x, this.y, this.z);
        // this.vecField();

        //cylinder(radius, height);
        stroke(218, 22, 224);
        strokeWeight(6);
        line(0, this.cylHeight / 2, 0, -this.coneHeight / 2);

        noStroke();
        ambientMaterial(218, 22, 224);
        smooth();
        translate(0, this.cylHeight, 0);
        //cone(radius, height);
        noStroke();
        cone(this.coneRadius / 2, this.coneHeight);
        pop();
    }

    vecField() {
        try {
            Fx = Parser.parse(fx);
            Fx.variables();
            Fx = Fx.evaluate({ x: this.x, y: this.y, z: this.z });

            Fy = Parser.parse(fy);
            Fy.variables();
            Fy = Fy.evaluate({ x: this.x, y: this.y, z: this.z });

            Fz = Parser.parse(fy);
            Fz.variables();
            Fz = Fz.evaluate({ x: this.x, y: this.y, z: this.z });
            errBox.style.display = "none";
        }
        catch (err) {
            Fx = Fy = Fz = 0;
            errBox.style.display = "block";
            errBox.innerHTML = "<p>Invalid Syntax!</p>"
        }
    }
}

function getMagnitude(Ax, Ay, Az) {
    return (sqrt(pow(Ax, 2) + pow(Ay, 2) + pow(Az, 2)));
}

function extremum(arr) {
    max = min = 0;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            if (arr[i][j] < min) {
                min = arr[i][j];
            }
            else if (arr[i][j] > max) {
                max = arr[i][j];
            }
        }
        x += limit / n;
        y = -limit / 2;
    }
    return [min, max];
}

function colorMapper(num, min, max) {
    //map(variable, current start, current stop, target start , target stop)
    let range = max - min;
    let red, green, blue;
    // Divide entire range in to four intervals to map color to them
    // min | r1 | r2 | r3 | max
    let r1 = min + (range / 4);
    let r2 = r1 + (range / 4);
    let r3 = r2 + (range / 4);

    if (num >= min && num < r1) {
        // Here Red=2 Green=2 blue=250 max
        // Green goes on increasing from 2 to 250
        red = 2;
        green = 2;
        blue = 250;
        green = map(num, min, r1, 2, 250);
        return [red, green, blue];
    }
    else if (num >= r1 && num < r2) {
        // Here Red=2 Green=250 max blue=250 max
        // Blue goes on decreasing from 250 to 2
        red = 2;
        green = 250;
        blue = 250;
        blue = map(num, r1, r2, 250, 2);
        return [red, green, blue];
    }
    else if (num >= r2 && num < r3) {
        // Here Red=2 Green=250 max blue=2
        // Red goes on increasing from 2 to 250
        red = 2;
        green = 250;
        blue = 2;
        red = map(num, r2, r3, 2, 250);
        return [red, green, blue];
    }
    else if (num >= r3 && num <= max) {
        // Here Red=250 Green=250 max blue=2 max
        // Green goes on decreasing from 250 to 2
        red = 250;
        green = 250;
        blue = 2;
        green = map(num, r3, max, 250, 2);
        return [red, green, blue];
    }
}

function colorSetter(vec) {
    let bound = extremum(magnitudeArr);
    // console.log(extremum(magnitudeArr));
    let min = bound[0];
    let max = bound[1];
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            color[i][j] = colorMapper(magnitudeArr[i][j], min, max);
        }
    }
}