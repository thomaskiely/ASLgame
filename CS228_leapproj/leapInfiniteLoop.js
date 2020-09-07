var controllerOptions = {}

var x = window.innerWidth/2;
var y = window.innerHeight/2;

Leap.loop(controllerOptions,function (frame) {
    clear();
    circle(x,y,50);
    var randomInt = Math.round(Math.random()) * 2 - 1
    x+= randomInt;

});