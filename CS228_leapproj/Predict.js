


var trainingCompleted = false;
function draw(){

    clear();
    if (trainingCompleted == false){
        Train();
    }

    Test();
    
}

function Train(){
    console.log("I am being trained");
    trainingCompleted = true;
}

function Test() {
    console.log("I am being tested");
}