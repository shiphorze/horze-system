class Orbitor{

  constructor(av, angle, distance, id){
    this.av = av;
    this.angle = angle;
    this.distance = distance;
    this.clr = color(204,255,229);
    this.loc = createVector(0,0);
    this.id = id;
    this.acc = 0;
    this.vel = createVector(0,0);
    this.attack = false;
    this.canAttack = true;
    this.number;
  }

  run(){
    this.update();
    this.render();
  }
  update(){
    this.angle= this.angle + this.av;
    //this.loc.x = (Math.cos(this.angle)*this.distance) + particle[this.id].loc.x;
    //this.loc.y = (Math.sin(this.angle)*this.distance) + particle[this.id].loc.y;
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.loc.add(this.vel);
    if(this.attack && typeof ships[this.number] != 'undefined'){
      count2++
      if (count2 <= 250){
        this.acc = p5.Vector.sub(ships[this.number].loc,this.loc);
        this.acc.normalize();
        this.acc.mult(0.5);
        var distance = this.loc.dist(ships[this.number].loc);
        if (distance <= 10){
          ships[this.number].isGrabbed = true;
          count2 = 250;
        }
      } else if(count2 > 250 && count2 <= 500){
        if (ships[this.number].isGrabbed === true){
          ships[this.number].grabbedLoc = this.loc;
        }
        this.acc = p5.Vector.sub(particle[0].loc,this.loc);
        this.acc.normalize();
        this.acc.mult(0.5);
        var distance = this.loc.dist(ships[this.number].loc);
        if (distance <= this.dist){
          count2 = 500;
        }
      }
        else{
          ships.splice(this.number,1);
          this.acc = createVector(0,0);
          this.vel = createVector(0,0);
          this.attack = false;
          this.canAttack = true;
          count2 = 0;
        }
      }
      else{
        if(particle[this.id]){
          this.loc.x = (Math.sin(this.angle)*this.distance) + particle[this.id].loc.x;
          this.loc.y = (Math.cos(this.angle)*this.distance) + particle[this.id].loc.y;
        }
      }
      this.checkDis();
    }

  render(){
    fill(this.clr);
    ellipse(this.loc.x,this.loc.y,5);
  }

  checkDis(){
    for (let j = 0; j < ships.length; j++){
      var distance = this.loc.dist(ships[j].loc);
      //console.log(distance);
      if (distance <= 100){
        //console.log('nice');
        for (let i = 0; i < 5; i++){
          if(particle[this.id]){
          if(particle[this.id].orbitors[i].attack === true){
            this.canAttack = false;
          }
        }
        if (this.canAttack === true){
          this.attack = true;
          counting = true;
          this.number = j;
        }
      }
        //count2++
        //console.log(count2);
      }
    }
  }
}
