var virtualBoard = {};
var highScores = [];
var score = 0;
var divGame = document.querySelector("#game-2048");
var totCol = 4;
var totRow = 4;

var createBoard = function () {
   divGame.innerHTML = "";
   var divBoard = document.createElement("div");
   divBoard.id = "game-board";
   var divScore = document.createElement("div");
   divScore.id = "game-score";
   var divScoreLabel = document.createElement("div");
   divScore.id = "game-score-label";
   var divScoreBoard = document.createElement("div");
   divScoreBoard.id = "game-score-board";
   var divMessage = document.createElement("div");
   divMessage.id = "game-message";
   divMessage.classList.add("message-to-user");
   var divSubmit = document.createElement("button");
   divSubmit.id = "submit-score";
   divScoreLabel.innerHTML = "Your Score: ";
   divGame.appendChild(divScoreLabel);
   divGame.appendChild(divScore);
   divGame.appendChild(divSubmit);
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
         tile.id = toKey(r,c);
         row.appendChild(tile);
      }
   }

   document.querySelector("#submit-score").onclick = function () {
      saveScore();
   };

}






var toScore = function (name, score) {
   var newscore = {};
   newscore["name"] = name;
   newscore["score"] = score;
   return newscore;
};

var getHighScores = function () {
   fetch(
      "https://highscoreapi.herokuapp.com/scores"
   ).then(
      function (response) {
         console.log("Scores recieved. Status: ", response.status)
      }
   ).then(
      function (body) {
         console.log("Body Recieved: ", body);
      }
   );
};

var saveScore = function () {
   var name = prompt("Please enter your name: ");
   fetch(
      "https://highscoreapi.herokuapp.com/scores",
      {
         "method": "POST",
         "headers": new Headers({
            "Content-Type": "application/json"
         }),
         "body": JSON.stringify({
            "name": name,
            "score": score
         })
      }
   ).then(
      function (response) {
         console.log("save score returned Status", response.status);
      }
   );

   var r = new XMLHttpRequest();
};

var updateScore = function (add) {
   score += add;
}






var divCell = function (row,col) {
   var divBoard = document.querySelector("#game-board");
   var targetRow = divBoard.children.item((row - 1));
   return targetRow.children.item((col - 1));
}

var toKey = function (row,col) {
   return "tile-" + row + "-" + col;
}

var virtualCell = function (row,col) {
   return virtualBoard[toKey(row,col)]
}

var updateBoard = function() {
   for (var row = 0; row < totRow ; row++ ) {
      for (var col = 0 ; col < totCol ; col++) {
         var key = toKey(row,col);
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
   for (var col  = 0 ; col < totCol ; col ++ ) {
      var key = toKey(col, row);
      var value = board[key];
      if (value) {
         numbers.push(value);
      }
   }
};

var getColNumbers = function(col) {
   var numbers = [];
   for (var row  = 0 ; row < totRow ; row ++ ) {
      var key = toKey(col, row);
      var value = board[key];
      if (value) {
         numbers.push(value);
      }
   }
};

var setRowNumbers = function(row, numbers) {
   for (var col  = 0 ; col < totCol ; col ++ ) {
      var key = toKey(col, row);
      virtualBoard[key] = numbers[col];
   }
};

var setColNumbers = function(row, numbers) {
   for (var col  = 0 ; col < totCol ; col ++ ) {
      var key = toKey(col, row);
      virtualBoard[key] = numbers[col];
   }
};

//  direction ::=   "forward" | "backward"
var combineNumbers = function (direction, numbers) {
   var newNumbers = [];

   if (direction === "forward") {
      while (numbers.length > 0) {
         if (numbers[0] === numbers[1]) {
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
   }
   if (direction === "backward") {
      while (numbers.length > 0) {
         var last = numbers.length;
         if (numbers[(last - 1)] === numbers[(last - 2)]) {
            sum = numbers[(last - 1)] + numbers[(last - 2)];
            updateScore(sum);
            newNumbers.unshift(sum);
            numbers.pop;
            numbers.pop;
         } else {
            newNumbers.unshift(numbers[last]);
            numbers.pop;
         }
      }
   }
   while (newNumbers,length < 4) {
      newNumbers.push(undefined);
   }
   return newNumbers;
};

var generateRandomTile = function () {
   var emptyTiles = [];
   // 2 or 4 90% chance of getting a 2;
   var newNumber = [2,2,2,2,2,2,2,2,2,4];
   for (var row = 0; row < totRow ; row++ ) {
      for (var col = 0 ; col < totCol ; col++) {
         var key = toKey(row,col);
         var value = virtualBoard[key];
         if (value === undefined) {
            emptyTiles.push([row, col]);
         }
      }
   }
   if (emptyTiles.length > 0) {
      var targetIndex = ((Math.random() * emptyTiles.length) % emptyTiles.length).toFixed(0);
      var targetRow = (emptyTiles[targetIndex])[0];
      var targetCol = (emptyTiles[targetIndex])[1];
      var targetValue = newNumber[((Math.random() * newNumber.length) % newNumber.length).toFixed(0)];
      virtualBoard[toKey(targetRow,targetCol)] = targetValue;
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

var combineRight = function (row) {
   var oldNumbers = getRowNumbers(row);
   var newNumbers = combineNumbers(oldNumbers);
   setRowNumbers(row, newNumbers);
   updateBoard();
};

var combineUp = function (row) {
   var oldNumbers = getRowNumbers(row);
   var newNumbers = combineNumbers(oldNumbers);
   setRowNumbers(row, newNumbers);
   updateBoard();
};

var combineDown = function (row) {
   var oldNumbers = getRowNumbers(row);
   var newNumbers = combineNumbers(oldNumbers);
   setRowNumbers(row, newNumbers);
   updateBoard();
};

var assignValue = function (row, col, value) {
   virtualBoard[toKey(row,col)] = value;
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
// assignValue(1,1,2);
generateRandomTile();
generateRandomTile();
updateBoard();

console.log(virtualBoard);
console.log(divGame);
