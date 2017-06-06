var colorX = "rgba(255,0,0,0.9)";
var colorO = "rgba(0,255,0,0.9)";
var boxes = document.querySelectorAll(".square");
boxes.forEach(function (square) {
  square.onclick = function () {
    console.log(square);
    if (player == 0) {
      square.classList.add("playerX");
      player = (player + 1) % 2;
    } else {
      if (player == 1) {
        square.classList.add("playerO");
        player = (player + 1) % 2;
      }
    }
  };
});
