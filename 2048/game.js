var virtualBoard = {};
var divBoard = document.querySelector("#board");

var createBoard = function () {
   for (var i = 0; i < 4; i++) {
      var row = document.createElement("div");
      row.classList.add("row");
      divBoard.appendChild(row);

      for (var j = 0; j < 4; j++) {
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
   for (var row = 0; row < 4 ; row++ ) {
      for (var col = 0 ; col < 4 ; col++) {
         var key = "tile-" + col + "-" + row;
         var value = virtualBoard[key];
         if (value) {
            // set innerHTML
            // other things
            divCell((row + 1), (col + 1)).innerHTML = virtualCell((row + 1), (col + 1));
         } else {
            // handle NULL value;
         }
      }
   }
}

var addTile = function () {
   virtualBoard["tile-1-1"] = 4;
};


createBoard();

addTile();

updateBoard();
console.log(virtualBoard);
console.log(divBoard);
