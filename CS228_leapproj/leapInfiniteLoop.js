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
    scaleValue(x,0,window.innerWidth);
    scaleValue(y,0,window.innerHeight);
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
    //console.log(hand);
    var fingers = hand.fingers;
    //console.log(fingers.length);

    HandleFinger(fingers);
}

function HandleFinger(fingers){
    for(var i=0; i<fingers.length;++i){
        if(fingers[i].type == 1){
            console.log(fingers[1].tipPosition)

        }
        //console.log(fingers[i]);
    }
    x = fingers[1].tipPosition[0]+300;
    y = window.innerHeight-fingers[1].tipPosition[1]+300;
    z = fingers[1].tipPosition[2];

    if(fingers[1].tipPosition[0] < rawXMin){
        rawXMin = x;
        console.log(x);
    }
    if(window.innerHeight-fingers[1].tipPosition[1] < rawYMin){
        rawYMin = y;
        console.log(y);
    }
    if(fingers[1].tipPosition[0] > rawXMax){
        rawXMax = x;
        console.log(x);
    }
    if(window.innerHeight-fingers[1].tipPosition[1] > rawYMax){
        rawXMin = y;
        console.log(y);
    }


}

function scaleValue(value, from, to) {
    var scale = (to[1] - to[0]) / (from[1] - from[0]);
    var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return ~~(capped * scale + to[0]);
}