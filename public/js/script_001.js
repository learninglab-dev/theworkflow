const IN_BUTTON = document.querySelector("#in_button");
const OUT_BUTTON = document.querySelector("#out_button");
inButtonText = IN_BUTTON.querySelector("h3");
IN_BUTTON.style.cursor = "pointer";
OUT_BUTTON.style.cursor = "pointer";
const TIMER = document.querySelector("#timer");

var date = new Date();
var hr = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();

function setInPoint (e) {
  e.preventDefault();
  IN_BUTTON.classList.toggle("red");
  IN_BUTTON.classList.toggle("blue");
  var date = Date.now();
  runTimer(date);
  console.log("in button pushed at " + Date.now());
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/in_out', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ in_point: date, text: "test text" }));
}

function runTimer (date) {

}

function setOutPoint (e) {
  e.preventDefault();
  OUT_BUTTON.classList.toggle("start_black");
  OUT_BUTTON.classList.toggle("blue");
  IN_BUTTON.classList.toggle("red");
  IN_BUTTON.classList.toggle("blue");
  console.log("out button pushed at " + Date.now());
  var date = Date.now();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/in_out', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ out_point: Date.now(), text: "test text" }));
}



IN_BUTTON.addEventListener("click", setInPoint, false);
// IN_BUTTON.addEventListener("click", function () {
//   console.log("button pushed at " + Date.now());
// }, false);

OUT_BUTTON.addEventListener("click", setOutPoint, false);
