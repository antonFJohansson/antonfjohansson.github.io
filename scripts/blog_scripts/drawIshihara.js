var canvasIshi = document.getElementById("ishiCanvas");
var ctxIshi = canvasIshi.getContext("2d");
var ishiDiv = document.getElementById("ishiDiv");

var canvasDraw = document.getElementById("drawCanvas");
var ctxDraw = canvasDraw.getContext("2d");
var drawDiv = document.getElementById("drawDiv");



function drawIshiharaDisc(colInds) {


    var allColInds = colInds;

    // Function to obtain the circle radius for a newly placed disc
    function getCircleRadius(x,y) {

        var distToClosestCirc = 10000000;
        var closestId;
        var newCircRad = 0;

        // Loop through all discs and find the closest boundary.
        if (storeAllInfo.length > 0) {

            for (var i=0; i<storeAllInfo.length; i++) {
                dist = Math.sqrt(Math.pow((x-storeAllInfo[i][0]),2) + Math.pow((y-storeAllInfo[i][1]),2))

                if ((dist - storeAllInfo[i][2]) < distToClosestCirc) {
                    distToClosestCirc = (dist - storeAllInfo[i][2]);
                    
                }
            }

            if ((distToClosestCirc - 2*gapSpace) > maxCircRad) {
                newCircRad = maxCircRad
            } else if ((distToClosestCirc - 2*gapSpace) > minCircRad) {
                newCircRad =  (distToClosestCirc - 2*gapSpace);
            }
        }
        else {
            newCircRad = maxCircRad;
        }
        return newCircRad

    }


    
    function generateCircle() {

        var currX, currY, currAngle, currRad;

        currAngle = Math.random()*2*Math.PI;
        currX = centX + Math.random()*maxRad*Math.cos(currAngle);
        currY = centY + Math.random()*maxRad*Math.sin(currAngle);

        currRad = getCircleRadius(currX,currY)

        // Only draw circle if it has a positive radius
        if (currRad != 0) {
            
            ctxIshi.beginPath();

            var currColInd = Math.floor(Math.random()*currColDict.Background.length)
            var currCol = currColDict.Background[currColInd];
            ctxIshi.fillStyle = currCol;
            
            // Loop through all indices where we have color and add the color.
            for (var k=0; k<allColInds.length; k++) {
                if (Math.floor(currX) == allColInds[k][0] && Math.floor(currY) == allColInds[k][1]) {
                    var currColInd = Math.floor(Math.random()*currColDict.Object.length)
                    var currCol = currColDict.Object[currColInd];
                    ctxIshi.fillStyle = currCol;
                }
            }

            

            ctxIshi.arc(currX, currY, currRad, 0, 2 * Math.PI);
            ctxIshi.fill()
            storeAllInfo[storeAllInfo.length] = [currX, currY, currRad];
            
            
        }
    }


    var maxCircRad, minCircRad, gapSpace;
    var maxRad
    function setDrawScale() {

        canvasIshi.height = ishiDiv.clientHeight;
        canvasIshi.width = ishiDiv.clientWidth;
        
        maxRad = Math.min(0.9*canvasIshi.width/2, 0.9*canvasIshi.height/2);
        maxCircRad = 0.05*maxRad;
        minCircRad = 0.01*maxRad;
        gapSpace = 0.004*maxRad;

    }
    setDrawScale();
    
    

    var ishiColors = {
        redGreen: {'Background': ['#FFD006', '#EFBD89', '#CC725D', '#F1971C', '#EA9079'],
        'Object': ['#A5AF70', '#529465', '#C8C78F']},
        darkGreenRed: {'Background': ['#796D45', '#544F36', '#AD954E', '#79794B', '#B29651'],
        'Object': ['#EE6434', '#D95135', '#FE8551', '#F97062', '#F2834C']},
        darkBlueRed: {'Background': ['#96A38E', '#555A56', '#454A46', '#97A38F', '#6D756E'],
        'Object': ['#D17E65', '#DC9F8C', '#B77B78', '#D7474E', '#865862']}
    }

    var colorList = ['redGreen', 'darkGreenRed', 'darkBlueRed'];
    var currColDict = ishiColors[colorList[Math.floor(Math.random()*3)]];   
    



    var storeAllInfo = [];
    var centX, centY;

    var numCircs = 12000;

    var maxRad = Math.min(0.9*canvasIshi.width/2, 0.9*canvasIshi.height/2);
    centX = canvasIshi.width/2;
    centY = canvasIshi.height/2;

    for (var j=0; j< numCircs; j++) {
        generateCircle()
    }

}


