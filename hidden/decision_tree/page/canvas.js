

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var box = document.getElementById("decisionTreeBasics");

var dpr = window.devicePixelRatio || 1;
//   // Get the size of the canvas in CSS pixels.
//   var rect = canvas.getBoundingClientRect();
//   // Give the canvas pixel dimensions of their CSS
//   // size * the device pixel ratio.
//   canvas.width = rect.width * dpr;
//   canvas.height = rect.height * dpr;
//   var ctx = canvas.getContext('2d');
//   // Scale all drawing operations by the dpr, so you
//   // don't have to worry about the difference.
//   ctx.scale(dpr, dpr);
//   return ctx;

//console.log(dpr);
canvas.height = 0.76*box.clientHeight;//*dpr;
canvas.width = 1*box.clientWidth;//*dpr;
ctx.scale(dpr, dpr)

var maleNames = ["Adam", "Steve", "Joe", "Banner", "Nick", "Claus", "Dude",
                "Vlad", "Rick", "Tony", "Meek", "Anton", "Yuki", "Taka", 
                "Gorby", "Barack", "Fred", "Shaggy", "Michael", "Jack",
                "Noah", "Liam", "Kim", "James", "Lucas", "Will", "Aiden",
                "Levi", "David", "John", "Yasin", "Isaac", "Ryan", "Akira",
                "Hinata", "Botan", "Asahi", "Jens", "Goku", "Itadori", "Adnan",
                "Ahmed", "Amir", "Alvan", "Omar", "Malik", "Saad", "Tariq", "Felix",
            "Atlas", "Zeus", "Ra", "Thor", "Wotan", "Bodhi"];

var femaleNames = ["Karen", "Jen", "Kim", "Vicky", "Melis", "Emma", "Sophie",
                    "Isabella", "Mia", "Aria", "Chloe", "Ellie", "Grace", "Violet",
                "Anna", "Zoe", "Lydia", "Jade", "Faith", "Rose", "Arya", "Adira", "Alima",
            "Aza", "Dalia", "Maral", "Esma", "Maia", "Akari", "Sakura", "Nezuko", "Yua",
        "Yui", "Niko", "Nami", "Kayo", "Velma", "Mary", "Hanna", "Elin", "Frey"];


//ctx.beginPath();
//ctx.rect(20, 20, 150, 100);
//ctx.fill()
//ctx.stroke();

// So we create an object that draws a tree branch for us?
// So just a line crossed by a horisontal line?


class DecisionBranch {
    constructor(startPt, branchLen, questionStr, yesStr, noStr, leafNode) {
      this.startPt = startPt;
      this.branchLen = branchLen;
      this.questionStr = questionStr;
      this.yesStr = yesStr;
      this.noStr = noStr;
      this.leafNode = leafNode;

      this.fontColor = "#313131";

      //this.fontStyle = "15px Helvetica";
      // Font might not be an issue if we are working with a flexbox setup
      // And always keep the canvas box around 400px
      //this.fontStyle = 1*canvas.width/100 + "px Helvetica";

      let para = document.querySelector('body');
      let compStyles = window.getComputedStyle(para);
      //console.log(compStyles.getPropertyValue('font-family'))

      this.fontStyle = "12px "+ compStyles.getPropertyValue('font-family');
      //  console.log(this.fontStyle);
      

      this.midCorner = [this.startPt[0], this.startPt[1] + this.branchLen];
      this.leftCorner = [this.startPt[0] - this.branchLen, this.startPt[1] + this.branchLen];
      this.rightCorner = [this.startPt[0] + this.branchLen, this.startPt[1] + this.branchLen];
    };

