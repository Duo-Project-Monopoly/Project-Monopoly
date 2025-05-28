var dice1 = $("#dice_player1")
var dice2 = $("#dice_player2")


//initializate palyer statue
var players = {
  player1: {
    score: parseInt(document.getElementById('score1').textContent),
    position: 1
  },
  player2: {
    score: parseInt(document.getElementById('score2').textContent),
    position: 1
  }
}



// Get cell by current player position
function getCurrentCell(playerId) {
  var position = players[playerId].position;
  return document.querySelector(`.cell[id="${position}"]`);
}


// Update score on screen
function updateScoreUI(playerId) {
  if (playerId === "player1") {
    document.getElementById("score1").innerText = players[playerId].score;
  } else if (playerId === "player2") {
    document.getElementById("score2").innerText = players[playerId].score;
  }
}
// Buy logic based on background color
function handleBuy(playerId) {
  var cell = getCurrentCell(playerId)
  var bg = cell.style.backgroundColor

  var isLand = cell.classList.contains('land1') || cell.classList.contains('land2') ||
    cell.classList.contains('land3') || cell.classList.contains('land4') ||
    cell.classList.contains('land5') || cell.classList.contains('land6') ||
    cell.classList.contains('land7') || cell.classList.contains('land8');

  if (bg === 'rgba(173, 123, 108, 0.37)' || bg === 'rgb(73, 112, 73)') {
    alert("This land is already owned.");
    return;
  }

  if (!isLand) {
    alert("You cannot buy this property");
    return;
  }
//you goonna to buy   a property
  var price = parseInt(cell.getAttribute('price'));
  if (players[playerId].score < price) {
    alert("Not enough money!")
    return
  }

  players[playerId].score -= price
  cell.style.backgroundColor = playerId === 'player1' ? 'rgb(73, 112, 73)' : 'rgba(173, 123, 108, 0.37)';
  updateScoreUI(playerId);
}

var diceImages = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png",
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png",
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png",
  "https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png",
  "https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png"
]
//this function is responsible of updating the image of dice when i clicked the dice it take as parameter dice id (dice belong to who) and the random number and then search a new image which have an index same as random
function rollDice(diceId, value) {
  var dice = document.getElementById(diceId)
  dice.src = diceImages[value]
}

//------------------------------------------------------------------------------ Animate player token across the board-----
function highlightPassedPositions(playerId, imageSrc, current, target) {
// playerId: The number or ID of the player (like 1 or 2).
// imageSrc: the src of image of token .
// current:start position.
// target: end position.
//------------step1:creat the token imag and append it into the current position---------------------------
  var tokenId = `player-token-${playerId}`;
  //we create an id for the image of the token of each player
  var playerToken = $(`<img id="${tokenId}" class="token" src="${imageSrc}" />`)
  //create an image with given src and with unique id contructed above an assigned to a variable
  $(`.cell[id="${current}"]`).append(playerToken)
//Puts the token image into the starting cell (current).
//----------------------------step2: Create the movement path with cellId --------------------------
  var path = []
  for (let i = 1; i <= (target - current); i++) {
    var step = current + i;
    if (step > 32) {
        step = step-32}
    path.push(step);
  }
  //-------------------------------step3:moves the token step-by-step through the path------------------------
  path.forEach(function(cellId, i){
    setTimeout(function(){
        ///setTimeout is used to delay each move (like animation).
      $(`.cell #${tokenId}`).remove();
      $(`.cell[id="${cellId}"]`).append(playerToken);
    }, i * 300)
    // to move directly from the current cell to target we add i * 300  mean each step happens 300 milliseconds after the last.
  });
}
// Player 1 turn
$(dice1).on("click", function () {
//select player1 to play the game
var playerId = 'player1'
//give random number as the dice give when i throw it
var roll = Math.floor(Math.random() * 5 + 1);
rollDice("dice_player1", roll)
//upadate the image of dice_palyer1 by the function rollDice
var currentPos = players.player1.position
var newPos = currentPos + roll
if (newPos > 32) {
newPos = newPos-32
}
//---to do the animation of the token
highlightPassedPositions(1, "../media/1.png", currentPos, newPos)
//update the position of player statue
  players.player1.position = newPos;
//we use set time out to calculate the new score after dowing all movement so it depend to roll variable
  setTimeout(function() {
    var cell = $(`.cell[id="${newPos}"]`)
    //we track the new cell 
    var bgColor = cell.css("background-color")
    //Reads the background color of the new cell to decide for how it belongs
    var opponentColor = 'rgba(173, 123, 108, 0.37)'
    var mycolor='rgb(73, 112, 73)'
    var rent = parseInt(cell.attr("rent")) 
    console.log(rent)
    if (bgColor === opponentColor) {
      players.player1.score=players.player1.score -rent
      alert("You landed on Player 2's property! -$${rent)}rent");
    } 
    else if(bgColor === mycolor){
        players.player1.score=players.player1.score +parseInt(newcell.getAttribute('price'));
        alert(" this land belongs to you here your rent ${rent} $");
    }
    //we land on public property
    else {
      players.player1.score =players.player1.score+rent
      console.log(players.player1.score )
    }
    updateScoreUI("player1");
  }, roll * 300 + 100);
});

// Player 2 turn
$(dice2).on("click", function () {
  const playerId = 'player2';
  const roll = Math.floor(Math.random() * 5 + 1);
  rollDice("dice_player2", roll);

  const currentPos = players[playerId].position;
  let newPos = currentPos + roll;
  if (newPos > 32) newPos -= 32;

  highlightPassedPositions(2, "../media/2.png", currentPos, currentPos + roll);
  players[playerId].position = newPos;

  setTimeout(() => {
    var cell = $(`.cell[id="${newPos}"]`);
    var bgColor = cell.css("background-color");
    var rent = parseInt(cell.attr("rent")) 
    console.log(rent)
    var mycolor = 'rgba(173, 123, 108, 0.37)'
    var opponentColor='rgb(73, 112, 73)'
    if (bgColor === opponentColor) {
      players.player2.score=players.player2.score -rent
      console.log(players.player2.score)
      alert("You landed on Player 2's property! -$ ${rent} rent");
    } 
    else if(bgColor === mycolor){
        players.player2.score=players.player2.score +rent
        alert(" this land belongs to you here your rent ${rent} $");
    }
    //you are in place were you can have money or you are stealed
    else {
      players.player2.score =players.player2.score+rent
    }
    updateScoreUI(playerId);
  }, roll * 300 + 100);
});

// Button event listeners
document.getElementById("buy_property1").addEventListener("click", function(){handleBuy("player1")});
document.getElementById("buy_property2").addEventListener("click", function(){handleBuy("player2")});

// function checkGameOver() {
//   if (players.player1.score <= 0) {
//     alert("Player 2 wins! Player 1 ran out of money.");
//     disableDice();
//   } else if (players.player2.score <= 0) {
//     alert("Player 1 wins! Player 2 ran out of money.");
//     disableDice();
//   }
// }

// function disableDice() {
//   $("#dice_player1").off("click");
//   $("#dice_player2").off("click");
// }