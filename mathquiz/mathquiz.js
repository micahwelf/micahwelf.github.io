
var heading = document.querySelector("#title");

var numA = document.querySelector("#a");
var numB = document.querySelector("#b");
var userAns = document.querySelector("#answer");
var btn = document.querySelector("#check-answer");

var a = 0.0;
var b = 0.0;

var newNums = function () {
  a = Math.ceil(Math.random() * 100);
  numA.innerHTML = toString(a);
  b = Math.ceil(Math.random() * 100);
  numB.innerHTML = toString(b);
};

newNums();

var checkAns = function () {
  var realAns = a * b;
  var usrAns = userAns.value;
  if (realAns === parseInt(usrAns, 10)) {
    alert("Right");
  } else {
    alert("Wrong");
  }

}
btn.onclick = checkAns;

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
