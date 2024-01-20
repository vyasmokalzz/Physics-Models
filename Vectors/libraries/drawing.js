let t1,t2,t3;
// let fx = "sin(x+y)", fy = "sin(y-x)", fz = "0";

function getFieldX() {
    fx = document.getElementById("funcx").value;
    localStorage.setItem("fx", fx);
    if (is3d) {
        updateColor3d();
    }
    else {
        updateColor();
    }
}

function getFieldY() {
    fy = document.getElementById("funcy").value;
    localStorage.setItem("fy", fy);
    if (is3d) {
        updateColor3d();
    }
    else {
        updateColor();
    }
}

function getFieldZ() {
    fz = document.getElementById("funcz").value;
    localStorage.setItem("fz", fz);
    if (is3d) {
        updateColor3d();
    }
    else {
        updateColor();
    }
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
        this.vecField();
        this.magnitude = getMagnitude(Fx, Fy, Fz);
        this.azimuth = -PI / 2 + atan2(Fy, Fx);
        this.zenith = atan(Fz / sqrt(pow(Fx, 2) + pow(Fy, 2)));
    }

    display(i, j) {
        this.vecField();
        if (isFinite(this.magnitude) && this.magnitude != 0) {
            push();
            translate(this.x * (boxSize / limit), this.y * (boxSize / limit), this.z * (boxSize / limit));
            rotateZ(this.azimuth);

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

    display3d(i, j, k) {
        this.vecField();
        if (isFinite(this.magnitude) && this.magnitude != 0) {
            push();
            // rotateZ(-PI/2);
            translate(this.x * (boxSize / limit), this.y * (boxSize / limit), this.z * (boxSize / limit));
            rotateZ(this.azimuth);
            rotateX(this.zenith);

            noStroke();

            ambientMaterial(color[i][j][k]);
            // ambientMaterial(250,250,2);

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

    vecField() {
        try {
            Fx = Parser.parse(fx);
            Fx.variables();
            Fx = Fx.evaluate({ x: this.x, y: this.y, z: this.z });

            Fy = Parser.parse(fy);
            Fy.variables();
            Fy = Fy.evaluate({ x: this.x, y: this.y, z: this.z });

            Fz = Parser.parse(fz);
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
    max = min = arr[0][0];
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            if (isFinite(arr[i][j])) {
                if (arr[i][j] < min) {
                    min = arr[i][j];
                }
                else if (arr[i][j] > max) {
                    max = arr[i][j];
                }
            }
        }
    }
    return [min, max];
}

function extremum3d(arr) {
    max = min = arr[0][0][0];
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            for (let k = 0; k <= n; k++) {
                if (isFinite(arr[i][j][k])) {
                    if (arr[i][j][k] < min) {
                        min = arr[i][j][k];
                    }
                    else if (arr[i][j][k] > max) {
                        max = arr[i][j][k];
                    }
                }
            }
        }
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
    if (range == 0) {
        return [2, 250, 2];
    }
    else if (num >= min && num < r1) {
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

function colorSetter() {
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

function colorSetter3d() {
    let bound = extremum3d(magnitudeArr);
    // console.log(extremum(magnitudeArr));
    let min = bound[0];
    let max = bound[1];
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            for (let k = 0; k <= n; k++) {
                color[i][j][k] = colorMapper(magnitudeArr[i][j][k], min, max);
            }
        }
    }
}

// When Field is change color is updated by this function
function updateColor() {
    x = -limit / 2, y = -limit / 2, z = 0;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            // These conditions sets vector fields on Axes and Origin due to limit/n problems
            if (abs(x) < 1e-5) {
                x = 0;
            }
            if (abs(y) < 1e-5) {
                y = 0;
            }

            vec[i][j] = new Arrow(x, y, z);
            vec[i][j].vecField();
            magnitudeArr[i][j] = getMagnitude(Fx, Fy, Fz);
            y += limit / n;
        }
        x += limit / n;
        y = -limit / 2;
    }
    colorSetter();
}

function updateColor3d() {
    x = -limit / 2, y = -limit / 2, z = -limit / 2;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= n; j++) {
            for (let k = 0; k <= n; k++) {
                // These conditions sets vector fields on Axes and Origin due to limit/n problems
                if (abs(x) < 1e-5) {
                    x = 0;
                }
                if (abs(y) < 1e-5) {
                    y = 0;
                }
                if (abs(z) < 1e-5) {
                    z = 0;
                }

                vec[i][j][k] = new Arrow(x, y, z);
                vec[i][j][k].vecField();
                magnitudeArr[i][j][k] = getMagnitude(Fx, Fy, Fz);
                z += limit / n;
            }
            z = -limit / 2;
            y += limit / n;
        }
        z = -limit / 2;
        y = -limit / 2;
        x += limit / n;
    }
    colorSetter3d(vec);
}