
    // The curves have been calculated by using Gaussian Processes
    // The numbers are just stored here so it the graphic can easily be displayed
    var xCircle = [0.16666667, 0.18181818, 0.1969697 , 0.21212121, 0.22727273,
        0.24242424, 0.25757576, 0.27272727, 0.28787879, 0.3030303 ,
        0.31818182, 0.33333333, 0.66666667, 0.68181818, 0.6969697 ,
        0.71212121, 0.72727273, 0.74242424, 0.75757576, 0.77272727,
        0.78787879, 0.8030303 , 0.81818182, 0.83333333];
    var yCircle = [0.36312058, 0.24621809, 0.17490867, 0.20651599, 0.29128249,
        0.34589999, 0.46522849, 0.4983809 , 0.5979323 , 0.63118239,
        0.6065357 , 0.64952166, 0.73157189, 0.78613727, 0.73427674,
        0.67898813, 0.53295608, 0.61891023, 0.70545551, 0.73283022,
        0.67463788, 0.56105783, 0.5703546 , 0.65879993];
    var xMeanLine = [0.        , 0.01010101, 0.02020202, 0.03030303, 0.04040404,
        0.05050505, 0.06060606, 0.07070707, 0.08080808, 0.09090909,
        0.1010101 , 0.11111111, 0.12121212, 0.13131313, 0.14141414,
        0.15151515, 0.16161616, 0.17171717, 0.18181818, 0.19191919,
        0.2020202 , 0.21212121, 0.22222222, 0.23232323, 0.24242424,
        0.25252525, 0.26262626, 0.27272727, 0.28282828, 0.29292929,
        0.3030303 , 0.31313131, 0.32323232, 0.33333333, 0.34343434,
        0.35353535, 0.36363636, 0.37373737, 0.38383838, 0.39393939,
        0.4040404 , 0.41414141, 0.42424242, 0.43434343, 0.44444444,
        0.45454545, 0.46464646, 0.47474747, 0.48484848, 0.49494949,
        0.50505051, 0.51515152, 0.52525253, 0.53535354, 0.54545455,
        0.55555556, 0.56565657, 0.57575758, 0.58585859, 0.5959596 ,
        0.60606061, 0.61616162, 0.62626263, 0.63636364, 0.64646465,
        0.65656566, 0.66666667, 0.67676768, 0.68686869, 0.6969697 ,
        0.70707071, 0.71717172, 0.72727273, 0.73737374, 0.74747475,
        0.75757576, 0.76767677, 0.77777778, 0.78787879, 0.7979798 ,
        0.80808081, 0.81818182, 0.82828283, 0.83838384, 0.84848485,
        0.85858586, 0.86868687, 0.87878788, 0.88888889, 0.8989899 ,
        0.90909091, 0.91919192, 0.92929293, 0.93939394, 0.94949495,
        0.95959596, 0.96969697, 0.97979798, 0.98989899, 1.        ];
    var yMeanLine = [0.94746661, 0.92861983, 0.90374077, 0.87289063, 0.83632495,
        0.7945033 , 0.74809104, 0.69795183, 0.64513054, 0.59082645,
        0.53635721, 0.48311483, 0.4325151 , 0.38594283, 0.34469541,
        0.30992751, 0.28259992, 0.26343542, 0.25288427, 0.25110155,
        0.25793782, 0.27294407, 0.29539091, 0.32430127, 0.35849491,
        0.39664264, 0.43732715, 0.47910738, 0.52058281, 0.56045438,
        0.59757865, 0.63101266, 0.66004714, 0.6842266 , 0.70335581,
        0.71749259, 0.72692797, 0.73215516, 0.73382973, 0.73272326,
        0.72967355, 0.72553421, 0.72112626, 0.71719456, 0.71437089,
        0.71314558, 0.71384864, 0.71664089, 0.72151513, 0.72830656,
        0.73671142, 0.74631249, 0.75660935, 0.76705182, 0.77707429,
        0.78612907, 0.79371708, 0.79941407, 0.80289139, 0.8039303 ,
        0.80242944, 0.79840537, 0.7919865 , 0.78340128, 0.77296141,
        0.76104157, 0.74805681, 0.7344393 , 0.72061556, 0.70698578,
        0.693906  , 0.68167424, 0.67052103, 0.66060453, 0.65201025,
        0.64475497, 0.63879418, 0.6340324 , 0.63033532, 0.6275429 ,
        0.62548243, 0.62398079, 0.62287507, 0.62202116, 0.62129995,
        0.62062094, 0.61992344, 0.6191755 , 0.61837103, 0.6175255 ,
        0.6166708 , 0.61584965, 0.61511016, 0.61450088, 0.61406655,
        0.61384495, 0.61386475, 0.6141444 , 0.61469202, 0.61550605];
    var yUpperLine = [0.4432732 , 0.44828308, 0.44940698, 0.44653442, 0.43968036,
        0.42899692, 0.41477995, 0.39746953, 0.37764371, 0.35600483,
        0.3333583 , 0.31058355, 0.28859747, 0.26831031, 0.25057374,
        0.23612129, 0.2255065 , 0.21906993, 0.21703695, 0.21985486,
        0.22844379, 0.24375213, 0.26607591, 0.29490917, 0.3291744 ,
        0.3674958 , 0.4083998 , 0.4504173 , 0.49207858, 0.53181262,
        0.56781639, 0.59809323, 0.62088744, 0.63522024, 0.6409417 ,
        0.63844742, 0.62847001, 0.6119944 , 0.59021357, 0.56448268,
        0.53626317, 0.50705962, 0.47835427, 0.45154366, 0.42788113,
        0.40842817, 0.39401681, 0.38522427, 0.38236064, 0.38546939,
        0.39433995, 0.40853104, 0.42740287, 0.45015633, 0.47587648,
        0.50357833, 0.53225224, 0.56090703, 0.58860867, 0.61451302,
        0.63789126, 0.6581468 , 0.67482266, 0.68759825, 0.69627412,
        0.7007455 , 0.70097622, 0.69702377, 0.68922476, 0.67851145,
        0.66636968, 0.65423718, 0.64304143, 0.63319883, 0.62479925,
        0.61777252, 0.61198233, 0.60723208, 0.60318345, 0.59922988,
        0.59444734, 0.58778761, 0.57844611, 0.56604171, 0.55051258,
        0.53196402, 0.51059271, 0.48666361, 0.4605022 , 0.43248647,
        0.40303522, 0.37259362, 0.34161722, 0.31055607, 0.27983982,
        0.24986465, 0.2209827 , 0.19349398, 0.16764113, 0.14360689];
    var yLowerLine = [1.45166001, 1.40895659, 1.35807455, 1.29924685, 1.23296953,
        1.16000967, 1.08140212, 0.99843413, 0.91261738, 0.82564806,
        0.73935612, 0.65564611, 0.57643272, 0.50357535, 0.43881709,
        0.38373373, 0.33969335, 0.30780091, 0.2887316 , 0.28234824,
        0.28743184, 0.302136  , 0.32470591, 0.35369337, 0.38781542,
        0.42578949, 0.46625451, 0.50779746, 0.54908704, 0.58909613,
        0.6273409 , 0.66393209, 0.69920684, 0.73323295, 0.76576991,
        0.79653777, 0.82538592, 0.85231593, 0.8774459 , 0.90096383,
        0.92308393, 0.94400879, 0.96389826, 0.98284547, 1.00086066,
        1.017863  , 1.03368047, 1.04805752, 1.06066963, 1.07114372,
        1.07908289, 1.08409394, 1.08581583, 1.08394732, 1.07827209,
        1.06867982, 1.05518193, 1.03792111, 1.01717411, 0.99334758,
        0.96696762, 0.93866394, 0.90915034, 0.8792043 , 0.84964871,
        0.82133764, 0.7951374 , 0.77185482, 0.75200637, 0.73546012,
        0.72144231, 0.70911129, 0.69800062, 0.68801022, 0.67922125,
        0.67173742, 0.66560603, 0.66083271, 0.65748718, 0.65585591,
        0.65651753, 0.66017398, 0.66730403, 0.67800061, 0.69208731,
        0.70927786, 0.72925418, 0.7516874 , 0.77623986, 0.80256454,
        0.83030639, 0.85910569, 0.88860311, 0.91844568, 0.94829328,
        0.97782526, 1.0067468 , 1.03479482, 1.0617429 , 1.0874052 ];




