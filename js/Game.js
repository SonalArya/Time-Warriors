class Game{
  constructor(){
      
  }

  getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function(data){
          gameState = data.val();
      });
  }

  updateState(state){
      database.ref('/').update({
          gameState: state
      });
  }

  async start(){
      if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          
          if(playerCountRef.exists()){
              playerCount = playerCountRef.val();
              player.getCount();
          }

          form = new Form();
          form.display();
      }

      p1 = createSprite(300, 200);
      p2 = createSprite(510, 200);
      

      // player1.addImage("player1", player1_img);
      // player2.addImage("player2", player2_img);
      
      players = [p1, p2];

      passedFinish = false;
  }

  play(){
      form.hide();

      Player.getPlayerInfo();
      player.getFinishedPlayers();

      if(allPlayers !== "undefined"){
          //var displayPos = 150;
          image(bg1, -900*8, 0, 900*10, displayHeight);
          
          var index = 0;
          var x;
          var y = 200;

          for(var plr in allPlayers){
              index += 1;
              x = displayWidth - allPlayers[plr].distance - 70;
              y = 200 + (index * 200) + allPlayers[plr].yPos;
  

              if(index === player.index){
                  fill("red");

                  camera.position.x = players[index - 1].x;
                  camera.position.y = displayWidth/2;
              }else{
                  fill("white");
              }

              players[index - 1].x = x;
              players[index - 1].y = y;

              textAlign(CENTER);
              textSize(20);
              text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
          }
      }

      if(player.distance < 10350){
          if(keyIsDown(38) && player.index !== null){
              yVel += 0.9;
              if(keyIsDown(37)){
                  xVel -= 0.2;
              }
              if(keyIsDown(39)){
                  xVel += 0.2;
              }
          }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
              yVel -= 0.1;
              xVel *= 0.9;
          }else{

              yVel *= 0.985;
              xVel *= 0.985;
          }
      }else if(passedFinish === false){
          yVel *= 0.7;
          xVel *= 0.7;
          Player.updateFinishedPlayers();
          player.place = finishedPlayers;

          player.updateName();
          passedFinish = true;
      }else{
          yVel *= 0.8;
          xVel *= 0.8;
      }

      //move the car
      player.distance += xVel;
      xVel *= 0.98;
      player.yPos += yVel;
      yVel *= 0.985;
      player.updateName();
      //display sprites
      drawSprites();
  }




 
}
