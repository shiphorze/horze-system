class Particle{

  constructor(x,y,dx,dy, id){
    this.loc = createVector(x, y);
    this.vel = createVector (dx, dy);
    this.acc = createVector (0, 0);
    this.clr = (random(255), random(255), random(255));
    this.w = 15;
    this.angle = 0;
    this.orbitors = [];
    this.id = id;
    this.clr = color(random(255),random(255),random(255));

    this.health = 5;
    this.maxHealth = 5;
    this.barWidth = 30;

    this.count = 0

    for (let i = 0; i<5; i++){
      this.orbitors[i]= new Orbitor(0.05, (2*PI/5)*i, 30, this.id);
    }
  }

  render(){
    fill(this.clr);
    ellipse(this.loc.x,this.loc.y,this.w);
    //for (let i = 1; i < 3; i++ ){

    //}
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

  run(){
    this.update();
    this.render();
    this.checkEdges();
    this.H();
    this.eat();
    if (this.health > 1){
    for (let i = 0; i < this.orbitors.length; i++){
      this.orbitors[i].run();
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


  H(){

    if (this.health > 0){
      this.count = this.count + 1;
      if (this.count % 500 === 0){
        this.health = this.health - 1;
      }
    }

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

    if (this.health === 0){
      this.velHead = createVector(0,0);
      this.acc.normalize();
      this.count = 0;
    }

    for (let i = 0; i < particle.length; i++){
      if (particle[i].health < 1){particle.splice(i,1)}
    }

  }

eat() {

  for (let j = 0; j < ships.length; j++){
    var distanceS = this.loc.dist(ships[j].loc);

    if (distanceS <= 10){
      //ships.splice(j,1);
      ships[j].health = ships[j].health -3;
      this.health = this.health + 1;
      //console.log('eat');
    }
}

  }
}
