const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig2;
var backgroundImg,platform;
var bird, slingshot;
var box6,pig3;
var box7,pig4;
var box8,box9;

var gameState = "onSling";
var bg = "sprites/house.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(600,320,70,70);
    box2 = new Box(820,320,70,70);
    pig1 = new Pig(710, 350);
    log1 = new Log(810,260,550, PI/2);

    box3 = new Box(600,240,70,70);
    box4 = new Box(820,240,70,70);
    pig2 = new Pig(710, 200);

    log3 =  new Log(810,180,550, PI/2);

    box5 = new Box(815,10,50,50);
    log4 = new Log(660,120,100, PI);
    log5 = new Log(770,120,100, PI);
    log6 = new Log(880,120,100,PI);
    log7 = new Log(990,120,100,PI);

    log8 = new Log(825,20,400,PI/2);
    box8 = new Box (705,100,70,70);
    box9 = new Box (935,100,70,70);

    bird = new Bird(200,50);

    box6 = new Box(1040,320,60,70);
    pig3 = new Pig(930,350);

    box7 = new Box(1040,240,70,70);
    pig4 = new Pig(930,200);

    log9 = new Log(780,10,160,PI/7);
    log10 = new Log(850,10,160,-PI/7);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    log6.display();
    log7.display();

    log8.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();   
    
    box6.display();
    pig3.display();
    pig3.score();

    box7.display();
    pig4.display();
    pig4.score();

    box8.display();
    box9.display();

    log9.display();
    log10.display();


}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){

        bird.trajectory = [];  
        
        Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);

       
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=20 && hour<=8){
        bg = "sprites/house.png";
    }
    else if(hour>=8 && hour<=14){
        bg = "sprites/school.png";
    }
    else if(hour>=14 && hour<=17){
        bg = "sprites/home.jpg"
    }
    else if(hour>=17 && hour<=20){
        bg = "sprites/playground.png"
    }

    backgroundImg = loadImage(bg);
    console.log(hour);
}