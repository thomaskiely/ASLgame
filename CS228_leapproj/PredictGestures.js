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


        var features = train0.pick(null,null,null,i);
        features = features.reshape(1,120);
        //console.log(features.toString());

        knnClassifier.addExample(features.tolist(),0);
    }
    trainingCompleted = true;


}

function Test() {
    /*for(var i =0; i<test.shape[3];++i){

        var features = test.pick(null,null,null,i);
        features = features.reshape(1,120);
        var currentTestingSample = test.pick(testingSampleIndex);
        var prediction = knnClassifier.classify(currentTestingSample.tolist(),GotResults);

        console.log(currentTestingSample, prediction);
    }*/
    var firstTestFeatures = test.pick(null,null,null,0);
    var secondTestFeatures = test.pick(null,null,null,1);

    firstTestFeatures = firstTestFeatures.reshape(1,120);
    secondTestFeatures = secondTestFeatures.reshape(1,120);

    var firstTestingSample = firstTestFeatures.pick(testingSampleIndex);
    var secondTestingSample = secondTestFeatures.pick(testingSampleIndex);
    var firstPrediction = knnClassifier.classify(firstTestingSample.tolist(),GotResults);
    var secondPrediction = knnClassifier.classify(secondTestingSample.tolist(),GotResults);


    console.log("first",firstTestingSample,firstPrediction);
    console.log("second",secondTestingSample, secondPrediction);


}


function GotResults(err, result){

    console.log(parseInt(result.label));
    //console.log(testingSampleIndex);
    predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
    if(testingSampleIndex>119){
        testingSampleIndex=0;
    }

    testingSampleIndex++;
}









