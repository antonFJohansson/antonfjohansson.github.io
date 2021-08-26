
class decisionTreePlot {
    constructor(scatterPts) {

        // scatterPts is a list of the form [[x,y,numPts], [x,y,numPts],...]

        var canvas = document.getElementById("decTreeFig3");
        var box = document.getElementById("canvas-container3");

        this.allBoxesScaledStore;

        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;

        this.colList = [['#FDA64B', 'rgba(253, 166, 75, 0.2)', 'C'],
                        ['#D1D387', 'rgba(209, 211, 135, 0.2)', 'R'],
                         ['#15607A', 'rgba(21, 96, 122, 0.2)', 'T'],
                          ['#9DDBEA', 'rgba(157, 219, 234, 0.2)', 'S'],
                           ['#FFD9BC', 'rgba(255, 217, 188, 0.2)', 'X']];
        
        // this.colList = [['#FDA64B', 'rgba(253, 255, 255, 0.2)', 'C'],
        //                  ['#D1D387', 'rgba(255, 255, 255, 0.2)', 'R'],
        //                   ['#15607A', 'rgba(255, 255, 255, 0.2)', 'T'],
        //                    ['#9DDBEA', 'rgba(255, 255, 255, 0.2)', 'S'],
        //                     ['#FFD9BC', 'rgba(255, 255, 155, 0.2)', 'X']];


        this.shapeList = ['circle', 'rect', 'triangle', 'star', 'cross'];


        // We can call a function to generate the data here
        // And then the user can also call that function with a button
        this.totPts = 0;
        for (var i=0; i<scatterPts.length; i++) {
            this.totPts = this.totPts + scatterPts[i][2];
        }

        this.scatterPts = scatterPts;
        this.generateScatterData();
        

        // Will store more here after the chart has been created
        this.classRectList = [];
        
        this.currTreeSize = 0;

        // Stores the positions of all the lines
        this.linePosList = {}
        for (var i=0; i<7; i++) {
            this.linePosList[i] = [{'x': 0.5, 'y': 0}, {'x': 0.5, 'y': 1}];
        }
        

        // Needed so the plugin can access "this"
        var self = this;

        const labels = [];
        const data = {
        labels: labels,
        datasets: this.createDatasets()
        };

        // Maybe it will work with this to pass the functions at least
        // Or..will it? Because we pass a function and the scope of that function will
        // be different in the future?

        


        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
            //console.log(self)
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            var chartArea = chart.chartArea;
            ctx.globalCompositeOperation = 'destination-over';
            
            if (self.classRectList.length > 0) {
                self.classRectList = self.getClassRectList(self.currTreeSize)  
                for (var i=0; i<self.classRectList.length; i++) {
                    ctx.fillStyle = self.classRectList[i][4];
                    //console.log('a', classRectList)
                    ctx.fillRect(self.classRectList[i][0][0], self.classRectList[i][0][1],
                        self.classRectList[i][1][0] - self.classRectList[i][0][0], self.classRectList[i][2][1] - self.classRectList[i][0][1]);
                }
                
                
            }

            
            ctx.fillStyle = 'white';
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);



