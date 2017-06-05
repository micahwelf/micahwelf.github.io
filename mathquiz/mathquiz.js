
var heading = document.querySelector("#title");

var va = document.querySelector("#a");
var vb = document.querySelector("#b");
var ans = document.querySelector("#answer");
var btn = document.querySelector("#check-answer");

var a = Math.ceil(Math.random * 100);

var b = Math.ceil(Math.random * 100);
va.innerHTML = a;
vb.innerHTML = b;


var checkAns = function () {
  var realAns = a + b;
  var usrAns = ans.value;
  if (realAns == usrAns) {
    alert("Right");}
  else {
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
