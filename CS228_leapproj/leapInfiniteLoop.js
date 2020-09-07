var controllerOptions = {}
var i =0;
var x = window.innerWidth;
var y = window.innerHeight;
Leap.loop(controllerOptions,function (frame) {
    circle(50,50,50);
    console.log(i);
    i++;
    

});