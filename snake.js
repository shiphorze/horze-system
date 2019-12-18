class Snake {

  constructor(){

    this.locHead = createVector(400, 400);
    this.velHead = createVector(random(-4,4), random(-4,4));
    this.acc = createVector(0,0);
    //this.acc = createVector(0, 0.02);

    //let temp = this.velHead;
    //this.segs = [];
    //this.segs[0] = new Segment (this.locHead.x, this.locHead.y, temp.normalize());
    this.heads = [];
    this.tails = [];

    this.health = 5;
    this.maxHealth = 5;
    this.barWidth = 30;

    this.count = 0
  }

  loadSegs(){

    this.heads[0] = createVector(this.locHead.x, this.locHead.y);
    this.tails[0] = createVector(this.heads[0].x-(headV.normalize()).mult(20).x,this.heads[0].y-(headV.normalize()).mult(40).y);
    for (let i = 1; i < 7; i++){
      this.heads[i] = createVector(this.tails[i-1].x, this.tails[i-1].y);
      this.tails[i] = createVector(this.heads[i].x-(headV.normalize()).mult(20).x,this.heads[i].y-(headV.normalize()).mult(40).y);


    }
  }

  render(){
    fill(255, 211, 92);
    ellipse(this.locHead.x, this.locHead.y, 30)

    for (let i = 0; i < 6; i++){
      strokeWeight(12);
      stroke(255, 0, 0, 70);
      line(this.heads[i].x, this.heads[i].y, this.tails[i].x, this.tails[i].y);
      strokeWeight(1);

    }
  }

  update(){

    this.velHead.add(this.acc);
    this.velHead.limit(4);
    this.locHead.add(this.velHead);
    for (let i = this.heads.length-1; i > 0; i--){
      this.heads[i] = p5.Vector.sub(this.heads[i], this.heads[i-1]);
      this.heads[i].setMag(40);
      this.heads[i] = p5.Vector.add(this.heads[i], this.heads[i-1]);
      this.tails[i-1] = this.heads[i];

    }
    //this.tails[this.heads.length-1] = this.heads[this.heads.length-1];
    this.heads[0] = createVector(this.locHead.x, this.locHead.y);
    this.acc = createVector(0,0);
  }

  run(){

    this.render();
    this.update();
    this.checkEdges();
    this.eat();
    this.H();


  }



  checkEdges(){
    if(this.locHead.x < 0){
      this.velHead.x = -this.velHead.x;
    }

    if(this.locHead.x > width){
      this.velHead.x = -this.velHead.x;
    }

    if(this.locHead.y < 0){
      this.velHead.y = -this.velHead.y;
    }

    if(this.locHead.y > height){
      this.velHead.y = -this.velHead.y;
      this.locHead.y = height-2;
    }
  }

  eat(){

    for (let j = 0; j < ships.length; j++){
      var distanceS = this.locHead.dist(ships[j].loc);

      if (distanceS <= 40){
        this.acc = p5.Vector.sub(ships[j].loc, this.locHead);
        this.acc.normalize(); //sets acceleration to 1
        this.acc.mult(0.5);
      }
      if (distanceS <= 10){
        //ships.splice(j,1);
        ships[j].health = ships[j].health -1;
        this.health = this.health + 1;
        //console.log('eat');
      }

    }

    var aDist = this.locHead.dist(atrac.loc);

    if (aDist <= atrac.w + 10){
        console.log('atrac');
        this.acc = p5.Vector.sub(atrac.loc, this.locHead);
        this.acc.normalize(); //sets acceleration to 1
        this.acc.mult(0.5);
    }

  }

  H(){

    if (this.health > 0){
      this.count = this.count + 1;
      if (this.count % 200 === 0){
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
    rect(this.locHead.x-50, this.locHead.y-50, bar, 15);

    if (this.health === 0){
      this.velHead = createVector(0,0);
      this.acc.normalize();
      this.count = 0;
    }



    }

  }