            ctx.restore();
            }
        };

        const config = {
            data: data,
            plugins: [plugin],
            options: {
                events: [],
                animations: {
                },
                animation: {
                    duration: 0
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        display: true,
                        suggestedMin: 0,
                        suggestedMax: 1,
                        ticks: {
                            stepSize: 0.1
                        },
                        title: {
                            display: true,
                            text: 'x'
                        }
                    },
                    y: {
                        display: true,
                        suggestedMin: 0,
                        suggestedMax: 1,
                        title: {
                            display: true,
                            text: 'y'
                        }
                    },
                }
            }
        };


        this.myChart = new Chart(
            document.getElementById('decTreeFig3'),
            config
        );


        var chartArea = this.myChart.chartArea;
        this.chartTopLeftx = chartArea.left;
        this.chartTopLefty = chartArea.top;
        this.chartWidth = chartArea.right - chartArea.left;
        this.chartHeight = chartArea.bottom - chartArea.top;

        this.classRectList = this.getClassRectList(0);
        this.myChart.update('none')




    };

    generateScatterData() {
        var currPts;
        this.allPtsList = [];
        for (var i=0;i<this.scatterPts.length;i++) {
            currPts = this.generateScatter(this.scatterPts[i][0], this.scatterPts[i][1], this.scatterPts[i][2]);
            this.allPtsList.push(currPts)
        }

        
    }

    

    generateScatter(dataCenterx, dataCentery, numPts) {

        // Generates data according to a small and large uniform distribution
        
        // Probabilities and sizes of the large and small regions
        const probSmall = 0.7;
        const probLarge = 0.3;
        const smallWidth = 0.2;
        const largeWidth = 0.6;
    
        const lowerPlot = 0.03;
        const upperPlot = 0.97;
    
        //var numPts = 20 + Math.floor(Math.random()*10);
    
        var allPts = [];
        var ptx, pty;
        var minLimxsmall, maxLimxsmall, minLimxlarge, maxLimxlarge;
        var minLimysmall, maxLimysmall, minLimylarge, maxLimylarge;
    
        // Limits for the uniform distributions
        minLimxsmall = Math.max(dataCenterx - smallWidth, lowerPlot);
        maxLimxsmall = Math.min(dataCenterx + smallWidth, upperPlot);
        minLimxlarge = Math.max(dataCenterx - largeWidth, lowerPlot);
        maxLimxlarge = Math.min(dataCenterx + largeWidth, upperPlot);
        minLimysmall = Math.max(dataCentery - smallWidth, lowerPlot);
        maxLimysmall = Math.min(dataCentery + smallWidth, upperPlot);
        minLimylarge = Math.max(dataCentery - largeWidth, lowerPlot);
        maxLimylarge = Math.min(dataCentery + largeWidth, upperPlot);
        
        // Generate data
        for (var i=0; i<numPts; i++) {
            
            if (Math.random() < probSmall) {
                ptx = minLimxsmall + Math.random()*(maxLimxsmall - minLimxsmall);
                pty = minLimysmall + Math.random()*(maxLimysmall - minLimysmall);
            } else {
                ptx = minLimxlarge + Math.random()*(maxLimxlarge - minLimxlarge);
                pty = minLimylarge + Math.random()*(maxLimylarge - minLimylarge);
            }
    
            allPts.push({'x': ptx, 'y': pty})
            
        }
        
    
        return allPts
    }

    createDatasets() {

   
        var allData = [];
        allData.push({
            type: 'line',
            data: [{'x': 0.5, 'y': 0}, {'x':0.5, 'y':1}],
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            tension: 0.1,
            pointRadius: 0
        })
        for (var i=0; i<7; i++) {
            allData.push({
                type: 'line',
                data: [],
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1,
                pointRadius: 0
            })
        }
    
        
        for (var i=0; i<this.allPtsList.length; i++) {
            allData.push({
                type: 'scatter',
                pointStyle: this.shapeList[i],
                data: this.allPtsList[i],
                fill: false,
                borderColor: this.colList[i][0],
                tension: 0.1,
                pointRadius: 4
            })
        }
        return allData
    }

    rescaleData(box) {

        // Converts data between canvas coordinates and plot coordinates
        
        var boxNew = []
        var xScaled, yScaled;
        for (var i=0; i<box.length; i++) {
            xScaled = (box[i][0] - this.chartTopLeftx)/(this.chartWidth);
            yScaled = 1 - (box[i][1] - this.chartTopLefty)/(this.chartHeight);
            boxNew[boxNew.length] = [xScaled, yScaled];
        }
        return boxNew
    }
    
    
    divideBoxes(flippedAxis, sliderVal, boundingBox) {
    
        // Divides a region into two boxes
        //boundingBox should be of the form [tl, tr, bl, br]
        // and tr should be list [x,y]
    
        var allBoxes = [];
        var allBoxesScaled = [];
        
        var tlb = boundingBox[0];
        var trb = boundingBox[1];
        var blb = boundingBox[2];
        var brb = boundingBox[3];
        var recWidth = boundingBox[1][0] - boundingBox[0][0];
        var recHeight = boundingBox[2][1] - boundingBox[0][1];
    
    
        var tl, tr, bl, br;
    
        // Is the line along the y-axis
        if (flippedAxis == 1) {
            tl = tlb;
            tr = trb;
            bl = [tlb[0], tlb[1] + (100-sliderVal)/100*recHeight];
            br = [trb[0], trb[1] + (100-sliderVal)/100*recHeight];
    
            allBoxes.push([tl, tr, bl, br]);
            allBoxesScaled.push(this.rescaleData([tl, tr, bl, br]));
    
            tl = bl;
            tr = br;
            bl = blb;
            br = brb;
            
            allBoxes.push([tl, tr, bl, br]);
            allBoxesScaled.push(this.rescaleData([tl, tr, bl, br]));
        } else {

            tl = [tlb[0] + sliderVal/100*recWidth, tlb[1]];
            tr = trb;
            bl = [blb[0] + sliderVal/100*recWidth, blb[1]];
            br = brb;
    
            allBoxes.push([tl, tr, bl, br]);
            allBoxesScaled.push(this.rescaleData([tl, tr, bl, br]));
            
    
            tr = tl;
            tl = tlb
            br = bl;
            bl = blb
            
            allBoxes.push([tl, tr, bl, br]);
            
            allBoxesScaled.push(this.rescaleData([tl, tr, bl, br]));
        }
        return [allBoxes, allBoxesScaled]
    }
    
    
    getClassRectList(treeDepth) {
    
        // Function to get the colored regions for the 2d-plot
    
        // We have to check later which depth the tree is on.
        // But maybe there can be a button to turn off this color scheme if one prefers it that way?
        //treeDepth = 0; // But this is because we only have one line at the moment
    
        if (treeDepth == 0) {
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
    
            var splitDir = checkVal ? 1 : 0;
        } else if (treeDepth == 1){
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            var sliderVal1 = document.getElementById('slider' + 1).value;
            var checkVal1 = document.getElementById('check' + 1).checked;
            var sliderVal2 = document.getElementById('slider' + 2).value;
            var checkVal2 = document.getElementById('check' + 2).checked;
            
            var splitDir = checkVal ? 1 : 0;
            var splitDir1 = checkVal1 ? 1 : 0;
            var splitDir2 = checkVal2 ? 1 : 0;
        } else if (treeDepth == 2){
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            var sliderVal1 = document.getElementById('slider' + 1).value;
            var checkVal1 = document.getElementById('check' + 1).checked;
            var sliderVal2 = document.getElementById('slider' + 2).value;
            var checkVal2 = document.getElementById('check' + 2).checked;
    
            var sliderVal3 = document.getElementById('slider' + 3).value;
            var checkVal3 = document.getElementById('check' + 3).checked;
            var sliderVal4 = document.getElementById('slider' + 4).value;
            var checkVal4 = document.getElementById('check' + 4).checked;
            var sliderVal5 = document.getElementById('slider' + 5).value;
            var checkVal5 = document.getElementById('check' + 5).checked;
            var sliderVal6 = document.getElementById('slider' + 6).value;
            var checkVal6 = document.getElementById('check' + 6).checked;
            
            var splitDir = checkVal ? 1 : 0;
            var splitDir1 = checkVal1 ? 1 : 0;
            var splitDir2 = checkVal2 ? 1 : 0;
            var splitDir3 = checkVal3 ? 1 : 0;
            var splitDir4 = checkVal4 ? 1 : 0;
            var splitDir5 = checkVal5 ? 1 : 0;
            var splitDir6 = checkVal6 ? 1 : 0;
        } 
    
        var allBoxesList, allBoxes, allBoxesScaled;
        var initialBB = [[this.chartTopLeftx, this.chartTopLefty],
                        [this.chartTopLeftx + this.chartWidth, this.chartTopLefty],
                        [this.chartTopLeftx, this.chartTopLefty + this.chartHeight],
                        [this.chartTopLeftx + this.chartWidth, this.chartTopLefty + this.chartHeight]];
    
        var allBoxes1, allBoxes2, allBoxes3, allBoxes4, allBoxes5, allBoxes6;
        var allBoxesScaled1, allBoxesScaled2, allBoxesScaled3, allBoxesScaled4, allBoxesScaled5, allBoxesScaled6;

        // Depending on the depth of the tree we retrieve the boxes in different ways
        if (treeDepth == 0) {
            allBoxesList = this.divideBoxes(splitDir, sliderVal, initialBB);
            allBoxes = allBoxesList[0];
            allBoxesScaled = allBoxesList[1];
            
        } else if (treeDepth == 1) {
            
            allBoxesList = this.divideBoxes(splitDir, sliderVal, initialBB);
            allBoxes = allBoxesList[0];
            
            allBoxesList = this.divideBoxes(splitDir1, sliderVal1, allBoxes[0]);
            allBoxes1 = allBoxesList[0];
            allBoxesScaled1 = allBoxesList[1];
            
            allBoxesList = this.divideBoxes(splitDir2, sliderVal2, allBoxes[1]);
            allBoxes2 = allBoxesList[0];
            allBoxesScaled2 = allBoxesList[1];
    
            allBoxes = allBoxes1.concat(allBoxes2)
            allBoxesScaled = allBoxesScaled1.concat(allBoxesScaled2)
        } else if (treeDepth == 2) {
            allBoxesList = this.divideBoxes(splitDir, sliderVal, initialBB);
            allBoxes = allBoxesList[0];
            
            allBoxesList = this.divideBoxes(splitDir1, sliderVal1, allBoxes[0]);
            allBoxes1 = allBoxesList[0];
            
            allBoxesList = this.divideBoxes(splitDir2, sliderVal2, allBoxes[1]);
            allBoxes2 = allBoxesList[0];
    
            // The final boxes here
    
            allBoxesList = this.divideBoxes(splitDir3, sliderVal3, allBoxes1[0]);
            allBoxes3 = allBoxesList[0];
            allBoxesScaled3 = allBoxesList[1];
    
            allBoxesList = this.divideBoxes(splitDir4, sliderVal4, allBoxes1[1]);
            allBoxes4 = allBoxesList[0];
            allBoxesScaled4 = allBoxesList[1];
    
            allBoxesList = this.divideBoxes(splitDir5, sliderVal5, allBoxes2[0]);
            allBoxes5 = allBoxesList[0];
            allBoxesScaled5 = allBoxesList[1];
    
            allBoxesList = this.divideBoxes(splitDir6, sliderVal6, allBoxes2[1]);
            allBoxes6 = allBoxesList[0];
            allBoxesScaled6 = allBoxesList[1];
    
            allBoxes = allBoxes3.concat(allBoxes4).concat(allBoxes5).concat(allBoxes6)
            allBoxesScaled = allBoxesScaled3.concat(allBoxesScaled4).concat(allBoxesScaled5).concat(allBoxesScaled6)
        }
        
    
        
        var currBox;
        var x,y;
        var numRegPts, colID;
        var maxRegPts;
    
        // This list should be the same as the one above
        for (var i=0; i<allBoxesScaled.length; i++) {
            currBox = allBoxesScaled[i];
            maxRegPts = 0;
    
            // And I need access to allPtsList here
            for (var j=0; j<this.allPtsList.length; j++) {
                numRegPts = 0;
                for (var k=0; k<this.allPtsList[j].length; k++) {
                    x = this.allPtsList[j][k]['x'];
                    y = this.allPtsList[j][k]['y'];
                    //console.log(x>currBox[0][0], x < currBox[1][0])
                    if (x > currBox[0][0] && x < currBox[1][0] && y < currBox[0][1] && y > currBox[2][1]) {
                        
                        numRegPts = numRegPts + 1;
                    }
                }
    
                //console.log(numRegPts, maxRegPts)
                if (numRegPts >= maxRegPts) {
                    
                    maxRegPts = numRegPts;
                    colID = j;
                }
    
    
            }
    
            allBoxes[i].push(this.colList[colID][1])
            allBoxes[i].push(this.colList[colID][2])
            allBoxes[i].push(this.colList[colID][0])

            allBoxesScaled[i].push(this.colList[colID][1])
            allBoxesScaled[i].push(this.colList[colID][2])
            allBoxesScaled[i].push(this.colList[colID][0])
        }

        // To send the information to the other tree
        this.allBoxesScaledStore = allBoxesScaled;
        this.getAccuracy();
        //this.allBoxesStore = allBoxes;
    
        return allBoxes
    }

    changeTree(inc) {

        
        // Increases or decreases the size of the tree
        // inc: 0,1 boolean. 1 means increase, 0 decrease

        if (inc == 0) {
            this.currTreeSize = Math.max(this.currTreeSize - 1,0);
        } else if (inc == 1) {
            this.currTreeSize = Math.min(this.currTreeSize + 1,2);
        }

        // Update the level of the other class
        my2DPlotAssociate.treeLevel = this.currTreeSize;
        
        if (this.currTreeSize == 0) {
            // Display first level tree
            var spanElem = document.getElementById('spanWrap12');
            spanElem.style.display = 'none';
            var spanElem = document.getElementById('spanWrap0');
            spanElem.style.display = 'block';
            
            // Remove deeper branches
            this.myChart.data.datasets[1].data = [];
            this.myChart.data.datasets[2].data = [];
            this.moveLine(0);
            
        } else if (this.currTreeSize == 1) {
            // Display second level tree
            var spanElem = document.getElementById('spanWrap12');
            spanElem.style.display = 'block';
            var spanElem = document.getElementById('spanWrap0');
            spanElem.style.display = 'none';
            var spanElem = document.getElementById('spanWrap3456');
            spanElem.style.display = 'none';

            // Remove deeper branches
            this.myChart.data.datasets[3].data = [];
            this.myChart.data.datasets[4].data = [];
            this.myChart.data.datasets[5].data = [];
            this.myChart.data.datasets[6].data = [];

            // Need to call the function so that the new lines are drawn
            this.moveLine(1);
            this.moveLine(2);
        }
        else if (this.currTreeSize == 2) {
            // Display third level tree
            var spanElem = document.getElementById('spanWrap12');
            spanElem.style.display = 'none';
            var spanElem = document.getElementById('spanWrap0');
            spanElem.style.display = 'none';
            var spanElem = document.getElementById('spanWrap3456');
            spanElem.style.display = 'block';
            this.moveLine(3);
            this.moveLine(4);
            this.moveLine(5);
            this.moveLine(6);
        }

        this.myChart.update('none')

        my2DPlotAssociate.createTree();
        my2DPlotAssociate.drawTree();
        

    }




    getLineLimits(currLineID) {

        if (currLineID == 0) {
            var maxLimx = 1;
            var minLimx = 0;
            var maxLimy = 1;
            var minLimy = 0;
        // This line should be in the left box or the top box
        } else if (currLineID == 1) {
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            // This means that the previous line is moving along the y-axis
            if (checkVal) {
                var maxLimx = 1;
                var minLimx = 0;
                var maxLimy = 1;
                var minLimy = sliderVal/100*1;
            } else {

                var maxLimx = 1;
                var minLimx = sliderVal/100*1;
                var maxLimy = 1;
                var minLimy = 0;
            }
            // This line should be to the right and at the bottom
        } else if (currLineID == 2) {
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            // This means that the previous line is moving along the y-axis
            if (checkVal) {
                var maxLimx = 1;
                var minLimx = 0;
                var maxLimy = sliderVal/100*1;
                var minLimy = 0;
            } else {
                var maxLimx = sliderVal/100*1;
                var minLimx = 0;
                var maxLimy = 1;
                var minLimy = 0;

                
            }
        } else if (currLineID == 3) {
            
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            var sliderVal1 = document.getElementById('slider' + 1).value;
            var checkVal1 = document.getElementById('check' + 1).checked;
            // This means that both previous lines are moving along the y-axis
            //console.log(checkVal, checkVal1)
            if (checkVal && checkVal1) {
                var maxLimx = 1;
                var minLimx = 0;
                var maxLimy = 1;
                var minLimy = sliderVal/100*1 + sliderVal1/100*(1 - sliderVal/100*1);
            // This means that the first line is moving along the y-axis and the second one is not
            } else if (checkVal && !checkVal1) {
                
                var maxLimx = 1;
                var minLimx = sliderVal1/100*1;
                var maxLimy = 1;
                var minLimy = sliderVal/100*1;
            // This means that the first line is NOT moving along the y-axis and the second one is
            } else if (!checkVal && checkVal1) {
                var maxLimx = 1;
                var minLimx = sliderVal/100*1;
                var maxLimy = 1;
                var minLimy = sliderVal1/100*1;
            } else {
                //sliderVal/100*1 + sliderVal1/100*(1 - sliderVal/100*1)
                var maxLimx = 1;
                var minLimx = sliderVal/100*1 + sliderVal1/100*(1 - sliderVal/100*1);
                var maxLimy = 1;
                var minLimy = 0;
            }
        } else if (currLineID == 4) {
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            var sliderVal1 = document.getElementById('slider' + 1).value;
            var checkVal1 = document.getElementById('check' + 1).checked;
            // This means that both previous lines are moving along the y-axis
            if (checkVal && checkVal1) {
                var maxLimx = 1;
                var minLimx = 0;
                var maxLimy = sliderVal/100*1 + sliderVal1/100*(1 - sliderVal/100*1);
                var minLimy = sliderVal/100*1;
            // This means that the first line is moving along the y-axis and the second one is not
            } else if (checkVal && !checkVal1) {
                var maxLimx = sliderVal1/100*1;
                var minLimx = 0;
                var maxLimy = 1;
                var minLimy = sliderVal/100*1;
            // This means that the first line is NOT moving along the y-axis and the second one is
            } else if (!checkVal && checkVal1) {
                var maxLimx = 1;
                var minLimx = sliderVal/100*1;
                var maxLimy = sliderVal1/100*1;
                var minLimy = 0;
            } else {
                var maxLimx = sliderVal/100*1 + sliderVal1/100*(1 - sliderVal/100*1);
                var minLimx = sliderVal/100;
                var maxLimy = 1;
                var minLimy = 0;
            } 
        } else if (currLineID == 5) {
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            var sliderVal2 = document.getElementById('slider' + 2).value;
            var checkVal2 = document.getElementById('check' + 2).checked;
            // This means that both previous lines are moving along the y-axis
            
            if (checkVal && checkVal2) {
                var maxLimx = 1;
                var minLimx = 0;
                var maxLimy = sliderVal/100*1;
                var minLimy = sliderVal2/100*sliderVal/100*1;
                console.log(maxLimy, minLimy)
            // This means that the first line is moving along the y-axis and the second one is not
            } else if (checkVal && !checkVal2) {
                var maxLimx = 1;
                var minLimx = sliderVal2/100*1;
                var maxLimy = sliderVal/100*1;
                var minLimy = 0;
            // This means that the first line is NOT moving along the y-axis and the second one is
            } else if (!checkVal && checkVal2) {
                var maxLimx = sliderVal/100*1;
                var minLimx = 0;
                var maxLimy = 1;
                var minLimy = sliderVal2/100*1;
            } else {
                var maxLimx = sliderVal/100;
                var minLimx = sliderVal2/100*sliderVal/100*1;
                var maxLimy = 1;
                var minLimy = 0;
            } 
        } else if (currLineID == 6) {
            var sliderVal = document.getElementById('slider' + 0).value;
            var checkVal = document.getElementById('check' + 0).checked;
            var sliderVal2 = document.getElementById('slider' + 2).value;
            var checkVal2 = document.getElementById('check' + 2).checked;
            // This means that both previous lines are moving along the y-axis
            if (checkVal && checkVal2) {
                var maxLimx = 1;
                var minLimx = 0;
                var maxLimy = sliderVal2/100*sliderVal/100*1;
                var minLimy = 0;
            // This means that the first line is moving along the y-axis and the second one is not
            } else if (checkVal && !checkVal2) {
                var maxLimx = sliderVal2/100*1;
                var minLimx = 0;
                var maxLimy = sliderVal/100*1;
                var minLimy = 0;
            // This means that the first line is NOT moving along the y-axis and the second one is
            } else if (!checkVal && checkVal2) {
                var maxLimx = sliderVal/100*1;
                var minLimx = 0;
                var maxLimy = sliderVal2/100*1;
                var minLimy = 0;
            } else {
                var maxLimx = sliderVal2/100*sliderVal/100*1;
                var minLimx = 0;
                var maxLimy = 1;
                var minLimy = 0;
            } 
        }
    
        return [maxLimx, minLimx, maxLimy, minLimy]
    
    }
    
    
    
    moveLine(lineID) {
    
        // Function to move the line when we pull the sliders
    
        // With lineID we can control which line it is that we should move 
        // and get the values from
        // So we should get the sliderValue of the previous line and also the checkmark
        // This will give us where the line can move and how we should draw it...
    
    
        // If we change these values based on the previous line, will it work then?
        // But I would need one for x and one for y?
        var allLims = this.getLineLimits(lineID)
        var maxLimx = allLims[0];
        var minLimx = allLims[1];
        var maxLimy = allLims[2];
        var minLimy = allLims[3];
    
        var sliderVal = document.getElementById('slider' + lineID);
        var checkVal = document.getElementById('check' + lineID);
    
        var currLineData;
        var xval1, xval2, yval1, yval2;
    
        // If checked then move along y-axis
        if (checkVal.checked) {
            xval1 = minLimx;
            xval2 = maxLimx;
            yval1 = minLimy + sliderVal.value/100*(maxLimy-minLimy);
            yval2 = yval1;
            currLineData = [{'x': xval1, 'y':yval1},
                            {'x': xval2, 'y': yval2}]
        } else {
            yval1 = minLimy;
            yval2 = maxLimy;
            xval1 = minLimx + sliderVal.value/100*(maxLimx-minLimx);
            xval2 = xval1;
            currLineData = [{'x': xval1, 'y':yval1},
                            {'x': xval2, 'y': yval2}]
        }
    
        this.linePosList[lineID] = currLineData;
        this.myChart.data.datasets[lineID].data = currLineData;
    
        this.myChart.update('none')

        my2DPlotAssociate.showTreeInfo();

        
    
    }

    // I could have a function here to obtain the accuracy
    getAccuracy() {
        //console.log(this.allBoxesStore, this.allPtsList, this.colList);
        var currPts, currClass, currPtx, currPty;
        var x1,x2,y1,y2;
        var totAcc = 0.0
        for (var i=0; i<this.allPtsList.length; i++) {
            currPts = this.allPtsList[i];
            currClass = this.colList[i][2];

            for (var j=0; j<currPts.length; j++) {
                currPtx = currPts[j]['x'];
                currPty = currPts[j]['y'];
                for (var k=0; k<this.allBoxesScaledStore.length; k++) {

                    x1 = this.allBoxesScaledStore[k][0][0];
                    x2 = this.allBoxesScaledStore[k][1][0];
                    y1 = this.allBoxesScaledStore[k][2][1];
                    y2 = this.allBoxesScaledStore[k][0][1];

                    // So it is in this box
                    //console.log(currPtx, currPty, x1,x2,y1,y2)
                    //console.log(currPtx > x1,currPtx <= x2 , currPty > y1 , currPty <= y2)
                    if (currPtx > x1 && currPtx <= x2 && currPty > y1 && currPty <= y2) {
                        if (currClass == this.allBoxesScaledStore[k][5]) {
                            totAcc = totAcc + 1.0;
                        }
                    }


                }
            }
            //console.log(totAcc, this.totPts)
            var acc = totAcc / this.totPts;
            var infoElem = document.getElementById('dec2Acc');
            //console.log(acc, 100*acc.toFixed(2))
            infoElem.innerHTML = (100*acc).toFixed(2);
            //console.log(acc)

        }
    }

}



