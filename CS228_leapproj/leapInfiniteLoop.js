var controllerOptions = {}

var x = window.innerWidth/2;
var y = window.innerHeight/2;

Leap.loop(controllerOptions,function (frame) {
    HandleFrame(frame);

});

function HandleFrame(frame) {
    /*clear();
    circle(x,y,50);
    var randomIntX = Math.round(Math.random()) * 2 - 1;
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
            console.log(fingers[1])
        }
        //console.log(fingers[i]);
    }
}