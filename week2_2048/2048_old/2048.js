var board = {};

var tileKey = function (col, row) {
  return "tile" + col + "-" + row;
};

var createBoard = function () {
  var boardDiv = document.querySelector("#board");

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

var setNumbersForRow = function (row, numbers) {
  for (var col = 0; col < 4; col++) {
    var key = tileKey(col, row);
    board[key] = numbers[col];
  }
};

var combineNumbers = function (numbers) {
  var newNumbers = [];
  while (numbers.length > 0) {
    if (numbers[0] === numbers[1]) {
      var sum = numbers[0] + numbers[1];
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

var combineLeft = function () {
  for (var n = 0; n < 4; n++) {
    combineRowLeft(n);
  }
  updateBoard();
};

var addTile = function () {
  board["tile0-0"] = 4;
  board["tile2-0"] = 4;
  board["tile3-0"] = 4;
  board["tile1-1"] = 4;
  board["tile1-2"] = 16;
  board["tile3-2"] = 16;
};

createBoard();
addTile();
updateBoard();

