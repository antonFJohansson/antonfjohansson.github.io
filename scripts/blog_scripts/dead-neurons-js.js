var canvas = document.getElementById('deadNeuronCanvas');

var ctx = canvas.getContext('2d');


function setCanvasWidth() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Create a neuron class

function Neuron(x,y, neuronSize) {

    this.baseColor = '#000000';
    this.killColor = '#F3F2F0';
    this.aliveColor = '#000000';


    this.x = x;
    this.y = y;
    this.neuronSize = neuronSize;
    this.incomingInfo = [];

    this.initializeNeuron = function() {
        this.incomingInfo = [];
    }

    this.addInfo = function(inp) {
        this.incomingInfo[this.incomingInfo.length] = inp;
    }

    this.killNeuron = function() {
        // WOrk with fake prob to begin with
        if (Math.random() < 0.5) {
            this.color = '#ff0000';
        } else {
            this.color = '#000000';
        }

    }

    this.drawNeuron = function() {

        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.neuronSize, 0, 2 * Math.PI);
        ctx.fill()

        if (Math.max(...this.incomingInfo) == -1) {
            ctx.fillStyle = this.killColor;
        } else {
            ctx.fillStyle = this.aliveColor;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.neuronSize*0.95, 0, 2 * Math.PI);
        ctx.fill()
        
        
    }
}


function Network(layerSizes, neuronProp) {
    this.neuronProp = neuronProp;
    this.layerSizes = layerSizes;
    this.widestLayer = Math.max(...layerSizes);
    //console.log(this.widestLayer,layerSizes);

    var horSize, vertSize;
    vertSize = canvas.height*neuronProp/this.widestLayer;
    horSize = canvas.width*neuronProp/layerSizes.length;
    this.neuronSize = 0.5*Math.min(vertSize, horSize); // times 0.5 to get radius

    var layerSpacing = (canvas.width - 2*this.layerSizes.length*this.neuronSize)/(this.layerSizes.length + 1);
    
    //console.log(this.neuronSize, canvas.height, canvas.width, neuronProp, this.widestLayer)
    // We create a function to create all positions first?
    this.storeAllNeurons = []
    var currXPos = layerSpacing;
    var currYPos;
    var numNeurons, neuronSpacing;
    var currNeurLayer;
    for (var i=0; i<this.layerSizes.length; i++) {
        currNeurLayer = []
        numNeurons = layerSizes[i] + 1;
        neuronSpacing = (canvas.height - 2*this.neuronSize*numNeurons)/(numNeurons + 1);
        currYPos = neuronSpacing + this.neuronSize;
        //console.log(neuronSpacing, canvas.height, numNeurons, this.neuronSize)
        for (var j=0; j<numNeurons; j++) {
            // We can add the bias first
            if (j == 0) {
                var newNeuron = new Neuron(currXPos,currYPos, 0.01); 
            } else {
                var newNeuron = new Neuron(currXPos,currYPos, this.neuronSize); 
            }
            
            currNeurLayer[currNeurLayer.length] = newNeuron
            currYPos = currYPos + neuronSpacing + 2*this.neuronSize;
            //console.log(currYPos)
        }
        this.storeAllNeurons[this.storeAllNeurons.length] = currNeurLayer;
        currXPos = currXPos + layerSpacing + 2*this.neuronSize;
    }
    
    
    this.drawConnections = function() {
        var currNeurX, currNeurY;
        var prevNeurX, prevNeurY;
        
        var killProb;
        //ctx.save();
        
        for (var i = 1; i<this.layerSizes.length; i++) {
            //console.log(this.storeAllNeurons[i], this.storeAllNeurons[i].length)
            for (var j=0; j<this.storeAllNeurons[i].length; j++) {
                currNeurX = this.storeAllNeurons[i][j].x;
                currNeurY = this.storeAllNeurons[i][j].y;
                this.storeAllNeurons[i][j].initializeNeuron();
                
                // So we do not plot connections to the bias
                if (j == 0) {
                    continue;
                }
                killProb = 1/2;//Math.pow(2,this.storeAllNeurons[i-1].length);
                //console.log(killProb, this.storeAllNeurons[i-1].length)
                
                // draw dashed stuff
                
                for (var k=0; k<this.storeAllNeurons[i-1].length; k++) {

                    prevNeurX = this.storeAllNeurons[i-1][k].x;
                    prevNeurY = this.storeAllNeurons[i-1][k].y;
                    //ctx.strokeStyle = '#000000';
                    
                    if (Math.random() < killProb) {
                        ctx.setLineDash([5]);
                        ctx.strokeStyle = '#000000';
                        this.storeAllNeurons[i][j].addInfo(-1);
                    } else {
                        ctx.setLineDash([])
                        ctx.strokeStyle = '#000000';
                        this.storeAllNeurons[i][j].addInfo(1);
                    }
                    // I can add the colors here and also add it to a neuron property?

                    ctx.beginPath();
                    ctx.moveTo(prevNeurX, prevNeurY);
                    ctx.lineTo(currNeurX, currNeurY);
                    ctx.stroke();
                    //console.log(prevNeurX, prevNeurY, currNeurX, currNeurY)
                    //ctx.restore();    
                }
            }
            

        }
    }

    this.drawNeurons = function() {
        for (var i=0; i<this.storeAllNeurons.length; i++){
            for (var j=0; j<this.storeAllNeurons[i].length; j++) {
                this.storeAllNeurons[i][j].drawNeuron();
            }
            
        }
    }


    this.drawNetwork = function() {
        // Now we should just draw all the connections between the neurons as well
        this.drawConnections();

        this.drawNeurons();
    }
}

var currNumBtns = 2;