// Define and draw the tree here
// I think they can be separate classes and they can just interact with each other?

class decisionTreePlotAssociate {
    constructor() {

        var canvas = document.getElementById("decTreeFig2");
        var box = document.getElementById("canvas-container2");
        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;

        this.treeLevel = 0;
        this.allBoxes = []

        const labels = [];

        var allTreeParts, branchDict = this.createTree(0);
        //console.log(branchDict)
        //console.log(branchDict)
        this.branchDict = branchDict;
        // Maybe some issue here?
        var allDataTree = []
        for (var i=0; i<15; i++) {
            //console.log(branchDict[i])
            allDataTree.push({
                type: 'line',
                data: branchDict[i],
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.0,
                pointRadius: 0
            })
        }

        var allTreeParts, branchDict = this.createTree(3);
        //console.log(branchDict)
        //console.log(branchDict)
        this.branchDict = branchDict;
        
        
        const data = {
        labels: labels,
        datasets: allDataTree
        };

        const config = {
            data: data,
            options: {
                events: [],
                animation: {
                    duration: 0
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        display: false,
                        suggestedMin: -0.2,
                        suggestedMax: 1.2,
                    },
                    y: {
                        display: false,
                        suggestedMin: 0,
                        suggestedMax: 1,
                    },
                }
            }
        };


