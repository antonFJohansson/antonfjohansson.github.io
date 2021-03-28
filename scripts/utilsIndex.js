


function shiftToBlogPosts(order) {


    var dataScienceBoxIndex = document.getElementById('r1')
    var programmingBoxIndex = document.getElementById('r2')
    var artBoxIndex = document.getElementById('r3')
    var allBoxIndex = document.getElementById('r4')

    function shiftDataScience() {
        dataScienceBoxIndex.style.left = '150%';
    }

    function shiftProgramming() {
        programmingBoxIndex.style.left = '150%';
    }

    function shiftAll() {
        allBoxIndex.style.left = '150%';
    }

    function shiftArt() {
        artBoxIndex.style.bottom = '-150%';
    }

    var currFuncIndex = 0;
    var currBox;
    var functionTimeOut = 300;
    var seenBoxes = 0;

    function shiftBoxes() {

        currBox = order[currFuncIndex];

        if (currBox == 0) {
            shiftDataScience();
            seenBoxes = seenBoxes + 1;
        }
        else if (currBox == 1) {
            shiftProgramming();
            seenBoxes = seenBoxes + 1;
        }
        if (currBox == 2) {
            shiftAll();
            seenBoxes = seenBoxes + 1;
        }
        if (currBox == 3) {
            shiftArt();
            seenBoxes = seenBoxes + 1;
        }
        
        console.log('klsadjlkajd')

        if (seenBoxes < 4) {
            window.setTimeout(shiftBoxes, functionTimeOut)
        } else {
            var stateObj = 'hej';
            var loc = window.location.pathname;
            var dir = loc.substring(0, loc.lastIndexOf('/'));
            console.log(dir)
            history.pushState(stateObj, "page 2", "#/blogPosts.html")
        }
        currFuncIndex = currFuncIndex + 1;

    }
    shiftBoxes()

    /* dataScienceBoxIndex.classList.add('slideAwayLeftBox')
    programmingBoxIndex.classList.add('slideAwayLeftBox')
    artBoxIndex.classList.add('slideAwayDownBox')
    allBoxIndex.classList.add('slideAwayLeftBox') */

}









