var virtualBoard = {};
var highScores = {};
var score = 0;
var divGame = document.querySelector("#game-2048");
var totCol = 4;
var totRow = 4;

var createBoard = function () {
   var divBoard = document.createElement("div");
   divBoard.id = "game-board";
   divGame.innerHTML = "";
   var divScore = document.createElement("div");
   divScore.id = "game-score";
   divBoard.appendChild()
   var divScoreBoard = document.createElement("div");
   divScoreBoard.id = "game-score-board";
   var divMessage = document.createElement("div");
   divMessage.id = "game-message";
   divMessage.classList.add("message-to-user");
   divGame.appendChild(divScore);
   divGame.appendChild(divMessage);
   divGame.appendChild(divScoreBoard);
   divGame.appendChild(divBoard);
   for (var r = 0; r < totRow; r++) {
      var row = document.createElement("div");
      row.classList.add("row");
      divBoard.appendChild(row);

      for (var c = 0; c < totCol; c++) {
         var tile = document.createElement("div");
         tile.classList.add("tile");
         tile.id = getKey(r,c);
         row.appendChild(tile);
      }
   }
}

var updateScore = function (add) {
   score += add;
}

var divCell = function (row,col) {
   var divBoard = document.querySelector("#board");
   var targetRow = divBoard.children.item((row - 1));
   return targetRow.children.item((col - 1));
}

var getKey = function (row,col) {
   return "tile-" + row + "-" + col;
}

var virtualCell = function (row,col) {
   return virtualBoard[getKey(row,col)]
}

var updateBoard = function() {
   for (var row = 0; row < totRow ; row++ ) {
      for (var col = 0 ; col < totCol ; col++) {
         var key = getKey(row,col);
         var value = virtualBoard[key];
         var tileDiv = document.querySelector("#" + key);
         tileDiv.className = "tile";
         if (value) {
            // set innerHTML
            // other things
            divCell((row + 1), (col + 1)).innerHTML = virtualCell(row, col);
            tileDiv.classList.add("value-" + value);

         } else {
            // handle NULL value;
            divCell((row + 1), (col + 1)).innerHTML = "";
         }
      }
   }
};

var getRowNumbers = function(row) {
   var numbers = [];
   for (var col  = 0 ; col < 4 ; col ++ ) {
      var key = tileKey(col, row);
      var value = board[key];
      if (value) {
         numbers.push(value);
      }
   }
};

var setRowNumbers = function(row, numbers) {
   for (var col  = 0 ; col < 4 ; col ++ ) {
      var key = tileKey(col, row);
      virtualBoard[key] = numbers[col];
   }
};

var combineNumbers = function (numbers) {
   var newNumbers = [];
   while (numbers.length > 0) {
      if (numbers[i] === numbers[(i + 1)]) {
         sum = numbers[0] + numbers[1];
         updateScore(sum);
         newNumbers.push(sum);
         numbers.shift;
         numbers.shift;
      } else {
         newNumbers.push(numbers[0]);
         numbers.shift;
      }
   }
   while (newNumbers,length < 4) {
      newNumbers.push(undefined);
   }
   return newNumbers;
};

var generateNumber = function () {
   var emptyTiles = [];
   // 2 or 4 90% chance of getting a 2;
   var newNumber = [2,2,2,2,2,2,2,2,2,4];
   for (var row = 0; row < totRow ; row++ ) {
      for (var col = 0 ; col < totCol ; col++) {
         var key = getKey(row,col);
         var value = virtualBoard[key];
         if (value === undefined) {
            emptyTiles.push(key);
         }
      }
   }
   if (emptyTiles.length > 0) {
      targetIndex = ((Math.random() * emptyTiles.length) % emptyTiles.length).toFixed(0);
      targetValue = newNumber[((Math.random() * newNumbers.length) % newNumbers.length).toFixed(0)];
      virtualBoard[emptyTiles[targetIndex]] = targetValue;
   } else {
      divMessage.innerHTML = "Board Full - Game Over";
   }
};

var combineLeft = function (row) {
   var oldNumbers = getRowNumbers(row);
   var newNumbers = combineNumbers(oldNumbers);
   setRowNumbers(row, newNumbers);
   updateBoard();
};

var assignValue = function (row, col, value) {
   virtualBoard[getKey(row,col)] = value;
};


/* key events:


document.onkeydown = checkKey;

function checkKey(e) {

e = e || window.event;

if (e.keyCode == '38') {
// up arrow
}
else if (e.keyCode == '40') {
// down arrow
}
else if (e.keyCode == '37') {
// left arrow
}
else if (e.keyCode == '39') {
// right arrow
}

}

*/

createBoard();

assignValue(1,1,2);

updateBoard();
console.log(virtualBoard);
console.log(divBoard);
