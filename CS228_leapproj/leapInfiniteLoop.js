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

    x = finger.tipPosition[0]+300;
    y = window.innerHeight-finger.tipPosition[1];
   // y = finger.tipPosition[1]+300;
    z = finger.tipPosition[2];

    circle(x,y,50);
    convertRange(x,[rawXMin,rawXMax],[0,window.innerWidth]);
    convertRange(y,[rawYMin,rawYMax],[0,window.innerHeight]);

    if(finger.tipPosition[0] < rawXMin){
        rawXMin = finger.tipPosition[0];
        console.log(x);
    }
    if(finger.tipPosition[1] < rawYMin){
        rawYMin = finger.tipPosition[1];
        console.log(y);
    }
    if(finger.tipPosition[0] > rawXMax){
        rawXMax = finger.tipPosition[0];
        console.log(x);
    }
    if(finger.tipPosition[1] > rawYMax){
        rawYMax = finger.tipPosition[1];
        console.log(y);
    }


}

function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}