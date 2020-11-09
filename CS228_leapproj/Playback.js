
var oneFrameOfData=nj.array([[[ 758.77505, 386.57561,   71.7323, 758.77505, 386.57561,   71.7323],
    [ 758.77505, 386.57561,   71.7323, 609.86178, 290.28159,   62.0188],
    [ 609.86178, 290.28159,   62.0188, 529.77836, 270.68006,   38.5546],
    [ 529.77836, 270.68006,   38.5546, 462.89209,  238.1447,   28.1179]],
    [[ 804.96093, 322.71755,   62.6155,  636.5892, 194.26589,   21.0029],
        [  636.5892, 194.26589,   21.0029, 568.55342, 116.19772,  -8.83806],
        [ 568.55342, 116.19772,  -8.83806,  514.3248,  99.24419,   -25.843],
        [  514.3248,  99.24419,   -25.843, 470.24312, 104.31752,  -36.8413]],
    [[  831.0291, 329.32959,   53.5342, 691.50683, 219.04016,   7.48264],
        [ 691.50683, 219.04016,   7.48264, 634.12464,  130.9605,  -28.3094],
        [ 634.12464,  130.9605,  -28.3094, 576.93247, 105.96755,  -49.2425],
        [ 576.93247, 105.96755,  -49.2425, 529.45562, 106.26972,  -61.6771]],
    [[ 854.68041, 347.36459,   45.0525, 751.62339, 262.49751,  -1.91428],
        [ 751.62339, 262.49751,  -1.91428, 700.79734, 185.74539,  -36.0594],
        [ 700.79734, 185.74539,  -36.0594, 647.15637, 160.62919,  -56.7544],
        [ 647.15637, 160.62919,  -56.7544, 601.07842, 157.84203,  -69.3731]],
    [[ 868.26778, 389.36674,   38.0113, 798.76296, 317.69988,   -9.2648],
        [ 798.76296, 317.69988,   -9.2648, 778.24055, 277.74138,  -39.9382],
        [ 778.24055, 277.74138,  -39.9382, 749.88142, 267.98435,  -56.3266],
        [ 749.88142, 267.98435,  -56.3266, 714.03163, 269.07774,  -69.3647]]]);



var anotherFrameOfData=nj.array([[[ 724.03938, 586.40835,   49.7576, 724.03938, 586.40835,   49.7576],
    [ 724.03938, 586.40835,   49.7576, 559.38285, 451.17425,   24.1363],
    [ 559.38285, 451.17425,   24.1363, 475.66378, 432.44237,  -2.61699],
    [ 475.66378, 432.44237,  -2.61699, 399.21334, 371.45691,  -15.0059]],
    [[ 749.55569, 329.17818,   39.6613, 583.78417, 258.60049,  -20.6544],
        [ 583.78417, 258.60049,  -20.6544, 496.94736, 261.10226,  -57.6335],
        [ 496.94736, 261.10226,  -57.6335, 447.91199,  316.7196,  -77.9345],
        [ 447.91199,  316.7196,  -77.9345, 413.92744, 385.10981,  -91.6846]],
    [[ 788.42853, 316.92074,   32.2571,  663.6765, 259.37994,  -29.8678],
        [  663.6765, 259.37994,  -29.8678, 582.80654, 248.04023,  -73.5445],
        [ 582.80654, 248.04023,  -73.5445, 531.08041, 306.93879,  -98.3836],
        [ 531.08041, 306.93879,  -98.3836, 495.66761, 379.20109,  -113.893]],
    [[ 829.52018, 342.34078,   25.9531, 751.91188, 303.63243,  -33.4798],
        [ 751.91188, 303.63243,  -33.4798,  681.7347, 309.41542,  -74.5126],
        [  681.7347, 309.41542,  -74.5126, 636.68151, 329.73134,  -99.7325],
        [ 636.68151, 329.73134,  -99.7325, 605.53738, 352.20959,  -116.596]],
    [[ 870.34579, 454.74462,   21.8405,  830.7757, 402.04393,  -35.1279],
        [  830.7757, 402.04393,  -35.1279, 806.09959,  422.2467,  -69.8996],
        [ 806.09959,  422.2467,  -69.8996, 790.29157, 446.44728,  -88.9519],
        [ 790.29157, 446.44728,  -88.9519,  774.9227, 476.58172,  -105.577]]]);

