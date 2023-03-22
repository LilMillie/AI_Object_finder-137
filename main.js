video = "";
object = [];

function preload() {
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(760, 380);
    video.hide();
}

function draw() {
  image(video, 0, 0, 480, 380);
  if (status != "") {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < object.length; i++) {
      fill("#ff0000");
      percent = floor(object[i].confidence * 100);
      if(object[i].label == object_name.value) {
        document.getElementById("status").innerHTML = object_name.value + " found";
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("#ff0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
      }
    }
  }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Object(s)";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  object = results;
}