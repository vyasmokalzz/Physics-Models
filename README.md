# Physics Models
## Interactive Visualizations for Understanding Complex Structures

[Link to the Project](https://vyasmokalzz.github.io/Physics-Models/)
> [!IMPORTANT]
> Project is not supported by Mobile Browsers.

## Table of Contents
- [Introduction](#Introduction)
  - [Overview](#Overview) 
  - [Motivation](#Motivation)
  - [Evolution from Processing to p5.js](#Evolution-from-Processing-to-p5.js)
  - [Incorporating 3D Graphics with WEBGL](#Incorporating-3D-Graphics-with-WEBGL)
  - [Project Highlights](#Project-Highlights)
- [What is p5js and WEBGL](#What-is-p5js-and-WEBGL)
- [References](#References)

## Introduction
### Overview
This project is born out of a passion for combining the power of coding with the beauty of physics. Inspired by the enlightening approach of 3Blue1Brown [[1](https://www.youtube.com/@3blue1brown)] and the capabilities of p5.js, this endeavor seeks to bridge the gap between static 3D images and a deep understanding of complex structures.

### Motivation
In physics, the power of visualization cannot be overstated. Traditional static images often fall short in conveying the intricacies of crystal structures, vector fields, 3D functions and other concepts. Recognizing this limitation during a solid state physics lecture, I embarked on a coding journey initially for the sheer joy of learning and exploring.

### Evolution from Processing to p5js
Having previously created a simple cubic model using Processing, the project gradually evolved as I discovered the versatility of p5.js, a JavaScript library designed for drawing and animations. What made it even more appealing was its compatibility with any web browser, eliminating the need for specific software installations.

### Incorporating 3D Graphics with WEBGL
The incorporation of WEBGL in p5.js opened up exciting possibilities for creating intricate 3D crystal structures. The project has successfully transitioned from a static representation to an interactive and dynamic experience, allowing users to explore and understand complex physical phenomena effortlessly.

### Project Highlights
The project currently encompasses an array of interactive models, including Crystal Structures, Voids, Miller Indices, Fourier Series, Vector Functions, and Larmor Precession. The aim is to visualize these concepts and provide an engaging platform for learning and exploration.

## What is p5js and WEBGL
p5.js [[2](https://p5js.org/)] is a free and open-source JavaScript library for creative coding, with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else!

WebGL [[3](https://p5js.org/learn/getting-started-in-webgl-coords-and-transform.html)], or Web Graphics Library, is a JavaScript API (Application Programming Interface) that enables the rendering of 3D and 2D graphics within web browsers. It provides a bridge between the browser and the computer's GPU (Graphics Processing Unit), allowing for hardware-accelerated graphics rendering.

A basic p5.js program incorporating WEBGL looks like this:
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('a red box on a white background');
}

function draw(){
  background(255);
  fill(255,0,0);
  box();
}
```
One of the most fundamental differences between working in 2D and working in 3D is the most obvious: there is one more dimension to work with. In addition to the horizontal and vertical position (x and y axes) of an element in our drawing, 3D adds depth, the z-axis.

When drawing in 2D, the point (0,0) is located at the top left corner of the screen. In WebGL mode, the origin of the sketch (0,0,0) is located in the middle of the screen. By default, the x-axis goes left-to-right, y-axis goes up-to-down, and the z-axis goes from further-to-closer.



## Chapter 2
## Chapter 3
## References
1. https://www.youtube.com/@3blue1brown
2. https://p5js.org/
3. https://p5js.org/learn/getting-started-in-webgl-coords-and-transform.html
