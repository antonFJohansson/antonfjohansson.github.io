

// Retrives the info from the blogInfo.js file
function retrieveOriginalInfo() {

    var startInd, endInd;
    var strActive = false;
    allStore = [];

    var tempStore = {};
    var infoOrder = ['Title', 'Description', 'Date', 'HTMLPage', 'Tags']
    var currInfoInd = 0;

    for (var i=0; i<allBlogInfo.length; i++) {

        if (allBlogInfo[i] == '%' || i == (allBlogInfo.length - 1)) {
            allStore[allStore.length] = tempStore;
            tempStore = {};
            currInfoInd = 0;
        }

        if (allBlogInfo[i] == '[') {
            strActive = true;
        }
        if (strActive) {
            if (allBlogInfo[i] == ':') {
                startInd = (i+1)
            }

            if (allBlogInfo[i] == ']') {
                tempStore[infoOrder[currInfoInd]] = allBlogInfo.substring(startInd, i)
                currInfoInd = currInfoInd + 1;
            }
        }
    }
    return allStore
}


// The box with info of the blog posts
function createBlogBox(currInfo) {
    var mainElem = document.getElementById("main");
    var wrapObj = document.getElementById("contentWrapper");

    var boxDiv = document.createElement('div');

    var p1 = document.createElement('p');
    var p2 = document.createElement('p');

    var dateSpan = document.createElement('span');
    var titleLink = document.createElement('a');
    var contentSpan = document.createElement('span');

    
    boxDiv.setAttribute('class', 'blogInfoBox');
    dateSpan.setAttribute('class', 'blogInfoDate');
    
    titleLink.setAttribute('class', 'blogInfoTitle');
    titleLink.setAttribute('href', '../blog_posts/' + currInfo['HTMLPage'] + '.html');
    
    
    

    contentSpan.setAttribute('class', 'blogInfoText');
    //contentSpan.setAttribute('class', 'secondaryFontColor');
    //contentSpan.setAttribute('class', 'siteReadingTextFont');
    
    dateSpan.innerHTML = currInfo['Date']; 
    titleLink.innerHTML = currInfo['Title'];
    contentSpan.innerHTML =  currInfo['Description'];

    p1.appendChild(dateSpan);
    p2.appendChild(titleLink);

    boxDiv.appendChild(p1);
    boxDiv.appendChild(p2);
    boxDiv.appendChild(contentSpan);
    
    wrapObj.appendChild(boxDiv)

    
    //mainElem.appendChild(boxDiv)
    

}

// Add the buttons and the wrapper to store everything
function createCurrentPage(allStore) {

    // Remove and then add items back to make sure that the layout is the same
    var wrapObj = document.getElementById("contentWrapper");
    wrapObj.remove();

    var btnLeft = document.getElementById("leftMainBtn");
    var btnRight = document.getElementById("rightMainBtn");
    btnLeft.remove();
    btnRight.remove();

    var bottomPadding = document.getElementById('bottomPadding');
    bottomPadding.remove()


    var wrapObj = document.createElement('div');
    wrapObj.setAttribute('id', 'contentWrapper')
    var mainElem = document.getElementById("main");
    mainElem.appendChild(wrapObj);

    // Append all the content
    var btnLeft = document.createElement('button')
    var btnRight = document.createElement('button')
    btnLeft.setAttribute('class', 'flipPageBtn')
    btnRight.setAttribute('class', 'flipPageBtn')
    btnLeft.setAttribute('id', 'leftMainBtn')
    btnRight.setAttribute('id', 'rightMainBtn')
    btnLeft.setAttribute('onclick', 'goToRecentPosts()')
    btnRight.setAttribute('onclick', 'goToPreviousPosts()')
    btnLeft.innerHTML = "Newer Posts";
    btnRight.innerHTML = "Older Posts";

    mainElem.appendChild(btnLeft);
    mainElem.appendChild(btnRight);

    var bottomPadding = document.createElement('div')
    bottomPadding.setAttribute('id', 'bottomPadding')
    mainElem.appendChild(bottomPadding);


    currEndPoint = Math.min(allStore.length, currBlogInd*pageLimit + pageLimit);

    for (var i=(currBlogInd*pageLimit); i<currEndPoint; i++) {
        createBlogBox(allStore[i])        
    }

    if (allStore.length <= pageLimit) {
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'none';
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'none';
    } else if (currBlogInd != 0) {
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'flex';
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'flex';
    } else {
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'none';
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'flex';
    }

    //currBlogInd = currEndPoint;

}

