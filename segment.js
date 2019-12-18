class Segment {

  constructor(x, y, normal){

    this.locSegHead = createVector(x, y);
    this.normal = normal;

  }

  render(){

    strokeWeigth(20);
    let locTail = p5.vector.add(this.locSegHead, this.normal);
    line(this.locSegHead.x, this.locSegHead.y, this.locTail.x, this.locTail.y);

  }

  update(){

    this.locSegHead = snake.locHead;

  }

  run(){

    this.render();
    this.update();

  }
}
