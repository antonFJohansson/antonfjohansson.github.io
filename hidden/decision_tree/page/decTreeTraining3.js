

// I will just copy the old class and write some new code
// I do not think that it should be that extreme to do it

// So just create a new class here instead


class decisionTreeTraining {
    constructor(scatterPts, canvasid) {

        this.currLineID = 0;


        this.allData = [[0.29125170933491124, 0.97, 0.0],
        [0.13229906509280512, 0.97, 0.0],
        [0.06383473563146619, 0.9409246156211477, 0.0],
        [0.6797239702784794, 0.8070421961545514, 0.0],
        [0.03234, 0.9712414, 0.0],
        [0.518273173205179, 0.97111, 0.0],
        [0.0312414, 0.664079283308627, 0.0],
        [0.20091140956090936, 0.44137467246818685, 0.0],
        [0.3162353527088095, 0.9742141, 0.0],
        [0.031123, 0.964530244189971, 0.0],
        [0.37810016854920836, 0.9724324, 0.0],
        [0.0323424, 0.971112314, 0.0],
        [0.313826409455788, 0.8175511989829224, 0.0],
        [0.22470439546038784, 0.6938692902724228, 0.0],
        [0.3668988276695784, 0.3529218383121968, 0.0],
        [0.4871997038865774, 0.9766666, 0.0],
        [0.14503536511408127, 0.5147814298124294, 0.0],
        [0.9744444, 0.9722222, 0.0],
        [0.0343422, 0.97141241244, 0.0],
        [0.35713439568043337, 0.9734534636, 0.0],
        [0.25073231614217706, 0.973363, 0.0],
        [0.6770263383724996, 0.974235235, 0.0],
        [0.670098226817304, 0.9253005130054163, 0.0],
        [0.16859431383946205, 0.9734534134, 0.0],
        [0.46959975822061045, 0.8179783708296693, 0.0],
        [0.03, 0.7650675920893191, 0.0],
        [0.38444168031100895, 0.9723523525, 0.0],
        [0.13494520560442308, 0.6347239294050535, 0.0],
        [0.6747138820762381, 0.9724323423525, 0.0],
        [0.09117411630952241, 0.9099669496692744, 0.0],
        [0.16185132256601384, 0.3294026091453762, 1.0],
        [0.0311111, 0.03424234234, 1.0],
        [0.49957038813886784, 0.11397370702911969, 1.0],
        [0.22535217422149006, 0.32286592774552614, 1.0],
        [0.5239521656218541, 0.2893438083664659, 1.0],
        [0.035222352, 0.03234243252, 1.0],
        [0.2748438987664079, 0.17835654248229266, 1.0],
        [0.2136655755762544, 0.03112421414, 1.0],
        [0.31738178533974487, 0.29407516118270915, 1.0],
        [0.3280251825400341, 0.5083353362714256, 1.0],
        [0.5865781857948509, 0.022532525, 1.0],
        [0.416764499374808, 0.10908185703353808, 1.0],
        [0.4775617793662958, 0.41789267754627935, 1.0],
        [0.059669887099448427, 0.2385212621186178, 1.0],
        [0.24227795522993917, 0.03234234234234, 1.0],
        [0.20717440797078568, 0.2650437478641326, 1.0],
        [0.14893433943841564, 0.07644666972402632, 1.0],
        [0.1545854872613543, 0.12238572606751323, 1.0],
        [0.5417004385603387, 0.09944426329548194, 1.0],
        [0.3559582502540228, 0.6254486662555946, 1.0],
        [0.2241876723763655, 0.03567576, 1.0],
        [0.08114127767325957, 0.034564564, 1.0],
        [0.12825963188625014, 0.15648894326269697, 1.0],
        [0.1000606096056692, 0.0346546456, 1.0],
        [0.2108239336907412, 0.33323153968938224, 1.0],
        [0.9335327254625416, 0.2527370069947317, 2.0],
        [0.7455056485114271, 0.33226012228318436, 2.0],
        [0.7955340155964578, 0.20406730986944963, 2.0],
        [0.676249851911077, 0.5085253888845885, 2.0],
        [0.7833872348113994, 0.23853789382985946, 2.0],
        [0.8115166594530293, 0.27161653666558205, 2.0],
        [0.8855747768766501, 0.17242057061878766, 2.0],
        [0.8628678384093427, 0.3823247824101325, 2.0],
        [0.7936391971296292, 0.4390465250840801, 2.0],
        [0.7200790299218203, 0.1588765340277295, 2.0],
        [0.7172543638762069, 0.4511817534522677, 2.0],
        [0.6643697670745516, 0.21817052769521994, 2.0],
        [0.8014532977128753, 0.46635307255978287, 2.0],
        [0.8726354600957789, 0.32945025120633786, 2.0],
        [0.7133498116491083, 0.4280146480764373, 2.0],
        [0.6707835857141798, 0.20237456448540053, 2.0],
        [0.7941384707291016, 0.25220625726113804, 2.0],
        [0.7592227317388619, 0.16092457283373326, 2.0],
        [0.9275161238602867, 0.43926482521306787, 2.0],
        [0.8090996974956574, 0.2852225105256638, 2.0],
        [0.7280706016197362, 0.31018195123424563, 2.0],
        [0.5545136514701519, 0.036738366772033404, 2.0]];


        this.totPoints = this.allData.length;

        this.pressedBtn = false;


        this.baseColorList = {0: [],
                              1: [[[0, 0.63, 1, 0.37], 'rgba(253, 166, 75, 0.2)']],
                              2: [[[0, 0.63, 1, 0.37], 'rgba(253, 166, 75, 0.2)'],
                                    [[0.548, 0, 0.452, 0.63], 'rgba(21, 96, 122, 0.2)']],
                              3: [[[0, 0.63, 1, 0.37], 'rgba(253, 166, 75, 0.2)'],
                              [[0, 0, 0.548, 0.338], 'rgba(209, 211, 135, 0.2)'],
                              [[0, 0.338, 0.548, 0.63 - 0.338], 'rgba(253, 166, 75, 0.2)']],
                              4: [[[0, 0.63, 1, 0.37], 'rgba(253, 166, 75, 0.2)'],
                              [[0, 0, 0.548, 0.338], 'rgba(209, 211, 135, 0.2)'],
                              [[0.548, 0.033, 0.452, 0.63 - 0.033], 'rgba(21, 96, 122, 0.2)'],
                              [[0.548, 0, 0.452, 0.033], 'rgba(209, 211, 135, 0.2)']],
                              5: [[[0, 0.63, 1, 0.37], 'rgba(253, 166, 75, 0.2)'],
                              [[0, 0, 0.548, 0.338], 'rgba(209, 211, 135, 0.2)'],
                              [[0.548, 0.033, 0.452, 0.63 - 0.033], 'rgba(21, 96, 122, 0.2)'],
                              [[0.548, 0, 0.452, 0.033], 'rgba(209, 211, 135, 0.2)'],
                              [[0, 0.338, 0.264, 0.63-0.338], 'rgba(253, 166, 75, 0.2)'] ]}

        this.currColorList = {0: [],
                              1: [],
                              2: [],
                              3: [],
                              4: [],
                              5: []}

        this.optimalColorBox;


        this.splitLines = [[[ 0, 0.63], [1, 0.63]],
                            [[0.548, 0], [0.548, 0.63]],
                            [[0, 0.338], [0.548, 0.338]],
                            [[0.548, 0.033], [1, 0.033]],
                            [[0.264, 0.338], [0.264, 0.63]],
                            [[0.264, 0.38], [0.548, 0.38]]];

        this.colorRegions = false;

        // x,y,w,h
        this.lineBoxes = {0: [0, 0, 1, 1],
                          1: [0, 0, 1, 0.63],
                          2: [0, 0, 0.548, 0.63],
                          3: [0.548, 0, 0.452, 0.63],
                          4: [0, 0.338, 0.548, 0.63 - 0.338],
                          5: [0.264, 0.338, 0.548 - 0.264, 0.63 - 0.338]}

        
        this.lineTimeMin = 10;
        this.lineTimeMax = 400;
        this.lineTime = 30;

        this.reducedBox = {};
        for (var i=0;i<6;i++) {
            this.reducedBox[i] = this.findFeasibleBox(this.lineBoxes[i])
        }
        //console.log(this.reducedBox)
        
        this.currentro = -1;
        this.bestentro = {0 : 100,
                          1: 100,
                          2: 100,
                          3: 100,
                          4: 100,
                          5: 100}

        // Here we can also store the correct boxes
        // And then we can maybe just give them to the plugin?



        // scatterPts is a list of the form [[x,y,numPts], [x,y,numPts],...]

        var canvas = document.getElementById("decTreeFig" + canvasid);
        var box = document.getElementById("canvas-container" + canvasid);

        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;

        this.colList = [['#FDA64B', 'rgba(253, 166, 75, 0.2)', 'C'],
                        ['#D1D387', 'rgba(209, 211, 135, 0.2)', 'R'],
                         ['#15607A', 'rgba(21, 96, 122, 0.2)', 'T'],
                          ['#9DDBEA', 'rgba(157, 219, 234, 0.2)', 'S'],
                           ['#FFD9BC', 'rgba(255, 217, 188, 0.2)', 'X']];
        
        this.shapeList = ['circle', 'rect', 'triangle', 'star', 'cross'];


        // Create the data here



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

            // So color the regions here
            
            this.colorRegions = true;
            if (this.colorRegions) {
                
                var currBox, currCol;
                var canvasx, canvasy, canvaswidth, canvasheight;

                
                //console.log(this.baseColorList[this.currLineID])
                
                for (var i=0; i<this.baseColorList[this.currLineID].length; i++) {

                    currBox = this.baseColorList[this.currLineID][i][0];
                    currCol = this.baseColorList[this.currLineID][i][1];
                    
                    canvasx = currBox[0]*(chartArea.right - chartArea.left) + chartArea.left;// + currBox[2]*(chartArea.right - chartArea.left);
                    canvasy = -currBox[1]*(chartArea.bottom - chartArea.top) + chartArea.bottom;// - currBox[3]*(chartArea.bottom - chartArea.top);
                    
                    canvaswidth = currBox[2]*(chartArea.right - chartArea.left);
                    canvasheight = -currBox[3]*(chartArea.bottom - chartArea.top);
                    
                    //console.log('asas',canvasx, canvasy, canvaswidth, canvasheight, currBox)

                    ctx.fillStyle = currCol;
                    ctx.fillRect(canvasx, canvasy, canvaswidth, canvasheight);        
                    
                }

                for (var i=0; i<this.currColorList[this.currLineID].length; i++) {
                    //console.log(this.currLineID,this.currColorList[this.currLineID])

                    currBox = this.currColorList[this.currLineID][i][0];
                    currCol = this.currColorList[this.currLineID][i][1];

                    //console.log('addasdad',currBox)
                    
                    canvasx = currBox[0]*(chartArea.right - chartArea.left) + chartArea.left;// + currBox[2]*(chartArea.right - chartArea.left);
                    canvasy = -currBox[1]*(chartArea.bottom - chartArea.top) + chartArea.bottom;// - currBox[3]*(chartArea.bottom - chartArea.top);
                    
                    canvaswidth = currBox[2]*(chartArea.right - chartArea.left);
                    canvasheight = -currBox[3]*(chartArea.bottom - chartArea.top);

                    
                    
                    //console.log('asas',canvasx, canvasy, canvaswidth, canvasheight, currBox)

                    ctx.fillStyle = currCol;
                    ctx.fillRect(canvasx, canvasy, canvaswidth, canvasheight);    
                    
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
            document.getElementById('decTreeFig' + canvasid),
            config
        );


        var chartArea = this.myChart.chartArea;
        this.chartTopLeftx = chartArea.left;
        this.chartTopLefty = chartArea.top;
        this.chartWidth = chartArea.right - chartArea.left;
        this.chartHeight = chartArea.bottom - chartArea.top;

    };

    
    createDatasets() {

   
        var allData = [];
        for (var i=0; i<this.splitLines.length; i++) {

            
            allData.push({
                type: 'line',
                data: [],
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.1,
                pointRadius: 0
            })
        }

        for (var i=0; i<(this.splitLines.length+1); i++) {

            
            allData.push({
                type: 'line',
                data: [],
                fill: false,
                borderColor: 'rgb(255, 50, 0)',
                tension: 0.1,
                pointRadius: 0
            })
        }
    
        var currx, curry, currl, kind;
        var storeData = [[],[],[]];

        
        for (var i=0;i<this.allData.length; i++) {
            currx = this.allData[i][0];
            curry = this.allData[i][1];
            currl = this.allData[i][2];
        
            if (currl == 0.0) {
               storeData[0].push({'x': currx, 'y': curry})
            } else if (currl == 1.0) {
                storeData[1].push({'x': currx, 'y': curry})
            }  else {
                storeData[2].push({'x': currx, 'y': curry})
            }  
        }


        
        for (var i=0; i<3; i++) {
            
            allData.push({
                type: 'scatter',
                pointStyle: this.shapeList[i],
                data: storeData[i],
                fill: false,
                borderColor: this.colList[i][0],
                tension: 0.1,
                pointRadius: 4
            })
        }
        
        return allData
    }


    findLineSteps(boundingBox) {

        var minx, maxx, maxy, miny;

        // So loop through all points
        // see which lie in the box
        // And then just find the minimum and maximum of those points

        var bbx1,bbx2,bby1,bby2;

        bbx1 = boundingBox[0];
        bbx2 = boundingBox[0] + boundingBox[2];
        bby1 = boundingBox[1];
        bby2 = boundingBox[1] + boundingBox[3];
        
        //console.log(boundingBox)

        var ptsInBoxx = [];
        var ptsInBoxy = [];
        var ptx,pty,ptl;

        for (var i=0; i<this.allData.length; i++) {

            ptx = this.allData[i][0];
            pty = this.allData[i][1];

            if (ptx > bbx1 && ptx < bbx2 && pty > bby1 && pty < bby2) {
    
                ptsInBoxx.push(ptx);
                ptsInBoxy.push(pty);
            }

        }

        var sortedx = ptsInBoxx.sort();
        var sortedy = ptsInBoxy.sort();
        
        var xSteps = [];
        var ySteps = [];

        

        for (var i=0;i<(sortedx.length-1); i++) {
            xSteps.push((sortedx[i+1] + sortedx[i])/2)
            ySteps.push((sortedy[i+1] + sortedy[i])/2)
        }
        //console.log(ySteps)

        //console.log('a',ySteps)
        //console.log('asdsad', boundingBox)
        return [xSteps, ySteps]

    }



    // So a function here to return the minimum and maximum x and y-valyes to consider in the bounding box?
    // And this box would then be used when we sweep the line?
    // But we could call this function in the beginning

    findFeasibleBox(boundingBox) {

        var minx, maxx, maxy, miny;

        // So loop through all points
        // see which lie in the box
        // And then just find the minimum and maximum of those points

        var bbx1,bbx2,bby1,bby2;

        bbx1 = boundingBox[0];
        bbx2 = boundingBox[0] + boundingBox[2];
        bby1 = boundingBox[1];
        bby2 = boundingBox[1] + boundingBox[3];
        

        var ptsInBoxx = [];
        var ptsInBoxy = [];
        var ptx,pty,ptl;

        for (var i=0; i<this.allData.length; i++) {

            ptx = this.allData[i][0];
            pty = this.allData[i][1];

            if (ptx > bbx1 && ptx < bbx2 && pty > bby1 && pty < bby2) {
    
                ptsInBoxx.push(ptx);
                ptsInBoxy.push(pty);
            }

        }

        var eps = 0.0005;
        //console.log(ptsInBoxx)
        minx = Math.min(...ptsInBoxx) + eps;
        maxx = Math.max(...ptsInBoxx) - eps;
        miny = Math.min(...ptsInBoxy) + eps;
        maxy = Math.max(...ptsInBoxy) - eps;
        //console.log(minx, maxy)
        return [minx, miny, maxx - minx, maxy - miny]

    }

    // So a function here that writes the entropy
    // And maybe also checks what the best entropy is?



    // So lets just scan along the axes and then write that in practice one does not need to do that
    // So I need a function that just draws a line
    // And I should give the box that it is supposed to scan

    // But then I will also need the rect function to obtain all the colored regions
    // during the scanning here as well
    
    moveLine(currBox, axisBool, linePos, lineID, remLine) {

        

        if (!remLine) {

            var x1,x2,y1,y2;
            var bx11,bx12,by11,by12;
            var bx21,bx22,by21,by22;

            // We are moving along the y-axis
            if (axisBool == 1) {

                // So here the box should be constrained by the minimum and maximum y-values

                x1 = currBox[0];
                x2 = currBox[0] + currBox[2];
                y1 = linePos
                y2 = y1;


                bx11 = x1;
                bx12 = x2 - x1;
                by11 = currBox[1];
                by12 = linePos - currBox[1];
                

                bx21 = x1;
                bx22 = x2 - x1;
                by21 = linePos;
                by22 = currBox[1] + currBox[3] - (linePos);
                //console.log('along y',by11, by12, by21, by22)

                //console.log(x1,x2,y1,y2)
            } else {

                // Here it should be constricted by min and max x values


                x1 = linePos
                x2 = x1;
                y1 = currBox[1]
                y2 = currBox[1] + currBox[3];

                //console.log('a', linePos, currBox)

                bx11 = currBox[0];
                bx12 = linePos - currBox[0];
                by11 = currBox[1];
                by12 = currBox[3];

                bx21 = linePos;
                bx22 = currBox[0] + currBox[2] - (linePos);
                by21 = by11;
                by22 = by12;

                //console.log('along x',by11, by12, by21, by22)

            }

            // classBox should be what?
            // It should be x,y,w,h I believe?
            // Which means that all by should be that as well

            var currLineData = [{'x': x1, 'y': y1}, {'x': x2, 'y': y2}];

            var classBoxes = [[bx11, by11, bx12, by12], [bx21, by21, bx22, by22]];
            //console.log('asdasd',this.currLineID, classBoxes, currBox, linePos)
            this.currentro = this.calcCriterias(classBoxes)

            // SO here we can also get the colors for the boxes.
            //console.log(this.currLineID, classBoxes)


            
            this.currColorList[this.currLineID] = this.obtainColoredReg(classBoxes);


            // SO HERE WE CAN SEND THIS INFO TO PLOT THE CURRENT LINE
            // AND ALSO THE CLASSES?
            //console.log(axisBool, this.currColorList[this.currLineID], x1,y1,x2,y2)
            myAssociateTrain.displayTrainingInfo(axisBool, this.currColorList[this.currLineID], [x1,y1])


            // So here we can also print the entropy?

            var infoElem = document.getElementById('currentTrainEntropy');
            infoElem.innerHTML = this.currentro.toFixed(2);
            
            
            //console.log(linePos)

            //console.log('a',x1,x2,y1,y2)
            this.currLinePos = [x1,x2,y1,y2];
            //console.log(entro)

        } else {

            var currLineData = [];
            //console.log('asdadasd', this.optimalColorBox)
            this.currColorList[this.currLineID] = this.optimalColorBox;
            // And here we can just set the colors to be that of the optimal one?


        }


        // So at this point I can also get the entropy maybe?
        // And just update some text outside?
        // Or I guess we can just store the entropy in a this variable
        // And then it should nto be so difficult to check if it is better than the optimal one?

        // So we get the two boxes here at least?
        

        this.myChart.data.datasets[lineID].data = currLineData;
        this.myChart.update('none');


    }

    drawOptimalLine(lineID, useSplitLines, useNothing, drawDashed) {

        if (!useNothing) {
            var x1,x2,y1,y2;

            //console.log(lineID)
            if (useSplitLines) {
                x1 = this.splitLines[lineID][0][0]
                x2 = this.splitLines[lineID][1][0]
                y1 = this.splitLines[lineID][0][1]
                y2 = this.splitLines[lineID][1][1]
            } else {
                x1 = this.currLinePos[0];
                x2 = this.currLinePos[1];
                y1 = this.currLinePos[2];
                y2 = this.currLinePos[3];
            }

            var currLineData = [{'x': x1, 'y': y1}, {'x': x2, 'y': y2}];
        } else {
            var currLineData = [];
        }

        //console.log(currLineData)

        this.myChart.data.datasets[this.splitLines.length + lineID + 1].data = currLineData;

        if (drawDashed) {
            this.myChart.data.datasets[this.splitLines.length + lineID + 1].borderDash = [10, 5]
        } else {
            this.myChart.data.datasets[this.splitLines.length + lineID + 1].borderDash = [10, 0]
        }
        

        // Can I control if it is dotted or solid here?

        this.myChart.update('none');

    }

    rerunAnimation() {

        if (this.pressedBtn) {
            
            myAssociateTrain.rerunAnimation();

            if (!this.animationOngoing) {
                this.currLineID = this.currLineID - 1;
                this.bestentro[this.currLineID] = 100;
                this.scanBox();
            } else {
                //this.currLineID = this.currLineID - 1;
                clearTimeout(this.timeoutEvent);
                this.bestentro[this.currLineID] = 100;
                this.scanBox();
            }
            
            
            
        }
    }

    restartAnimation() {

        var infoFinalElem;
        infoFinalElem = document.getElementById("trainingFinalText");
        infoFinalElem.innerHTML = "There are still impure regions"
        infoFinalElem = document.getElementById("currentTrainEntropy");
        infoFinalElem.innerHTML = "";
        infoFinalElem = document.getElementById("bestTrainEntropy");
        infoFinalElem.innerHTML = "";


        clearTimeout(this.timeoutEvent);

        var upperLoopLim = Math.min(this.currLineID, 5);

        for (var i=0;i<=upperLoopLim; i++) {
            this.myChart.data.datasets[this.splitLines.length + i + 1].data = [];
            // Reset all solid lines here
            this.myChart.data.datasets[i].data = [];
            this.bestentro[i] = 100;
            // Reset all colored regs
            this.currColorList[i] = []
        }

        this.currLineID = 0;
        this.myChart.update('none');
        this.animationOngoing = false;

        var infoElem = document.getElementById('trainingButton');
        infoElem.disabled = false;
        infoElem.style.display = 'inline';
        
        //infoElem = document.getElementById("iterationID");
        //infoElem.innerHTML = self.currLineID;

        myAssociateTrain.resetAnimation();
        

    }

    

    scanBox() {

        //var lineID = 4;

        // if (this.animationOngoing) {
        //     return
        // }

        // So we can just remove the onclick of it?

        

        var infoElem = document.getElementById('trainingButton');
        infoElem.disabled = true;

        // Maybe here we should just remove the buttons on next step and restart?
        this.animationOngoing = true;
        this.pressedBtn = true;

        // So we cannot go past the number of training steps that we have
        if (this.currLineID == 6) {
            return 0
        }

        this.colorRegions = false;

        var lineID;
        lineID = this.currLineID;
        this.drawOptimalLine(lineID, false, true, true)
        var currBox = this.lineBoxes[lineID]; // So x,y,w,h expressed in plot coordinates

        var xSteps, ySteps, steps;
        
        //console.log('c', currBox)
        steps = this.findLineSteps(currBox);
        xSteps = steps[0];
        ySteps = steps[1]

        var currSteps = xSteps;
        //console.log(currSteps)
        
        var axisBool = 0;
        var currProp;

        var numScanSteps = 5;

        var currStep = 0;

        var self = this;

        myAssociateTrain.addTreePart();

        function updateData(self) {

            //console.log('b',currStep, currSteps)
            if (currStep > (currSteps.length - 1)) {
                axisBool = axisBool + 1;
                currStep = 0;
                currSteps = ySteps;
            }
            

            //currProp = currStep/(numScanSteps);

            if (axisBool < 2) {
                self.timeoutEvent = setTimeout(function() {
                     updateData(self);
                }, self.lineTime)
                
                //console.log('a', currStep, currSteps.length, currSteps)
                self.moveLine(currBox, axisBool, currSteps[currStep], lineID, false)

                // So maybe just draw the optimal line here?
                // So we can store the entropy from above in some property variables
                // and then just run some function here

                

                //console.log(lineID, self.currentro, self.bestentro[lineID])
                if (self.currentro < self.bestentro[lineID]) {
                    //console.log(self.currLinePos)
                    self.drawOptimalLine(lineID, false, false, true) 
                    
                    self.bestentro[lineID] = self.currentro
                    //console.log(lineID, self.currColorList[self.currLineID])
                    self.optimalColorBox = self.currColorList[self.currLineID];


                    var ax1,ax2,ay1,ay2;
                    ax1 = self.currLinePos[0];
                    ax2 = self.currLinePos[1];
                    ay1 = self.currLinePos[2];
                    ay2 = self.currLinePos[3];

                    var infoElem = document.getElementById('bestTrainEntropy');
                    infoElem.innerHTML = self.bestentro[lineID].toFixed(2);

                }
                

            } else {
                // And remove the scan line
                //self.colorRegions = true;
                //self.colorList = [[[0, 0, 1, 0.63], 'rgba(209, 211, 135, 0.2)'], [[0, 0.63, 1, 0.37], 'rgba(253, 166, 75, 0.2)']];
                
                self.drawOptimalLine(lineID, true, false, false) 
                self.moveLine(currBox, axisBool, currSteps[currStep], lineID, true)
                
                self.currLineID = self.currLineID + 1;
                self.animationOngoing = false;
                //self.myChart.update('none');

                var infoElem = document.getElementById('trainingButton');
                infoElem.disabled = false;

                //infoElem = document.getElementById("iterationID");
                //infoElem.innerHTML = self.currLineID;

            
                myAssociateTrain.displayOptimalInfo();
                if (self.currLineID == 6) {
                    var infoElem = document.getElementById('trainingButton');
                    infoElem.style.display = 'none';

                    var infoFinalElem;
                    infoFinalElem = document.getElementById("trainingFinalText");
                    infoFinalElem.innerHTML = "All regions are pure!"
                    
                }

            }

            
            
            
            currStep = currStep + 1;
        }
        updateData(self)

    }

    setAnimSpeed() {
        var sliderVal = document.getElementById('sliderTrainSpeed').value 
        this.lineTime = this.lineTimeMin + (this.lineTimeMax - this.lineTimeMin)*(100 - sliderVal)/100;

    }

    calcCriterias(boundingBoxes) {

        //console.log('entropy',boundingBoxes)

        // So we just check the number of points inside the given region
        // And I think that we only need to calculate the entropy
        // That makes for a more coherent story
        
        // And when there is no points in a region we can just set the entropy to be twice the 
        // entropy of the region that contains points
        // Or it might be better to just set it to be ?/undefined

        //var boundingBoxes = [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
        var bbx1, bbx2, bby1, bby2;

        var fullent = 0;
        var current;
        var ptx, pty, ptl;
        //console.log(boundingBoxes)
        // Loop over the two bounding boxes here

        var currentList = [1000,1000];
        var distSumList = [1000,1000];
        var totNumPts = 0;

        var currbb;
        for (var k=0; k<boundingBoxes.length; k++) {
            currbb = k;

            bbx1 = boundingBoxes[currbb][0];
            bbx2 = boundingBoxes[currbb][0] + boundingBoxes[currbb][2];
            bby1 = boundingBoxes[currbb][1];
            bby2 = boundingBoxes[currbb][1] + boundingBoxes[currbb][3];
    
            

            var numPtsClass = [0,0,0];
            // So we loop through all points here
            // And calculate the entropy
            // And we might not have to worry about there being no points in a region if we
            // just fix the initialization above
            for (var i=0; i<this.allData.length; i++) {
                
                ptx = this.allData[i][0];
                pty = this.allData[i][1];
                ptl = this.allData[i][2];
    
                if (ptx > bbx1 && ptx < bbx2 && pty > bby1 && pty < bby2) {
    
                    numPtsClass[parseInt(ptl)] = numPtsClass[parseInt(ptl)] + 1;
    
                }
    
            }
    
            // Calculate the entropy here
            var distSum = numPtsClass.reduce((a, b) => a + b, 0);
            distSumList[k] = distSum;
            totNumPts = totNumPts + distSum;
            //console.log(distSum, bbx1,bbx2,bby1,bby2)
            var dist = numPtsClass.map(val => val/distSum);
            //console.log('a', distSum, boundingBoxes, ptx, bbx1, ptx, bbx2)
            current = dist.map(function(val) {
                if (val != 0) {
                    return val*Math.log(val)
                } else {
                    return 0
                }
            })
            current = current.reduce((a,b) => a + b, 0);
            currentList[k] = current;
        }

        for (var i=0;i<currentList.length;i++) {

            fullent = fullent + ((distSumList[i])/totNumPts)*currentList[i];

        }

        

        if (fullent < 0) {
            
            return -fullent;
        } else {
            return 0
        }
        

    }


    obtainColoredReg(boundingBoxes) {
        

        //console.log('color',boundingBoxes)
        //var boundingBoxes = [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
        var bbx1, bbx2, bby1, bby2;
        var ptx, pty, ptl;
        //console.log(boundingBoxes)
        // Loop over the two bounding boxes here

        var colRegs = [[],[]]

        var totNumPts = 0;

        var currbb;
        for (var k=0; k<boundingBoxes.length; k++) {
            currbb = k;

            bbx1 = boundingBoxes[currbb][0];
            bbx2 = boundingBoxes[currbb][0] + boundingBoxes[currbb][2];
            bby1 = boundingBoxes[currbb][1];
            bby2 = boundingBoxes[currbb][1] + boundingBoxes[currbb][3];
    
            

            var numPtsClass = [0,0,0];
            // So we loop through all points here
            // And calculate the entropy
            // And we might not have to worry about there being no points in a region if we
            // just fix the initialization above
            for (var i=0; i<this.allData.length; i++) {
                
                ptx = this.allData[i][0];
                pty = this.allData[i][1];
                ptl = this.allData[i][2];
    
                if (ptx > bbx1 && ptx < bbx2 && pty > bby1 && pty < bby2) {
    
                    numPtsClass[parseInt(ptl)] = numPtsClass[parseInt(ptl)] + 1;
    
                }
    
            }

            // Here we should be able to have the dist?
            var maxID = 0;
            var maxPt = -10;
            for (var i=0; i<numPtsClass.length; i++) {
                if (numPtsClass[i] > maxPt) {
                    maxPt = numPtsClass[i];
                    maxID = i;
                }
            }

            //var boxxywh = [boundingBoxes[k][0], boundingBoxes[k][1], boundingBoxes[k][2] - boundingBoxes[k][0], boundingBoxes[k][3] - boundingBoxes[k][1]];
            var boxxywh = [bbx1, bby1, bbx2 - bbx1, bby2 - bby1];
            colRegs[k] = [boxxywh, this.colList[maxID][1], maxID];

        }

        //console.log(this.currLineID,colRegs)
        return colRegs
    }



    
    
}




// So we should just include a decision tree here
// I thought if we could choose between different datasets later but the issue is that the tree will become 
// way too big in that case
// I guess it could be solved by some zooming and such but for now it is a little bit too difficult I believe

class trainingTreeAssociate {
    constructor() {


        this.colList = [['#FDA64B', 'rgba(253, 166, 75, 0.2)', 'C'],
                        ['#D1D387', 'rgba(209, 211, 135, 0.2)', 'R'],
                         ['#15607A', 'rgba(21, 96, 122, 0.2)', 'T'],
                          ['#9DDBEA', 'rgba(157, 219, 234, 0.2)', 'S'],
                           ['#FFD9BC', 'rgba(255, 217, 188, 0.2)', 'X']];

        var canvas = document.getElementById("decTreeFig5");
        var box = document.getElementById("canvas-container5");
        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;

        this.partID = 1;
        this.allBoxes = []

        const labels = [];

        
        // Maybe some issue here?
        var allDataTree = []
        for (var i=0; i<13; i++) {
            //console.log(branchDict[i])
            allDataTree.push({
                type: 'line',
                data: [],
                fill: false,
                borderColor: 'rgb(0, 0, 0)',
                tension: 0.0,
                pointRadius: 0
            })
        }

        
        
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
                        suggestedMin: -0.5,
                        suggestedMax: 1.5,
                    },
                    y: {
                        display: false,
                        suggestedMin: -1,
                        suggestedMax: 1,
                    },
                }
            }
        };


        this.myChart = new Chart(
            document.getElementById('decTreeFig5'),
            config
        );

        this.longBLen = 0.37;
        this.smallBLen = this.longBLen/1.7;
        this.lowerLastBranch = 0.1;

        this.initStx = 0.5;
        this.initSty = 1;

        this.myChart.data.datasets[0].data = [{'x': this.initStx, 'y': this.initSty}, {'x': this.initStx, 'y': this.initSty - this.longBLen}];
        this.myChart.update('none');

        // Starting points for all branches
        this.startPts = {1: [this.initStx, this.initSty - this.longBLen],
                             2: [this.initStx + this.longBLen, this.initSty - 2*this.longBLen],
                             3: [this.initStx + 2*this.longBLen, this.initSty - 3*this.longBLen], 
                             4: [this.initStx, this.initSty - 3*this.longBLen],
                             5: [this.initStx + 2*this.longBLen - this.smallBLen, this.initSty - 3*this.longBLen - this.smallBLen],
                             6: [this.initStx + 2*this.longBLen - 2*this.smallBLen, this.initSty - 3*this.longBLen - 2*this.smallBLen]};

        this.branchLens = {1: this.longBLen, 
                           2: this.longBLen,
                           3: this.smallBLen,
                           4: this.smallBLen,
                           5: this.smallBLen, 
                           6: this.smallBLen}

        
        this.initialShow = [];
        
        this.displayAfterOnDict = {1: ["trainingSplit1", "trainDec0", "trainDec1", "trainDecYes1", "trainDecNo1"],
                                  2: ["trainingSplit1", "trainingSplit2", "trainDec1", "trainDec01","trainDec00", "trainDecYes1", "trainDecNo1", "trainDecYes2", "trainDecNo2"],
                                  3: ["trainingSplit1", "trainingSplit2", "trainingSplit3", "trainDec1", "trainDec01", "trainDec001", "trainDec000", "trainDecYes1", "trainDecNo1", "trainDecYes2", "trainDecNo2", "trainDecYes3", "trainDecNo3"],
                                  4: ["trainingSplit1", "trainingSplit2", "trainingSplit3", "trainingSplit4", "trainDec1", "trainDec001","trainDec000","trainDec010", "trainDec011", "trainDecYes1", "trainDecNo1", "trainDecYes2", "trainDecNo2", "trainDecYes3", "trainDecNo3", "trainDecYes4", "trainDecNo4"],
                                  5: ["trainingSplit1", "trainingSplit2", "trainingSplit3", "trainingSplit4", "trainingSplit5", "trainDec1", "trainDec011","trainDec010", "trainDec000", "trainDec0011", "trainDec0010", "trainDecYes1", "trainDecNo1", "trainDecYes2", "trainDecNo2", "trainDecYes3", "trainDecNo3", "trainDecYes4", "trainDecNo4", "trainDecYes5", "trainDecNo5"],
                                  6: ["trainingSplit1", "trainingSplit2", "trainingSplit3", "trainingSplit4", "trainingSplit5", "trainingSplit6", "trainDec1", "trainDec011","trainDec000", "trainDec010", "trainDec0010", "trainDec00111", "trainDec00110", "trainDecYes1", "trainDecNo1", "trainDecYes2", "trainDecNo2", "trainDecYes3", "trainDecNo3", "trainDecYes4", "trainDecNo4", "trainDecYes5", "trainDecNo5", "trainDecYes6", "trainDecNo6"]}
        this.displayFullList = this.displayAfterOnDict[1].concat(this.displayAfterOnDict[2]).concat(this.displayAfterOnDict[3]).concat(this.displayAfterOnDict[4]).concat(this.displayAfterOnDict[5]).concat(this.displayAfterOnDict[6])

        this.addedTreePart = {1: false,
                              2: false,
                              3: false, 
                              4: false,
                              5: false,
                              6: false};

        this.displayStart();

        //this.treePartsDicts = {0: {0: [{'x': 0.5, 'y': 1}, {'x': 0.5, 'y': 0.8}, {'x': 0.5, 'y': 0.8}]}}


        //this.addTreePart();
    };

    resetAnimation() {
        this.partID = 1;
        this.displayStart();
        // So some error when we later go forward?
        // That it has already been added?
        this.addedTreePart = {1: false,
            2: false,
            3: false, 
            4: false,
            5: false,
            6: false};
        
        for (var i=1; i<13; i++) {
            //console.log(branchDict[i])
            this.myChart.data.datasets[i].data = [];
        }

        this.startPts = {1: [this.initStx, this.initSty - this.longBLen],
            2: [this.initStx + this.longBLen, this.initSty - 2*this.longBLen],
            3: [this.initStx + 2*this.longBLen, this.initSty - 3*this.longBLen], 
            4: [this.initStx, this.initSty - 3*this.longBLen],
            5: [this.initStx + 2*this.longBLen - this.smallBLen, this.initSty - 3*this.longBLen - this.smallBLen],
            6: [this.initStx + 2*this.longBLen - 2*this.smallBLen, this.initSty - 3*this.longBLen - 2*this.smallBLen]};

        this.myChart.update('none');

        var fullBranchSplit;
        for (var i=1;i<7;i++) {
            fullBranchSplit = document.getElementById("trainingSplit" + i);
            fullBranchSplit.style.color = 'black';
        }
        
        // and we need to remove all lines
    }

    rerunAnimation() {

        var fullBranchSplit;
        this.partID = this.partID - 1;
        
        fullBranchSplit = document.getElementById("trainingSplit" + this.partID);
        fullBranchSplit.style.color = 'black';
    }

    displayOptimalInfo() {

        var partID = this.partID;
        var infoElem, infoElemFeat, infoElemVar, decID1, decID2;

        var fullBranchSplit;

        var optAxis, optVal, optClassID1, optClassID0;
        if (partID == 2) {
            fullBranchSplit = document.getElementById("trainingSplit1")
            infoElemFeat = document.getElementById("train1Feat");
            infoElemVar = document.getElementById("train1Val");
            decID1 = "trainDec0";
            decID2 = "trainDec1";
            optAxis = 'y';
            optVal = 0.63;
            optClassID1 = 0;
            optClassID0 = 1;


        } else if (partID == 3) {
            fullBranchSplit = document.getElementById("trainingSplit2")
            infoElemFeat = document.getElementById("train2Feat");
            infoElemVar = document.getElementById("train2Val");
            decID1 = "trainDec00";
            decID2 = "trainDec01";

            optAxis = 'x';
            optVal = 0.548;
            optClassID1 = 2;
            optClassID0 = 1;

        } else if (partID == 4) {
            fullBranchSplit = document.getElementById("trainingSplit3")
            infoElemFeat = document.getElementById("train3Feat");
            infoElemVar = document.getElementById("train3Val");
            decID1 = "trainDec000";
            decID2 = "trainDec001";

            optAxis = 'y';
            optVal = 0.338;
            optClassID1 = 0;
            optClassID0 = 1;

        } else if (partID == 5) {
            fullBranchSplit = document.getElementById("trainingSplit4")
            infoElemFeat = document.getElementById("train4Feat");
            infoElemVar = document.getElementById("train4Val");
            decID1 = "trainDec010";
            decID2 = "trainDec011";

            optAxis = 'y';
            optVal = 0.033;
            optClassID1 = 2;
            optClassID0 = 1;

        } else if (partID == 6) {
            fullBranchSplit = document.getElementById("trainingSplit5")
            infoElemFeat = document.getElementById("train5Feat");
            infoElemVar = document.getElementById("train5Val");
            decID1 = "trainDec0010";
            decID2 = "trainDec0011";

            optAxis = 'x';
            optVal = 0.264;
            optClassID1 = 1;
            optClassID0 = 0;

        } else if (partID == 7) {
            fullBranchSplit = document.getElementById("trainingSplit6")
            infoElemFeat = document.getElementById("train6Feat");
            infoElemVar = document.getElementById("train6Val");
            decID1 = "trainDec00110";
            decID2 = "trainDec00111";

            optAxis = 'y';
            optVal = 0.38;
            optClassID1 = 1;
            optClassID0 = 0;

        }


        fullBranchSplit.style.color = 'red';

        infoElemFeat.innerHTML = optAxis;
        
        infoElemVar.innerHTML = optVal.toFixed(2);
        

        infoElem = document.getElementById(decID1);
        infoElem.innerHTML = this.colList[optClassID0][2];
        infoElem.style.color = this.colList[optClassID0][0];

        infoElem = document.getElementById(decID2);
        infoElem.innerHTML = this.colList[optClassID1][2];
        infoElem.style.color = this.colList[optClassID1][0];





    }

    displayTrainingInfo(axisBool, infoReg, lineInfo) {

        var partID = this.partID;
        var infoElem, infoElemFeat, infoElemVar, decID1, decID2;
        if (partID == 2) {
            infoElemFeat = document.getElementById("train1Feat");
            infoElemVar = document.getElementById("train1Val");
            decID1 = "trainDec0";
            decID2 = "trainDec1";
        } else if (partID == 3) {
            infoElemFeat = document.getElementById("train2Feat");
            infoElemVar = document.getElementById("train2Val");
            decID1 = "trainDec00";
            decID2 = "trainDec01";
        } else if (partID == 4) {
            infoElemFeat = document.getElementById("train3Feat");
            infoElemVar = document.getElementById("train3Val");
            decID1 = "trainDec000";
            decID2 = "trainDec001";
        } else if (partID == 5) {
            infoElemFeat = document.getElementById("train4Feat");
            infoElemVar = document.getElementById("train4Val");
            decID1 = "trainDec010";
            decID2 = "trainDec011";
        } else if (partID == 6) {
            infoElemFeat = document.getElementById("train5Feat");
            infoElemVar = document.getElementById("train5Val");
            decID1 = "trainDec0010";
            decID2 = "trainDec0011";
        } else if (partID == 7) {
            infoElemFeat = document.getElementById("train6Feat");
            infoElemVar = document.getElementById("train6Val");
            decID1 = "trainDec00110";
            decID2 = "trainDec00111";
        }

        
        //console.log(infoReg[0][2], infoReg[1][2])
        if (axisBool) {
            infoElemFeat.innerHTML = 'y'
            infoElemVar.innerHTML = lineInfo[1].toFixed(2);

        } else {
            infoElemFeat.innerHTML = 'x'
            infoElemVar.innerHTML = lineInfo[0].toFixed(2);
        }

        infoElem = document.getElementById(decID1);
        infoElem.innerHTML = this.colList[infoReg[0][2]][2];
        infoElem.style.color = this.colList[infoReg[0][2]][0];

        infoElem = document.getElementById(decID2);
        infoElem.innerHTML = this.colList[infoReg[1][2]][2];
        infoElem.style.color = this.colList[infoReg[1][2]][0];



    }


    addTreePart() {

        var partID = this.partID;
//        console.log('asdasdasd', this.addedTreePart[partID])
        if (this.addedTreePart[partID]) {
            this.partID = this.partID + 1;
            return 0;
        }
        //console.log(partID)
        // So load the correct starting point
        // Add the parts to the tree
        var currStartPt = this.startPts[partID];
        var currBranchLen = this.branchLens[partID];

        if (partID != 6 && partID != 5) {

            var branch1 = [{'x': currStartPt[0], 'y': currStartPt[1]},
                            {'x': currStartPt[0] - currBranchLen, 'y': currStartPt[1]},
                            {'x': currStartPt[0] - currBranchLen, 'y': currStartPt[1] - currBranchLen}];
            var branch2 = [{'x': currStartPt[0], 'y': currStartPt[1]},
                            {'x': currStartPt[0] + currBranchLen, 'y': currStartPt[1]},
                            {'x': currStartPt[0] + currBranchLen, 'y': currStartPt[1] - currBranchLen}];
        } else {
            
            var oldStartPt = currStartPt.slice();
            currStartPt[1] = oldStartPt[1] - this.lowerLastBranch;

            if (partID == 6) {
                currStartPt[1] = oldStartPt[1] - 2*this.lowerLastBranch;
            }

            var branch1 = [{'x': oldStartPt[0], 'y': oldStartPt[1]},
                            {'x': currStartPt[0], 'y': currStartPt[1]},
                            {'x': currStartPt[0] - currBranchLen, 'y': currStartPt[1]},
                            {'x': currStartPt[0] - currBranchLen, 'y': currStartPt[1] - currBranchLen}];
            var branch2 = [{'x': currStartPt[0], 'y': currStartPt[1]},
                            {'x': currStartPt[0] + currBranchLen, 'y': currStartPt[1]},
                            {'x': currStartPt[0] + currBranchLen, 'y': currStartPt[1] - currBranchLen}];
        }

        // And later we can add the text and classes and such as well?
        
        this.myChart.data.datasets[2*partID - 1].data = branch1;
        this.myChart.data.datasets[2*partID].data = branch2;

        this.myChart.update('none');

        this.displayInfo()
        this.addedTreePart[partID] = true;
        this.partID = this.partID + 1;
    }

    displayStart() {
        
        var infoElem;
        var activateDict = {};
        for (var i = 0; i<this.displayFullList.length; i++) {
                activateDict[this.displayFullList[i]] = 'none'
        }
        for (var i = 0; i<this.initialShow.length; i++) {
            activateDict[this.initialShow[i]] = 'block'
        }

        for (var i=0; i<Object.keys(activateDict).length; i++) {
            //console.log(Object.keys(activateDict).length, i)
            infoElem = document.getElementById(Object.keys(activateDict)[i])
            infoElem.style.display = activateDict[Object.keys(activateDict)[i]]
        }
    }

    displayInfo() {

        var infoElem;
        var partID = this.partID;
        var activateDict = {};
        for (var i = 0; i<this.displayFullList.length; i++) {
                activateDict[this.displayFullList[i]] = 'none'
        }
        for (var i = 0; i<this.displayAfterOnDict[partID].length; i++) {
            activateDict[this.displayAfterOnDict[partID][i]] = 'block'
        }

        for (var i=0; i<Object.keys(activateDict).length; i++) {
            //console.log(Object.keys(activateDict).length, i)
            infoElem = document.getElementById(Object.keys(activateDict)[i])
            infoElem.style.display = activateDict[Object.keys(activateDict)[i]]
        }

    }

}


var scatterList = [[0.2, 0.7, 25], [0.2, 0.2, 22], [0.8, 0.4, 27]]
var myTrainPlot = new decisionTreeTraining(scatterList, 6)
var myAssociateTrain = new trainingTreeAssociate();

//myTrainPlot.scanBox();
//myTrainPlot.calcCriterias()


// for (var i=1;i<7;i++) {
//     myAssociateTrain.addTreePart();
// }

