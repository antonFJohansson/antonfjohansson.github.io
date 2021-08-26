var canvas = document.getElementById("canvasTreeTraining1");
var ctx = canvas.getContext("2d");
var box = document.getElementById("decisionTreeTrainingBox1");

//var dpr = window.devicePixelRatio || 1;


canvas.height = box.clientHeight;//*dpr;
canvas.width = box.clientWidth;//*dpr;
//ctx.scale(dpr, dpr)

// I might need to rename this canvas context later if I also want other canvas at the same time...
// So these globals would need to be renamed or put inside some function
// I can think about it


// So we create a plot class that we can use in the future as well?
class plotLibraryGeneralPlot {
    constructor(x,y,w,h, yAxisDisplacement, xAxisDisplacement) {
      this.topleftcornerx = Math.round(x);
      this.topleftcornery = Math.round(y);
      this.gridWidth = Math.round(w);
      this.gridHeight = Math.round(h);
      this.yAxisDisplacement = yAxisDisplacement;
      this.xAxisDisplacement = xAxisDisplacement;

      this.strokeColor = '#000000';
      this.showGridLines = true;
      this.numGridLines = 0;
      this.pointList = [];

      this.obtain_axis_coords();

    };

    obtain_axis_coords () {
        var yAxisStartx = this.topleftcornerx + this.yAxisDisplacement*this.gridWidth;
        var yAxisStarty = this.topleftcornery;
        var yAxisEndx = yAxisStartx;
        var yAxisEndy = yAxisStarty + this.gridHeight;

        var xAxisStartx = this.topleftcornerx;
        var xAxisStarty = this.topleftcornery + this.xAxisDisplacement*this.gridHeight;
        var xAxisEndx = xAxisStartx + this.gridWidth;
        var xAxisEndy = xAxisStarty;
        //console.log(this.yAxisDisplacement, this.w)

        this.xAxisStart = [xAxisStartx, xAxisStarty];
        this.xAxisEnd = [xAxisEndx, xAxisEndy];
        this.yAxisStart = [yAxisStartx, yAxisStarty];
        this.yAxisEnd = [yAxisEndx, yAxisEndy];
    }

    set_xlim(start, end) {
        this.xlimStart = start;
        this.xlimEnd = end;
    }
    
    set_ylim(start, end) {
        this.yLimStart = start;
        this.yLimEnd = end;
    }

    set_xticks() {

    }

    set_yticks() {

    }

    draw_line(startPt, endPt, color) {

        if (color == undefined) {
            ctx.strokeStyle = this.strokeColor;
        } else {
            ctx.strokeStyle = color;
        }

        ctx.beginPath();
        ctx.moveTo(Math.round(startPt[0]), Math.round(startPt[1]));
        ctx.lineTo(Math.round(endPt[0]), Math.round(endPt[1]));
        ctx.closePath();
        ctx.stroke();
    }

    draw_plot() {

        this.draw_line(this.yAxisStart, this.yAxisEnd);
        
        this.draw_line(this.xAxisStart, this.xAxisEnd);
    } 


};


var x = 0.1*canvas.width;
var y = 0.1*canvas.height;
var w = 0.8*canvas.width;
var h = 0.8*canvas.height;
var yAxisDisplacement = 0.2;
var xAxisDisplacement = 0.8;



let plotTr1 = new plotLibraryGeneralPlot(x,y,w,h, yAxisDisplacement, xAxisDisplacement);
plotTr1.draw_plot();