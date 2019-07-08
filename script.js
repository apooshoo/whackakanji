//option to set numOfPanels with input prompt
var numOfPanels = 3
var cell = "";
var previousCell = "";
var previousFake = "";
var timer = 20;
var score = 0;
var highScore = 0;

var randomKanji = "";
var fakeKanji = "";
var searchGrade = 8; //vary this on input!

var responseHandler = function(){
    var response = JSON.parse(this.responseText);
    var kanjiIndex = Math.floor(Math.random() * response.length);
    randomKanji = response[kanjiIndex];
    let target = document.querySelector('.goalkanji');
    target.innerHTML = "Target Kanji: " + randomKanji;
    makeDiv();
}


var getRandomKanji = function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", `https://kanjiapi.dev/v1/kanji/grade-${searchGrade}`);
    request.send();
    console.log(randomKanji);
}

var responseHandler2 = function(){
    var response2 = JSON.parse(this.responseText);
    var kanji2Index = Math.floor(Math.random() * response2.length);
    fakeKanji = response2[kanji2Index];
    makeFakeDiv();
}

var getFakeKanji = function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler2);
    request.open("GET", `https://kanjiapi.dev/v1/kanji/grade-${searchGrade}`);
    request.send();
    console.log(fakeKanji);
}

//makediv in getrandomkanji
window.onload = function(){
    getRandomKanji();
    getFakeKanji();
    countDown(timer);
}

var divSize = 75;
var newDiv = "";
var fakeDiv = "";
var divContainer = document.querySelector('.main');
var divCounter = 0;
var fakeDivCounter = 0;

var makeDiv = function(){
    console.log("real kanji: " + randomKanji);
    newDiv = document.createElement('div');
    divCounter += 1;
    newDiv.setAttribute('class', 'box')
    newDiv.setAttribute('id', `box${divCounter}`);
    newDiv.style.width = `${divSize}px`;
    newDiv.style.height = `${divSize}px`;

    let xcoord = Math.floor(Math.random() * (divContainer.offsetWidth - divSize));
    let ycoord = Math.floor(Math.random() * (divContainer.offsetHeight - divSize));
    newDiv.style.position = 'absolute';
    newDiv.style.left = `${xcoord}px`;
    newDiv.style.top = `${ycoord}px`;
    newDiv.addEventListener('click', clickTarget);
    newDiv.innerHTML = randomKanji;
    cell = newDiv;
    divContainer.appendChild(cell);

    console.log(newDiv.style.left)
    console.log(newDiv.style.top)
}

var makeFakeDiv = function(){
    console.log("fake kanji: " + fakeKanji);
    fakeDiv = document.createElement('div');
    divCounter += 1;
    fakeDiv.setAttribute('class', 'box')
    fakeDiv.setAttribute('id', `box${divCounter}`);
    fakeDiv.style.width = `${divSize}px`;
    fakeDiv.style.height = `${divSize}px`;
    let xcoord = Math.floor(Math.random() * (divContainer.offsetWidth - divSize));
    let ycoord = Math.floor(Math.random() * (divContainer.offsetHeight - divSize));
    fakeDiv.style.position = 'absolute';
    fakeDiv.style.left = `${xcoord}px`;
    fakeDiv.style.top = `${ycoord}px`;
    fakeDiv.addEventListener('click', clickedFake);
    fakeDiv.innerHTML = fakeKanji;
    divContainer.appendChild(fakeDiv);
}


var clickTarget = function(event){
    console.log("clicked!");
    // errorCheck(event)
    previousCell = event.target;
    console.log("previous cell: ", previousCell)
    if (previousCell){
        previousCell.innerHTML = "";
        previousCell.style.visibility = 'hidden';
        previousCell.style.opacity = 0;
    }
    addScore();
    addScoreText();
    pushScore();
    makeDiv();
}

