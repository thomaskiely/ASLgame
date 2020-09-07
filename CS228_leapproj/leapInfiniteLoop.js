var controllerOptions = {}

var x = window.innerWidth/2;
var y = window.innerHeight/2;

Leap.loop(controllerOptions,function (frame) {
    /*clear();
    circle(x,y,50);
    var randomIntX = Math.round(Math.random()) * 2 - 1;
    var randomIntY = Math.round(Math.random()) * 2 - 1;
    x+= randomIntX;
    y+= randomIntY;*/


    if(frame.hands.length == 1){
        var hand = frame.hands[0];
        console.log(hand);
        var fingers = hand.fingers;
        console.log(fingers.length);
    }

});