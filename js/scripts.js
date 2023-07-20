// BUSINESS LOGIC FOR PLAYER SCORES //

function PlayerScores() {
  this.playerRolls = [];
  this.playerScore = 0;
}

PlayerScores.prototype.rollDice = function() {
  var diceRoll = Math.floor(Math.random() * 6) + 1;
  if (diceRoll === 1) {
    this.playerScore = 0;
    return "Oops! You rolled a 1.";
  } else {
    this.playerScore += diceRoll;
    return diceRoll;
  }
};

PlayerScores.prototype.holdScore = function() {
  var totalScore = this.playerScore;
  return totalScore;
};


  
// UI LOGIC //

let playerOneScores = new PlayerScores();
let playerTwoScores = new PlayerScores();
let currentPlayerScores = playerOneScores;
const targetScore = 100;

function handleFormSubmission(event) {
  event.preventDefault();
  const rollResult = currentPlayerScores.rollDice();
  currentPlayerScores.playerRolls.push(rollResult);

  if (rollResult === "Oops! You rolled a 1.") {
    currentPlayerScores = toggleCurrentPlayer();
  }

  if (currentPlayerScores.playerScore >= targetScore) {
    playerOneScores.playerScore = 0;
    playerTwoScores.playerScore = 0;
    alert("Player " + (currentPlayerScores === playerOneScores ? "One" : "Two") + " wins!");
  }

  updatePlayerScoresUI();
}

function toggleCurrentPlayer() {
  if (currentPlayerScores === playerOneScores) {
    currentPlayerScores = playerTwoScores;
  } else {
    currentPlayerScores = playerOneScores;
  }
  updateCurrentPlayerUI();
  return currentPlayerScores;
}

function updatePlayerScoresUI() {
  listPlayerScores(playerOneScores, "playerOneScores", "Player One Rolls");
  listPlayerScores(playerTwoScores, "playerTwoScores", "Player Two Rolls");
  const holdButton = document.getElementById('holdButton'); 
  const holdButtonContainer = holdButton.parentNode;
  holdButtonContainer.classList.remove('current-player');
  if (currentPlayerScores === playerOneScores) {
    holdButtonContainer.classList.add('current-player');
  }
  updateCurrentPlayerUI();
}

function updateCurrentPlayerUI() {
  const currentPlayerDiv = document.getElementById('currentPlayer');
  currentPlayerDiv.textContent = "Current Player: " + (currentPlayerScores === playerOneScores ? "Player One" : "Player Two");
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
  if (playerScores === currentPlayerScores) {
    h2.classList.add("current-player");
  }
  column.appendChild(h2);

  const h3 = document.createElement("h3");
  h3.innerText = "Current Score: " + playerScores.playerScore;
  column.appendChild(h3);

  const holdButton = document.createElement("button");
  holdButton.innerText = "Hold";
  holdButton.addEventListener("click", function() {
    const totalScore = playerScores.holdScore();
    alert("Score held! Total score: " + totalScore);
    currentPlayerScores = toggleCurrentPlayer();
    updatePlayerScoresUI();
  });

  column.appendChild(holdButton);


  const reversedPlayerRolls = playerScores.playerRolls.slice().reverse();

  reversedPlayerRolls.forEach(function (roll) {
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

updateCurrentPlayerUI();
