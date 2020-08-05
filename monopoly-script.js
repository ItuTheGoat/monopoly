var spaces = 40;
var turn = 0;
var pos;
var num;

window.onload = function(){
	var arr = sessionStorage.getItem("players");
	var players = JSON.parse(arr);
	num = players.length;
	console.log(players);
	pos = new Array(num)
	for(i=0;i<num;i++){
		pos[i] = 0;
	}
}

function move(dice, doubled){
	pos[turn] += dice;
	pos[turn] %= spaces;
	console.log(turn+1)
	document.getElementById("b"+pos[turn]).appendChild(document.getElementById("piece" + (turn+1)));
	turn++;
	turn%=num;
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