function addButton() {
    console.log(currNumBtns);
    

    var wrapChild = document.getElementById('cBtnWrapper');
    
    var addBtn = document.getElementById('canvasAddBtn');
    addBtn.remove()

    currLayerSize = [];
    var currElem;
    
    for (var i=0; i<currNumBtns; i++) {
    
        currElem = document.getElementById('inp' + i);
        currLayerSize[currLayerSize.length] = parseInt(currElem.value);
        //console.log(currElem.value);
    }
    
    currLayerSize[currLayerSize.length] = 1

    var newBtnDiv = document.createElement('div');
    var newBtn = document.createElement('button');
    var newInp = document.createElement('input');
    newBtnDiv.setAttribute('id', 'cBtnWrap' + (currNumBtns));
    newBtnDiv.style.display = "inline-block";

    newBtn.innerHTML = '-';
    newBtn.setAttribute('id', 'canvasBtn' + (currNumBtns));
    newBtn.setAttribute('onclick', `removeBtn(${currNumBtns})`);

    newInp.setAttribute('id', 'inp' + (currNumBtns));
    newInp.setAttribute('type', 'number');
    newInp.setAttribute('min', '1');
    newInp.setAttribute('value', '1');
    newInp.style.width = '3em'
    newInp.setAttribute('onchange', 'createNewNet()');
    //id="inp0" type="number" min="0" value="1" style="width:2em;"
    //console.log(wrapChild.children);
    newBtnDiv.appendChild(newBtn);
    newBtnDiv.appendChild(newInp);
    wrapChild.appendChild(newBtnDiv);

    addBtn = document.createElement('button');
    addBtn.innerHTML = '+'
    addBtn.setAttribute('onclick', 'addButton()');
    addBtn.setAttribute('id', 'canvasAddBtn');
    wrapChild.appendChild(addBtn);

    console.log(currLayerSize)

    currNumBtns = currNumBtns + 1;

    ctx.clearRect(0,0,canvas.width, canvas.height);
    myNet = new Network(currLayerSize, neuronSize)
    myNet.drawNeurons()
}

function createNewNet() {
    currLayerSize = [];
    var currElem, currVal;
    for (var i=0; i<currNumBtns; i++) {
        
        currElem = document.getElementById('inp' + i);
        currVal = parseInt(currElem.value);
        if (currVal < 1) {
            currVal = 1;
            currElem.value = 1;
        }


        currLayerSize[currLayerSize.length] = currVal
        //console.log(currElem.value);
    }

    ctx.clearRect(0,0,canvas.width, canvas.height);
    myNet = new Network(currLayerSize, neuronSize)
    myNet.drawNeurons()
}

function removeBtn(btnID) {
    console.log(currNumBtns, btnID);
    var wrapChild = document.getElementById('cBtnWrapper');
    
    var addBtn = document.getElementById('canvasAddBtn');
    addBtn.remove()

    currLayerSize = [];
    var currElem;
    for (var i=0; i<currNumBtns; i++) {
        
        // Check if btnID is string or INT!
        if (i == btnID) {
            continue;
        }

        currElem = document.getElementById('inp' + i);
        currLayerSize[currLayerSize.length] = parseInt(currElem.value);
        //console.log(currElem.value);
    }
    

    var wrapChild = document.getElementById('cBtnWrapper');
    wrapChild.remove()
    var wrapParent = document.getElementById('canvasBtnWrapper');
    wrapChild = document.createElement('div');
    wrapChild.setAttribute('id', 'cBtnWrapper');

    for (var i=0; i< currLayerSize.length; i++) {
        var newBtnDiv = document.createElement('div');
        var newBtn = document.createElement('button');
        var newInp = document.createElement('input');
        newBtnDiv.setAttribute('id', 'cBtnWrap' + (i));
        newBtnDiv.style.display = "inline-block";
        newBtn.innerHTML = '-';
        newBtn.setAttribute('id', 'canvasBtn' + (i));
        newBtn.setAttribute('onclick', `removeBtn(${i})`)
        newInp.setAttribute('id', 'inp' + (i));
        newInp.setAttribute('type', 'number');
        newInp.setAttribute('value', '' + i);
        newInp.setAttribute('min', '1');
        newInp.style.width = '3em'
        newInp.setAttribute('onchange', 'createNewNet()');
        newInp.value = '' + currLayerSize[i];
        //id="inp0" type="number" min="0" value="1" style="width:2em;"
        //console.log(wrapChild.children);
        newBtnDiv.appendChild(newBtn);
        newBtnDiv.appendChild(newInp);
        wrapChild.appendChild(newBtnDiv);
    
    }
    addBtn = document.createElement('button');
    addBtn.innerHTML = '+'
    addBtn.setAttribute('onclick', 'addButton()');
    addBtn.setAttribute('id', 'canvasAddBtn');
    wrapChild.appendChild(addBtn);

    wrapParent.appendChild(wrapChild);

    console.log(currLayerSize)

    currNumBtns = currNumBtns - 1;

    ctx.clearRect(0,0,canvas.width, canvas.height);
    myNet = new Network(currLayerSize, neuronSize)
    myNet.drawNeurons()

}

function initializeParameters() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    myNet.drawNetwork();
}

function reportWindowSize() {
    ctxArt.clearRect(0,0,canvasArt.clientWidth, canvasArt.clientHeight);
    setCanvasWidth()
}
window.onresize = reportWindowSize;
setCanvasWidth()


var neuronSize = 0.5;
var currLayerSizes = [2, 4];
ctx.lineWidth = 2;

ctx.clearRect(0,0,canvas.width, canvas.height);
var myNet = new Network(currLayerSizes, neuronSize)
myNet.drawNetwork();



