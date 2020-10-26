const knnClassifier = ml5.KNNClassifier();
nj.config.printThreshold = 1000;
var trainingCompleted = false;
var controllerOptions = {};
var currentNumHands = 0;
var oneFrameOfData = nj.zeros([5,4,6]);
var numPredictions = 0;
var meanPredictionAccuracy=1;
var programState = 0;


Leap.loop(controllerOptions,function (frame) {

    currentNumHands = frame.hands.length;
    clear();
    DetermineState(frame);
    if(programState==0){
        HandleState0(frame);
    }
    else if(programState==1){
        HandleState1(frame);
    }
    //HandleFrame(frame);



});

function Train(){
    /*for(var i =0; i<train4.shape[3];++i){
        //train0

        var featuresZero = train0.pick(null,null,null,i);
        featuresZero = featuresZero.reshape(1,120);
        knnClassifier.addExample(featuresZero.tolist(),0);

        //train1

        var featuresOne = train1.pick(null,null,null,i);
        featuresOne = featuresOne.reshape(1,120);
        knnClassifier.addExample(featuresOne.tolist(),1);

        //train1 again

        var featuresOne_2 = train1Allison.pick(null,null,null,i);
        featuresOne_2 = featuresOne_2.reshape(1,120);
        knnClassifier.addExample(featuresOne_2.tolist(),1);

        //train1 again

        var featuresOne_3 = train1Davis.pick(null,null,null,i);
        featuresOne_3 = featuresOne_3.reshape(1,120);
        knnClassifier.addExample(featuresOne_3.tolist(),1);

        //train2

        var featuresTwo = train2.pick(null,null,null,i);
        featuresTwo = featuresTwo.reshape(1,120);
        knnClassifier.addExample(featuresTwo.tolist(),2);

        //train 3

        var featuresThree = train3.pick(null,null,null,i);
        featuresThree = featuresThree.reshape(1,120);
        knnClassifier.addExample(featuresThree.tolist(),3);

        //train4

        var featuresFour = train4.pick(null,null,null,i);
        featuresFour = featuresFour.reshape(1,120);
        knnClassifier.addExample(featuresFour.tolist(),4);

        //train 5

        var featuresFive = train5.pick(null,null,null,i);
        featuresFive = featuresFive.reshape(1,120);
        knnClassifier.addExample(featuresFive.tolist(),5);

        //train 6

        var featuresSix = train6.pick(null,null,null,i);
        featuresSix = featuresSix.reshape(1,120);
        knnClassifier.addExample(featuresSix.tolist(),6);



        //train 7

        var featuresSeven = train7.pick(null,null,null,i);
        featuresSeven = featuresSeven.reshape(1,120);
        knnClassifier.addExample(featuresSeven.tolist(),7);

        //train 7 again
        var featuresSeven_2 = train7Fisher.pick(null,null,null,i);
        featuresSeven_2 = featuresSeven_2.reshape(1,120);
        knnClassifier.addExample(featuresSeven_2.tolist(),7);



        //train8

        var featuresEight = train8.pick(null,null,null,i);
        featuresEight = featuresEight.reshape(1,120);
        knnClassifier.addExample(featuresEight.tolist(),8);

        var featuresEight_Two = train8Clark.pick(null,null,null,i);
        featuresEight_Two = featuresEight_Two.reshape(1,120);
        knnClassifier.addExample(featuresEight_Two.tolist(),8);

        //train9

        var featuresNine = train9.pick(null,null,null,i);
        featuresNine = featuresNine.reshape(1,120);
        knnClassifier.addExample(featuresNine.tolist(),9);

        //train 9 again
        var featuresNine_2 = train9Goldman.pick(null,null,null,i);
        featuresNine_2 = featuresNine_2.reshape(1,120);
        knnClassifier.addExample(featuresNine_2.tolist(),9);*/



    //}
    //trainingCompleted = true;
}

function Test() {
    /*CenterData();
    var currentFeatures = oneFrameOfData.reshape(1,120);
    knnClassifier.classify(currentFeatures.tolist(),GotResults);*/
}


function GotResults(err, result){
    var hardDigit = 4;
    var currentPrediction = result.label;
    numPredictions++;
    meanPredictionAccuracy = ((numPredictions-1)*meanPredictionAccuracy+(currentPrediction==hardDigit))/(numPredictions);

    //console.log(currentPrediction);
    console.log("hello");
}


function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();
}


