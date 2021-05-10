
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananasImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 200);

  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  // trex.addAnimation("collided",trex_collided)
  monkey.scale = 0.1;
  
  ground = createSprite(300,180,1200,20);
  ground.x = ground.width /2;

  
  
  obstaclesGroup = new Group();
  banansGroup = new Group();
  score = 0;
}

function draw() {
  background("lightblue");
  console.log(gameState);
  
  if(gameState==="play" ){
    //making the ground move
    ground.velocityX = -4;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //updating the score
    score = score+Math.round(frameCount/100);
    //making trex jump
    if(keyDown("space") && monkey.y>=100) {
       monkey.velocityY = -10;
    }
    //creating gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    //spawn the clouds
    spawnBananas();
    //spawnObstacles
    createObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = "end";
    }
  }
  else if(gameState==="end" ){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
  }
  
  //trex colliding with invisible ground
  monkey.collide(ground);
  
  //console.log("score" + 5);
  
  //display score
  text("score:"+score, 500,40);
  
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    Bananas = createSprite(600,100,40,10);
    Bananas.addImage(bananasImage)
    Bananas.y = Math.round(random(10,60))
    Bananas.scale = 0.1;
    Bananas.velocityX = -3;
    Bananas.lifetime = 200;
    //adjust the depth
    Bananas.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
    }
}

function createObstacles () {

  if(frameCount % 100 === 0) {
    obstacle = createSprite(600,160,10,40);   
    obstacle.velocityX = -2;
    obstacle.scale = 0.1;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacle.addImage(obstacleImage);
              break;    
      case 2:obstacle.addImage(obstacleImage);
              break;
     
        
           
              
    }
  
    obstacle.lifetime = 300;
  }
}