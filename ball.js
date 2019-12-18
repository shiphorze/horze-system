// Blake O'Brien
class Ball{

  constructor(x, y, dx, dy, stat){
      this.loc = createVector(x, y);
      this.vel = createVector(dx, dy);
      this.acc = createVector(0, 0);
      this.stat = stat;
      if(this.stat === 0) {
        this.w = 60;
        this.clr = color(255, 255, 255);
      }
      else if (this.stat === 1) {
        this.w = 50;
        this.clr = color(255, 255, 255);
      }
      else {
        this.clr = color(random(255), random(255), random(255));
        this.w = random(10, 30);
      }
  }
  run(){
    this.checkEdges()
    this.update()
    this.render()
    this.checkPos()
  }
  checkPos (){
    if(this.stat === 2) {
      var dista = this.loc.dist(atrac.loc);
      var distr = this.loc.dist(repel.loc);
      if(dista <= atrac.w + 20) {
      this.acc = p5.Vector.sub(atrac.loc, this.loc);
      this.acc.normalize(); //sets acceleration to 1
      this.acc.mult(0.5);
      }
      if(distr <= repel.w + 20) {
      this.acc = p5.Vector.sub(this.loc, repel.loc);
      this.acc.normalize(); //sets acceleration to 1
      this.acc.mult(1);
      }
    }
  }
  checkEdges(){
    if(this.loc.x < 0){
      if(this.stat === 0 || this.stat === 1) {
        this.loc.x = width;
      }
      else {
        this.vel.x = -this.vel.x;
      }
  }

  if(this.loc.x > width){
    if(this.stat === 0 || this.stat === 1) {
      this.loc.x = 0;
    }
    else {
      this.vel.x = -this.vel.x;
    }
  }

  if(this.loc.y < 0){
    if(this.stat === 0 || this.stat === 1) {
      this.loc.y = height;
    }
    else {
      this.vel.y = -this.vel.y;
    }
  }

  if(this.loc.y > height){
    if(this.stat === 0 || this.stat === 1) {
      this.loc.y = 0;
    }
    else {
      this.vel.y = -this.vel.y;
    }
  }
}
  update(){
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc = createVector(0,0);

    if (dir ===0){
      this.w++;
    }
    else if (dir === 1){
      this.w--;
    }
  }
  render(){
    fill(this.clr);
    ellipse(this.loc.x, this.loc.y, this.w, this.w);
  }

} // end of code
