let time = 0;
let wave = []
let slider = document.getElementById("slider");
let sliderValue = document.getElementById("sliderValue");
let fx = document.getElementById("select");
let squareWave = document.getElementById("squareWave");
let sawWave = document.getElementById("sawWave");
let n;
let option;
let radius, rx, ry;

function nodisplay(){
  squareWave.style.display = "none";
  sawWave.style.display = "none";
}

function examples(){
  option = fx.value;
}

function setup() {
  createCanvas(650, 400);
}

function draw() {
  background(0);
  translate(200,200); 
  let x = 0;
  let y = 0;
  examples();
  nodisplay();
  n = slider.value;
  sliderValue.value = n;

  for(let i = 0; i < n ; i++){
    let prevx = x;
    let prevy = y;

    
    //Define Function Here
    if(option==1){
      let n = i * 2 + 1;
      radius = 75 * (4 / (n * PI));
      x += radius * cos(n * time);
      y += radius * sin(n * time);

      stroke(255, 100);
      noFill();
      ellipse(prevx, prevy, radius*2, radius*2);

      squareWave.style.display = "block";
    }
    else if (option==2) {
      let n = i + 1 ;
      radius = -50 / n;
      x += radius * cos(n * time);
      y += radius * sin(n * time);   
       
      stroke(255, 100);
      noFill();
      ellipse(prevx, prevy, radius*2);

      sawWave.style.display = "block";
    }
    
    fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    //ellipse(x, y, 5); 
    
  }
  wave.unshift(y);
  
  translate(200,0);
  line(x-200,y,0,wave[0]);

  beginShape();
  noFill(); 
  for(let i = 0; i<wave.length; i++){
    vertex(i,wave[i]);
  }
  endShape();

  time += 0.04;

  if(wave.length > 240){
    wave.pop();
  }
}