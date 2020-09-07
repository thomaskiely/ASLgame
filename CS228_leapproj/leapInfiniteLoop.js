var controllerOptions = {}

var x = window.innerWidth/2;
var y = window.innerHeight/2;
var z;

var rawXMin = 1000;
var rawYMin = 1000;
var rawXMax = -1000;
var rawYMax = -1000;
Leap.loop(controllerOptions,function (frame) {
    clear();
    HandleFrame(frame);



});

function HandleFrame(frame) {

    circle(x,y,50);
    /*var randomIntX = Math.round(Math.random()) * 2 - 1;
    var randomIntY = Math.round(Math.random()) * 2 - 1;
    x+= randomIntX;
    y+= randomIntY;*/


    if(frame.hands.length == 1){
        var hand = frame.hands[0];
        HandleHand(hand);
    }
}



function HandleHand(hand) {

    var fingers = hand.fingers;

    for(var i=0; i<fingers.length;++i) {
        if (fingers[i].type == 1) {
            HandleFinger(fingers[i]);

        }
    }
}

function HandleFinger(finger){

        //console.log(fingers[i]);

    x = finger.tipPosition[0];
    y = window.innerHeight-finger.tipPosition[1];
    z = finger.tipPosition[2];

    scale(finger.tipPosition[0],[rawXMin,rawXMax],[0,window.innerWidth]);
    scale(finger.tipPosition[1],[rawYMin,rawYMax],[0,window.innerHeight]);

    if(finger.tipPosition[0] < rawXMin){
        rawXMin = finger.tipPosition[0];
        console.log(x);
    }
    if(finger.tipPosition[1] < rawYMin){
        rawYMin = y
        console.log(y);
    }
    if(finger.tipPosition[0] > rawXMax){
        rawXMax = finger.tipPosition[0];
        console.log(x);
    }
    if(finger.tipPosition[1] > rawYMax){
        rawYMax = y
        console.log(y);
    }


}

function scale(value, from, to) {
    var scale = (to[1] - to[0]) / (from[1] - from[0]);
    var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return ~~(capped * scale + to[0]);
}