var canvas = document.getElementById("dataScienceCanvas");
var ctx = canvas.getContext("2d");


var canvasBox = document.getElementById("indexDataScienceBox");
function drawDataScienceFig() {

    // Draw grid + scatter points
    this.drawBase = function() {
        canvas.height = canvasBox.clientHeight;
        canvas.width = canvasBox.clientWidth;

        var numGridLines = 10; // Number of gridlines in horisontal direction
        var gridDist = Math.round(canvas.width / numGridLines); 
        var numHorLines = Math.round(canvas.height / gridDist);

        
        ctx.fillStyle = '#468C5F'; // scatter points color
        
        
        
        ctx.strokeStyle = "#394146"; // Gridline colors
        ctx.lineWidth = 0.5;
        
        // CLASSIC STYLE
        //ctx.fillStyle = '#94CB5E';
        //ctx.strokeStyle = "#000000";
        //ctx.lineWidth = 2;

        var startVert = Math.round(gridDist / 2);

        // Draw vertical gridlines
        for (var i=0; i<numGridLines; i++) {
            ctx.beginPath();
            ctx.moveTo(startVert + i*gridDist, 0);
            ctx.lineTo(startVert + i*gridDist,canvas.height);
            ctx.closePath();
            ctx.stroke();
        }

        // Draw horisontal gridlines
        for (var i=0; i<numHorLines; i++){
            ctx.beginPath();
            ctx.moveTo(0, startVert + i*gridDist);

            ctx.lineTo(canvas.width,startVert + i*gridDist);
            ctx.closePath();
            ctx.stroke();
        }

        // Draw the scatter points
        for (var i=0; i<xCircle.length; i++){
            ctx.beginPath();
            ctx.arc(canvas.width*xCircle[i],canvas.height*yCircle[i], 3, 0, 2 * Math.PI);
            ctx.fill()
            
        }
        
    }


    var confStepPlot = 1; // The index for how long (distance) to plot the curve
    var confTimeStep = 5; // Time step for plotting curves
    var currentTimeOutId; // Store eventhandler for plotting
    var stopForward, stopBackward;
    var mouseHovering = false; // To enable graphics to work for tabbing as well

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function plotConfForward() {
        
        clearCanvas()
        myDataScienceFig.drawBase();
        plotConfidenceBand(confStepPlot);
        confStepPlot = confStepPlot + 1;
        confStepPlot = Math.min(confStepPlot, xMeanLine.length);
        if (confStepPlot <= xMeanLine.length && !stopForward ) {
            currentTimeOutId = setTimeout(plotConfForward, confTimeStep);
        }
        
    }

    function plotConfBackward() {
        clearCanvas()
        myDataScienceFig.drawBase();
        plotConfidenceBand(confStepPlot);
        confStepPlot = confStepPlot - 1;
        confStepPlot = Math.max(confStepPlot, 1);
        if (confStepPlot > 1 && !stopBackward) {
            currentTimeOutId = setTimeout(plotConfBackward, confTimeStep);
        } else if (confStepPlot == 1) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            myDataScienceFig.drawBase();
        }
        
    }

    function plotConfidenceBand(stepLength){
        
        ctx.strokeStyle = "#32bcb0";
        //ctx.fillStyle = 'rgba(193,216,254,0.5)'
        ctx.fillStyle = 'rgba(130,130,200,0.6)'
        for (var i=0; i<stepLength; i++){
            
            if (i == 0){
                ctx.beginPath();
                ctx.moveTo(canvas.width*xMeanLine[i], canvas.height*yUpperLine[i]);
            } else {
                ctx.lineTo(canvas.width*xMeanLine[i], canvas.height*yUpperLine[i]);
            }
            
            
        }
        //ctx.stroke()

        //ctx.strokeStyle = "#28C4C9";
        for (var i=0; i<=stepLength; i++){
            
            if (i == 0){
                //ctx.beginPath();
                //ctx.moveTo(canvas.width*xMeanLine[stepLength-i], canvas.height*yLowerLine[stepLength-i]);
                ctx.lineTo(canvas.width*xMeanLine[stepLength-i], canvas.height*yLowerLine[stepLength-i]);
            } else {
                ctx.lineTo(canvas.width*xMeanLine[stepLength-i], canvas.height*yLowerLine[stepLength-i]);
            }
            
            
        }
        ctx.closePath()
        ctx.fill();


        ctx.strokeStyle = "#32bcb0";
        ctx.lineWidth = canvas.width/300;
        for (var i=0; i<stepLength; i++){
            
            if (i == 0){
                ctx.beginPath();
                ctx.moveTo(canvas.width*xMeanLine[i], canvas.height*yMeanLine[i]);
            } else {
                ctx.lineTo(canvas.width*xMeanLine[i], canvas.height*yMeanLine[i]);
            }
            
            
        }
        ctx.stroke()
        //ctx.stroke()
    }
    
    this.drawBase();
    
    canvas.addEventListener('mouseover', e => {
        
        mouseHovering = true;
        stopForward = false;
        stopBackward = true;
        //console.log(confStepPlot, stopForward, stopBackward)
        clearTimeout(currentTimeOutId);

        plotConfForward();
    });

    canvasBox.addEventListener('mouseleave', e => {
        
        mouseHovering = false;
        stopForward = true;
        stopBackward = false;
        clearTimeout(currentTimeOutId);
        
        plotConfBackward()
        
    });

    

    canvasBox.addEventListener('click', e => {
        console.log('New page now!')
        //clearTimeout(currentTimeOutId);
    });

    canvasBox.addEventListener("keydown", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        //console.log(event.key == 'Enter');
        if (event.key === 'Enter') {
            console.log('New page now!')
        }
      });

      canvasBox.addEventListener('focus', (event) => {
        
        if (!mouseHovering){
            stopForward = false;
            stopBackward = true;
            //console.log(confStepPlot, stopForward, stopBackward)
            clearTimeout(currentTimeOutId);

            plotConfForward();
        }
        
        
      });

      canvasBox.addEventListener('focusout', (event) => {
        
        if (!mouseHovering){
            mouseHovering = false;
            stopForward = true;
            stopBackward = false;
            clearTimeout(currentTimeOutId);
            
            plotConfBackward()
        }
        
      });

      


      
}


myDataScienceFig = new drawDataScienceFig();