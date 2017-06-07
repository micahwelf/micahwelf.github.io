var tile = '<div class="tile"></div>';
var newTile = document.createElement("div");
newTitle.appendChild(tile);

var createBoard = function () {
  var mainBoard = document.querySelector("#board");

  for (var i = 0; i < 4; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    mainBoard.appendChild(row);

    for (var j = 0; j < 4; j++) {
      var tile = document.createElement("div");
      tile.classList.add("tile");
    }

  }

}


creatBoard();
