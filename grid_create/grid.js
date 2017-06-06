var colorX = "rgba(255,0,0,0.9)";
var colorO = "rgba(0,255,0,0.9)";
var player = 0;
var playerX = "playerX";
var playerO = "playerO";
var boxes = document.querySelectorAll(".square");
boxes.forEach(function (square) {
  square.onclick = function () {
    console.log(square);
    if (square.classList.contains("playerX")) {
      return;
    }
    if (square.classList.contains("playerO")) {
      return;
    }
    if (player == 0) {
      square.classList.add("playerX");
      square.innerHTML = "X";
      player = (player + 1) % 2;
    } else {
      if (player == 1) {
        square.classList.add("playerO");
        square.innerHTML = "O";
        player = (player + 1) % 2;
      }
    }
  };
});
