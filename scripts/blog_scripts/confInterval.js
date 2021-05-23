


//var dataSpan = document.getElementById("dataNew");
//console.log(dataSpan)

// Obtained from https://stackoverflow.com/questions/8816729/javascript-equivalent-for-inverse-normal-function-eg-excels-normsinv-or-nor
function NormSInv(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
}



// Obtained from https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randnBM() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function Sum(arr) {

    var sum = 0;
    for (var i=0;i<arr.length; i++){
        sum = sum + arr[i];
    }
    return sum
}

var storeSamples = [];


function changeDataWeights() {

    var numSamples = 10;
    var normMean = 4;
    var normStd = Math.sqrt(0.1);

    

    //var storeSamples = [];
    for (var i=0; i<numSamples; i++) {
        storeSamples[i] = normMean + randnBM()*normStd;
    }

    //console.log(storeSamples.toString())
    var printStr = '';
    for (var i=0; i<numSamples; i++) {
        if (i < (numSamples - 1)){
            printStr = printStr + storeSamples[i].toFixed(2) + ', ';
        } else {
            printStr = printStr + storeSamples[i].toFixed(2);
        }
    }
    //console.log(printStr)

    var dataSpan = document.getElementById("dataNew");
    dataSpan.innerHTML = printStr;
    calcConfInt()
}

function calcConfInt() {

    var slideElem = document.getElementById("confSlider");
    //console.log(slideElem.value);
    var slideLevel = document.getElementsByClassName("sliderConfLevel");
    //console.log(slideLevel)
    for (var i=0; i<slideLevel.length;i++) {
        slideLevel[i].innerHTML = slideElem.value + '%';
    }
    var subTxt = document.getElementById("subText");
    subTxt.innerHTML =  ((100 - slideElem.value)/200).toFixed(3) + '';
    //calcConfInt()

    var confNew = document.getElementsByClassName("confNew");
    //console.log(storeSamples)
    var currZ = -1*NormSInv((100 - slideElem.value)/200);
    //console.log(currZ)
    var confLower = Sum(storeSamples)/storeSamples.length - currZ*0.1;
    var confUpper = Sum(storeSamples)/storeSamples.length + currZ*0.1;

    var corrTxt = document.getElementById("corrText");

    for (var i =0; i<confNew.length;i++){
        confNew[i].innerHTML = " \(" + confLower.toFixed(2) + ", " + confUpper.toFixed(2) + "\)";
        if (4 > confLower && 4 < confUpper) {
            confNew[i].style.color = "rgb(70, 140, 95)";
            corrTxt.innerHTML = "(for your interval this is the case)"
        } else {
            confNew[i].style.color = "rgb(164, 29, 34)";
            corrTxt.innerHTML = "(for your interval this is not the case)"
        }
    }

}


    



function cSlider() {

    var slideElem = document.getElementById("confSlider");
    //console.log(slideElem.value);
    var slideLevel = document.getElementById("sliderConfLevel");
    slideLevel.innerHTML = slideElem.value + '%';
    var subTxt = document.getElementById("subText");
    subTxt.innerHTML =  ((100 - slideElem.value)/200).toFixed(3) + '';
    calcConfInt()
}

// Fix so confidence interval can be changed
// Fix so button also changes the solution
// Fix so it all looks nice




changeDataWeights()