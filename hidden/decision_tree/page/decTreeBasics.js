


class Patient {
    constructor(patientId) {
        
        this.maleNames = ["Adam", "Steve", "Joe", "Banner", "Nick", "Claus", "Dude",
        "Vlad", "Rick", "Tony", "Meek", "Anton", "Yuki", "Taka", 
        "Gorby", "Barack", "Fred", "Shaggy", "Michael", "Jack",
        "Noah", "Liam", "Kim", "James", "Lucas", "Will", "Aiden",
        "Levi", "David", "John", "Yasin", "Isaac", "Ryan", "Akira",
        "Hinata", "Botan", "Asahi", "Jens", "Goku", "Itadori", "Adnan",
        "Ahmed", "Amir", "Alvan", "Omar", "Malik", "Saad", "Tariq", "Felix",
    "Atlas", "Zeus", "Ra", "Thor", "Wotan", "Bodhi"];

        this.femaleNames = ["Karen", "Jen", "Kim", "Vicky", "Melis", "Emma", "Sophie",
                    "Isabella", "Mia", "Aria", "Chloe", "Ellie", "Grace", "Violet",
                "Anna", "Zoe", "Lydia", "Jade", "Faith", "Rose", "Arya", "Adira", "Alima",
            "Aza", "Dalia", "Maral", "Esma", "Maia", "Akari", "Sakura", "Nezuko", "Yua",
        "Yui", "Niko", "Nami", "Kayo", "Velma", "Mary", "Hanna", "Elin", "Frey"];


        this.patientId = patientId;
        
        this.generateAttributes();
        this.obtainDecisionList();




    };

    generateAttributes () {
    
        this.age =  Math.round(20 + 40*Math.random());
        if (Math.round(Math.random()) == 0) {
            this.sex = 'Man'

            var nameId = Math.floor(Math.random()*this.maleNames.length);
            this.name = this.maleNames[nameId];

        } else {
            this.sex = 'Woman'
            var nameId = Math.floor(Math.random()*this.femaleNames.length);
            this.name = this.femaleNames[nameId];
        }

        this.bpressure = Math.round(120 + 30*Math.random());
        this.chol = Math.floor(190 + 110*Math.random());
        if (Math.round(Math.random()) == 0) {
            this.bsugar = 'Yes'
        } else {
            this.bsugar = 'No'
        }

        if (Math.round(Math.random()) == 0) {
            this.restecg = 'Yes'
        } else {
            this.restecg = 'No'
        }

        if (Math.round(Math.random()) == 0) {
            this.exercise = 'Yes'
        } else {
            this.exercise = 'No'
        }

        if (Math.round(Math.random()) == 0) {
            this.familyhist = 'Yes'
        } else {
            this.familyhist = 'No'
        }
        
        
    }

    obtainDecisionList () {

        this.decList = [];

        if (this.exercise == "Yes") {
            this.decList.push(1);

            if (this.age > 50) {
                this.decList.push(1);
            } else {
                this.decList.push(0);
            }

        } else {
            this.decList.push(0);

            if (this.bpressure > 140) {
                this.decList.push(1);
            } else {
                this.decList.push(0);
                
                if (this.familyhist == "Yes") {
                    this.decList.push(1);
                } else {
                    this.decList.push(0);
                }
            }

        }

    }
        
}



class decisionTreeBasics {
    constructor() { 

        var canvas = document.getElementById("decTreeFig1");
        //var ctx = canvas.getContext("2d");
        var box = document.getElementById("canvas-container");
        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;

        var patientId = Math.round(10000*Math.random());
        this.currPerson = new Patient(patientId);

        this.currDataInd = 0;

        const labels = [];
        const data = {
        labels: labels,
        datasets: this.createTreeData()
        };

        const config = {
            type: 'line',
            data: data,
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
                elements: {
                    point:{
                        radius: 0
                    },
                },
                scales: {
                    x: {
                        type: 'linear',
                        display: false,
                        suggestedMin: 0.1,
                        suggestedMax: 1
                    },
                    y: {
                        display: false,
                        suggestedMin: 0.1,
                        suggestedMax: 0.9
                    }
                }
            }
        };


        this.myChart = new Chart(
            document.getElementById('decTreeFig1'),
            config
          );

