var board = {};
var score = 0;

var tileKey = function (col, row) {
  return "tile" + col + "-" + row;
};

var createBoard = function () {
  var boardDiv = document.querySelector("#board");
  boardDiv.innerHTML = "";

  for (var row = 0; row < 4; row++) {
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    boardDiv.appendChild(rowDiv);

    for (var col = 0; col < 4; col++) {
      var tileDiv = document.createElement("div");
      var key = tileKey(col, row);
      tileDiv.id = key;
      tileDiv.classList.add("tile");
      rowDiv.appendChild(tileDiv);
    }
  }
};

var updateBoard = function () {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      var key = tileKey(col, row);
      var value = board[key];
      var tileDiv = document.querySelector("#" + key);
      tileDiv.className = "tile";
      if (value) {
        tileDiv.innerHTML = value;
        tileDiv.classList.add("tile-" + value);
      } else {
        tileDiv.innerHTML = "";
      }
    }
  }

  document.querySelector("#score").innerHTML = score;
};

var getNumbersForCol = function (col) {
  var numbers = [];
  for (var row = 0; row < 4; row++) {
    var key = tileKey(col, row);
    var value = board[key];
    if (value) {
      numbers.push(value);
    }
  }
  return numbers;
};

var getNumbersForRow = function (row) {
  var numbers = [];
  for (var col = 0; col < 4; col++) {
    var key = tileKey(col, row);
    var value = board[key];
    if (value) {
      numbers.push(value);
    }
  }
  return numbers;
};

var setNumbersForCol = function (col, numbers) {
  for (var row = 0; row < 4; row++) {
    var key = tileKey(col, row);
    board[key] = numbers[row];
  }
};

var setNumbersForRow = function (row, numbers) {
  for (var col = 0; col < 4; col++) {
    var key = tileKey(col, row);
    board[key] = numbers[col];
  }
};

var updateScore = function (add) {
  score += add;
};

var combineNumbers = function (numbers) {
  var newNumbers = [];
  while (numbers.length > 0) {
    if (numbers[0] === numbers[1]) {
      var sum = numbers[0] + numbers[1];
      updateScore(sum);
      newNumbers.push(sum);
      numbers.shift();
      numbers.shift();
    } else {
      newNumbers.push(numbers[0]);
      numbers.shift();
    }
  }
  while (newNumbers.length < 4) {
    newNumbers.push(undefined);
  }
  return newNumbers;
};

var combineRowLeft = function (row) {
  // 1. get the numbers for the row from the board
  var oldNumbers = getNumbersForRow(row);
  // 2. combine the numbers
  var newNumbers = combineNumbers(oldNumbers);
  // 3. set the new numbers in the board
  setNumbersForRow(row, newNumbers);
};

var combineRowRight = function (row) {
  var oldNumbers = getNumbersForRow(row).reverse();
  var newNumbers = combineNumbers(oldNumbers).reverse();
  setNumbersForRow(row, newNumbers);
};

var combineColUp = function (col) {
  var oldNumbers = getNumbersForCol(col);
  var newNumbers = combineNumbers(oldNumbers);
  setNumbersForCol(col, newNumbers);
};

var combineColDown = function (col) {
  var oldNumbers = getNumbersForCol(col).reverse();
  var newNumbers = combineNumbers(oldNumbers).reverse();
  setNumbersForCol(col, newNumbers);
};

var combineDirection = function (direction) {
  var oldBoard = Object.assign({}, board);

  for (var n = 0; n < 4; n++) {
    if (direction == "left") {
      combineRowLeft(n);
    } else if (direction == "right") {
      combineRowRight(n);
    } else if (direction == "down") {
      combineColDown(n);
    } else if (direction == "up") {
      combineColUp(n);
    }
  }

  if (didBoardChange(oldBoard)) {
    addRandomTile();
    updateBoard();
  }
};

var didBoardChange = function (oldBoard) {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      var key = tileKey(col, row);
      if (board[key] !== oldBoard[key]) {
        return true;
      }
    }
  }
  return false;
};

var getEmptyTiles = function () {
  var empty = [];
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      var key = tileKey(col, row);
      var value = board[key];
      if (value === undefined) {
        empty.push(key);
      }
    }
  }
  return empty;
};

var addRandomTile = function () {
  // 1. identify all empty tiles
  var emptyTiles = getEmptyTiles();

  // 2. randomly pick one of them
  var randomIndex = Math.floor(Math.random() * emptyTiles.length);
  var randomEmptyTile = emptyTiles[randomIndex];

  // 3. insert a 2 or a 4 at that position
  if (Math.random() > 0.9) {
    // probability: 10%
    board[randomEmptyTile] = 4;
  } else {
    // probability: 90%
    board[randomEmptyTile] = 2;
  }
};

var startGame = function () {
  board = {};
  score = 0;
  createBoard();
  addRandomTile();
  addRandomTile();
  updateBoard();
};

var getHighScores = function () {
  fetch("https://highscoreapi.herokuapp.com/scores").then(function (response) {
    console.log("Scores received. Status:", response.status);
    return response.json();
  }).then(function (data) {
    var list = document.querySelector("#high-scores");
    list.innerHTML = "";
    data.forEach(function (entry) {
      // create a list item
      var item = document.createElement("li");
      // populate the list item
      item.innerHTML = entry.name + ": " + entry.score;
      // append the item to the list (container)
      list.appendChild(item);
    });
  });
};

var submitScore = function () {
  var initials = prompt("Enter your initials:");
  fetch("https://highscoreapi.herokuapp.com/scores", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      name: initials,
      score: score
    })
  }).then(function (response) {
    console.log("Score submitted. Status:", response.status);
  });
};

document.querySelector("#new-game").onclick = function () {
  startGame();
};

document.querySelector("#submit-score").onclick = function () {
  submitScore();
};

document.querySelector("#get-scores").onclick = function () {
  getHighScores();
};

document.onkeydown = function (event) {
  if (event.which == 37) { // left arrow
    combineDirection("left");
  } else if (event.which == 38) { // up arrow
    combineDirection("up");
  } else if (event.which == 39) { // right arrow
    combineDirection("right");
  } else if (event.which == 40) { // down arrow
    combineDirection("down");
  }
};

startGame();
