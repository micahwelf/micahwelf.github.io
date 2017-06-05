
var heading = document.querySelector("#title");

var changePage = function() {
  console.log("Function on click activated.");
  console.log(document.body);

  document.body.style.backgroundColor="darkgreen";
  document.body.style.fontFamily = "Arial";

  var x = 5;
  console.log(heading);

  heading.style.color = "blue";

  heading.innerHTML = "New Title set by JS";
};

heading.onclick = changePage;