        console.log(this.myChart)
        this.timeoutEvent;
        //console.log(currPerson)
        this.writePatientInfo();
    }

    insertSteps(numSteps, myArr) {

        var finalStepList = [];
        var diff;
    
        var deltaLen = 0.001;
        var breakForLoop;
    
        for (var i=0; i<(myArr.length - 1); i++) {
            diff = myArr[i+1] - myArr[i];
            breakForLoop = false;
            for (var j=0; j<=numSteps; j++) {
    
                if (breakForLoop) {
                    continue
                }
                
                finalStepList.push(myArr[i] + j/numSteps*diff)
                
    
            }
        }
    
        return finalStepList
    }

    writePatientInfo () {
        var HTMLids = ["personAge", "personSex", "personBP",
                        "personChol", "personBS", "personEx", "personHist"];
        //console.log(this.currPerson)
        var personAttr = [this.currPerson.age, this.currPerson.sex,
            this.currPerson.bpressure + ' mm Hg', this.currPerson.chol + ' mg/dl', this.currPerson.bsugar,
            this.currPerson.exercise, this.currPerson.familyhist];

        for (var i=0;i<HTMLids.length; i++) {
            var infoElem = document.getElementById(HTMLids[i]);
            infoElem.innerHTML = personAttr[i];
        }

        var allInfoElem = document.getElementsByClassName('personName');
        for (var i=0;i<allInfoElem.length; i++) {
            infoElem = allInfoElem[i]
            infoElem.innerHTML = this.currPerson.name;    
        }
        //infoElem.innerHTML = this.currPerson.name;

    }

    generateNewPatient() {
        var patientId = Math.round(10000*Math.random());
        this.currPerson = new Patient(patientId);
        this.writePatientInfo();
        this.myChart.data.datasets[0].data = [];
        this.myChart.update()
        this.currDataInd = 0;
        clearTimeout(this.timeoutEvent);

        var infoElem = document.getElementById('personDec');
        //console.log(infoElem.innerHTML)
        infoElem.innerHTML = '';
    }

    createTreeData() {

        const xShiftTree = -0.1
    
        const treePath11Pts = [[0.5 + xShiftTree, 0.9],
                            [0.5 + xShiftTree, 0.7],
                            [0.3 + xShiftTree, 0.7],
                            [0.3 + xShiftTree, 0.55],
                            [0.15 + xShiftTree, 0.55],
                            [0.15 + xShiftTree, 0.40]];
    
        const treePath10Pts = [[0.5 + xShiftTree, 0.9],
                                [0.5 + xShiftTree, 0.7],
                                [0.3 + xShiftTree, 0.7],
                                [0.3 + xShiftTree, 0.55],
                                [0.45 + xShiftTree, 0.55],
                                [0.45 + xShiftTree, 0.40]];
    
        const treePath01Pts = [[0.5 + xShiftTree, 0.9],
                            [0.5 + xShiftTree, 0.7],
                            [0.7 + xShiftTree, 0.7],
                            [0.7 + xShiftTree, 0.55],
                            [0.55 + xShiftTree, 0.55],
                            [0.55 + xShiftTree, 0.40]];
    
        const treePath001Pts = [[0.5 + xShiftTree, 0.9],
                                [0.5 + xShiftTree, 0.7],
                                [0.7 + xShiftTree, 0.7],
                                [0.7 + xShiftTree, 0.55],
                                [0.85 + xShiftTree, 0.55],
                                [0.85 + xShiftTree, 0.40],
                                [0.85 + xShiftTree, 0.35],
                                [0.70 + xShiftTree, 0.35], 
                                [0.70 + xShiftTree, 0.2]];
    
        const treePath000Pts = [[0.5 + xShiftTree, 0.9],
                            [0.5 + xShiftTree, 0.7],
                            [0.7 + xShiftTree, 0.7],
                            [0.7 + xShiftTree, 0.55],
                            [0.85 + xShiftTree, 0.55],
                            [0.85 + xShiftTree, 0.40],
                            [0.85 + xShiftTree, 0.35],
                            [1 + xShiftTree, 0.35], 
                            [1 + xShiftTree, 0.2]];
    
        this.allPaths = [treePath11Pts,
                        treePath10Pts,
                        treePath01Pts,
                        treePath001Pts,
                        treePath000Pts];
    
    
        const finalDataset = [{
            lineTension: 0,
            label: '',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
        }];
    
    
        for (var i=0;i<this.allPaths.length;i++) {
    
            var currData = [];
    
            for (var j=0; j<this.allPaths[i].length; j++) {
    
                currData.push({'x': this.allPaths[i][j][0], 'y':this.allPaths[i][j][1]})
                
            }
    
            var currDict = {
                lineTension: 0,
                label: '',
                data: currData,
                fill: false,
                borderColor: 'rgb(0, 0, 0)'
            };
    
            finalDataset.push(currDict);
    
        }
    
    
        return finalDataset
    }

    obtainDispPath(chosenPath) {
        var dispTreeInd;// = Math.round(Math.random()*4);
    
        if (chosenPath == '1,1') {
            dispTreeInd = 0;
        } else if (chosenPath == '1,0'){
            dispTreeInd = 1;
        } else if (chosenPath == '0,1'){
            dispTreeInd = 2;
        } else if (chosenPath == '0,0,1') {
            dispTreeInd = 3;
        } else if (chosenPath == '0,0,0') {
            dispTreeInd = 4;
        }
    
        var currTree = this.allPaths[dispTreeInd];
        var pathTreex = [];
        var pathTreey = [];
    
        for (var i=0; i<currTree.length; i++) {
            pathTreex.push(currTree[i][0]);
            pathTreey.push(currTree[i][1]);
        }
        
        var fullTreex = this.insertSteps(50, pathTreex);
        var fullTreey = this.insertSteps(50, pathTreey);
    
        return [fullTreex, fullTreey]
    
    }



    drawPath() {

        var currPath = '' + this.currPerson.decList;


        var dataPath = this.obtainDispPath(currPath);

        var dataPathx = dataPath[0];

        var dataPathy = dataPath[1];
        var self = this;
        function updateData(self) {

            self.myChart.data.datasets[0].data.push({'x': dataPathx[self.currDataInd], 'y': dataPathy[self.currDataInd]})
            self.myChart.update('none')
            
            self.currDataInd = self.currDataInd + 1;

            if (self.currDataInd < dataPathx.length) {
                self.timeoutEvent = setTimeout(function() {
                    updateData(self);
                }, 5)
            } else {
                // Add box around decision here and write it in the personInfo
                var infoElem = document.getElementById('personDec');
                //console.log(self.currPerson.decList)
                var finalDec = self.currPerson.decList[self.currPerson.decList.length - 1];
                //console.log(finalDec)
                if (finalDec == 0) {
                    infoElem.innerHTML = 'Let go'
                } else {
                    infoElem.innerHTML = 'Monitor'
                }
            }
        }
        updateData(self);
    }
}


