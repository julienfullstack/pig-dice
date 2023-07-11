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
  listPlayerScores(playerOneScores, "playerOneScores", "Player One Scores");
  listPlayerScores(playerTwoScores, "playerTwoScores", "Player Two Scores");
}

function listPlayerScores(playerScores, playerScoresDivId, headingText) {
  let playerScoresDiv = document.querySelector("div#" + playerScoresDivId);
  playerScoresDiv.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = headingText;
  playerScoresDiv.appendChild(h2);

  playerScores.playerRolls.forEach(function (roll) {
    const div = document.createElement("div");
    div.classList.add("roll-box"); 

    const p = document.createElement("p");
    p.innerText = roll;
    div.appendChild(p);

    playerScoresDiv.appendChild(div);
  });
}