const IN_BUTTON = document.querySelector("#in_button");


var date = new Date();
document.body.append("today is " + date);

inButtonText = IN_BUTTON.querySelector("h3");

inButtonText.append(' now');



function makeRed (e) {
  e.preventDefault();
  IN_BUTTON.classList.toggle("red");
  IN_BUTTON.classList.toggle("blue");
}

IN_BUTTON.onclick = makeRed;

a = 2
b = 2

a == b ? console.log("Match") : console.log("No match");

function Course(title, instructor, level, published, views) {
  this.title = title;
  this.instructor = instructor;
  this.level = level;
  this.published = published;
  this.views = views;
  this.updateViews = function() {
    ++this.views;
    console.log("just added one, now at " + this.views);
  };
}

var courses = [ new Course("DGMD-40", "Marlon Kuzmick", "1", true, 0), new Course("EXPO-E25", "Marlon Kuzmick", "1", false, 20)
];

console.log(courses[1].views);
var updated_views = courses[1].updateViews();
courses[1].updateViews();
courses[1].updateViews();
courses[1].updateViews();
var updated_views = courses[1].updateViews();
console.log(updated_views);

console.log(courses[1].views);
