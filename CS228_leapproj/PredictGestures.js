const knnClassifier = ml5.KNNClassifier();
nj.config.printThreshold = 1000;
var trainingCompleted = false;
var predictedClassLabels = nj.zeros(1,test.shape[3]);

var testingSampleIndex = 0;

function draw(){

    clear();

    if (trainingCompleted == false){
        Train();

    }

    Test();

}

function Train(){
    for(var i =0; i<test.shape[3];++i){

        //train4
        var features = train4.pick(null,null,null,i);
        features = features.reshape(1,120);
        knnClassifier.addExample(features.tolist(),4);


        //train 5
        var featuresOne = train5.pick(null,null,null,i);
        featuresOne = featuresOne.reshape(1,120);
        knnClassifier.addExample(featuresOne.tolist(),5);




    }
    trainingCompleted = true;


}

function Test() {

    var firstFeatures = test.pick(null,null,null,testingSampleIndex);
    var currentFeatures = firstFeatures.reshape(1,120);
    var currentTestingSample = currentFeatures.pick(testingSampleIndex);
    knnClassifier.classify(currentTestingSample.tolist(),GotResults);
}


function GotResults(err, result){
    predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
    console.log(predictedClassLabels.get(testingSampleIndex).toString());
    if(testingSampleIndex>test.shape[3]-2){
        testingSampleIndex=0;
        console.log("zero");
    }
    else{
        testingSampleIndex++;
    }
}











