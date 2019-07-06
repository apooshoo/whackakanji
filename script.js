//option to set numOfPanels with input prompt
var numOfPanels = 3
var cell = "";
var previousCell = "";
var backImage = "url('poring.jpg')"; //delete this after you switch to kanji inputs!
var timer = 20;
var score = 0;
var highScore = 0;

var randomKanji = "";
var searchGrade = 6; //vary this on input!

var responseHandler = function(){
    var response = JSON.parse(this.responseText);
    // console.log(response);
    //include 0 up to response.length minus 1
    var kanjiIndex = Math.floor(Math.random() * response.length);
    randomKanji = response[kanjiIndex];
}

var getRandomKanji = function(){
    var request = new XMLHttpRequest();
    //your request does responseHandler on load
    request.addEventListener("load", responseHandler);
    //open readies the system, and targets the URL
    request.open("GET", `https://kanjiapi.dev/v1/kanji/grade-${searchGrade}`);
    request.send();
}


window.onload = function(){
    createBoard();
    countDown(timer);
    nextPopup();
}


//createBoard works!
//when i run createBox();, it should create a 3 by 3 grid, and attach event listener for hit() on click to each
var createBoard = function(){
    getRandomKanji();
    for (i = 1; i < 4; i += 1){ //using 4 instead of 3 so I don't have to +1
        var row = document.createElement('div');
        row.setAttribute("class", "row")
        document.querySelector('.main').appendChild(row);
        for (j = 1; j < 4; j += 1){
            var col = document.createElement('span');
            col.setAttribute("class", `col${j}`);
            col.classList.add(`row${i}`);
            col.setAttribute("id", "box");
            col.addEventListener("click", clickTarget)
            row.appendChild(col);
        }
    }
}

//getRandomCell works! generates random cell and assigns to cell
var getRandomCell = function(){
    var randomX = Math.floor((Math.random() * 3) + 1);
    var randomY = Math.floor((Math.random() * 3) + 1);
    cell = document.querySelector(`.row${randomX}.col${randomY}`);
}


var clickTarget = function(event){
    errorCheck(event);
    event.target.style.backgroundImage = backImage;
    event.target.innerHTML === "";
    previousCell = event.target;
    cell = "";
    addScore();
    pushScore();
    nextPopup();
}

//combine with click target
var nextPopup = function(){
    if (previousCell){
        previousCell.style.backgroundImage = "";
        previousCell.innerHTML = "";
    }
    getRandomCell();
    cell.innerHTML = "Click here!";
}

var errorCheck = function(event){
    if (event.target === cell){
        console.log("Next!");
    } else {
        console.log("You Lost!");
        resetBoard();
    }
}

var minus = function(){
    var time = document.querySelector('.time');
    timer -= 1;
    time.innerHTML = timer;
    if (timer === 0){
        clearInterval(countDown);
        console.log("Time's up, try again!");
        resetBoard();
        timer = 20;
        nextPopup();
    }
}
var countDown = function(){
    var ticktock = setInterval(minus, 1000);
}

var resetBoard = function(){
    var mainBoard = document.querySelector('.main');
    while (mainBoard.hasChildNodes()){
        mainBoard.removeChild(mainBoard.lastChild);
    }
    cell.innerHTML = "";
    previousCell.innerHTML = "";
    timer = 20;
    score = 0;
    pushScore();
    createBoard();
    return;
}

var addScore = function(){
    score += 1;
    if (score > highScore){
        highScore = score;
    }
}

var pushScore = function(){
    var scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerHTML = score;
    var highScoreDisplay = document.querySelector('.highscore');
    highScoreDisplay.innerHTML = highScore;
}

//----------------------------AJAX STUFF!

//site used: https://kanjiapi.dev/
//peculiarities: search by grades 1-6 (elementary, 1000+) and 8 (all of secondary, another 1000+)
//eg:"https://kanjiapi.dev/v1/kanji/grade-8"


///USING THE CODE BELOW

// var response = "";
// var randomKanji = "";
// var searchGrade = 6; //vary this on input!

// var responseHandler = function(){
//     response = JSON.parse(this.responseText);
//     // console.log(response);
//     //include 0 up to response.length minus 1
//     var kanjiIndex = Math.floor(Math.random() * response.length);
//     randomKanji = response[kanjiIndex];
// }

// var getRandomKanji = function(){
//     var request = new XMLHttpRequest();
//     //your request does responseHandler on load
//     request.addEventListener("load", responseHandler);
//     //open readies the system, and targets the URL
//     request.open("GET", `https://kanjiapi.dev/v1/kanji/grade-${searchGrade}`);
//     request.send();
// }