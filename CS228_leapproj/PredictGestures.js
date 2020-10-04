const knnClassifier = ml5.KNNClassifier();


nj.config.printThreshold = 1000;


var trainingCompleted = false;
var testingSampleIndex = 0;
//var predictedClassLabels = nj.zeros([1,120]);
var predictedClassLabels = nj.zeros([1,120]);
function draw(){

    clear();

    if (trainingCompleted == false){
        //console.log(test.toString());
        Train();

    }

    Test();

}

function Train(){

    //console.log( framesOfData.pick(null,null,null,0).toString() );
    for(var i =0; i<train0.shape[3];++i){
        //train0
        var features = train0.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),1);

        //train1
        var featuresOne = train1.pick(null,null,null,i);
        featuresOne = featuresOne.reshape(1,120);
        knnClassifier.addExample(featuresOne.tolist(),0);
    }
    trainingCompleted = true;


}

function Test() {
    /*for(var i =0; i<test.shape[3];++i){

        var firstTestFeatures = test.pick(null,null,null,i);
        var secondTestFeatures = test.pick(null,null,null,i);

        firstTestFeatures = firstTestFeatures.reshape(1,120);
        secondTestFeatures = secondTestFeatures.reshape(1,120);
    }*/

    var firstTestFeatures = test.pick(null,null,null,0);
    var secondTestFeatures = test.pick(null,null,null,1);

    firstTestFeatures = firstTestFeatures.reshape(1,120);
    secondTestFeatures = secondTestFeatures.reshape(1,120);


    var firstTestingSample = firstTestFeatures.pick(testingSampleIndex);
    var secondTestingSample = secondTestFeatures.pick(testingSampleIndex);
    var firstPrediction = knnClassifier.classify(firstTestingSample.tolist(),GotResults);
    var secondPrediction = knnClassifier.classify(secondTestingSample.tolist(),GotResults);


    //console.log("first",firstTestingSample,firstPrediction);
    //console.log("second",secondTestingSample, secondPrediction);


}


function GotResults(err, result){


    //console.log(testingSampleIndex);
    predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
    console.log(parseInt(result.label));
    if(testingSampleIndex>119){
        testingSampleIndex=0;
    }

    testingSampleIndex++;
}









