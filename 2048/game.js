var virtualBoard = {};
var divBoard = document.querySelector("#board");
var totCol = 4;
var totRow = 4;

var createBoard = function () {
   for (var i = 0; i < totRow; i++) {
      var row = document.createElement("div");
      row.classList.add("row");
      divBoard.appendChild(row);

      for (var j = 0; j < totCol; j++) {
         var tile = document.createElement("div");
         tile.classList.add("tile");
         row.appendChild(tile);
      }
   }
}

var divCell = function (row,col) {
   var divBoard = document.querySelector("#board");
   var targetRow = divBoard.children.item((row - 1));
   return targetRow.children.item((col - 1));
}

var getKey = function (row,col) {
   return "tile-" + row.toString + "-" + col.toString;
}

var virtualCell = function (row,col) {
   return virtualBoard[getKey(row,col)]
}

var updateBoard = function() {
   for (var row = 0; row < totRow ; row++ ) {
      for (var col = 0 ; col < totCol ; col++) {
         var key = "tile-" + col + "-" + row;
         var value = virtualBoard[key];
         var tileDiv = document.querySelector("#" + key);
         tileDiv.className = "tile";
         if (value) {
            // set innerHTML
            // other things
            divCell((row + 1), (col + 1)).innerHTML = virtualCell((row + 1), (col + 1));
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
   }
};

var combineNumbers = function (numbers) {
   var newNumbers = [];
   while (numbers.length > 0) {
      if (numbers[i] === numbers[(i + 1)]) {
         sum = numbers[0] + numbers[1];
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

var combineLeft = function (row) {
   var oldNumbers = getRowNumbers(row);
   var newNumbers = combineNumbers(oldNumbers);
   setRowNumbers(row, newNumbers);
   updateBoard();
};

var assignValue = function (row, col, value) {
   virtualBoard[getKey(row,col)] = value;
};


createBoard();

assignValue();

updateBoard();
console.log(virtualBoard);
console.log(divBoard);