        this.myChart = new Chart(
            document.getElementById('decTreeFig2'),
            config
        );


        this.showTreeInfo()
    };


    createTree(treeLevel) {

        // So maybe we should create the branchDict here as well?
        // And in this branchDict we just store the branchparts and also the index 
        // that refers to which dataset they belong?

        //this.treeLevel = 0;
        var branchDict = {};
        

        var allTreeParts = [];
        var branchParts, branchBase;

        var treeTop = [{'x': 0.5, 'y': 1},
                        {'x': 0.5, 'y': 0.8}];

        branchDict[0] = treeTop;
        allTreeParts.push(treeTop);
        // And now we just need to generate a tree branch at [0.5, 0.8]
        branchBase = [[0.5, 0.8]];
        branchParts = this.createTreeBranch(branchBase[0], 0.3, 0.27);
        branchBase = branchParts[1];
        allTreeParts.push(branchParts[0]);
        
        branchDict[1] = branchParts[0][0];
        branchDict[2] = branchParts[0][1];

        //var lenListVert = [0.25, 0.1];
        //var lenListHor = [0.17, 0.09];

        var lenListVert = [0.29, 0.12];
        var lenListHor = [0.17, 0.09];
        var dictInd = 3;
        var newBranchBase = branchBase;
        for (var i=1; i<treeLevel; i++) {
            branchBase = newBranchBase;
            newBranchBase = [];

            for (var j=0; j<branchBase.length; j++) {
                
                branchParts = this.createTreeBranch(branchBase[j], lenListHor[i-1], lenListVert[i-1]);
                //branchBase = branchParts[1]; // But we change it here right?
                allTreeParts.push(branchParts[0]);


                branchDict[dictInd] = branchParts[0][0];
                dictInd = dictInd + 1;
                branchDict[dictInd] = branchParts[0][1];
                dictInd = dictInd + 1;

                newBranchBase.push(branchParts[1][0])
                newBranchBase.push(branchParts[1][1])
            }
        }

        return allTreeParts, branchDict

    }

    createTreeBranch(basePt, bLen1, bLen2) {

        var allBranches = [];

        var branch1 = [{'x': basePt[0], 'y': basePt[1]},
                        {'x': basePt[0] - bLen1, 'y': basePt[1]},
                        {'x': basePt[0] - bLen1, 'y': basePt[1] - bLen2}];
        
        var branch2 = [{'x': basePt[0], 'y': basePt[1]},
                        {'x': basePt[0] + bLen1, 'y': basePt[1]},
                        {'x': basePt[0] + bLen1, 'y': basePt[1] - bLen2}];

        allBranches.push(branch1)
        allBranches.push(branch2)

        return [allBranches, [[basePt[0] - bLen1, basePt[1] - bLen2], [basePt[0] + bLen1, basePt[1] - bLen2]]];
        
    }

    // A function here to just update the data in the tree
    drawTree() {

        // We know the current tree level
        // So then we know how far into the loop we should update the data
        // And the rest of the data we just put equal to []
        // I think that should work

        //this.treeLevel
        // So we have 14 ids
        // for tree level 0 we should remove everything above 2, so 3,4,5
        if (this.treeLevel == 0) {

            // Remove second and third level
            for (var i=3;i<15;i++){
                this.myChart.data.datasets[i].data = [];    
            }
        } else if (this.treeLevel == 1) {

            // Draw second level
            for (var i=3;i<7;i++){
                this.myChart.data.datasets[i].data = this.branchDict[i];    
            }

            // Remove third level
            for (var i=7;i<15;i++){
                this.myChart.data.datasets[i].data = [];    
            }

        } else {
            for (var i=3;i<15;i++){
                this.myChart.data.datasets[i].data = this.branchDict[i];    
            }
        }

        
        this.myChart.update('none')

    }

    showTreeInfo() {
        // So this function controls all the text
        // So we check all sliders and checks
        // And based on tree level we just put somethings to display none and others to display block
        // And for the classes we also need to check where the points are
        var fullIds = [1,2,3,4,5,6];

        // So this says which ids we should display
        // At level 0 (base tree) we should display upto id 1
        // AT level 1 we should display upto level 3 (always including the endpoint)
        var allSplitIds = {0: 1, 1: 3, 2: 7};
        var allTextRemoveIds = {0: [[2,3], []], 1:[[3],[2]], 2:[[],[2,3]]};

        //console.log(allSplitIds[this.treeLevel], this.treeLevel)

        var checkedElem, infoDict, infoElem;
        infoDict = my2DPlot.linePosList;
        // Have to check if the index is actually 0,1,2 later
        for (var i=0;i<allSplitIds[this.treeLevel]; i++) {
            checkedElem = document.getElementById('check' + i).checked;

            if (checkedElem) {
                infoElem = document.getElementById("branch" + (i+1) + "Feat");
                infoElem.innerHTML = 'y'
                infoElem = document.getElementById("branch" + (i+1) + "Val");
                infoElem.innerHTML = infoDict[i][0]['y'].toFixed(2);
            } else {
                infoElem = document.getElementById("branch" + (i+1) + "Feat");
                //console.log(i)
                infoElem.innerHTML = 'x'
                infoElem = document.getElementById("branch" + (i+1) + "Val");
                infoElem.innerHTML = infoDict[i][0]['x'].toFixed(2);
            }
        }

        // Remove the other elements here
        var currRemId;
        for (var i=0; i<allTextRemoveIds[this.treeLevel][0].length; i++) {
            currRemId = allTextRemoveIds[this.treeLevel][0][i];
            infoElem = document.getElementsByClassName('dec' + currRemId + 'SplitText');
            for (var j=0; j<infoElem.length; j++) {
                infoElem[j].style.display = 'none'
            }
        }

        var currRetId;
        for (var i=0; i<allTextRemoveIds[this.treeLevel][1].length; i++) {
            currRetId = allTextRemoveIds[this.treeLevel][1][i];
            infoElem = document.getElementsByClassName('dec' + currRetId + 'SplitText');
            for (var j=0; j<infoElem.length; j++) {
                infoElem[j].style.display = 'block'
            }
        }

        // Below we can remove the classes that should not be present
        // And then we just need to obtain the right classification for them as well
        // But we should be able to get that from the color scheme in the decisiontree I believe

        // Remove second and third level classes

        var remIdsFirstLevel = ['Dec21', 'Dec20'];
        var remIdsSecondLevel = ['Dec211', 'Dec210', 'Dec201', 'Dec200'];
        var remIdsThirdLevel = ['Dec2111', 'Dec2110', 'Dec2101', 'Dec2100', 'Dec2011', 'Dec2010', 'Dec2001', 'Dec2000'];

        var remIds, infoElem, dispIds;
        if (this.treeLevel == 0) {
            remIds = remIdsSecondLevel.concat(remIdsThirdLevel);
            for (var i=0;i<remIds.length;i++) {
                infoElem = document.getElementById(remIds[i]);
                infoElem.style.display = 'none';
            }
            
            dispIds = remIdsFirstLevel;
            for (var i=0;i<dispIds.length;i++) {
                infoElem = document.getElementById(dispIds[i]);
                infoElem.style.display = 'block';
            }

        } else if (this.treeLevel == 1) {
            remIds = remIdsFirstLevel.concat(remIdsThirdLevel);
            for (var i=0;i<remIds.length;i++) {
                infoElem = document.getElementById(remIds[i]);
                infoElem.style.display = 'none';
            }
            
            dispIds = remIdsSecondLevel;
            for (var i=0;i<dispIds.length;i++) {
                infoElem = document.getElementById(dispIds[i]);
                infoElem.style.display = 'block';
            }
        } else {
            remIds = remIdsFirstLevel.concat(remIdsSecondLevel);
            for (var i=0;i<remIds.length;i++) {
                infoElem = document.getElementById(remIds[i]);
                infoElem.style.display = 'none';
            }
            dispIds = remIdsThirdLevel;
            for (var i=0;i<dispIds.length;i++) {
                infoElem = document.getElementById(dispIds[i]);
                infoElem.style.display = 'block';
            }
        }


        // So here we just obtain all the classes as well?
        // And color it accordingly?
        var classInfo = my2DPlot.allBoxesScaledStore;
        var idToClassList;
        if (this.treeLevel == 0) {

            checkedElem = document.getElementById('check0').checked;
            idToClassList = ['Dec21', 'Dec20'];
            // if (checkedElem) {
            //     idToClassList = idToClassList.reverse();
            // }

            //console.log(classInfo)
            for (var i=0; i<idToClassList.length; i++) {
                infoElem = document.getElementById(idToClassList[i]);
                infoElem.innerHTML = classInfo[i][5];
                infoElem.style.color = classInfo[i][6];
            }
            
        
        } else if (this.treeLevel == 1) {
            var checkedElem0, checkedElem1, checkedElem2;
            checkedElem0 = document.getElementById('check0').checked;
            checkedElem1 = document.getElementById('check2').checked;
            checkedElem2 = document.getElementById('check1').checked;

            
            var checkedElemList = [checkedElem1, checkedElem2];

            var fullidToClassList = [['Dec211', 'Dec210'],['Dec201', 'Dec200']];    

            var cId = 0;
            for (var j=0;j<fullidToClassList.length; j++) {
                idToClassList = fullidToClassList[j];
                //console.log(checkedElemList[j])
                // if (checkedElemList[j]) {
                //     idToClassList = idToClassList.reverse();
                // }

                //console.log(classInfo, checkedElemList, idToClassList)
                for (var i=0; i<idToClassList.length; i++) {
                    infoElem = document.getElementById(idToClassList[i]);
                    infoElem.innerHTML = classInfo[cId][5];
                    infoElem.style.color = classInfo[cId][6];
                    cId = cId + 1;
                }
            }

            
        } else if (this.treeLevel == 2) {
            var checkedElem0, checkedElem1, checkedElem2;
            checkedElem0 = document.getElementById('check0').checked;
            checkedElem1 = document.getElementById('check2').checked;
            checkedElem2 = document.getElementById('check1').checked;

            
            var checkedElemList = [checkedElem1, checkedElem2];

            var fullidToClassList = [['Dec2111', 'Dec2110'],['Dec2101', 'Dec2100'], ['Dec2011', 'Dec2010'], ['Dec2001', 'Dec2000']];    

            var cId = 0;
            for (var j=0;j<fullidToClassList.length; j++) {
                idToClassList = fullidToClassList[j];
                //console.log(checkedElemList[j])
                // if (checkedElemList[j]) {
                //     idToClassList = idToClassList.reverse();
                // }

                //console.log(classInfo, checkedElemList, idToClassList)
                for (var i=0; i<idToClassList.length; i++) {
                    infoElem = document.getElementById(idToClassList[i]);
                    infoElem.innerHTML = classInfo[cId][5];
                    infoElem.style.color = classInfo[cId][6];
                    cId = cId + 1;
                }
            }

            
        }

        




    }

}


var scatterList = [[0.2, 0.7, 25], [0.2, 0.2, 22], [0.8, 0.4, 27]]
var my2DPlot = new decisionTreePlot(scatterList)
var my2DPlotAssociate = new decisionTreePlotAssociate();

