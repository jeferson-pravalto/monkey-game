
var monkey , monkey_running,monkey_jump
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, ground_animation, ground_rep


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_jump = loadImage("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  ground_animation = loadImage("background.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
  //ground
  ground = createSprite(300,370,600,20);
  ground_rep = createSprite(450,200,600,20);
  ground_rep.addAnimation("Ground", ground_animation);
  ground_rep.scale = 1.5;
  
  //FoodGroup & ObstacleGroup
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //monkey details
  monkey = createSprite(75,325,25,25);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1; 

  score = 0;
}


function draw() {

  background ("#87ceeb");
  
  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY+0.8;
  
  
  //Space-Press Command
  if(keyWentDown("space") && monkey.y>324 ) {
    monkey.velocityY=-16;
  } else if (monkey.y<320){
    monkey.pause();
  } else if (monkey.y>320){
    monkey.play();
  }
  
  
  //Ground Reset Command
  ground_rep.velocityX=-2;
  if(ground_rep.x<125){
    ground_rep.x = ground_rep.width/2
  }
  
  //score
  score = Math.round(frameCount/50);
  
  //FoodScore Try
  if(monkey.collide(FoodGroup)){
      FoodGroup.destroyEach();
    }
  
  
  //Spawn THings
  obstacleSpawn();
  bananaSpawn();
  
   
  drawSprites();
  
  
  text("Score = "+score , 500,50);
  textSize(150);
  fill(0,128,0); 
  
}

 
  

//_______________________________________________________

//Banana Spawn
function bananaSpawn(){
  
  if(frameCount%85 === 0){
    //Banana
    banana = createSprite(650,random(140,210),10,10);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4 ;
    banana.lifetime = 200;    
  
  }

}

function obstacleSpawn(){
  if(frameCount%180 === 0){
    //Obstacle
    obstacle = createSprite(650,325,10,10);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5 ;
    obstacle.lifetime = 150;    
    obstacleGroup.add(obstacle);
    
  }
  
  
  
}