function Mirror(){
    var xValues = oneFrameOfData.slice([],[],[0,6,3]);

    var currentXMean = xValues.mean();

    var horizontalShift = 1-currentXMean;

    for(var i=0; i<oneFrameOfData.shape[0];++i){
        for(var j=0; j<oneFrameOfData.shape[1];++j){
            var currentX = oneFrameOfData.get(i,j,0);
            var shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(i,j,0, shiftedX);
            //3 denotes the next set of joints, before was previous, look at where oneFrameOfData is set
            currentX = oneFrameOfData.get(i,j,3);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(i,j,3, shiftedX);
        }
    }
    currentXMean = xValues.mean();
    //console.log(currentXMean);

}
function CenterXData(){
    var xValues = oneFrameOfData.slice([],[],[0,6,3]);
    //console.log(xValues.shape);
    var currentXMean = xValues.mean();
    //console.log(currentXMean);
    var horizontalShift = 0.5-currentXMean;

    for(var i=0; i<oneFrameOfData.shape[0];++i){
        for(var j=0; j<oneFrameOfData.shape[1];++j){
            var currentX = oneFrameOfData.get(i,j,0);
            var shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(i,j,0, shiftedX);
            //3 denotes the next set of joints, before was previous, look at where oneFrameOfData is set
            currentX = oneFrameOfData.get(i,j,3);
            shiftedX = currentX + horizontalShift;
            oneFrameOfData.set(i,j,3, shiftedX);
        }
    }
    currentXMean = xValues.mean();
    //console.log(currentXMean);

}

function CenterYData(){
    //y vals stored in second and fifth horizontal sheets
    var yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentYMean = yValues.mean();
    //console.log(currentYMean);
    var verticalShift = 0.5-currentYMean;

    for(var i=0;i<oneFrameOfData.shape[0];++i){
        for (var j=0;j<oneFrameOfData.shape[1];++j){
            var currentY = oneFrameOfData.get(i,j,1);
            var shiftedY = currentY +verticalShift;
            oneFrameOfData.set(i,j,1,shiftedY);

            currentY = oneFrameOfData.get(i,j,4);
            shiftedY = currentY +verticalShift;
            oneFrameOfData.set(i,j,4,shiftedY);
        }
    }
    currentYMean = yValues.mean();
    //console.log(currentYMean);
}

function CenterZData(){
    var zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentZMean = zValues.mean();
    var spacialShift = 0.5-currentZMean;
    //console.log(currentZMean);
    for(var i = 0; i<oneFrameOfData.shape[0];++i){
        for(var j = 0; j<oneFrameOfData.shape[1];++j){
            var currentZ = oneFrameOfData.get(i,j,2);
            var shiftedZ = currentZ + spacialShift;
            oneFrameOfData.set(i,j,2,shiftedZ);

            currentZ = oneFrameOfData.get(i,j,5);
            shiftedZ = currentZ + spacialShift;
            oneFrameOfData.set(i,j,5,shiftedZ);
        }
    }
    currentZMean = zValues.mean();
    //console.log(currentZMean);
}


function HandleFrame(frame) {
    var iBox = frame.interactionBox;
    if(frame.hands.length == 1 || frame.hands.length == 2){
        //Test();
        var hand = frame.hands[0];
        HandleHand(hand,iBox);
    }
}

function HandleHand(hand, interactionBox) {
    //array of fingers
    var fingers = hand.fingers;
    var strokeWeight = 3;
    var color = 50;

    for(var j = 3; j>=0;j--){
        for(var i = 0;i<fingers.length;i++){
            handleBone(fingers[i].bones[j],color,strokeWeight,i,j,interactionBox);
        }
        strokeWeight+=1;
        color+=50;
    }
}

function handleBone(bone, color, startWeight,fingerIndex,boneIndex, interactionBox){


    //base coordinates
    var x = bone.prevJoint[0];
    var y = bone.prevJoint[1];
    var z = bone.prevJoint[2];

    //tip coordinates
    var x2 = bone.nextJoint[0];
    var y2 = bone.nextJoint[1];
    var z2 = bone.nextJoint[2];


    //normalize coordinates for prevJoint and nextJoint
    var normalizedPrevJoint = interactionBox.normalizePoint(bone.prevJoint,true);
    var normalizedNextJoint = interactionBox.normalizePoint(bone.nextJoint,true);


    //first coordinates final element is the value you want to set
    oneFrameOfData.set(fingerIndex,boneIndex,0,normalizedPrevJoint[0]);
    oneFrameOfData.set(fingerIndex,boneIndex,1,normalizedPrevJoint[1]);
    oneFrameOfData.set(fingerIndex,boneIndex,2,normalizedPrevJoint[2]);
    oneFrameOfData.set(fingerIndex,boneIndex,3,normalizedNextJoint[0]);
    oneFrameOfData.set(fingerIndex,boneIndex,4,normalizedNextJoint[1]);
    oneFrameOfData.set(fingerIndex,boneIndex,5,normalizedNextJoint[2]);


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

        stroke(color);

    }
    else if(currentNumHands==2){
        stroke(color,0,0);
    }
    //line(x,y,x2,y2);
    line(canvasXPrev/2,canvasYPrev/2,canvasXNext/2,canvasYNext/2);
}


function DetermineState(frame){
    if(frame.hands.length==0){
        programState=0;
    }
    else if(frame.hands.length=1){
        programState=1;
    }
}

function HandleState0(frame){
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
}

function HandleState1(frame){
    
    HandleFrame(frame);
    Test();
}

function TrainKNNIfNotDoneYet(){
   /* if (trainingCompleted == false){
        Train();

    }*/
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){

}










