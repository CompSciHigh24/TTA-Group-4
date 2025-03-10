let state = 0

var playX = 100
var playY = 400
var playSpeed = 3
var playW = 100
var playH = 100


////// enemy vars

var enemyX = 800
var enemyY = 420
var enemyW = 70
var enemyH = 70
var enemySize

var end = false


///////////////////////////////////////////// Boss

var bossX = 800
var bossY = 420
var bossW = 90
var bossH = 90
var bossSize

var bossWaitTilEnter = 30

 

let scroll;

var isLeft;
var isRight;

//////// canvas

var canvasX = 800
var canvasY = 500
////////// music
var music;
var jumpSound;

let platX = 500

var platforms = []

///////// gravity
var jump = false
var direction = 1
var velocity = 2
var jumpPower = 13
var fallingSpeed = 8
var minHeight = 395
var maxHeight = 200
var jumpCounter = 0

var numPlat = 100

//box

var b1X = 200;
var b1Y = 320;
var b1W = 200;
var b1H = 40;

var score = 0

var m = 0
var t = 0

let loseSound;



////////////////////// NO GRAVITY VARS(or vars in general lmao)

function preload() {
  bgImage = loadImage("images/Background.png")
  player = loadImage("images/GD_yeah.png")
  whiteBoi = loadImage("images/Player.png")
  music = loadSound("audio/song.mp3")
  jumpSound = loadSound("audio/jumpSound.mp3")
  enemy = loadImage("images/enemy.png")
  dragon = loadImage("images/dragon.png")
  bossDude = loadImage("images/FIRE.png")
  theMenu = loadImage("images/temubackground.png")
  fireHole = loadSound("audio/FireInHole.mp3")
  gd_BG = loadImage("images/GD_BG.jpg")
  loseMenu = loadImage("images/lostBackground.png")
  loseSound = loadSound("audio/loseSound.mp3")
}




function setup() {
  createCanvas(canvasX, canvasY);
  background(0);
  scroll = 0
  enemySize = 100
  
}

function draw() {
  if (state == 0) {
    menu()
  }

  if (state == 1) {
    game()
    m++
  
  }

  if (state == "lose") {
    losing()
    
  }

  if (state == "win") {
    winner()
  }

  gravity()

} // end of draw


// menu screen



function menu() {
  background(theMenu)

  fill(255, 255, 255, 100)
  noStroke()
  rect(300, 15, 190, 130)
  
  if(mouseX > 200 && mouseX <= 400 && mouseY >= -80 && mouseY <= 110 && mouseIsPressed === true && state == 0){
    daSong()
    state = 1
  }
}// end of menu

function daSong() {
  music.play()
}


// mouseclicked

function mouseClicked() {

  
} // end of mouseClicked





function game() {
  background(0, 0, 0)
  image(gd_BG, 500, 100,  1000, 800)
  image(player, 100, playY, playW, playH)
  imageMode(CENTER)
  fill(0, 255, 0)

  //////// drawing the platforms

  rect(-40, 450, 500, 50)

  var plats = {
    x: -40,
    y: 450,
    w: 500,
    h: 50
  }
platforms.push(plats)
  for(let plats of platforms){
    plats.x += 250
    rect(plats.x, plats.y, plats.w, plats.h)
  }

  //OMG IT WORKKKKKSSS YESSSSSSSSSSS

  
text("Score: " + score, 100, 100)
textSize(25)


  ///////////////////// scrolling

/////////// enemy ai

  if(score < 29 || score > 29 ){
    image(enemy, enemyX, enemyY, enemyW, enemyH)
  }


   enemyX += -9
  if(enemyX <= 0){
    score = score + 1
    enemyX = 900
  }

 
// collisions
var enemyDist = dist(playX, playY, enemyX, enemyY)

   if(enemyDist <= (playW / 2) + (enemyW / 2)){
       state = 'lose'
    }  


  if(score == 3){
  image(bossDude, enemyX, enemyY, enemyW, enemyH)
  bossX += -9
  fireHole.play()
  }

  // Time Played

  if(m % 60 == 0 || m % 60 > 0){
    t++
  }
  

} // end of game function

if(enemyX <= 0){
  enemyX = 500
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    jump = true
    jumpSound.play()
  }
}

function keyReleased() {
  jump = false
}





function gravity() {

  if (playY >= minHeight && jump == false) {
    playY = playY
    jumpCounter = 0

  } else {

    playY = playY + (direction * velocity) // gravity
  }

  if (jump == true) {
    if (playY <= maxHeight || jumpCounter >= jumpPower) {
      if (playY >= minHeight) {
        playY = minHeight
      } else {
        velocity = fallingSpeed
      }

    } else {
      velocity = -jumpPower // jumping
      jumpCounter = jumpCounter + 1
    }

  } else {
    velocity = fallingSpeed
  }


} // end of gravity function






/////////////// other states(like losing, winning etc)





function losing() {
  image(loseMenu, 500, 100,  1000, 900)
  fill('red')
  text("You lost vro", 250, 30)
  fill('purple')
  text('Time Played: '+ t, 350, 160)
  textSize(30)
  fill('white')
  rect(450, 190, 70, 30)
  music.stop()
} // end of lose function

function winner() {
  background(0, 0, 100)
  text("You Win", 250, 150)
  textSize(30)
  rect(350, 190, 70, 30)

} // end of winner function


// Restting






