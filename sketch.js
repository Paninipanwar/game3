var bird
var pipes = []
var floorY
var panini;

function preload() {
  panini = loadImage ("panini.png")
}


function setup() {
  createCanvas(800, 400);
  noStroke()
  floorY = 0.9 * height
  imageMode(CENTER)
  
  bird = new Bird ()
  for(var i = 0; i < 3; i ++) {
  pipes[i] = new Pipe(width + width/2 * i)
  }
}

function draw() {
  background(0, 0, 255);
  for(var i = 0; i < pipes.length; i++) {
  pipes[i].draw(bird)
  }
  fill (0, 0, 100);
  rect (0, floorY, width, height-floorY)
  
 bird.draw()
  fill(0,0,0)
  if(bird.health == 0) {
    fill(500,500,500)
    textSize(30)
    textAlign (CENTER,CENTER)
  text ("Kat gaya na Chutiya",width/2, height/2)
  }
  fill(500,500,500)
  textAlign(LEFT,TOP)
  textSize(20)
  text("Score: " + bird.score, 10,10)
  text("High score: " + bird.highscore, 10,35 )
  
}

function doAction() {
  
  if (bird.health == 1 ) { //alive
  bird.jump()  
  } else {
    for(var i = 0; i < pipes.length; i++) {
      pipes[i].reset() 
    }
    bird.reset()
  }
}

function mousePressed (){
  doAction()
}

function keyPressed() {
  if (key == " ") {
    doAction()
  }
}

//PLAYER

class Bird {
  constructor() {
    this.size = 0.1 * width
    this.aMax = 0.20
    this.floor = floorY
    this.reset()
    this.highscore = 0
    
  }
  draw () {
    this.vy = this.vy + this.ay
    this.y = this.y + this.vy
    
    if(this.ay < this.aMax) {
      this.ay = this.ay + 0.4 }
    else { 
      (this.a = this.aMax) }
    
    
    if (this.y > this.floor) {
    this.vy = 0
    this.ay = 0 
    this.y = this.floor
    this.health = 0
    }
    image(panini,this.x, this.y, this.size,           this.size)

  }
  
  jump() {
  this.vy = 0
  this.ay= -1.7 
  }
  reset(){
    if(this.score > this.highscore){
      this.highscore = this.score
    }
  this.x = width/3
  this.y = height/2
  this.vy = 0
  this.health = 1
  this.ay = this.aMax
  this.floor = floorY
  this.score = 0
  
  }
  
}

// pipe

class Pipe {
  constructor (x) {
    this.x0 = x
    this.gapWidth = 0.05 * width
    this.gapHeight = 0.3 * height
    this.reset()
  
  }
  draw (bird) {
    fill (15,0,100)
    rect (this.x, 0, this.gapWidth, this.topGap)
    rect (this.x, this.topGap + this.gapHeight,
          this.gapWidth,
          height - this.topGap - this.gapHeight )
    fill (400,400,400)
    text("Life", this.x, this.topGap + this.gapHeight,
          this.gapWidth,
          height - this.topGap - this.gapHeight)
    
  
    if (bird.health == 1) {
    this.x = this.x -2 
    }
      if(this.x < - width/2) {
      this.x = width + this.gapWidth/2 
      this.topGap = map(random(0,1), 0,1,
                      0.1 * height,
                      0.6 * height)
        this.score = 1
      }  
      if(bird.x + bird.size/2 >= this.x &&
        bird.x - bird.size/2 <= this.x + this.gapWidth) {
        if(bird.y - bird.size/2 <= this.topGap ||
          bird.y + bird.size/2 >= this.topGap + this.gapHeight) {
          bird.health = 0
          
        if(bird.x > this.x &&
           bird.x < this.x + this.gapWidth){
        bird.floor= this.topGap + this.gapHeight
        }
        }
        //bird passes this pipe
        if(bird.x > this.x + this.gapWidth && this.score > 0) 
        { this.score--
                                                       bird.score++
                                                      }
      }
  }
  reset () { 
    
    this.x = this.x0
    this.topGap = map(random(0,1), 0,1,
                      0.1 * height,
                      0.6 * height)
  this.score = 1}
}
