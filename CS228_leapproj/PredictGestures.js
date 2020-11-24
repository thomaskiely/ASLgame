const knnClassifier = ml5.KNNClassifier();
nj.config.printThreshold = 1000;
var trainingCompleted = false;
var controllerOptions = {};
var currentNumHands = 0;
var oneFrameOfData = nj.zeros([5,4,6]);
var numPredictions = 0;
var meanPredictionAccuracy=1;
var programState = 0;
var digitToShow = 9;
var timeSinceLastDigitChange = new Date();
var accuracyArray = [10];
var scaffoldingState = 3;
var numCycles = 0;
var youWin = 0;
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
    else if(programState==2){
        HandleState2(frame);
    }
    //HandleFrame(frame);



});

function Train(){
    for(var i =0; i<train4.shape[3];++i){
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
        knnClassifier.addExample(featuresNine_2.tolist(),9);



    }
    trainingCompleted = true;
}

function Test() {
    CenterData();
    var currentFeatures = oneFrameOfData.reshape(1,120);
    knnClassifier.classify(currentFeatures.tolist(),GotResults);
}


function GotResults(err, result){
    var hardDigit = digitToShow;
    var currentPrediction = result.label;
    numPredictions++;
    meanPredictionAccuracy = ((numPredictions-1)*meanPredictionAccuracy+(currentPrediction==hardDigit))/(numPredictions);

    //console.log(currentPrediction, (meanPredictionAccuracy+digitToShow));
    console.log(currentPrediction, (meanPredictionAccuracy), digitToShow);

}


function CenterData(){
    CenterXData();
    CenterYData();
    CenterZData();
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

        if(meanPredictionAccuracy<0.5){

            stroke(int(255*(1-meanPredictionAccuracy)),0,0);

        }

        else if(meanPredictionAccuracy>0.5){
            //var n = meanPredictionAccuracy *255;
            //int(n);
            stroke(0,int(255*meanPredictionAccuracy),0);
        }



        //stroke(color);

    }
    else if(currentNumHands==2){
        stroke(color,0,0);
    }
    //line(x,y,x2,y2);
    line(canvasXPrev/2,canvasYPrev/2,canvasXNext/2,canvasYNext/2);
}


function DetermineState(frame){
    //no hand is present
    if(currentNumHands==0){
        programState=0;

    }

    //hand present but not centered
    else if(currentNumHands == 1 && HandIsUncentered()==true){

        programState=1;

    }
    //present and centered
    else {
        programState=2;

    }

}

function HandleState0(frame){
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();

}

function HandleState1(frame){

    HandleFrame(frame);
    if(HandIsTooFarToTheLeft()){

        DrawArrowRight();
    }
    if(HandIsTooFarToTheRight()){

        DrawArrowLeft();
    }

    if(HandIsTooFarUp()){
        DrawArrowDown();
    }

    if(HandIsTooFarDown()){
        DrawArrowUp();
    }

    if(HandIsTooFarForward()){
        DrawArrowToward();
    }

    if(HandIsTooFarBack()){
        DrawArrowAway();
    }


}

function HandleState2(frame){
    HandleFrame(frame);
    DrawLowerRightPanel();
    DetermineWhetherToSwitchDigits();

    Test();
}

function TrainKNNIfNotDoneYet(){
    if (trainingCompleted == false){
        Train();

    }
}


//determine if hand is less than 0.25 or greater than 0.75
function HandIsUncentered(){
    if(HandIsTooFarToTheLeft() || HandIsTooFarToTheRight() || HandIsTooFarUp() || HandIsTooFarDown() || HandIsTooFarForward() || HandIsTooFarBack()){
        return true;
    }

}

function HandIsTooFarToTheLeft(){
    var xValues = oneFrameOfData.slice([],[],[0,6,3]);

    var currentXMean = xValues.mean();

    if(currentXMean < 0.25){
        return true;
    }

}

function HandIsTooFarToTheRight(){
    var xValues = oneFrameOfData.slice([],[],[0,6,3]);
    var currentXMean = xValues.mean();

    if(currentXMean > 0.75){
        return true;
    }

}

