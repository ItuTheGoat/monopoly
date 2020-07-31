// Variables
var numPlayers = 0;
var playerNames = [];

// Function that is called when a number of users is saved
function initNumPlayers() {
  numPlayers = document.getElementById("numPlayers").value;

  document.getElementById("numPlayers").disabled = true;
}
