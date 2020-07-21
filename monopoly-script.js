//Simba Todo
//Initialize countries, airports, utils and card-drawing spaces
//Implement mortgages
//Implement buying houses
//Implement trading
//Implement auctioning
//Complete jail system
//Bug testing
//
//Tumi Todo
//Complete functions under "incomplete functions" (see bottom of script)
//Create user interface
//Feel free to add GUI elements for stuff I haven't finished (e.g mortgaging)

var startmoney = 1500;
var passbeginmoney = 200;
var spaces = 40;
var countrylocs = [
  1,
  3,
  6,
  8,
  9,
  11,
  13,
  14,
  16,
  18,
  19,
  21,
  23,
  24,
  26,
  27,
  29,
  31,
  32,
  34,
  37,
  39,
];
var airportlocs = [5, 15, 25, 35];
var utillocs = [12, 28];
var drawcardlocs = [2, 7, 17, 22, 33, 36];
var taxslots = [4, 38];
var gotojail = 30;
var bail = 50;

var turn = 0;
var players = [];

//Runs when game is started
function init() {
  var names = ["Simba", "Tumi", "Mikhail", "Nick", "Kade", "Dean"];

  for (i = 0; i < names.length; i++) {
    players.push(new Player(names[i], 0, startmoney, false, []));
  }
}

//Player object constructor
function Player(name, pos, money, jail, colorgroups) {
  this.name = name;
  this.pos = pos;
  this.money = money;
  this.jail = jail;
  this.colorgroups = colorgroups;

  this.playturn = function (dice_roll) {
    var dice1 = dice_roll[0];
    var dice2 = dice_roll[1];
    this.pos += dice1 + dice2;
    if (this.pos >= spaces) {
      this.pos %= spaces;
      this.money += passbeginmoney;
    }
    landing(this.pos, dice1 + dice2);
    if (dice1 != dice2) {
      turn++;
      turn %= players.length;
    }
  };
}

//Asset object constructor (Super for airports, utils and countries
function Asset(name, loc, price, owner, baserent, mortgaged) {
  this.name = name;
  this.loc = loc;
  this.price = price;
  this.owner = owner;
  this.baserent = baserent;
  this.mortgaged = mortgaged;
}

//Airport object constructor
function Airport(name, loc, price, owner, baserent, mortgaged) {
  Asset.apply(this, arguments);

  this.run = function () {
    if (owner == -1) {
      if (buydialog()) {
        owner = turn;
        player[turn].money -= price;
      }
    } else if (owner != turn) {
      var airportsowned = 0;
      for (i = 0; i < airports.length; i++) {
        if ((airports[i].owner = owner)) {
          airportsowned++;
        }
      }
      var rent = airportsowned * baserent;
      player[turn] -= rent;
      player[owner] += rent;
    }
  };
}

//Util object constructor
function Utility(name, loc, price, owner, baserent, mortgaged) {
  Asset.apply(this, arguments);

  this.run = function (sumdice) {
    if (owner == -1) {
      if (buydialog()) {
        owner = turn;
        player[turn].money -= price;
      }
    } else if (owner != turn) {
      var utilsowned = 0;
      for (i = 0; i < utils.length; i++) {
        if ((utils[i].owner = owner)) {
          utilssowned++;
        }
      }
      var rent = sumdice * baserent * utilsowned;
      player[turn] -= rent;
      player[owner] += rent;
    }
  };
}

//Country object contructor
function Country(name, loc, price, owner, baserent, mortgaged, color, houses) {
  Asset.apply(this, arguments);
  this.color = color;
  this.houses = houses;

  this.run = function () {
    if (owner == -1) {
      if (buydialog()) {
        owner = turn;
        player[turn].money -= price;
        var samecolorcountries = [];
        for (i = 0; i < countries.length; i++) {
          if (countries[i].color == this.color) {
            samecolorcountries.push(countries[i].owner);
          }
        }
        if (samecolorcountries.every(owner == turn)) {
          player[turn].colorgroups.push(this.color);
        }
      }
    } else if (owner != turn) {
      var rent = baserent;
      if (this.houses > 0) {
        //incomplete
      } else if (players[owner].colorgroups.includes(this.color)) {
        rent *= 2;
      }
      player[turn] -= rent;
      player[owner] += rent;
    }
  };
}

//Runs when a player has landed on a particular spot
function landing(loc, sumdice) {
  ind = indexOf(loc);
  if (countrylocs.includes(loc)) {
    countries[ind].run();
  } else if (airportlocs.includes(loc)) {
    airports[ind].run();
  } else if (utillocs.includes(loc)) {
    utils[indexOf(loc)].run();
  } else if (drawcardlocs.includes(loc)) {
    cards[ind].run();
  } else if (taxslots.includes(loc)) {
    taxes[ind].run(sumdice);
  } else if (loc == gotojail) {
    players[turn].jailed = 1;
    players[turn].pos = 10;
  }
}

//incomplete functions

//Runs when a player lands on an unowned property
function buyDialogialog() {
  //Please implement a UI element to ask the player if they wish to buy a property
  //this function should return true if the player wishes to buy the property
  //and false if they don't
}

//Runs when a player is in jail on their turn
function payBailDialog() {
  //Please implement a UI element to ask the player if they wish to pay bail early
  //this function should return true if the player wishes to pay bail early
  //and false if they don't
}

//Runs when a player wishes to roll the dice
function diceRoll() {
  //Please implement a UI element visualizing the roll of the dice
  //this function should return a length 2 array with the value of the roll of each die.

  // A die has 6 sides from 1 - 6
  var rollsArr = [];
  rollsArr[0] = Math.floor(Math.random() * 6 + 1);
  rollsArr[1] = Math.floor(Math.random() * 6 + 1);

  return rollsArr;
}

// Just Trying stuff

function buildBoard() {}
