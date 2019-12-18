//  Blake O'Brien
// 	3 September 2019
//  This is a comment
//  The setup function function is called once when your program begins

//var balls = [];
//var triangles = [];
//var squs = [];
var ships = [];
var atrac;
var repel;
c = 20; //amount of things I want
var count = 0 //for pulsating particles
var count2 = 0 //time-limit for orbitors to extend
var counting = false;
var dir = 0;
var particle = [];
var shipSpawining = true;
var count3 = 0; //for ship count

function setup() {
  var cnv = createCanvas(2000, 2000);
  cnv.position((windowWidth-width)/2, 30);
  background(5, 5, 5);

  snake =  new Snake();
  headV = createVector(snake.velHead.x, snake.velHead.y);
  snake.loadSegs();

  atrac = new Ball(0,0,  random(-5, 5),random(-5, 5), 0);
  repel = new Ball(0,0,  random(-5, 5),random(-5, 5), 1);

  for (let i = 0; i < c; i ++) {
    //balls[i] = new Ball(random(width), random(height), random(-5, 5),random(-5, 5), 2);
    //triangles[i] = new Triangle(random(width), random(height),random(-10, 10),random(-10, 10), 2);
    //squs[i] = new Square(random(width), random(height),random(-10, 10),random(-10, 10), 2);
    ships[i] = new Ship(790, 10, random(-5, 5), random(-5, 5), i);
  }
  for (let i = 0; i < 4; i++){
    particle[i] = new Particle(random(100,300), random(20,100), random(-5, 5),random(-5,5), i);
  }
}

//  The draw function is called @ 30 fps
function draw() {
  background(5, 5, 5);

  if (snake.health > 0) {
  snake.run();
  headV = createVector(snake.velHead.x, snake.velHead.y);
  }
  atrac.run();
  repel.run();

  for (let i = 0; i < particle.length; i++){
      particle[i].run();
    }

  if (dir === 0){
    count++
  }
  else if (dir ===1){
    count--;}

  if (count === 20){
    dir = 1;
  }
  else if (count === 0){
    dir = 0;
  }

  count3++

  if (count3 % 15 === 0){
    if (shipSpawining){
      ships[ships.length] = new Ship(790, 10, random(-5, 5), random(-5, 5), ships.length+1);
  }
  }
  for (let i = 0; i < ships.length; i ++) {
    //balls[i].run();
    //triangles[i].run();
    //squs[i].run();
    ships[i].run();
  }
}
