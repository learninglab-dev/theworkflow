const IN_BUTTON = document.querySelector("#in_button");
const OUT_BUTTON = document.querySelector("#out_button");
inButtonText = IN_BUTTON.querySelector("h3");
IN_BUTTON.style.cursor = "pointer";
OUT_BUTTON.style.cursor = "pointer";
const TIMER = document.querySelector("#timer");
const DIGITAL_HRS = document.querySelector("#digital_hrs");
const DIGITAL_MIN = document.querySelector("#digital_min");
const DIGITAL_SEC = document.querySelector("#digital_sec");

// var new_date = new Date();
var duration = 0;
var frame = 1000;


function setInPoint (e) {
  e.preventDefault();
  IN_BUTTON.classList.toggle("red");
  IN_BUTTON.classList.toggle("blue");
  var new_date = Date.now();
  console.log("in button pushed at " + Date.now());
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/in_out', true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ in_point: new_date, text: "test text" }));
}



function runTimer () {
    var multiplier = 1000/1000;
    var new_date = new Date();
    let hr = new_date.getHours();
    let min = new_date.getMinutes();
    let sec = new_date.getSeconds();
    var zerofilled_hr = ('00'+hr).slice(-2);
    var zerofilled_min = ('00'+min).slice(-2);
    var zerofilled_sec = ('00'+sec).slice(-2);
    DIGITAL_HRS.innerHTML = zerofilled_hr + ":";
    DIGITAL_MIN.innerHTML = zerofilled_min + ":";
    DIGITAL_SEC.innerHTML = zerofilled_sec;

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

function interval() {
  setInterval(runTimer, frame);
}



IN_BUTTON.addEventListener("click", setInPoint, false);
IN_BUTTON.addEventListener("click", interval, false);

// IN_BUTTON.addEventListener("click", function () {
//   console.log("button pushed at " + Date.now());
// }, false);

OUT_BUTTON.addEventListener("click", setOutPoint, false);
OUT_BUTTON.addEventListener("click", clearInterval(interval), false);
