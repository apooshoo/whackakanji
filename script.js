//option to set numOfPanels with input prompt
var numOfPanels = 3
var cell = null;
var previousCell = null;
var backImage = "url('poring.jpg')";
// background-image: url('memeface.png');

window.onload = function(){
    createBoard();
    nextPopup();
}

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
//when i run createBox();, it should create a 3 by 3 grid, and attach event listener for hit() on click to each

var hit = function(){
    console.log("hit!");
    // getRandomCell();
    clickTarget(event);
    nextPopup();
}


//getRandomCell works!
var getRandomCell = function(){
    var randomX = Math.floor((Math.random() * 3) + 1);
    console.log("xcoord" + randomX);
    var randomY = Math.floor((Math.random() * 3) + 1);
    console.log("ycoord" + randomY);
    cell = document.querySelector(`.row${randomX}.col${randomY}`);
    console.log("Cell: " + cell);
}

var clickTarget = function(event){
    if (previousCell){
        previousCell.style.backgroundImage = null;
        previousCell.innerHTML = null;
    }
    errorCheck(event);
    getRandomCell();
    event.target.style.backgroundImage = backImage;
    event.target.innerHTML === null;
    previousCell = event.target;
}

//combine with click target
var nextPopup = function(){
    getRandomCell();
    cell.innerHTML = "Click here!";
}

var errorCheck = function(event){
    if (event.target === cell){
        console.log("Next!");
    } else {
        console.log("You Lost!");
    }
}