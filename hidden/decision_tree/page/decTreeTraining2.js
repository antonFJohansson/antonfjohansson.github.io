

// So we just create a chart, add some points
// And then add a listener so a user can add points and remove them 
// on their own?








class entropyVsMisclassification {
    constructor() {

        var canvas = document.getElementById("decTreeFig4");
        var box = document.getElementById("canvas-container4");

        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;

        this.currButton = 1;

        this.buttonActive = '#afafaf';
        this.buttonInactive = '#F7F7F7';

        this.paintColors = false;
        this.colList = [['#FDA64B', 'rgba(253, 166, 75, 0.2)', 'C'],
        ['#D1D387', 'rgba(209, 211, 135, 0.2)', 'R'],
         ['#15607A', 'rgba(21, 96, 122, 0.2)', 'T'],
          ['#9DDBEA', 'rgba(157, 219, 234, 0.2)', 'S'],
           ['#FFD9BC', 'rgba(255, 217, 188, 0.2)', 'X']];

        this.shapeList = ['circle', 'rect', 'triangle', 'star', 'cross'];


        this.generateScatterData();

        this.orgData = this.createDatasets()

        const labels = [];
        const data = {
        labels: labels,
        datasets: this.orgData
        };

        var self = this;
        

        // Maybe it will work with this to pass the functions at least
        // Or..will it? Because we pass a function and the scope of that function will
        // be different in the future?

                
        var classRectList = [];

        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
            //console.log(self)
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            var chartArea = chart.chartArea;
            ctx.globalCompositeOperation = 'destination-over';
            
            if (self.paintColors) {
                self.findMajorityClass();
                ctx.fillStyle = self.colUpper;
                    //console.log('a', classRectList)
                ctx.fillRect(self.chartTopLeftx, self.chartTopLefty,
                        self.chartWidth, self.chartHeight*0.5);

                ctx.fillStyle = self.colLower;
                        //console.log('a', classRectList)
                ctx.fillRect(self.chartTopLeftx, self.chartTopLefty + self.chartHeight*0.5,
                            self.chartWidth, self.chartHeight*0.5);
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

                            },
                            y: {
                                display: true,
                                suggestedMin: 0,
                                suggestedMax: 1,
                            },
                        }
                    }
                };

        const actions = [
            {
                name: 'Randomize',
                handler(chart) {
                //console.log('Ja')
                }
            },
            ];


        this.myChart = new Chart(
            document.getElementById('decTreeFig4'),
            config
        );

        var chartArea = this.myChart.chartArea;
        this.chartTopLeftx = chartArea.left;
        this.chartTopLefty = chartArea.top;
        this.chartWidth = chartArea.right - chartArea.left;
        this.chartHeight = chartArea.bottom - chartArea.top;
         
        this.chartRight = chartArea.right;
        this.chartBottom = chartArea.bottom;

        this.findMajorityClass();
        this.myChart.update('none');
        
    };

    generateScatterData() {
        var currPts;
        this.allPtsList = [];

        // Choose which points that should end up on both sides here
        var bothSidesIds = Math.floor(Math.random()*3);
        var upperSide = Math.random() < 0.5;
        var firstReg = upperSide ? 0 : 1;
        var secondReg = upperSide ? 1 : 0;

        // Generate some data points
        for (var i=0;i<3;i++) {

            if (i != bothSidesIds) {
                currPts = this.generateScatter(firstReg);
            } else {
                currPts = this.generateScatter(secondReg);
            }
            this.allPtsList.push(currPts)
        }
        

        
    }

    generateScatter(upperReg) {

        // Generates data according to a small and large uniform distribution
    
        var allPts = [];
        var ptx, pty;
        
        // Generate data
    
        ptx = 0.1 + Math.random()*0.8;
        if (upperReg == 1) {
            pty = 0.55 + Math.random()*0.4
        } else {
            pty = 0.1 + Math.random()*0.35
        }
        

        allPts.push({'x': ptx, 'y': pty})

        // // So we can add one or two points

        // if (Math.random() < 0.5) {
        //     ptx = 0.1 + Math.random()*0.8;
        //     if (upperReg == 1) {
        //         pty = 0.55 + Math.random()*0.4
        //     } else {
        //         pty = 0.1 + Math.random()*0.35
        //     }
            

        //     allPts.push({'x': ptx, 'y': pty})
        // }
    
        return allPts
    }

    createDatasets() {

   
        var allData = [];
        allData.push({
            type: 'line',
            data: [{'x': 0, 'y': 0.5}, {'x':1, 'y':0.5}],
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            tension: 0.1,
            pointRadius: 0
        })
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

    updateClass(buttonID) {

        this.currButton = buttonID;

        

        var infoElem;
        if (buttonID == 2) {
            infoElem = document.getElementById('dec4Square')
            infoElem.style.backgroundColor = this.buttonActive;

            infoElem = document.getElementById('dec4Triangle')
            infoElem.style.backgroundColor = this.buttonInactive;
            infoElem = document.getElementById('dec4Circle')
            infoElem.style.backgroundColor = this.buttonInactive;
        } else if (buttonID == 3) {
            infoElem = document.getElementById('dec4Triangle')
            infoElem.style.backgroundColor = this.buttonActive;

            infoElem = document.getElementById('dec4Square')
            infoElem.style.backgroundColor = this.buttonInactive;
            infoElem = document.getElementById('dec4Circle')
            infoElem.style.backgroundColor = this.buttonInactive;
            
        } else if (buttonID == 1) {
            infoElem = document.getElementById('dec4Circle')
            infoElem.style.backgroundColor = this.buttonActive;

            infoElem = document.getElementById('dec4Triangle')
            infoElem.style.backgroundColor = this.buttonInactive;
            infoElem = document.getElementById('dec4Square')
            infoElem.style.backgroundColor = this.buttonInactive;
        }
    }

    updateData(x,y) {

        // I guess we can get the class from some button and do not need to pass it here

        var currClass = this.currButton;



        var chartx, charty;
        //console.log(y,this.chartBottom, this.chartTopLefty)
        if (x > this.chartTopLeftx && x < this.chartRight && y < this.chartBottom && y > this.chartTopLefty) {
            
            chartx = (x - this.chartTopLeftx)/this.chartWidth;
            charty = 1 - (y - this.chartTopLefty)/this.chartHeight;

            this.myChart.data.datasets[currClass].data.push({'x': chartx, 'y': charty});
            this.myChart.update()

            //console.log(chartx, charty)
            this.calcInformation();
        }

    }

    resetData() {

        var orgPts, tempData;
        this.generateScatterData();
        tempData = this.createDatasets()
        console.log(tempData)
        for (var i=1; i<4;i ++ ){
            //orgPts = this.myChart.data.datasets[i].data.slice(0,2)
            orgPts = tempData[i];
            this.myChart.data.datasets[i] = orgPts
        }
        this.myChart.update('none')
        

    }

    calcInformation() {
        // So here we just calculate the entropy and missclassification rate?
        // And we can get this info from this.numRegPt maybe?
        // At least the entropy
        // But maybe I can get the missclassification rate in a similar way?
        // From this.maxIdUpper = maxIdUpper; this.maxIdLower = maxIdLower; 
        // I should be able to use numRegPt and that to get the missclassification rate
        //console.log(this.numRegPt, this.maxIdUpper, this.maxIdLower)

        var lowerEnt = 0;
        var upperEnt = 0;
        var lowerMisc = 0;
        var upperMisc = 0;
        var upperDist = []
        var lowerDist = [];

        //console.log(this.numRegPt)
        // calculate entropy and misc here
        for (var i=0;i<this.numRegPt.length;i++) {
            lowerDist.push(this.numRegPt[i][0]);
            upperDist.push(this.numRegPt[i][1]);
        }

        var lowSum = lowerDist.reduce((a, b) => a + b, 0);
        var upperSum = upperDist.reduce((a, b) => a + b, 0);
        //console.log('as',lowSum, lowerDist)
        for (var i=0;i<this.numRegPt.length;i++) {

            if (lowerDist[i] != 0) {
            lowerEnt = lowerEnt + lowerDist[i]/lowSum*Math.log(lowerDist[i]/lowSum);
            }
            if (upperDist[i] != 0) {
                upperEnt = upperEnt + upperDist[i]/upperSum*Math.log(upperDist[i]/upperSum);
            }

            if (i != this.maxIdLower) {
                lowerMisc = lowerMisc + lowerDist[i];
            }

            if (i != this.maxIdUpper) {
                upperMisc = upperMisc + upperDist[i];
            }
        }


        var infoElem = document.getElementById('upperNumPts');
        infoElem.innerHTML = '[' + upperDist.map( e => ' ' + (e).toFixed(0)) + ']';

        // var infoElem = document.getElementById('upperClassDist');
        // infoElem.innerHTML = '[' + upperDist.map( e => ' ' + (e/upperSum).toFixed(2)) + ']';
        var infoElem = document.getElementById('upperMisc');
        infoElem.innerHTML = (100*(upperSum - upperMisc)/upperSum).toFixed(2);
        var infoElem = document.getElementById('upperEnt');
        infoElem.innerHTML = -upperEnt.toFixed(2);

        var infoElem = document.getElementById('lowerNumPts');
        infoElem.innerHTML = '[' + lowerDist.map( e => ' ' + (e).toFixed(0)) + ']';

        // var infoElem = document.getElementById('lowerClassDist');
        // infoElem.innerHTML = '[' + lowerDist.map( e => ' ' + (e/lowSum).toFixed(2)) + ']';
        var infoElem = document.getElementById('lowerMisc');
        infoElem.innerHTML = (100*(lowSum - lowerMisc)/lowSum).toFixed(2);
        var infoElem = document.getElementById('lowerEnt');
        infoElem.innerHTML = -lowerEnt.toFixed(2);


        // We need to fix the formula here
        var infoElem = document.getElementById('totalEnt');
        infoElem.innerHTML = (-lowSum/(lowSum + upperSum)*lowerEnt - upperSum/(lowSum + upperSum)*upperEnt).toFixed(2);
        var infoElem = document.getElementById('totalMisc');
        infoElem.innerHTML = (100*(lowSum - lowerMisc + upperSum - upperMisc)/(lowSum + upperSum)).toFixed(2);

        //console.log(-lowerEnt, -upperEnt, lowerMisc, lowerDist, lowerDist.map( e => ' ' + (e/lowSum)))
        

        
    }

    findMajorityClass() {
        // So just check which class is in the majority at the top and the bottom
        var currData, ptx, pty;
        var numRegPt = [[0,0], [0,0], [0,0]] //Lower first then upper
        for (var i=1; i<4; i++) {
            currData = []
            //console.log(this.myChart.data.datasets[i].data.length)
            for (var j=0; j<this.myChart.data.datasets[i].data.length; j++) {
                //console.log(this.myChart.data.datasets[i].data[j], j)
                ptx = this.myChart.data.datasets[i].data[j]['x'];
                pty = this.myChart.data.datasets[i].data[j]['y'];

                if (pty < 0.5) {
                    numRegPt[i-1][0] = numRegPt[i-1][0] + 1
                } else {
                    numRegPt[i-1][1] = numRegPt[i-1][1] + 1
                }

            }

        }
        //console.log(numRegPt)
        var colRegLower, colRegUpper;
        var maxIdLower, maxIdUpper;
        var maxUpper = 0;
        var maxLower = 0;
        for (var i=0; i<3; i++) {

            if (numRegPt[i][0] > maxLower) {
                maxLower = numRegPt[i][0];
                maxIdLower = i
            }

            if (numRegPt[i][1] > maxUpper) {
                maxUpper = numRegPt[i][1];
                maxIdUpper = i
            }
        }

        this.maxIdUpper = maxIdUpper;
        this.maxIdLower = maxIdLower;
        this.numRegPt = numRegPt;
        this.colUpper = this.colList[maxIdUpper][1];
        this.colLower = this.colList[maxIdLower][1];
        this.paintColors = true;
        
        this.calcInformation();
        //this.myChart.update('none');
    }

    displayExhibit(exhibitID) {
        // SO have two different cases where we just see the difference 
        // Between th emisclassification rate and entropy

        // So the first example has [300,100,75] in the upper reg and [100,300,75] in thw lower
        // While the second example has [200,0,0], [200, 400, 150] in the upper and lower

        var allData = [];

        // So create a new AllPtsList here, should not be a global property, just local var

        // exhibitList should be of the form [[{'x': a, 'y': d}, {}],[]] etc
        var exhibitList = [];


        // First we generate data for class 1

        

        if (exhibitID == 1) {
            var upLim1 = 40;
            var upLim2 = 14;
            var numPtsC1 = 30;
            var numPtsC2 = 10;
            var numPtsC3 = 7;

            var ptx, pty;
            var currPtList = [[],[],[]];
            for (var i = 0;i<numPtsC1; i++) {
                ptx = 0.02 + Math.random()*0.9
                pty = 0.51 + Math.random()*0.4
                currPtList[0].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<numPtsC2; i++) {
                ptx = 0.98 - Math.random()*0.9
                pty = 0.51 + Math.random()*0.4
                currPtList[1].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<numPtsC3; i++) {
                ptx = 0.2 + Math.random()*0.6
                pty = 0.51 + Math.random()*0.45
                currPtList[2].push({'x': ptx, 'y': pty});
            }

            // Lower reg

            for (var i = 0;i<(upLim1-numPtsC1); i++) {
                ptx = 0.02 + Math.random()*0.9
                pty = 0.02 + Math.random()*0.4
                currPtList[0].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<(upLim1 - numPtsC2); i++) {
                ptx = 0.98 - Math.random()*0.9
                pty = 0.02 + Math.random()*0.4
                currPtList[1].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<(upLim2 - numPtsC3); i++) {
                ptx = 0.2 + Math.random()*0.6
                pty = 0.01 + Math.random()*0.45
                currPtList[2].push({'x': ptx, 'y': pty});
            }
        } else {
            var upLim1 = 40;
            var upLim2 = 14;
            var numPtsC1 = 20;
            var numPtsC2 = 0;
            var numPtsC3 = 0;

            var ptx, pty;
            var currPtList = [[],[],[]];
            for (var i = 0;i<numPtsC1; i++) {
                ptx = 0.02 + Math.random()*0.9
                pty = 0.51 + Math.random()*0.4
                currPtList[0].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<numPtsC2; i++) {
                ptx = 0.98 - Math.random()*0.9
                pty = 0.51 + Math.random()*0.4
                currPtList[1].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<numPtsC3; i++) {
                ptx = 0.2 + Math.random()*0.6
                pty = 0.51 + Math.random()*0.45
                currPtList[2].push({'x': ptx, 'y': pty});
            }

            // Lower reg

            for (var i = 0;i<(upLim1-numPtsC1); i++) {
                ptx = 0.02 + Math.random()*0.9
                pty = 0.02 + Math.random()*0.4
                currPtList[0].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<(upLim1 - numPtsC2); i++) {
                ptx = 0.98 - Math.random()*0.9
                pty = 0.02 + Math.random()*0.4
                currPtList[1].push({'x': ptx, 'y': pty});
            }

            for (var i = 0;i<(upLim2 - numPtsC3); i++) {
                ptx = 0.2 + Math.random()*0.6
                pty = 0.01 + Math.random()*0.45
                currPtList[2].push({'x': ptx, 'y': pty});
            }
        }


        for (var i=1; i<4;i ++ ){
            this.myChart.data.datasets[i].data = currPtList[i-1]
        }
        console.log('asd')
        this.myChart.update('none');
    }


}


