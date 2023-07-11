// BUSINESS LOGIC FOR PLAYER SCORES //

function PlayerScores() {
  this.playerRolls = [];
  this.playerScore = 0;
  this.currentId = 0;
}

PlayerScores.prototype.addScore = function(roll) {
  roll.id = this.assignId();
  this.playerRolls.push(roll);
};

PlayerScores.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

PlayerScores.prototype.diceRoll = function() {
  var diceRoll = Math.floor(Math.random() * 6) + 1;
  if (diceRoll > 1) {
    this.playerScore += diceRoll;
    if (this.playerScore > 100) {
      return "You win!";
    } else {
      return this.playerScore;
    }
  } else {
    return "End of Turn";
  }
};


// UI LOGIC //

let playerOneScores = new PlayerScores();
let playerTwoScores = new PlayerScores();

function handleFormSubmission(event) {
  event.preventDefault();
  const currentPlayer = getCurrentPlayer();
  const roll = currentPlayer.diceRoll();
  currentPlayer.addScore(roll);
  updatePlayerScoresUI();
}

function getCurrentPlayer() {
  const totalRolls = playerOneScores.playerRolls.length + playerTwoScores.playerRolls.length;
  if (totalRolls % 2 === 0) {
    return playerOneScores;
  } else {
    return playerTwoScores;
  }
}

function updatePlayerScoresUI() {
  listPlayerScores(playerOneScores, "playerOneScores");
  listPlayerScores(playerTwoScores, "playerTwoScores");
}

function listPlayerScores(playerScores, playerScoresDivId) {
  let playerScoresDiv = document.querySelector("div#" + playerScoresDivId);
  playerScoresDiv.innerHTML = "";
  const ul = document.createElement("ul");

  playerScores.playerRolls.forEach(function(roll) {
    const li = document.createElement("li");
    li.innerText = roll;
    ul.append(li);
  });

  playerScoresDiv.append(ul);
}