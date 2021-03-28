var canvasArt = document.getElementById("artCanvas");
var ctxArt = canvasArt.getContext("2d");
var artBox = document.getElementById("indexArtBox");


function drawArtCanvas() {


    var circCentx, circCenty, innerCircRad, outerCircRad;
    var currTheta, currCircx, currCircy;
    var shiftPos, newRad;

    var numCircs = 10;

    this.updateParams = function() {
        canvasArt.height = artBox.clientHeight;
        canvasArt.width = artBox.clientWidth;


        
        circCentx = canvasArt.clientWidth/2;
        circCenty = canvasArt.clientHeight/2;

        var marginSpace = 0.05;

        outerCircRad = Math.min(circCentx - canvasArt.clientWidth*marginSpace, circCenty - canvasArt.clientWidth*marginSpace);
        innerCircRad = outerCircRad/4;

        ctxArt.lineWidth = Math.max(1,Math.round(innerCircRad/15));
        

        

        ctxArt.clearRect(0,0,canvasArt.clientWidth, canvasArt.clientHeight);
        drawRose(currTheta, numSteps);
    }

    

    // Draws rose
    // startTheta is where to put the first rose
    // numSteps is the number of circles that will be in the rose
    function drawRose(startTheta, numSteps) {

        // Color for the rose
        // Alpha channel included to create dim effect towards edges
        //ctxArt.fillStyle = 'rgba(50, 188, 176, 0.2)';
        ctxArt.fillStyle = 'rgba(219, 170, 9, 0.2)';


        for (var i=0; i<(numCircs); i++) {

            shiftPos = outerCircRad/2 - innerCircRad/2;
            newRad = (outerCircRad + innerCircRad)/2;

            currCircx = circCentx +  shiftPos*Math.cos(startTheta + 2*Math.PI*i/(numCircs));
            currCircy = circCenty +  shiftPos*Math.sin(startTheta + 2*Math.PI*i/(numCircs));

            
            ctxArt.beginPath(); 
            ctxArt.arc(currCircx, currCircy, newRad, 0, 2 * Math.PI);
            ctxArt.fill();
        }

        

        // Edges of the rose petals
        //ctxArt.strokeStyle = '#112229';
        ctxArt.strokeStyle = '#1e1e1e';
        
        for (var i=0; i<(numCircs); i++) {

            shiftPos = outerCircRad/2 - innerCircRad/2;
            newRad = (outerCircRad + innerCircRad)/2;

            currCircx = circCentx +  shiftPos*Math.cos(startTheta + 2*Math.PI*i/(numCircs));
            currCircy = circCenty +  shiftPos*Math.sin(startTheta + 2*Math.PI*i/(numCircs));

            
            ctxArt.beginPath(); 
            ctxArt.arc(currCircx, currCircy, newRad, 0, 2 * Math.PI);
            ctxArt.stroke();
        }

        // Color for the inner circle
        //ctxArt.fillStyle = '#32bcb0';
        ctxArt.fillStyle = '#dbaa09';
        ctxArt.beginPath(); 
        var currRad = 1.1*innerCircRad*((numSteps)/(maxSteps)) + (1-numSteps/maxSteps)*outerCircRad*1.1;
        var smallRadDist = 2;
        ctxArt.arc(circCentx, circCenty, currRad, 0, 2 * Math.PI);
        ctxArt.fill();

        // Color for edge of the inner circle
        ctxArt.fillStyle = '#1e1e1e';
        ctxArt.beginPath(); 
        ctxArt.arc(circCentx, circCenty, currRad - smallRadDist, 0, 2 * Math.PI);
        ctxArt.fill();
    }


    var numSteps, maxSteps;
    var forwardMode = false;
    var artTimeoutId;
    maxSteps = 30;
    currTheta = 0;
    numSteps = 0;
    function animateRose() {
        ctxArt.clearRect(0,0,canvasArt.clientWidth, canvasArt.clientHeight);
        //console.log(numSteps, maxSteps, forwardMode)
        drawRose(currTheta, numSteps)
        currTheta = currTheta + Math.PI/1000;
        if (numSteps < (maxSteps + 1) && forwardMode) {
            numSteps = numSteps + 1;
        } else if (numSteps > -1 && !forwardMode) {
            //console.log('dec')
            numSteps = numSteps - 1;
        }
        if (numSteps == 0 && !forwardMode) {
            
            clearTimeout(artTimeoutId);
            // Do nothing
        } else {
            //console.log('Hej')
            artTimeoutId = setTimeout(animateRose, 10);
        }
        
    }

    this.updateParams();
    
    // All code below is for mouse and focus control

    var mouseHovering;
    artBox.addEventListener('mouseover', function() {
        
        if (!forwardMode) {
            forwardMode = true;
            animateRose()
        }
        mouseHovering = true;
        
    })

    artBox.addEventListener('mouseleave', function() {
        
        forwardMode = false;
        mouseHovering = false;
    })

    artBox.addEventListener('focus', (event) => {
        
        if (!mouseHovering){
            //console.log(confStepPlot, stopForward, stopBackward)
            clearTimeout(artTimeoutId);
            forwardMode = true;
            animateRose()
        }
        
        
      });

      artBox.addEventListener('focusout', (event) => {
        
        forwardMode = false;
        
      });

}
myArt = new drawArtCanvas();


// General function to make sure that everything is resized properly
window.onresize = function(event) {
    myDataScienceFig.drawBase();
    
    myProgArt.reDrawAll();
    myArt.updateParams();
    
};
