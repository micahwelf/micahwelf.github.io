var colorX = "rgba(255,0,0,0.9)";
var colorO = "rgba(0,255,0,0.9)";
var player = 0;
var playerX = "playerX";
var playerO = "playerO";
var boxes = document.querySelectorAll(".square");
var row_wrap = Math.sqrt(boxes.length);
var row1 = document.querySelectorAll(".r1");
var row2 = document.querySelectorAll(".r2");
var row3 = document.querySelectorAll(".r3");
var col1 = document.querySelectorAll(".c1");
var col2 = document.querySelectorAll(".c2");
var col3 = document.querySelectorAll(".c3");
var diag1 = [row1[0], row2[1], row3[2]];
var diag2 = [row3[0], row2[1], row1[0]];
var winningSets = [row1, row2, row3, col1, col2, col3, diag1, diag2];

var testWinner = function () {
   winningSets.forEach( function(testSet) {
      console.log (testSet);
   })
};

var testEnd = function () {
   null;
};

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
      for (var i = boxes.length; i < 0; i--) {

      }
   };
});