var clickedFake = function(event){
    console.log("wrong click!");
    previousFake = event.target;
    if (previousFake){
        previousFake.innerHTML = "";
        previousFake.style.visibility = 'hidden';
        previousFake.style.opacity = 0;
    }
    minusScore();
    pushScore();
    getFakeKanji();
}


//TIME NOT IN PLAY
var minus = function(){
    var time = document.querySelector('.time');
    timer -= 1;
    time.innerHTML = "Time: " + timer;
    if (timer === 0){
        clearInterval(countDown);
        console.log("Time's up, try again!");
        resetBoard();
        timer = 20;
    }
}
//NOT IN PLAY
var countDown = function(){
    var ticktock = setInterval(minus, 1000);
}

//NOT IN PLAY
var resetBoard = function(){
    divContainer.innerHTML = null;
    getRandomKanji();
    getFakeKanji();
    timer = 20;
    score = 0;
    pushScore();
    return;
}

var addScore = function(){
    score += 1;
    if (score > highScore){
        highScore = score;
    }
}

var minusScore = function(){
    score -= 1;
}

var pushScore = function(){
    var scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerHTML = "Current Score: " + score;
    var highScoreDisplay = document.querySelector('.highscore');
    highScoreDisplay.innerHTML = "High Score: " + highScore;
}

var addScoreText = function(){
    console.log("enter add score -- previousCell: ", previousCell)
    let xcoord = previousCell.style.left;
    let ycoord = previousCell.style.top;
    console.log(xcoord)
    let plusText = document.createElement('span');
    plusText.classList.add('floating-text');
    plusText.innerHTML = "+1!";
    plusText.style.position = 'absolute';
    plusText.style.left = `${xcoord}`;
    plusText.style.top = `${ycoord}`;
    divContainer.appendChild(plusText);
    console.log(plusText.style.left)
    console.log(plusText.style.top)
    // plusText.style.opacity = 0;
    // plusText.style.visibility = "hidden";
    setTimeout(function(){
        plusText.style.opacity = 0;
        plusText.style.visibility = "hidden";
    }, 100);
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


//OLD CREATEBOARD
// var createBoard = function(){
//     // getRandomKanji();
//     console.log(randomKanji);
//     for (i = 1; i < 4; i += 1){ //using 4 instead of 3 so I don't have to +1
//         var row = document.createElement('div');
//         row.setAttribute("class", "row")
//         document.querySelector('.main').appendChild(row);
//         for (j = 1; j < 4; j += 1){
//             var col = document.createElement('span');
//             col.setAttribute("class", `col${j}`);
//             col.classList.add(`row${i}`);
//             col.setAttribute("id", "box");
//             col.addEventListener("click", clickTarget);
//             row.appendChild(col);
//         }
//     }
// }


//original clickTarget
// var clickTarget = function(event){
//     errorCheck(event);
//     event.target.style.backgroundImage = backImage;
//     event.target.innerHTML === "";
//     previousCell = event.target;
//     cell = "";
//     addScore();
//     pushScore();
//     nextPopup();
// }

// var getRandomCell = function(){
//     var randomX = Math.floor((Math.random() * 3) + 1);
//     var randomY = Math.floor((Math.random() * 3) + 1);
//     cell = document.querySelector(`.row${randomX}.col${randomY}`);
// }


//original
// var clickTarget = function(event){
//     errorCheck(event)
//     console.log("in clicktarget" + randomKanji)//delete
//     previousCell = event.target;
//     addScore();
//     console.log("code reached here!")
//     pushScore();
//     nextPopup();
// }

//original nextPopup
// var nextPopup = function(){
//     if (previousCell){
//         previousCell.style.backgroundImage = "";
//         previousCell.innerHTML = "";
//     }
//     getRandomCell();
//     cell.innerHTML = "Click here!";
// }



// var errorCheck = function(event){
//     if (event.target === cell){
//         console.log("Next!");
//     } else {
//         console.log("You Lost!");
//         resetBoard();
//     }
// }