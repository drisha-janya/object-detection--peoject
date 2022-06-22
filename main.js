img = "";
objects = [];
 status = "";
 
function preload(){
  img = loadImage('nice.jpg');
}
 
 
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
 
function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}
 
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
objects = results;
}
function draw() {
  image(video, 0, 0, 380, 380);
  if(status!="")
  {
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video, gotResult);
      for(d=0;d<objects.length;d++)
      {
        document.getElementById("status").innerHTML = "Status :Objects detected";
        document.getElementById("objects").innerHTML = "number of Objects detected are"+objects.length;
       fill(r,g,b);
        percent=floor(objects[d].confidence*100);
        text(objects[d].label +" "+percent+"%",objects[d].x,objects[d].y);
        noFill();
        stroke(r,g,b);
        rect(objects[d].x,objects[d].y,objects[d].width,objects[d].height);
      }
  }
  }