function goToRecentPosts() {
//    console.log(currBlogInd)

    currBlogInd = Math.max(currBlogInd - 1,0);

    createCurrentPage(reducedAllStore);

    if (currBlogInd == 0) {
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'none';
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'flex';
    } else {
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'flex';
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'flex';
    }

    
    document.body.scrollTop = 200;
    document.documentElement.scrollTop = 200;
    //var gridCell = document.getElementById('rightGrid');
    //gridCell.scrollTop = 0;
    
}

function goToPreviousPosts() {
    //console.log('back')
    
    //console.log('backButton', currBlogInd, maxPages)
    currBlogInd = Math.min(currBlogInd + 1, maxPages);
    createCurrentPage(reducedAllStore);

    if (currBlogInd == maxPages) {
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'none';
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'flex';
    } else {
        var currBtn = document.getElementById("rightMainBtn");
        currBtn.style.display = 'flex';
        var currBtn = document.getElementById("leftMainBtn");
        currBtn.style.display = 'flex';
    }

    // Scroll to top when pressing the button

    document.body.scrollTop = 200;
    document.documentElement.scrollTop = 200;
    //var gridCell = document.getElementById('rightGrid');
    //gridCell.scrollTop = 0;
    
}

// We split title, document ,description and tags so the user can search on those.
function createSearchWords() {
    var p1, p2, p3
    for (var i=0; i<allStore.length; i++) {
        p1 = allStore[i]['Title'].toLowerCase().split(' ');
        p2 = allStore[i]['Description'].toLowerCase().split(' ');
        p3 = allStore[i]['Tags'].toLowerCase().split(', ');
        allStore[i]['SearchWords'] = (p1.concat(p2)).concat(p3)
    }
}

// See if the searchword is included in any of the possible search terms
function searchBlogPost(searchStr) {

    var currWords, tempInfo;
    tempInfo = [];
    var foundStr;
    for (var i=0; i<allStore.length; i++) {
        currWords = allStore[i]['SearchWords']
        foundStr = false;
        console.log(currWords)
        for (var j=0; j<currWords.length; j++) {
            if (foundStr) {
                continue;
            }

            if (currWords[j].includes(searchStr)) {
                tempInfo[tempInfo.length] = allStore[i]
                foundStr = true;
            }
        }
    }

    return tempInfo
}

//createBlogBox(allStore[0])

// Here we search for the string among the posts
// And update the blog posts accordingly
function retrieveSearchWord() {
    
    //console.log('a')

    currBlogInd = 0;
    searchStr = searchForm.value.toLowerCase();
    //console.log(searchStr.length)
    if (searchStr.length > 0) {
        
        reducedAllStore = searchBlogPost(searchStr);
        createCurrentPage(reducedAllStore);
        maxPages = Math.ceil(reducedAllStore.length / pageLimit) - 1;
    } else {
        

        /* var elem = document.getElementById('rightMainBtn');
        console.log(elem) */

        reducedAllStore = allStore;
        
        createCurrentPage(reducedAllStore);
        maxPages = Math.ceil(reducedAllStore.length / pageLimit) - 1;

        //var elem = document.getElementById('rightMainBtn');
        //console.log(elem)
    }

    
    // Maybe need to catch when searchfield is empty?
    //console.log(searchForm.value);
}
// This function was retrieved from StackOverflow
// Link: https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}










var allStore; // All blog information is stored here

allStore = retrieveOriginalInfo();
var lightModeActive = false;
var searchForm = document.getElementById("searchBlogPosts");
searchForm.addEventListener('input', retrieveSearchWord);

createSearchWords(); 
var searchStr;
//console.log('NLP'.includes('NLP'))
var reducedAllStore = allStore;
var pageLimit = 4;
var currBlogInd = 0;
var currEndPoint;
var maxPages = Math.ceil(allStore.length / pageLimit) - 1;

createCurrentPage(allStore);

/* // When the user clicks on one of the previous boxes, we should sort the blog posts
var params = getQueryParams(window.location.href);
//console.log(Object.keys(params).length)
if (Object.keys(params).length > 0) {
    var searchObj;
    for (var key in params){
        searchObj = params[key]//console.log(params[key])
    }
    var elem = document.getElementById('searchBlogPosts')
    elem.value = searchObj;
    retrieveSearchWord()
}
 */

// Need to run this on pageshow since otherwise there is an issue when 
// having the search form filled, then removing it, going to new page and pressing back.
window.onpageshow = function(event) {
    // When the user clicks on one of the previous boxes, we should sort the blog posts
var params = getQueryParams(window.location.href);
//console.log(Object.keys(params).length)
if (Object.keys(params).length > 0) {
    var searchObj;
    for (var key in params){
        searchObj = params[key]//console.log(params[key])
    }
    var elem = document.getElementById('searchBlogPosts')
    elem.value = searchObj;
    retrieveSearchWord()
}
};