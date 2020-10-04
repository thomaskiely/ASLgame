const knnClassifier = ml5.KNNClassifier();




var trainingCompleted = false;


function draw(){

    clear();

    if (trainingCompleted == false){

        Train();

    }

    Test();

}

function Train(){


    for(var i =0; i<train0.shape[3];++i){
        console.log(train0.shape[3]);
    }
    trainingCompleted = true;


}

function Test() {




}