    drawBase() {
        if (!this.leafNode) {
            ctx.beginPath();
            ctx.moveTo(this.startPt[0], this.startPt[1]);
            ctx.lineTo(this.midCorner[0], this.midCorner[1]);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.leftCorner[0], this.leftCorner[1]);
            ctx.lineTo(this.rightCorner[0], this.rightCorner[1]);
            ctx.closePath();
            ctx.stroke();

            ctx.font = this.fontStyle;
            
            ctx.fillStyle = this.fontColor;

            //console.log(ctx.measureText(this.questionStr).width)
            ctx.fillText(this.questionStr, this.startPt[0] + 0.1*this.branchLen, this.startPt[1] + 0.4*this.branchLen);

            var noLen = this.branchLen/2 - ctx.measureText(this.noStr).width/2;
            var yesLen = this.branchLen/2 - ctx.measureText(this.yesStr).width/2;
            ctx.fillText(this.noStr, this.startPt[0] - this.branchLen + noLen, this.startPt[1] + 0.9*this.branchLen);
            ctx.fillText(this.yesStr, this.startPt[0] + yesLen, this.startPt[1] + 0.9*this.branchLen);
        } else {
            ctx.beginPath();
            ctx.moveTo(this.startPt[0], this.startPt[1]);
            ctx.lineTo(this.midCorner[0], this.midCorner[1]);
            ctx.closePath();
            ctx.stroke();

            ctx.font = this.fontStyle;
            ctx.fillStyle = this.fontColor;
            var lineHeight = ctx.measureText('M').width;

            var d = ctx.measureText(this.questionStr).width/2
            ctx.fillText(this.questionStr, this.startPt[0] - d, this.startPt[1] + this.branchLen + 1.5*lineHeight);
        }


    }


  }


  // So have a person class here?
  // So just a person with some attributes written down below?

  class Patient {
    constructor(patientId, personx, persony, personWidth, headRad) {
        this.personx = personx;
        this.persony = persony;
        this.personWidth = personWidth;
        this.headRad = headRad;
        this.personColor = "#000000";
        this.largeFont = "bolder 16px Helvetica";
        this.smallFont = "15px Helvetica";
        ctx.font = this.smallFont;
        this.lineHeight = ctx.measureText('M').width;

        
        this.patientId = patientId;
        this.generateAttributes();
        this.obtainDecisionList();
    };

    generateAttributes () {

        
        this.age =  Math.round(20 + 40*Math.random());
        if (Math.round(Math.random()) == 0) {
            this.sex = 'Man'
        } else {
            this.sex = 'Woman'
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
        //console.log(this.decList, this.exercise)

        

    }

    draw () {

        

        ctx.fillStyle = this.personColor;
        ctx.beginPath();
        ctx.arc(this.personx, this.persony + this.headRad + this.personWidth, this.personWidth, Math.PI, 2*Math.PI);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.personx, this.persony, 1.2*this.headRad, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = this.personColor;
        ctx.beginPath();
        ctx.arc(this.personx, this.persony, this.headRad, 0, 2 * Math.PI);
        ctx.fill();

        
        // And then we need to write the text here below
        // And all text needs to be adaptive to the size of the screen
        // age	sex	trtbps	chol	fbs	restecg	exng
        var currTextPosy = this.persony + this.headRad + this.personWidth + 2*this.lineHeight;
        var currTextPosx = this.personx - this.personWidth;
        var patientTexty = this.persony - this.headRad - 1.5*this.lineHeight;
        

        ctx.font = this.largeFont;
        var patientTextx = this.personx - this.personWidth/2 + (this.personWidth/2 - ctx.measureText('Person ' + this.patientId).width/2)
        ctx.fillText('Person ' + this.patientId, patientTextx, patientTexty);
        
        //var attrText = this.personx - ctx.measureText('Information').width/2;
        var attrText = this.personx - this.personWidth;
        ctx.fillText('Information:', attrText, currTextPosy);

        ctx.font = this.smallFont;
        var attrText = this.personx - this.personWidth;
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Age: ' + this.age, attrText, currTextPosy);
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Sex: ' + this.sex, attrText, currTextPosy);
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Blood pressure: ' + this.bpressure, attrText, currTextPosy);
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Cholestrol level: ' + this.chol, attrText, currTextPosy);
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Abnormal blood sugar levels: ' + this.bsugar, attrText, currTextPosy);
        //currTextPosy = currTextPosy + 1.5*this.lineHeight;
        //ctx.fillText('Abnormal ECG: ' + this.restecg, attrText, currTextPosy);
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Just exercised: ' + this.exercise, attrText, currTextPosy);
        currTextPosy = currTextPosy + 1.5*this.lineHeight;
        ctx.fillText('Family history: ' + this.familyhist, attrText, currTextPosy);
        currTextPosy = currTextPosy + 2.5*this.lineHeight;
        
        ctx.font = this.largeFont;
        //var attrText = this.personx - ctx.measureText('Decision: Monitor').width/2;
        this.decisionTexty = currTextPosy;
        this.decisionTextx = attrText;
        ctx.fillText('Decision: ', attrText, currTextPosy);
        //ctx.fillText('Age:' + this.age, currTextPosx, currTextPosy);
        //console.log(this.sex, this.age, this.bpressure, this.chol, this.bsugar, this.exercise)
    }
  }


  // 400... I guess this height can always be fixed? Or at least the user will not be able to control it 
  // 1263

class FixedDecisionTree {
    constructor() {
        // this.treeTopx = 0.42*canvas.width;
        // this.treeTopy = 0.05*canvas.height;
        // this.topBranchLen = Math.round(canvas.width*0.2);
        // this.middleBranchLen = Math.round(canvas.width*0.14);
        // this.smallBranchLen = Math.round(canvas.width*0.10);

        // this.personx = 0.2*canvas.width;
        // this.persony = 0.25*canvas.height;
        // this.personWidth = 0.04*canvas.width;
        // this.headRad = 0.6*this.personWidth;

        this.treeTopx = Math.round(0.27*canvas.width);
        this.treeTopy = Math.round(0.05*canvas.height);
        this.topBranchLen = Math.round(canvas.width*0.13);
        this.middleBranchLen = Math.round(canvas.width*0.085);
        this.smallBranchLen = Math.round(canvas.width*0.04);

        this.personx = 0.2*canvas.width;
        this.persony = 0.25*canvas.height;
        this.personWidth = 0.04*canvas.width;
        this.headRad = 0.6*this.personWidth;

        this.currDrawId = 0;
        this.currStep = 0;
        this.numSteps = 20;

        this.baseTreeColor = "#1A1A1C";//"#000000";
        this.pathColor = "#8DC746";//"#00ff00";

        this.createTree();
        this.generatePerson(1);
        
    };

    createTree () {
        let branch1 = new DecisionBranch([this.treeTopx, this.treeTopy], this.topBranchLen, 'Just exercised?', 'No', 'Yes', false);
        let branch2 = new DecisionBranch(branch1.rightCorner, this.middleBranchLen, 'Blood pressure > 140', 'No', 'Yes', false);
        let branch3 = new DecisionBranch(branch1.leftCorner, this.middleBranchLen, 'Age > 50', 'No', 'Yes', false);
        let branch4 = new DecisionBranch(branch2.rightCorner, this.middleBranchLen, 'Family history?', 'No', 'Yes', false);

        let branch3_yes = new DecisionBranch(branch3.leftCorner, this.smallBranchLen, 'Monitor', 'No', 'Yes', true);
        let branch3_no = new DecisionBranch(branch3.rightCorner, this.smallBranchLen, 'Let go', 'No', 'Yes', true);
        let branch2_yes = new DecisionBranch(branch2.leftCorner, this.smallBranchLen, 'Monitor', 'No', 'Yes', true);
        let branch4_yes = new DecisionBranch(branch4.leftCorner, this.smallBranchLen, 'Monitor', 'No', 'Yes', true);
        let branch4_no = new DecisionBranch(branch4.rightCorner, this.smallBranchLen, 'Let go', 'No', 'Yes', true);

        this.drawList = [branch1, branch2, branch3, branch4, branch2_yes, branch3_yes, branch3_no, branch4_yes, branch4_no];

        this.pathDict = {
            "1,1": [branch1, branch3, branch3_yes],
            "1,0": [branch1, branch3, branch3_no],
            "0,1": [branch1, branch2, branch2_yes],
            "0,0,1": [branch1, branch2, branch4, branch4_yes],
            "0,0,0": [branch1, branch2, branch4, branch4_no]
          };

        this.arrayPath = [[this.treeTopx, this.treeTopy]];
    }

    generatePerson (firstTime) {

        //this.pathPts = [[this.treeTopx, this.treeTopy]];
        this.currDrawId = 0;
        this.currStep = 0;
        this.numSteps = 20;
        clearTimeout(this.timeoutEvent);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (firstTime == 0) {
            this.createTree();
            this.drawTree();
        }

        var infoElem = document.getElementById("personDec");
                infoElem.innerHTML = ""

        this.currPerson = new Patient(Math.round(10000*Math.random()), this.personx, this.persony,
                                        this.personWidth, this.headRad);
        this.addPersonInfo () 
        this.obtainPath(this.currPerson.decList);
    }


    addPersonInfo () {
        
        // So here we can just first check their gender and then assign them a name?
        if (this.currPerson.sex == "Man") {
            var nameID = Math.floor((maleNames.length-1)*Math.random());
            var infoElem = document.getElementsByClassName("personName");
            
            for (var i=0; i<infoElem.length; i++) {
                infoElem[i].innerHTML = maleNames[nameID];
            }
            
        } else {
            
            var nameID = Math.floor((femaleNames.length-1)*Math.random());
            var infoElem = document.getElementsByClassName("personName");
            for (var i=0; i<infoElem.length; i++) {
                infoElem[i].innerHTML = femaleNames[nameID];
            }
        }

        var HTMLids = ["personAge", "personSex", "personBP",
                        "personChol", "personBS", "personEx", "personHist"];
        var personAttr = [this.currPerson.age, this.currPerson.sex,
            this.currPerson.bpressure + ' mm Hg', this.currPerson.chol + ' mg/dl', this.currPerson.bsugar,
            this.currPerson.exercise, this.currPerson.familyhist];

        for (var i=0;i<HTMLids.length; i++) {
            var infoElem = document.getElementById(HTMLids[i]);
            infoElem.innerHTML = personAttr[i];
        }

        
    }

    drawTree() {
        ctx.strokeStyle = this.baseTreeColor;
        ctx.fillStyle = this.baseTreeColor;
        ctx.lineWidth = 2;
        for (var i=0; i<this.drawList.length; i++) {
            this.drawList[i].drawBase();
        }
    }

    redrawResized() {

        // Might not be needed

        canvas.height = box.clientHeight;
        canvas.width = box.clientWidth;
        // Update all parameters
        this.treeTopx = 0.42*canvas.width;
        this.treeTopy = 0.05*canvas.height;
        this.topBranchLen = Math.round(canvas.width*0.2);
        this.middleBranchLen = Math.round(canvas.width*0.14);
        this.smallBranchLen = Math.round(canvas.width*0.10);

        this.personx = 0.2*canvas.width;
        this.persony = 0.25*canvas.height;
        this.personWidth = 0.04*canvas.width;
        this.headRad = 0.6*this.personWidth;

        this.currDrawId = 0;
        this.currStep = 0;
        this.numSteps = 20;

        // Then we create new pereson and tree
        // And we just need to save the attributes for the person
        // And cancel the trajectory path if it has been started
        
        clearTimeout(this.timeoutEvent);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.createTree();
        this.drawTree();
        

    }

    obtainPath (pathList) {
        
        var currSubPath = this.pathDict['' + pathList];
        //console.log(currSubPath, '' + pathList)

        this.pathPts = [[this.treeTopx, this.treeTopy]];

        //console.log(pathList);
        for (var i=0; i<(pathList.length); i++) {
            
            this.pathPts.push(currSubPath[i].midCorner)
            
            // We go along the No-path in the tree
            if (pathList[i] == 0) {
                this.pathPts.push(currSubPath[i].rightCorner)
            } else {
                this.pathPts.push(currSubPath[i].leftCorner)
            }
        }
        this.pathPts.push(currSubPath[currSubPath.length - 1].midCorner)

    }

    drawSteps () {
        
        
        var currStart = this.pathPts[this.currDrawId];
        var currEnd = this.pathPts[this.currDrawId + 1];
        var currDistx = currEnd[0] - currStart[0];
        var currDisty = currEnd[1] - currStart[1];
        var currIntermediatex = currStart[0] + this.currStep/this.numSteps*currDistx; 
        var currIntermediatey = currStart[1] + this.currStep/this.numSteps*currDisty; 
        var currIntermediate = [currIntermediatex, currIntermediatey];
        //console.log('as',currStart, currIntermediate)
        
        this.drawPath(currIntermediate);
        
        this.currStep = this.currStep + 1;
        
        if (this.currStep > this.numSteps) {
            this.currDrawId = this.currDrawId + 1;
            this.currStep = 0;
            this.arrayPath.push(this.pathPts[this.currDrawId])
        }

        // I think the issue is that the "this" does not get carried back here
        // So maybe I should store it in self?
        //console.log(this.currDrawId, this.pathPts.length)
        if (this.currDrawId < (this.pathPts.length - 1)) {
            this.timeoutEvent = setTimeout(this.drawSteps.bind(this), 15);
        } else {
            var decTextx = this.currPerson.decisionTextx;
            var decTexty = this.currPerson.decisionTexty;
            var decFont = this.currPerson.largeFont;

            ctx.font = this.largeFont;
            var finalDec = this.currPerson.decList[this.currPerson.decList.length - 1];
            if (finalDec == 1) {
                var infoElem = document.getElementById("personDec");
                infoElem.innerHTML = "Monitor"
                //ctx.fillText('Decision: Monitor', decTextx, decTexty);
            } else {
                var infoElem = document.getElementById("personDec");
                infoElem.innerHTML = "Let go"
            }

        }
        

        // So here we call the function with a timeout?
        // and after that we just add one to currStep, check if it is more than the max
        // and if so we just add one to currDrawId
        // And when currDrawId reaches a certain value we just stop it


    }

    drawPath (currIntermediate) {
        //console.log('Drawing:', currIntermediate)

        // So clear canvas here
        ctx.fillStyle = "#ffffff";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawTree();

        ctx.strokeStyle = this.pathColor;

        // First we draw up until the latest corner
        if (this.arrayPath.length > 1) {

            for (var i=0; i<(this.arrayPath.length-1); i++) {
                ctx.beginPath();
                ctx.moveTo(this.arrayPath[i][0], this.arrayPath[i][1]);
                ctx.lineTo(this.arrayPath[i+1][0], this.arrayPath[i+1][1]);
                ctx.closePath();
                ctx.stroke();
            }

        }

        // Then we draw the latest bend
        ctx.beginPath();
        ctx.moveTo(this.arrayPath[this.arrayPath.length - 1][0], this.arrayPath[this.arrayPath.length - 1][1]);
        ctx.lineTo(currIntermediate[0], currIntermediate[1]);
        ctx.closePath();
        ctx.stroke();
        
    }

    // So a method here that takes a list of bools and just draws a green line along that path
    // So we need a list of at least length 2? And only 3 if we go to the bottom
    
}

var currPath = [1,0]

let fullDecTree = new FixedDecisionTree();
fullDecTree.drawTree();


window.addEventListener('resize', function() {
    //fullDecTree.redrawResized();

});

