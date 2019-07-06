//option to set numOfPanels with input prompt
var numOfPanels = 3
var cell = "";
var previousCell = "";
var backImage = "url('poring.jpg')";
var timer = 20;
var score = 0;
var highScore = 0;


window.onload = function(){
    createBoard();
    countDown(timer);
    nextPopup();
}


//createBoard works!
//when i run createBox();, it should create a 3 by 3 grid, and attach event listener for hit() on click to each
var createBoard = function(){
    for (i = 1; i < 4; i += 1){ //using 4 instead of 3 so I don't have to +1
        var row = document.createElement('div');
        row.setAttribute("class", "row")
        document.querySelector('.main').appendChild(row);
        for (j = 1; j < 4; j += 1){
            var col = document.createElement('span');
            col.setAttribute("class", `col${j}`);
            col.classList.add(`row${i}`);
            col.setAttribute("id", "box");
            col.addEventListener("click", hit)
            row.appendChild(col);
        }
    }
}


// on click on span
var hit = function(){
    console.log("hit!");
    clickTarget(event);

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