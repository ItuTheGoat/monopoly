var pos = 0
var spaces = 40;


function move(dice, doubled){
	pos += dice;
	pos %= spaces;
	document.getElementById("b"+pos).appendChild(document.getElementById("piece1"));
}

//Runs when a player rolls the dice
function roll() {
  var die1 = Math.floor(Math.random() * 6 + 1);
  var die2 = Math.floor(Math.random() * 6 + 1);
  document.getElementById("die1").innerHTML = die1;
  document.getElementById("die2").innerHTML = die2;
  dice = die1 + die2;
  move(dice);
}

// Just Trying stuff

function buildBoard() {}
