var bgImg, star1Img, star2Img, shootingImg, lifeImg, life, star;
var aster1Img, aster2Img, astronautImg, spaceImg, gameoverImg, gameover, restartImg, restart;
var score=0;
var lives = 3;
var gameState = 'play';

function preload(){
  bgImg = loadImage("background.jpg");
  star1Img = loadImage("Star1.png");
  star2Img = loadImage("Star2.png");
  shootingImg = loadImage("shootingStar.png");
  aster1Img = loadImage("Asteroid1.png");
  aster2Img = loadImage("Asteroid2.png");
  astronautImg = loadImage("Astronaut.png");
  spaceImg = loadImage("spaceship.png");
  bg1Img = loadImage("background.jpg");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  lifeImg = loadImage("lifeIMG.png");
  Img25 = loadImage("-25_IMG.png");
  Img50 = loadImage("-50_IMG.png");
  coinSound = loadSound("coin.wav")
  missSound = loadSound("miss.wav");
  gameoverSound = loadSound("gameOverSound.wav");
  winSound = loadSound("win.wav")

}

function setup (){
  createCanvas (displayWidth-120, displayHeight-140)
  bg = createSprite(width/2,height/2)
  bg.addImage(bgImg)
  bg.scale= 0.4

  bg1 = createSprite(width,height/2)
  bg1.addImage(bg1Img)
  bg1.scale= 0.4
  bg1.velocityX = -2

  astronaut = createSprite(100, height-100)
  astronaut.addImage(astronautImg)
  astronaut.scale = 0.4;

  n_25 = createSprite(astronaut.x, astronaut.y)
  n_50 = createSprite(astronaut.x, astronaut.y)
  n_25.scale = 0.2;
  n_50.scale = 0.2;
  n_25.visible = false;
  n_50.visible =false;
  n_25.addImage(Img25);
  n_50.addImage(Img50);

  star1g = createGroup()
  star2g = createGroup()

  enemyG = createGroup()

  spaceship = createSprite(displayWidth-300, displayHeight-200)
  spaceship.addImage(spaceImg)
  spaceship.visible = false

  gameover = createSprite(displayWidth/2, displayHeight/2)
  gameover.addImage(gameoverImg)
  gameover.scale = 0.8;
  gameover.visible = false

  restart = createSprite(displayWidth/2, displayHeight/2-300)
  restart.addImage(restartImg)
  restart.scale = 0.5;
  restart.visible = false

  life1 = createSprite(displayWidth-300, 50)
  life1.addImage(lifeImg)
  life1.scale = 0.1;

  life2 = createSprite(displayWidth-250, 50)
  life2.addImage(lifeImg)
  life2.scale = 0.1;

  life3 = createSprite(displayWidth-200, 50)
  life3.addImage(lifeImg)
  life3.scale = 0.1;

  life = [life1,life2,life3]
}

function draw (){
  background(0)
  drawSprites()

  textSize(30)
  fill ("white")
  text("Score : "+score, 100, 100)

  edges = createEdgeSprites()
  astronaut.bounceOff(edges[0])
  astronaut.bounceOff(edges[1])
  astronaut.bounceOff(edges[2])
  astronaut.collide(edges[3])

  if (keyDown("right")){
    astronaut.x += 2;
  }

  if (keyDown("up")){
    astronaut.velocityY = -10;
  }

 astronaut.velocityY += 0.5;

  if(gameState === 'play'){
    bg.velocityX = -2
    bg1.velocityX = -2

    gameover.visible = false
    restart.visible = false
    astronaut.visible = true

    console.log(star1g.x)
    

    for(var i = 0; i<star2g.length; i++){



      if (star2g.get(i).x<astronaut.x){
        score = score-25
        n_25.visible = true;
        n_25.x = star2g.get(i).x
        n_25.y = star2g.get(i).y
        n_25.velocityY = -10;
        missSound.play()
        star2g.get(i).destroy()
      }
    }

    for(var i = 0; i<star1g.length; i++){



      if (star1g.get(i).x<astronaut.x){
        score = score-50
        n_50.visible = true;
        n_50.x = star1g.get(i).x
        n_50.y = star1g.get(i).y
        n_50.velocityY = -10;
        missSound.play()
        star1g.get(i).destroy()
      }
    }
    
  createEnemy()

  if(frameCount %100 === 0){
    var select = Math.round(random(1,2))
      if(select === 1){
        createStars1()
      }
      else{
        createStars2()
      }
    }


 
  if(bg.x<0){
    bg.x = width/2
  }

  if(bg1.x<width/2){
    bg1.x = width
  }
  

  if (astronaut.isTouching(enemyG)){
    gameState = 'over'
    lives--
  }

  for(var i = 0; i<star1g.length; i++){



  if (star1g.get(i).isTouching(astronaut)){
    score = score+100
    coinSound.play()
    star1g.get(i).destroy()
  }
}

for(var i = 0; i<star2g.length; i++){



  if (star2g.get(i).isTouching(astronaut)){
    score = score+50
    coinSound.play()
    star2g.get(i).destroy()
  }
}

if (score >= 2000){
  gameState = 'end'
}

  }

  else if(gameState === 'over'){
    star1g.destroyEach()
    star2g.destroyEach()
    enemyG.destroyEach()
    bg.velocityX = 0;
    bg1.velocityX = 0;
    astronaut.visible = false
    gameover.visible = true
    gameover.addImage(restartImg)
    enemyG.destroyEach()
    life[lives].destroy()
    console.log(bg.x)

    if(lives>0){
      fill ("red")
      textSize(40)
      text("Oops! Try again!!",500,200)

    

    if(mousePressedOver(gameover)){
      gameState = 'play'
    }
  }
    else{
      gameover.addImage(gameoverImg)
      gameoverSound.play()
    }
}

  else{
    spaceship.visible = true
    bg.velocityX = 0;
    bg1.velocityX = 0
    star1g.destroyEach()
    star2g.destroyEach()
    enemyG.destroyEach()

    

  if(astronaut.isTouching(spaceship)){
    astronaut.visible = false
    spaceship.x = displayWidth/2
    fill ("yellow")
    textSize(40)
    text("Congrats!! You Won!!",500,200)
    winSound.play()
    spaceship.y = displayHeight/2
  }

  }
  
  
}

function createStars1 (){
 
    var star = createSprite(width, random(50, height/2+100))
    star.velocityX = -2
    star.scale = 0.1
    star.lifetime = width/2

    star.addImage(star1Img)
    star1g.add(star)
  
  }


function createStars2 (){
  
    var star = createSprite(width, random(50, height/2+100))
    star.velocityX = -2
    star.scale = 0.3
    star.lifetime = width/2

     star.addImage(star2Img)
     star2g.add(star)

}

function createEnemy (){
  if (frameCount % 250 === 0){
    enemy = createSprite(displayWidth,50)
    //enemy.debug = true;
    enemy.scale = 0.5;
    enemy.setCollider('rectangle',0,0,100,100);
    var position = Math.round(random(1,2))
    enemy.velocityX = -4
    enemy.velocityY = 2
    var select = Math.round(random(1,3))
    if (select === 1){
      enemy.addImage(aster1Img)
    }
    else if(select === 2){
      enemy.addImage(aster2Img)
    }
    else{
      enemy.addImage(shootingImg)
    }

    enemy.lifetime = displayWidth/4
    enemyG.add(enemy)
  }
}