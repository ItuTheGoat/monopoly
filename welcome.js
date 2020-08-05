// Variables
var numPlayers = 0;
var counter = 0;
var playerNames = [];

// Function that is called when a number of users is saved
function initNumPlayers() {
	numPlayers = document.getElementById("numPlayers").value;
	switch(numPlayers){
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
			document.getElementById("numPlayers").disabled = true;
			document.getElementById("save").disabled = true;
			document.getElementById("playerOne").disabled = false;
			document.getElementById("next").disabled = false;
			break;
		default:
			alert("Please enter a number between 2 and 6")
	}
}

function nextPlayer(){
	player = document.getElementById("playerOne").value
	if(player!=""){
		playerNames.push(player);
		counter++;
		if(counter==numPlayers){
			document.getElementById("playerOne").disabled = true;
			document.getElementById("next").disabled = true;
			document.getElementById("start").disabled = false;
		}
		else{
			document.getElementById("player").innerHTML = "Player " + (counter+1) + ":";
		}
	}
	else{
		alert("Field cannot be empty")
	}
}

function startGame(){
	players = JSON.stringify(playerNames);
	sessionStorage.setItem("players", players);
	location.href = "monopoly.html"
}
