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
      return diceRoll;
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
  listPlayerScores(playerOneScores, "playerOneScores", "Player One Rolls");
  listPlayerScores(playerTwoScores, "playerTwoScores", "Player Two Rolls");
}

function listPlayerScores(playerScores, playerScoresDivId, headingText) {
  let playerScoresDiv = document.querySelector("div#" + playerScoresDivId);
  playerScoresDiv.innerHTML = "";

  const columnContainer = document.createElement("div");
  columnContainer.classList.add("column-container");

  const column = document.createElement("div");
  column.classList.add("column");

  const h2 = document.createElement("h2");
  h2.textContent = headingText;
  if (isCurrentPlayer(playerScores)) {
    h2.classList.add("current-player");
  }
  column.appendChild(h2);

  const h3 = document.createElement("h3");
  if (playerScores.playerScore >= 100) {
    h3.innerText = "You win!";
  } else {
    h3.innerText = "Current Score: " + playerScores.playerScore;
  }
  column.appendChild(h3);

  playerScores.playerRolls.forEach(function(roll) {
    const div = document.createElement("div");
    div.classList.add("roll-box");

    const p = document.createElement("p");
    p.innerText = roll;
    div.appendChild(p);

    column.appendChild(div);
  });

  columnContainer.appendChild(column);
  playerScoresDiv.appendChild(columnContainer);
}

function isCurrentPlayer(playerScores) {
  const currentPlayer = getCurrentPlayer();
  return playerScores === currentPlayer;
}