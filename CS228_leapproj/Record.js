var controllerOptions = {};
nj.config.printThreshold = 1000;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var z;

/*var rawXMin = 100000;
var rawYMin = 100000;
var rawXMax = -100000;
var rawYMax = -100000;*/


var previousNumHands = 0;
var currentNumHands = 0;
var numSamples = 100;
var currentSample = 0;

var framesOfData = nj.zeros([5,4,6,numSamples]);
Leap.loop(controllerOptions,function (frame) {


    currentNumHands = frame.hands.length;
    clear();
    HandleFrame(frame);

    RecordData();


    previousNumHands = currentNumHands;



});

function HandleFrame(frame) {
    var iBox = frame.interactionBox;
    if(frame.hands.length == 1 || frame.hands.length == 2){
        var hand = frame.hands[0];
        HandleHand(hand,iBox);
    }
}

function HandleHand(hand, interactionBox) {
    //array of fingers
    var fingers = hand.fingers;
    var strokeWeight = 3;
    var color = 80;

    for(var j = 3; j>=0;j--){
        for(var i = 0;i<fingers.length;i++){
            handleBone(fingers[i].bones[j],color,strokeWeight,i,j,interactionBox);
        }
        strokeWeight+=1;
        color+=70;
    }
}

function handleBone(bone, color, startWeight,fingerIndex,boneIndex, interactionBox){


    //base coordinates
    x = bone.prevJoint[0];
    y=bone.prevJoint[1];
    z=bone.prevJoint[2];

    //tip coordinates
    var x2 = bone.nextJoint[0];
    var y2 = bone.nextJoint[1];
    var z2 = bone.nextJoint[2];


    //normalize coordinates for prevJoint and nextJoint
    var normalizedPrevJoint = interactionBox.normalizePoint(bone.prevJoint,true);
    var normalizedNextJoint = interactionBox.normalizePoint(bone.nextJoint,true);


    //first coordinates final element is the value you want to set
    framesOfData.set(fingerIndex,boneIndex,0,currentSample,normalizedPrevJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,1,currentSample,normalizedPrevJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,2,currentSample,normalizedPrevJoint[2]);
    framesOfData.set(fingerIndex,boneIndex,3,currentSample,normalizedNextJoint[0]);
    framesOfData.set(fingerIndex,boneIndex,4,currentSample,normalizedNextJoint[1]);
    framesOfData.set(fingerIndex,boneIndex,5,currentSample,normalizedNextJoint[2]);



    //convert normalized coordinates to span the canvas
    //prevJoint
    var canvasXPrev = window.innerWidth * normalizedPrevJoint[0];
    var canvasYPrev = window.innerHeight *(1-normalizedPrevJoint[1]);

    //nextJoint
    var canvasXNext = window.innerWidth * normalizedNextJoint[0];
    var canvasYNext = window.innerHeight *(1-normalizedNextJoint[1]);


    //draw lines
    strokeWeight(startWeight*5);
    if(currentNumHands==1){

        stroke(0,color,0);

    }
    else if(currentNumHands==2){
        stroke(color,0,0);
    }
    //line(x,y,x2,y2);
    line(canvasXPrev,canvasYPrev,canvasXNext,canvasYNext);
}


/*
function HandleFinger(finger){


    if(finger.tipPosition[0] < rawXMin){

        rawXMin = finger.tipPosition[0];

    }
    if(finger.tipPosition[1] < rawYMin){
        rawYMin = finger.tipPosition[1];

    }
    if(finger.tipPosition[0] > rawXMax){

        rawXMax = finger.tipPosition[0];


    }
    if(finger.tipPosition[1] > rawYMax){

        rawYMax = finger.tipPosition[1];

    }

    x = convertRange(finger.tipPosition[0],[rawXMin,rawXMax],[0,window.innerWidth]);
    y = window.innerHeight - convertRange(finger.tipPosition[1],[rawYMin,rawYMax],[0,window.innerHeight]);
    z = finger.tipPosition[2];





    for(var i =0; i<finger.bones.length;++i){
        handleBone(finger.bones[i]);
    }

}
*/



function convertRange( value, r1, r2 ) {
    //(finger position - RawMin)*(window.innerheight - 0) / (RawMax-rawMin)+0

    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}


/*function transformCoordinates(x,y) {
    if(x < rawXMin){

        rawXMin = x;

    }
    if(y < rawYMin){
        rawYMin = y;

    }
    if(x > rawXMax){

        rawXMax = x;


    }
    if(y > rawYMax){

        rawYMax = y;

    }


    x = convertRange(x,[rawXMin,rawXMax],[0,window.innerWidth]);
    y = window.innerHeight - convertRange(y,[rawYMin,rawYMax],[0,window.innerHeight]);

    return[x,y]
}*/

function RecordData() {


    if(currentNumHands==2){

        currentSample++;
        if(currentSample==numSamples){
            currentSample = 0;
        }
    }


    if(currentNumHands==1 && previousNumHands==2){
        //console.log(framesOfData.toString());

        console.log(framesOfData.toString());

        background(0,0,0);


    }
}