function getInputShape() {


    this.self = this;

    var maxRad;
    

    // To make the outer circle blue
    function drawDottedCircle() {
        ctxDraw.strokeStyle = "#0000ff";
        ctxDraw.setLineDash([5, 3]);
        ctxDraw.beginPath();
        ctxDraw.arc(centXDraw, centYDraw, maxRad, 0, 2 * Math.PI);
        ctxDraw.stroke()
    }
    
    // Sets the scale of the canvas
    this.setDrawScale = function() {

        canvasDraw.height = drawDiv.clientHeight;
        canvasDraw.width = drawDiv.clientWidth;

        maxRad = Math.min(0.9*canvasDraw.width/2, 0.9*canvasDraw.height/2);
        centXDraw = canvasDraw.width/2;
        centYDraw = canvasDraw.height/2;
        drawDottedCircle()

    }
    this.setDrawScale();

    // Function to obtain the indices where we have colored the object
    this.getColorInd = function() {
        
        var allColorInd = [];
        for (var i=0; i<2*maxRad; i++) {
            for (var j=0; j<2*maxRad; j++) {
                imgData = ctxDraw.getImageData(centXDraw - maxRad + i, centYDraw -maxRad + j, 1, 1).data;
                //console.log(imgData)
                if (imgData[3] > 0 && imgData[2] == 0)  {
                    allColorInd[allColorInd.length] = [Math.floor(i + centXDraw - maxRad),Math.floor(j + centYDraw -maxRad)]; 
                }
            }
        }
        drawIshiharaDisc(allColorInd);
        //return allColorInd
        
    }

    this.clearInput = function() {
        ctxDraw.clearRect(0,0, canvasDraw.width, canvasDraw.height);
        
        drawDottedCircle()

    }



    var mouseDwn = false;
    document.getElementById('drawCanvas').onmousedown = function(e) {

        mouseDwn = true;
    }

    document.getElementById('drawCanvas').onmouseup = function(e) {
        mouseDwn = false;
    }


    document.getElementById('drawCanvas').onmousemove = function(e) {
        
        if (mouseDwn) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left; //x position within the element.
            var y = e.clientY - rect.top;  //y position within the element.
            
            var currDrawRad = Math.sqrt(Math.pow((x - centXDraw),2) + Math.pow((y-centYDraw),2));

            if (currDrawRad < (maxRad - 10)) {
                ctxDraw.beginPath();
                ctxDraw.arc(x, y, 10, 0, 2 * Math.PI);
                ctxDraw.fill();
            }
        }

    }
}


function downloadIshiDisc() {
    var download = document.getElementById("download");
        var image = document.getElementById("ishiCanvas").toDataURL("ishiharaDisc/png")
                    .replace("ishiharaDisc/png", "ishiharaDisc/octet-stream");
        download.setAttribute("href", image);
}


// Not needed if we fix the size of the canvas
/* window.onresize = function(event) {
    
    //myInputShape.setDrawScale();
    //myInputShape.currDisc.setDrawScale();
    //ctxIshi.clearRect(0,0,canvasIshi.width, canvasIshi.height);
    //ctxDraw.clearRect(0,0,canvasDraw.width, canvasDraw.height)
    //myInputShape = new getInputShape();
}; */
    

myInputShape = new getInputShape();