//console.log(myChart)
//var currPath = '11';
//drawPath(currPath)


var basicsDecTree = new decisionTreeBasics();
//console.log(basicsDecTree.patientDecBool, '' + basicsDecTree.patientDecBool)













/// UTILS HERE


// So we need a function here that just loops through all popups
// and removes the show class name?

var numPopups = 12;

var activePopups = {};

for (var i=0; i<numPopups; i++) {
    activePopups[i] = false;
}


function togglePopup(popIndex) {

    for (var i=0;i<numPopups; i++) {
        //console.log(i)

        if (i != popIndex) {
            var popup = document.getElementById("myPopup" + i);
            popup.className = popup.className.replace(' show', '')
        }
    }

    var popup = document.getElementById("myPopup" + popIndex);


    popup.classList.toggle("show");

}

function clickBody() {
    
    for (var i=0;i<numPopups; i++) {
        //console.log(i)
        var popup = document.getElementById("myPopup" + i);
        popup.className = popup.className.replace(' show', '')
    }


}
document.body.addEventListener("click", function () {
    clickBody();
}, false)

var allPopups = document.getElementsByClassName('popup');

for (var i=0; i<allPopups.length; i++) {

    allPopups[i].addEventListener("click", function (ev) {
        ev.stopPropagation(); //this is important! If removed, you'll get both alerts
    }, false);
}