var frameIndex = 0;
var flipFrame = 0;


function draw(){

    clear();
    //var interactionBox = frame.interactionBox;
    var interactionBox = oneFrameOfData.interactionBox;
    //console.log(oneFrameOfData.toString());
    for(var i =0; i<oneFrameOfData.shape[0];i++){
        for(var j=0;j<oneFrameOfData.shape[1];j++){



            //get coordinates of one hand
            var xStart = oneFrameOfData.get(i,j,0);
            xStart = xStart*window.innerWidth;
            var yStart = oneFrameOfData.get(i,j,1);
            yStart= window.innerHeight*(1-yStart);
            var zStart = oneFrameOfData.get(i,j,2);
            var xStart2 = oneFrameOfData.get(i,j,3);
            xStart2 = xStart2*window.innerWidth;
            var yStart2 = oneFrameOfData.get(i,j,4);
            yStart2 = window.innerHeight*(1-yStart2);
            var zStart2 = oneFrameOfData.get(i,j,5);

            //get coordiantes of the other
            var xStart3 = anotherFrameOfData.get(i,j,0);
            var yStart3 = anotherFrameOfData.get(i,j,1);
            var zStart3 = anotherFrameOfData.get(i,j,2);
            var xStart4 = anotherFrameOfData.get(i,j,3);
            var yStart4 = anotherFrameOfData.get(i,j,4);
            var zStart4 = anotherFrameOfData.get(i,j,5);


            var oneFrameFirst = [xStart,yStart,zStart];
            var oneFrameSecond = [xStart2,yStart2,zStart2];
            var anotherFrameFirst = [xStart3,yStart3,zStart3];
            var anotherFrameSecond = [xStart4,yStart4,zStart4];


            //scale the raw coordinates
            //OneFrameOfData
            var canvasXOneFrameFirst = window.innerWidth * oneFrameFirst[0];
            var canvasYOneFrameFirst = window.innerHeight *(1-oneFrameFirst[1]);
            var canvasXOneFrameSecond = window.innerWidth*oneFrameSecond[0];
            var canvasYOneFrameSecond = window.innerHeight*(1-oneFrameSecond[1]);

            //AnotherFrameOfData
            var canvasXAnotherFrameFirst = window.innerWidth * anotherFrameFirst[0];
            var canvasYAnotherFrameFirst = window.innerHeight*(1-anotherFrameFirst[1]);
            var canvasXAnotherFrameSecond = window.innerWidth* anotherFrameSecond[0];
            var canvasYAnotherFrameSecond = window.innerHeight*(1-anotherFrameSecond[1]);


            //normalize the coordinates
            //OneFrameOfData
           /* var normalizedOneFrameFirst = interactionBox.normalizePoint(oneFrameFirst,true);
            var normalizedOneFrameSecond = interactionBox.normalizePoint(oneFrameSecond,true);
            //AnotherFrameOfData
            var normalizedAnotherFrameFirst = interactionBox.normalizePoint(anotherFrameFirst,true);
            var normalizedAnotherFrameSecond = interactionBox.normalizePoint(anotherFrameSecond,true);

            console.log(normalizedAnotherFrameFirst.toString());*/

            if(flipFrame%2==0){
                //even so another frame of data
                line(xStart3,yStart3,xStart4,yStart4);
                //line(canvasXAnotherFrameFirst,canvasYAnotherFrameFirst,canvasXAnotherFrameSecond,canvasYAnotherFrameSecond);
            }
            else if(flipFrame%2!=0){
                //odd so one frame of data
                line(xStart,yStart,xStart2,yStart2);
                //line(canvasXOneFrameFirst,canvasYOneFrameFirst,canvasXOneFrameSecond,canvasYOneFrameSecond);
            }


        }
    }

    if(frameIndex<=99){
        flipFrame = 1;
    }
    else if(frameIndex>=100){
        flipFrame = 0;
    }

    frameIndex++;

    if(frameIndex==200){
        frameIndex=0;
    }
    console.log(flipFrame);



}