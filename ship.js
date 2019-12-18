//Blake O'Brien

class Ship{

  constructor (x, y, dx, dy, stat){
    this.loc = createVector(x, y);
    this.vel = createVector (dx, dy);
    this.acc = createVector (0, 0);
    this.clr = color(random(255), random(255), random(255));
    this.w = 15;
    this.angle = 0;
    this.stat = stat;
    this.isGrabbed = false;
    this.grabbedLoc = createVector(0,0);
    this.lifeCount = 0;

    this.health = 5;
    this.maxHealth = 5;
    this.barWidth = 30;

    if(stat === 0) {
      this.w = 50;
    }
    if(stat === 1) {
      this.w = 500;
    }
  }

  run(){
    this.checkEdges();
    this.update();
    this.render();
    this.checkPos();
    this.H();
  }

  checkEdges(){
    if(this.loc.x < 0){
      //if(this.stat === 0 || this.stat === 1) {
      //this.loc.x = width;
      //}
      //else {
      this.vel.x = -this.vel.x;
      //}
    }

    if(this.loc.x > width){
      //if(this.stat === 0 || this.stat === 1) {
      //this.loc.x = 0;
      //}
      //else {
      this.vel.x = -this.vel.x;
      //}
    }

    if(this.loc.y < 0){
      //if(this.stat === 0 || this.stat === 1) {
      //this.loc.y = height;
      //}
      //else {
      this.vel.y = -this.vel.y;
      //}
    }

    if(this.loc.y > height){
      //if(this.stat === 0 || this.stat === 1) {
      //this.loc.y = 0;
      //}
      //else {
      this.vel.y = -this.vel.y;
      //}
    }
  }
  update(){
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.loc.add(this.vel);
    this.acc = createVector(0,0);
    this.lifeCount++;
    if(this.isGrabbed === true){
      this.loc = this.grabbedLoc;
      particle
    }
  }
  render(){
    fill(this.clr);
    push();
    translate(this.loc.x, this.loc.y);
    rotate(this.vel.heading()+PI/2);
    //triangle(-5,0,5,0,0,-15);
    quad(10, 10, 20, 30, 10, 25, 0, 30);
    pop();
    //ellipse(this.loc.x, this.loc.y, this.w, this.w);
  }

  checkPos (){
    //if(this.stat === 2) {
    var dista = this.loc.dist(atrac.loc);
    var distr = this.loc.dist(repel.loc);
    if(dista <= atrac.w + 30) {
      this.acc = p5.Vector.sub(atrac.loc, this.loc);
      this.acc.normalize(); //sets acceleration to 1
      this.acc.mult(2);
    }
    if(distr <= repel.w + 20) {
      this.acc = p5.Vector.sub(this.loc, repel.loc);
      this.acc.normalize(); //sets acceleration to 1
      this.acc.mult(1);
    }


    //}

  }

  H(){

    if (this.health < 1)
    {
      fill(255, 0, 0, 75);
    }
    else if (this.health < 3)
    {
      fill(255, 200, 0, 75);
    }
    else
    {
      fill(0, 255, 0, 75);
    }

    //draw bar
    noStroke();
    var bar = (this.health/this.maxHealth) * this.barWidth
    rect(this.loc.x-50, this.loc.y-50, bar, 15);

    for (let i = 0; i < ships.length; i++){
      if (ships[i].health < 1){ships.splice(i,1)}
    }
    if (this.lifeCount % 200 === 0){
      this.health = this.health -1;
    }
  }
}
