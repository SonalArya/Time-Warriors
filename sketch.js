var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var database;

var distance;

var form, player, game;

var player1, player2;

var robinIdle, marryIdle;

var enemy1, enemyImg;

var players;

var finishedPlayers;

var bg1;

var yVel, xVel;

var passedFinish;

function preload(){
  bg1 = loadImage("Images/Level 1/bg3.jpg");

  robinIdle = loadImage("Images/Robin/robinIdle.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.updateState(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.updateState(2);
    game.end();
  }
}