function HandIsTooFarUp() {
    var yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentYMean = yValues.mean();

    if(currentYMean>0.75){
        return true;
    }
    
}

function HandIsTooFarDown(){
    var yValues = oneFrameOfData.slice([],[],[1,6,3]);
    var currentYMean = yValues.mean();

    if(currentYMean<0.25){
        return true;
    }
}

function HandIsTooFarForward(){
    var zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentZMean = zValues.mean();

    if(currentZMean<0.25){
        return true;
    }
}

function HandIsTooFarBack(){
    var zValues = oneFrameOfData.slice([],[],[2,6,3]);
    var currentZMean = zValues.mean();

    if (currentZMean>0.75){
        return true;
    }
}


//draws first image
function DrawImageToHelpUserPutTheirHandOverTheDevice(){
    image(img,0,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowRight(){
    image(imgRight,window.innerWidth-975,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowLeft(){
    image(imgLeft,window.innerWidth-975,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowDown(){
    image(imgDown,window.innerWidth-975,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowUp(){
    image(imgUp,window.innerWidth-975,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowToward(){
    image(imgToward,window.innerWidth-975,0,window.innerWidth/2,window.innerHeight/2);
}

function DrawArrowAway(){
    image(imgAway,window.innerWidth-975,0,window.innerWidth/2,window.innerHeight/2);
}


function SignIn(){

    username = document.getElementById('username').value;

    var list = document.getElementById('users');

    if(IsNewUser(username,list)==true){
        CreateNewUser(username,list);
        CreateSignInItem(username,list);
    }
    else{
        ID = String(username) + "_signins";
        listItem = document.getElementById( ID );
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1
    }

    console.log(list.innerHTML);
    //console.log(list);
    return false;
}


function IsNewUser(username,list){
    var users = list.children;
    var usernameFound = false;

    for(var i=0;i<users.length;++i){
        if(username == users[i].innerHTML){
            usernameFound=true;
        }
        //console.log("users[i]",users[i]);
        //console.log("html",users[i].innerHTML);
    }

    return usernameFound==false;

}

function CreateNewUser(username,list){
    var item = document.createElement('li');

    item.innerHTML = String(username);
    item.id = String(username)+"_name";

    list.appendChild(item);

}

function CreateSignInItem(username,list){
    var signTrack = document.createElement('li');

    signTrack.innerHTML = 1;
    signTrack.id = String(username)+"_signins";

    list.appendChild(signTrack);
}

function DrawLowerRightPanel() {

    if(scaffoldingState==0){
        if(digitToShow==1) {
            image(imgOne,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==2){
            image(imgTwo,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==3){
            image(imgThree,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==4){
            image(imgFour,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==5){
            image(imgFive,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==6){
            image(imgSix,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==7){
            image(imgSeven,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==8){
            image(imgEight,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==9){
            image(imgNine,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==0){
            image(imgZero,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
    }
    else if(scaffoldingState == 1 || scaffoldingState == 2){
        if(digitToShow==1) {
            image(numOne,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==2){
            image(numTwo,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==3){
            image(numThree,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==4){
            image(numFour,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==5){
            image(numFive,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==6){
            image(numSix,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==7){
            image(numSeven,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==8){
            image(numEight,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==9){
            image(numNine,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==0){
            image(numZero,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }


    }

    else if(scaffoldingState == 3){
        if(digitToShow==1) {
            image(imgFiveFourtyThree,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==2){
            image(imgTwentyEight,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==3){
            image(imgFifty,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==4){
            image(imgTwotimesTwo,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==5){
            image(imgThirtyFiveDivideSeven,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==6){
            image(imgUp,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==7){
            image(imgSeven,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==8){
            image(imgEight,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==9){
            image(imgNine,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
        else if(digitToShow==0){
            image(imgSeventySeven,window.innerWidth-675,window.innerHeight-550,window.innerWidth/4,window.innerHeight/2);
        }
    }




}

function DetermineWhetherToSwitchDigits(){
    if(TimeToSwitchDigits()){
        SwitchDigits();
        timeSinceLastDigitChange = new Date();
    }
}

function TimeToSwitchDigits() {
    var currentTime = new Date();
    var timeInMilliseconds = currentTime - timeSinceLastDigitChange;
    var timeSeconds = timeInMilliseconds / 1000;
    var chosenTime = 10;

    if(scaffoldingState==2 && accuracyArray[digitToShow] > 0.75){
        chosenTime = 5;
    }
    if(timeSeconds>=chosenTime){
        return true;
    }
    else if(timeSeconds<chosenTime){
        return false;
    }

}

function SwitchDigits(){
    accuracyArray[digitToShow] = meanPredictionAccuracy;
    if(scaffoldingState<3){
        if(digitToShow==0){
            digitToShow=1;

        }
        else if(digitToShow==1){
            if(accuracyArray[0] > 0.5 && accuracyArray[1] > 0.5){
                digitToShow=2;
            }
            else{
                digitToShow=0;
            }

        }
        else if(digitToShow==2){
            if(accuracyArray[2]>0.5){
                digitToShow=3;
            }
            else{
                digitToShow=0;
            }

        }
        else if(digitToShow==3){
            if(accuracyArray[3]>0.5){
                digitToShow=4
            }
            else{
                digitToShow=2;
            }

        }
        else if(digitToShow==4){
            if(accuracyArray[4]>0.5){
                digitToShow = 5;
            }
            else{
                digitToShow = 3;
            }

        }
        else if(digitToShow==5){
            if(accuracyArray[5]>0.5){
                digitToShow = 6;
            }
            else{
                digitToShow = 4;
            }

        }
        else if(digitToShow==6){
            if(accuracyArray[6]>0.5){
                digitToShow=7;
            }
            else{
                digitToShow=5;
            }
        }
        else if(digitToShow==7){
            if(accuracyArray[7]>0.5){
                digitToShow=8;
            }
            else{
                digitToShow=6;
            }

        }
        else if (digitToShow==8){
            if(accuracyArray[8]>0.5){
                digitToShow=9;
                numCycles++;
            }
            else{
                digitToShow=7;
            }


        }
        else if(digitToShow==9){

            //handles first run
            if(numCycles==0){
                digitToShow = 0;
            }

            else{
                //all 9 succesful go to next state
                if(accuracyArray[9]>0.5){
                    if(scaffoldingState==0){
                        scaffoldingState=1;
                    }
                    else if(scaffoldingState==1){
                        scaffoldingState=2;
                    }
                    else{
                        scaffoldingState=3;
                    }

                    digitToShow=0;
                }
                else{
                    numCycles = 0;
                    digitToShow = 8;
                }
            }
        }

        numPredictions = 0;
    }

    else if(scaffoldingState == 3){
        if(digitToShow == 0 && accuracyArray[0]> 0.5){
            digitToShow = 1;
        }
        else if(digitToShow == 1 && accuracyArray[1]>0.5){
            digitToShow = 2;
        }
        else if(digitToShow == 2 && accuracyArray[2]>0.5){
            digitToShow = 3;
        }
        else if(digitToShow == 3 && accuracyArray[3]>0.5){
            digitToShow = 4;
        }
        else if(digitToShow == 4 && accuracyArray[4]>0.5){
            digitToShow = 5;
        }
        else if(digitToShow == 5 && accuracyArray[5]>0.5){
            digitToShow = 6;
        }
        else if(digitToShow == 6 && accuracyArray[6]>0.5){
            digitToShow = 7;
        }
        else if(digitToShow == 7 && accuracyArray[7]>0.5){
            digitToShow = 8;
        }
        else if(digitToShow == 8 && accuracyArray[8]>0.5){
            digitToShow = 9;
        }
        else if(digitToShow == 9 && accuracyArray[9] >0.5){
            //you win
            console.log("hi");
            youWin++;
            digitToShow = 0;
        }
    }

}