class entropyInfo {
    constructor() {

        this.idList = ['math-overview-entropy', 'math-overview-minus',
                        'math-overview-summation', 'math-overview-p',
                    'math-overview-log'];

        this.formulaList = ['formula-part-entropy', 'formula-part-minus',
                    'formula-part-summation', 'formula-part-p',
                'formula-part-log'];
    };

    switchInfo(switchID) {

        var infoElemDiv, infoElemFormula;
        for (var i=0;i<this.idList.length;i++) {
            infoElemDiv = document.getElementById(this.idList[i])
            infoElemFormula = document.getElementById(this.formulaList[i])

            //console.log(infoElemFormula, infoElemDiv)
            if (i == switchID) {
                
                infoElemDiv.style.display = 'block'
                infoElemFormula.style.color = 'red'
            } else {
                infoElemDiv.style.display = 'none'
                infoElemFormula.style.color = 'black'
            }

        }

    }

    openTab(evt, tab) {

        var infoElem, tablinks;

        tablinks = document.getElementsByClassName("tabBtn");
        for (var i = 0; i < tablinks.length; i++) {
            //console.log('b', tablinks[i].className)
            tablinks[i].className = tablinks[i].className.replace("tablinksactive", "tablinks");
        }
        if (tab == 'Overview') {
            document.getElementById('measuresOverview').style.display = "flex";
            
            document.getElementById('entropyOverview').style.display = "none";
        } else {
            document.getElementById('entropyOverview').style.display = "flex";
            document.getElementById('measuresOverview').style.display = "none";
        }

        //console.log('a', evt.currentTarget.className)
        evt.currentTarget.className = evt.currentTarget.className.replace('tablinks', 'tablinksactive');

    }
}


var myEntropyVsMis = new entropyVsMisclassification();
var myEntropyInfo = new entropyInfo();
//myEntropyInfo.switchInfo(0)

document.getElementById("canvas-container4").addEventListener("click", function(event) {
    //console.log('Hejsan')
    //console.log(event.layerX, event.layerY) // So this one is the easiest I believe
    myEntropyVsMis.updateData(event.layerX,event.layerY)
    
});

