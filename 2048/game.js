var virtualBoard = {};
var divBoard = document.querySelector("#board");

var createBoard = function () {
   for (var i = 0; i < 4; i++) {
      var row = document.createElement("div");
      row.classList.add("row");
      mainBoard.appendChild(row);

      for (var j = 0; j < 4; j++) {
         var tile = document.createElement("div");
         tile.classList.add("tile");
         row.appendChild(tile);
      }
   }
}

var divCell = function (row,col) {
   var mainBoard = document.querySelector("#board");
   var targetRow = mainBoard.children.item((row - 1));
   return targetRow.children.item((col - 1));
}

var getKey = function (row,col) {
   return "tile" + row.toString + "-" + col.toString;
}

var virtualCell = function (row,col) {

}

var updateBoard = function() {
   for (var row = 0; row < 4 ; row++ ) {
      for (var col = 0 ; col < 4 ; col++) {
         var key = "tile" + col + "-" + row;
         var value = board[key];
         if (value) {
            // set innerHTML
            // other things
         } else {
            // handle NULL value;
         }
      }
   }
}

var addTile = function () {
   virtualBoard["tile1-1"] = 4;
};


createBoard();

addTile();
console.log(virtualBoard);
