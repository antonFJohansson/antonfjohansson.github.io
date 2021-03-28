
var canvasProg = document.getElementById("programmingCanvas");
var ctxProg = canvasProg.getContext("2d");
var canvasBoxProg = document.getElementById("indexProgrammingBox");

function createCodeArt() {

    canvasProg.height = canvasBoxProg.clientHeight;
    canvasProg.width = canvasBoxProg.clientWidth;

    var canvasWidth = canvasBoxProg.clientWidth;
    var canvasHeight = canvasBoxProg.clientHeight;

    var xScale = 1;
    var yScale = 1;
    
    // All segment colors
    var backgroundColor = '#1e1e1e';
    var indexColor = '#858585';
    var varDefColor = '#569cd6';
    var varColor = '#9cdcfe';
    var propColor = '#dcdcaa';
    var strColor = '#ce9178';
    var parFuncColor = '#32bcb0';
    var childFuncColor = '#569cd6';
    var commentColor = '#6a9955';
    var numberColor = '#9dcea8';
    var forColor = '#c586c0';
    var ifColor = '#c586c0';

    var codeHeight = canvasProg.height/50;
    var shiftSpeed = Math.round(0.5 + canvasProg.height/400);
    var codeHorSpacing = canvasProg.width/150;
    var codeDefLen = canvasProg.width/150;//5;
    var codeFuncDefLen = canvasProg.width/50;
    var codeVarMaxLen = canvasProg.width/10;
    var codeVarMinLen = canvasProg.width/40;
    var codeCondLen = canvasProg.width/40;
    var tabLen = canvasProg.width/40;
    var codeCommMaxLen = canvasProg.width/5;
    var codeCommMinLen = canvasProg.width/10;
    var indexWidth = canvasProg.width/150;
    var indexPad = canvasProg.width/150;
    ctxProg.lineWidth = codeHeight;

    var numBaseLines = 5;
    var shiftTime = 10;
    
    var breakCondProb = 0.2;
    
    var numIndex = 22;
    var numIndexPad = 4;

    var maxCodeSegments = 2;
    
    var codeChoices = {0: varColor,
                       1: strColor,
                       2: numberColor
                    };

    var allFullInfo = []
    
    // The distance between the codes, vertical distance.
    var codeDist = (canvasHeight - numIndex*codeHeight) / (numIndex + 1) + codeHeight;
    codeDist = Math.round(codeDist);

    var startInd, endInd;

    // All functions below that starts with "create" creates some form of line segment
    function createVarSeg(depth) { 

        // Create the indices first
        // Then add the other relevant segments and store in allInfo
        var allInfo = []
        
        startInd = indexPad;
        endInd = indexPad + indexWidth;

        allInfo[allInfo.length] = [startInd, endInd, indexColor]

        var startDef, endDef;
    
        startDef = depth*tabLen + endInd + codeHorSpacing;
        endDef = startDef + codeDefLen;
    
        allInfo[allInfo.length] = [startDef, endDef, varDefColor]
    
        var startCode, endCode;
    
        startCode = endDef + codeHorSpacing;
        endCode = startCode + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));

        allInfo[allInfo.length] = [startCode, endCode, varColor]
    
        var numCodeSeg = Math.ceil(maxCodeSegments*Math.random());
    
        for (var i=0; i< numCodeSeg; i++){
    
            var currCol = codeChoices[Math.floor(3*Math.random())]
    
            startCode = endCode + codeHorSpacing;
            endCode = startCode + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));

            allInfo[allInfo.length] = [startCode, endCode, currCol]
        }
        
        return allInfo

    }

    function createPropSeg(depth) {

        var allInfo = []
        
        startInd = indexPad;
        endInd = indexPad + indexWidth;

        allInfo[allInfo.length] = [startInd, endInd, indexColor]

        var startVar, endVar;
    
        startVar = depth*tabLen + endInd + codeHorSpacing;
        endVar = startVar + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));
    
        allInfo[allInfo.length] = [startVar, endVar, varColor];
    
        var currPropCol;
        if (Math.random() < 0.5) {
            currPropCol = propColor;    
        } else {
            currPropCol = parFuncColor;
        }
        
        var startProp, endProp;
    
        startProp = endVar + codeHorSpacing;
        endProp = startProp + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));;
    

        allInfo[allInfo.length] = [startProp, endProp, currPropCol];
    
        // Randomize if we add var here or not
        // Add blue parts
        if (Math.random() < 0.5) {
            
            var numPropParts = Math.round(1 + Math.random());
    
            for (var i=0; i< numPropParts; i++){
                startProp = endProp + codeHorSpacing;
                endProp = startProp + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));;
            
                allInfo[allInfo.length] = [startProp, endProp, varColor];
            }
    
        }

        return allInfo
    }

    function createFuncSeg(depth) {

        var allInfo = []

        
        startInd = indexPad;
        endInd = indexPad + indexWidth;

        allInfo[allInfo.length] = [startInd, endInd, indexColor]

        var startVar, endVar;
    
        startVar = depth*tabLen + endInd + codeHorSpacing;
        endVar = startVar + codeFuncDefLen;

        allInfo[allInfo.length] = [startVar, endVar, varDefColor]
    
        var startFunc, endFunc;
    
        startFunc = endVar + codeHorSpacing;
        endFunc = startFunc + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));

        allInfo[allInfo.length] = [startFunc, endFunc, parFuncColor]
    
        return allInfo;
    }

    function createCondSeg(depth) {

        var allInfo = []
        
        startInd = indexPad;
        endInd = indexPad + indexWidth;

        allInfo[allInfo.length] = [startInd, endInd, indexColor]
    
        var startVar, endVar;
    
        startVar = depth*tabLen + endInd + codeHorSpacing;
        endVar = startVar + codeCondLen;
    
        allInfo[allInfo.length] = [startVar, endVar, forColor]
    
        var ifStatement = Math.random() < 0.5;
    
        if (ifStatement) {
            
            var startIf, endIf;
    
            startIf = endVar + codeHorSpacing;
            endIf = startIf + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));

            allInfo[allInfo.length] = [startIf, endIf, varColor]

        } else {
            var startFor, endFor;
    
            startFor = endVar + codeHorSpacing;
            endFor = startFor + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));
    
            allInfo[allInfo.length] = [startFor, endFor, varDefColor]
    
            var startFor, endFor;
    
            startFor = endFor + codeHorSpacing;
            endFor = startFor + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));
    
            allInfo[allInfo.length] = [startFor, endFor, varColor]
        }

        return allInfo;
    }

    function createCommentSeg(depth) {

        var allInfo = []
        
        startInd = indexPad;
        endInd = indexPad + indexWidth;

        allInfo[allInfo.length] = [startInd, endInd, indexColor]
    
        var startVar, endVar;
    
        startComm = depth*tabLen + endInd + codeHorSpacing;
        endComm = startComm + (codeCommMinLen + Math.random()*(codeCommMaxLen - codeCommMinLen));;
    
        allInfo[allInfo.length] = [startComm, endComm, commentColor]
    
        

        return allInfo;
    }

    function createCalcSeg(depth) { 

        var allInfo = []
        
        startInd = indexPad;
        endInd = indexPad + indexWidth;

        allInfo[allInfo.length] = [startInd, endInd, indexColor]

        var startDef, endDef;
    
        startDef = depth*tabLen + endInd + codeHorSpacing;
        endDef = startDef + codeDefLen;
    

        allInfo[allInfo.length] = [startDef, endDef, varColor]
    
        var startCode, endCode;
    
        startCode = endDef + codeHorSpacing;
        endCode = startCode + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));

        allInfo[allInfo.length] = [startCode, endCode, varColor]
    
        var numCodeSeg = Math.ceil(maxCodeSegments*Math.random());
    
        for (var i=0; i< numCodeSeg; i++){
    
            var currCol = codeChoices[Math.floor(3*Math.random())]
    
            startCode = endCode + codeHorSpacing;
            endCode = startCode + (codeVarMinLen + Math.random()*(codeVarMaxLen - codeVarMinLen));

            allInfo[allInfo.length] = [startCode, endCode, currCol]
        }
        
        return allInfo

    }

    // Need to scale when the window is resized
    function calcScale() {
        canvasProg.height = canvasBoxProg.clientHeight;
        canvasProg.width = canvasBoxProg.clientWidth;
        xScale = canvasBoxProg.clientWidth / canvasWidth;
        yScale = canvasBoxProg.clientHeight / canvasHeight;
    }

    // The probabilities for the different segments
    var orgProb = [0.15, 0.2, 0.15, 0.2, 0.1, 0.2];
    var segProb = orgProb
    var currYVal, currDepth;
    var chooseProb, currVal;
    var tabBoo; // If we should tab or not
    
    function addNewSegment(allFullInfo, currYVal, currDepth) {
        chooseProb = Math.random();

        tabBoo = false;

        if (currDepth == 2) {
            segProb = [0.55, 0.30, 0., 0., 0.15];
        } else {
            segProb = orgProb;
        }

        currVal = 0;
        for (var i=0; i<segProb.length; i++) {
            if (chooseProb > currVal && chooseProb < (currVal + segProb[i])){
                break
            }
            currVal = currVal + segProb[i];
        }

        if (i == 0) {
            allFullInfo[allFullInfo.length] = [createVarSeg(currDepth), currYVal];
        } else if (i == 1) {
            allFullInfo[allFullInfo.length] = [createPropSeg(currDepth), currYVal];
        } else if (i == 2) {
            allFullInfo[allFullInfo.length] = [createFuncSeg(currDepth), currYVal];
            tabBoo = true;
        } else if (i == 3){
            allFullInfo[allFullInfo.length] = [createCondSeg(currDepth), currYVal];
            tabBoo = true;
        } else if (i == 4) {
            allFullInfo[allFullInfo.length] = [createCommentSeg(currDepth), currYVal];
        } else if (i == 5) {
            allFullInfo[allFullInfo.length] = [createCalcSeg(currDepth), currYVal];
        }

        return [allFullInfo, tabBoo]
    }

    var currDepth;
    var baseDepth;

    function addAllSegments() {

        currDepth = 0;

        for (var i=0; i<(numIndex + numIndexPad); i++) {
            currYVal = codeDist + i*codeDist;
            allFullInfoList = addNewSegment(allFullInfo, currYVal, currDepth);  
            allFullInfo = allFullInfoList[0]

            if (allFullInfoList[1] && currDepth < 2) {
                currDepth = currDepth + 1;
            } else {
                if (Math.random() < breakCondProb && currDepth > 0) {
                    currDepth = currDepth - 1;
                }
            }

            if (i == (numBaseLines-1)) {
                baseDepth = currDepth;
            }
        }  
    }

    function addAfterBaseSegments() {

        // Copy the first part
        var tempAllFullInfo = [];
        for (var i=0; i<allFullInfo.length; i++) {
            // Only copy the base segment
            if (i < numBaseLines) {
                tempAllFullInfo[tempAllFullInfo.length] = allFullInfo[i];
            } 
        }
        allFullInfo = tempAllFullInfo;

        currDepth = baseDepth;

        for (var i=numBaseLines; i<(numIndex + numIndexPad); i++) {
            currYVal = codeDist + i*codeDist;
            allFullInfoList = addNewSegment(allFullInfo, currYVal, currDepth);  
            allFullInfo = allFullInfoList[0]

            if (allFullInfoList[1] && currDepth < 2) {
                currDepth = currDepth + 1;
            } else {
                if (Math.random() < breakCondProb && currDepth > 0) {
                    currDepth = currDepth - 1;
                }
            }
        } 
    }


    function clearCanvas() {
        ctxProg.clearRect(0, 0, canvasProg.width, canvasProg.height);
    }

    this.reDrawAll = function() {        
        calcScale();
        console.log(currentStep)
        // If the animation is currently ongoing when resizing then we do not need to 
        // draw the base.
        if (currentStep == -1) {
            drawBase();
        }
    }

    
    
    function drawBase() {
        var forLimit; // How long to loop the for-loop
        clearCanvas();

        for (var i=0; i<allFullInfo.length; i++) {
            
            // Only loop for the base segments
            if (i< numBaseLines) {
                forLimit = allFullInfo[i][0].length
            } else {
                forLimit = 1;
            }
            for (var j=0; j<forLimit; j++) {
                ctxProg.strokeStyle = allFullInfo[i][0][j][2]; 
                ctxProg.lineWidth = Math.round(yScale*codeHeight);
                ctxProg.beginPath();
                ctxProg.moveTo(xScale*allFullInfo[i][0][j][0], yScale*allFullInfo[i][1]);    
                ctxProg.lineTo(xScale*allFullInfo[i][0][j][1], yScale*allFullInfo[i][1]);
                
                ctxProg.closePath();
                ctxProg.stroke();

            }
        }
    }

    
    function drawAfterBase(animLengthStop) {
        var animLength, currEndPoint;
        animLength = 0;
        var horDist = 10; // horisontal distance
        var numDrawSteps = 25;
        var breakLoop = false;
        for (var i=0; i<allFullInfo.length; i++) {
            
            if (i >= numBaseLines) {

                if (breakLoop) {
                    continue;    
                }

                    for (var j=1; j<allFullInfo[i][0].length; j++) {
                        ctxProg.strokeStyle = allFullInfo[i][0][j][2]; 

                        if (breakLoop) {
                            continue;    
                        }

                        var drawLine = true;
                        currEndPoint = xScale*allFullInfo[i][0][j][0];
                        while (drawLine) {

                            // Stop animation
                            if (animLength >= animLengthStop) {
                                breakLoop = true;
                                break;    
                            }
                            // Do not need to draw more segments when they are outside the canvas
                            if (yScale*allFullInfo[i][1] > canvasProg.height) {
                                stopForward = true;
                            }

                            // Add horisontal distance until we reach the end of the segment
                            if ((currEndPoint + horDist) > xScale*allFullInfo[i][0][j][1]) {
                                currEndPoint = xScale*allFullInfo[i][0][j][1];
                                drawLine = false;
                            } else {
                                currEndPoint = currEndPoint + xScale*horDist;
                            }
                            ctxProg.beginPath();
                            ctxProg.moveTo(xScale*allFullInfo[i][0][j][0], yScale*allFullInfo[i][1]);    
                            ctxProg.lineTo(currEndPoint, yScale*allFullInfo[i][1]);
                            
                            ctxProg.closePath();
                            ctxProg.stroke();
                            animLength = animLength +1;
                        }
                    }
            }
        }
    }

    var currentStep = -1;
    var currTimeEvent;
    var stopForward = false;
    function drawAllCodeSeg(mode) {
        
        //clearCanvas()
        drawBase();
        drawAfterBase(currentStep);

        if (mode) {
        currentStep = currentStep + 1;
        } else {
            currentStep = currentStep - 1;
        }

        if (!stopForward && mode) {
            currTimeEvent = setTimeout(drawAllCodeSegForward, shiftTime);
        } else if (currentStep > -1 && !mode) {
        
            if (currentStep == 0) {
                addAfterBaseSegments(); // Only this one randomizes the new parts?
            }
            currTimeEvent = setTimeout(drawAllCodeSegBackward, shiftTime);
            
            stopForward = false;
        }
    }

    function drawAllCodeSegForward() {
        drawAllCodeSeg(true); 
    }
    function drawAllCodeSegBackward() {
        drawAllCodeSeg(false); 
    }

    addAllSegments()
    drawBase();
    
    
    var mouseHovering = false;
    canvasBoxProg.addEventListener('mouseover', function(event) {
        
        if (!mouseHovering) {
            clearTimeout(currTimeEvent);
            drawAllCodeSegForward();
        }
        
        mouseHovering = true;
    });

    canvasBoxProg.addEventListener('mouseleave', function(event) {
        mouseHovering = false;
        clearTimeout(currTimeEvent);
        drawAllCodeSegBackward();
    });

    canvasBoxProg.addEventListener('click', e => {
        console.log('New page now!')
        //clearTimeout(currentTimeOutId);
    });

    canvasBoxProg.addEventListener("keydown", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        //console.log(event.key == 'Enter');
        if (event.key === 'Enter') {
            console.log('New page now!')
        }
      });

      canvasBoxProg.addEventListener('focus', (event) => {
        
        // Start the anim here
        
        if (!mouseHovering) {
            drawAllCodeSegForward(); // This is just called once I tink and not all the time while hovering like the mouse
        }
        mouseHovering = true;
        
      });

      canvasBoxProg.addEventListener('focusout', (event) => {
        
        // Stop the anim here
        clearTimeout(currTimeEvent);
        drawAllCodeSegBackward();
        
        mouseHovering = false;
        
      });

}

myProgArt = new createCodeArt();




