//things I'm going to do:
    //allow user to adjust interval between bubbles and fade out timer
    //stop the last bubbles from lingering in the endgame screen for a few seconds
    //simple background soundtrack
//things I haven't been able to solve:
    //certain bubbles not fading out
        //possible solution: instead of assigning an autofade on 3s timeout when you makediv, make the original CSS properties 3s autofade and shorten it on click.

//make floatingtext different colros to the bubbles
//make the headers static, dont let them shift (span)
//prevent overlaps
//UI priorities: make sure character and time is forefront
//scores can be shifted to a corner

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
var searchGrade = 1;; //vary this on input!

var ticktock = "";

var startInterval = 3000; //let user input with select or slider
var randomInterval = startInterval;

var defaultFadeout = 2000;
//2000/3000 , 1000/2000, 500/1500



//also maybe add a setting for how quickly the kanji disappear


//------------------------get random kanji
var responseHandler = function(){
    var response = JSON.parse(this.responseText);
    var kanjiIndex = Math.floor(Math.random() * response.length);
    randomKanji = response[kanjiIndex];
    let target = document.querySelector('.goalkanji');
    target.innerHTML = randomKanji;
    loopMakeDiv();
    getKanjiDetails();
}


var getRandomKanji = function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler);
    request.open("GET", `https://kanjiapi.dev/v1/kanji/grade-${searchGrade}`);
    request.send();
    console.log(randomKanji);
}
//-----------------------------

//-----------------------get fake kanji
var responseHandler2 = function(){
    var response2 = JSON.parse(this.responseText);
    var kanji2Index = Math.floor(Math.random() * response2.length);
    fakeKanji = response2[kanji2Index];
    makeFakeDiv();
}

//this will be looped!
var getFakeKanji = function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler2);
    request.open("GET", `https://kanjiapi.dev/v1/kanji/grade-${searchGrade}`);
    request.send();
    console.log(fakeKanji);
}
//----------------------------

var kanjiDetails = "";
var kunyomi = "";
var onyomi = "";
var kanjiMeanings = "";
var jlptLevel = "";
//test get kanji details
var responseHandler3 = function(){
    var response = JSON.parse(this.responseText);
    // var kanjiIndex = Math.floor(Math.random() * response.length);
    kanjiDetails = response;
    kunyomi = kanjiDetails.kun_readings;
    onyomi = kanjiDetails.on_readings;
    kanjiMeanings = kanjiDetails.meanings;
    jlptLevel = kanjiDetails.jlpt;
    document.querySelector(".kunyomi").innerHTML = `Kun readings:<br />${kunyomi}`;
    document.querySelector(".onyomi").innerHTML = `On readings:<br />${onyomi}`;
    document.querySelector(".kanjiMeanings").innerHTML = `Meanings:<br />${kanjiMeanings}`;
    // document.querySelector(".jlptLevel").innerHTML = `JLPT Level: ${jlptLevel}`;
}


var getKanjiDetails = function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", responseHandler3);
    request.open("GET", `https://kanjiapi.dev/v1/kanji/${randomKanji}`);
    request.send();
}

//makeDiv in getrandomkanji
window.onload = function(){
    goMenu();
}

var init = function(){
    divContainer.innerHTML = null;
    // divContainer.style.backgroundImage = "url('gowpond.gif')";
    resetBoard();
    countDown(timer);
}

var divSize = 75;
// var newDiv = "";
// var fakeDiv = "";
var divContainer = document.querySelector('.main');
var divCounter = 0;

//-------------------------make kanji bubbles
var makeDiv = function(){
    console.log("real kanji: " + randomKanji);
    let newDiv = document.createElement('div');
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
    //test auto fadeout
    let fadeCell = setTimeout(function(){
        newDiv.innerHTML = null;
        newDiv.style.opacity = 0;
        newDiv.style.visibility = 'hidden';
    }, defaultFadeout);
    //-------------------
    divContainer.appendChild(newDiv);
}


//----------------------make fakeKanji bubbles
var makeFakeDiv = function(){
    console.log("fake kanji: " + fakeKanji);
    let fakeDiv = document.createElement('div');
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
    //test auto fadeout-----
    let fadeFakeCell = setTimeout(function(){
        fakeDiv.innerHTML = null;
        fakeDiv.style.opacity = 0;
        fakeDiv.style.visibility = 'hidden';
    }, defaultFadeout);
    //------------------------
    divContainer.appendChild(fakeDiv);
}

//-------------------div-making loops

//for makeDiv
var loopMakeDiv = function(){
    setTimeout(function(){
        let buffer = startInterval / 2;
        randomInterval = Math.floor(Math.random() * startInterval) + buffer;
        makeDiv();
        if (timer > 2){
            loopMakeDiv();
        } else {
            return;
        }
    }, randomInterval)}

// loopMakeDiv(); to loop makeDiv with the same Kanji

//loopFakeDiv(); to loop getFakeKanji(); and makeDiv with different Kanji
var loopFakeDiv = function(){
    setTimeout(function(){
        let buffer = startInterval / 2;
        randomInterval = Math.floor(Math.random() * startInterval) + buffer;
        getFakeKanji();
        if (timer > 2){
            loopFakeDiv();
        } else {
            return;
        }
    }, randomInterval)}


//--------------------on click on real kanji
var clickTarget = function(event){
    console.log("clicked!");
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
    //removed to test auto loop
    // makeDiv();
}

//-----------------------on click on fake kanji

var clickedFake = function(event){
    console.log("wrong click!");
    previousFake = event.target;
    if (previousFake){
        previousFake.innerHTML = "";
        previousFake.style.visibility = 'hidden';
        previousFake.style.opacity = 0;
    }
    minusScore();
    minusScoreText();
    pushScore();
    //removed to test auto loop
    // getFakeKanji();
}


//-------------------time code
var minus = function(){
    var time = document.querySelector('.time');
    timer -= 1;
    time.innerHTML = "Time: " + timer;
    if (timer === 0){
        clearInterval(ticktock);
        console.log("Time's up, try again!");
        goMenu();
    }
}

var countDown = function(){
    ticktock = setInterval(minus, 1000);
}

//----------------reset code
//made start menu. reset to menu not done
var goMenu = function(){
    divContainer.style.backgroundImage = null;
    divContainer.innerHTML = null;
    // divContainer.innerHTML = "TEST TEXT <br/>";
    let btn = document.createElement("button");
    btn.textContent = "Start";
    btn.classList.add('btn');
    btn.addEventListener('click', init);
    divContainer.appendChild(btn);

    //create select bar
    let sel = document.createElement("select");
    sel.classList.add("select");
    //create options for grade 1-6
    for (let o = 0; o < 6; o += 1){
        let option = document.createElement("option");
        option.text = `Grade ${o + 1} Kanji`;
        option.value = o + 1;
        sel.add(option, sel[o]);
    }
    //create option for grade 8
    let optionLast = document.createElement("option");
    optionLast.text = "Secondary School Kanji";
    optionLast.value = 8;
    sel.add(optionLast, sel[6]);
    //add event listener to and append select bar
    sel.addEventListener('change', function(){
        changeGrade(event)
    });
    divContainer.appendChild(sel);

    //sel and option for difficulty
    let diffSel = document.createElement("select");
    diffSel.classList.add("select");
    for (let p = 0; p < 3; p += 1){
        let opt = document.createElement("option");
        opt.text = `Power level required: >${(p + 1) * 3000}`
        opt.value = p + 1;
        diffSel.add(opt, diffSel[p]);
    }
    diffSel.addEventListener('change', function(){
        changeDifficulty(event)
    });
    divContainer.appendChild(diffSel);

    let audioSel = document.createElement("select");
    audioSel.classList.add("select");
    audioSel.setAttribute("id", "audioSelect");
    for (let q = 0; q < 3; q += 1){
        let audioOpt = document.createElement("option");
        audioOpt.setAttribute('id', `audio${q + 1}`)
        audioOpt.value = q + 1;
        audioSel.add(audioOpt, audioSel[q]);
    }
    audioSel.addEventListener('change', function(){
        changeAudio(event)
    });
    divContainer.appendChild(audioSel);
    document.querySelector("#audioSelect")[0].innerHTML = "karen-chan (monogatari)";
    document.querySelector("#audioSelect")[1].innerHTML = "hourousha (monogatari)";
    document.querySelector("#audioSelect")[2].innerHTML = "nekobus (ghibli jazz)";

}
//FAILED IFRAME

   // prepareFrame();
// var prepareFrame = function(){
//     let ifrm = document.createElement("iframe");
//     ifrm.style.display = "none";
//     ifrm.setAttribute("allow", "autoplay");
//     ifrm.setAttribute("src", "火憐ちゃん.mp3");
//     document.body.appendChild(ifrm);
// }
var changeAudio = function(event){
    let setting = parseInt(event.target.value);
    let x = document.getElementById('ifrm');
    console.log("changed audio!");
    console.log(setting);
    if (setting === 1){
        x.src = '火憐ちゃん.mp3';
    } else if (setting === 2){
        x.src = 'hourousha.mp3';
    } else if (setting === 3){
        x.src = "Nekubus.mp3";
        console.log(document.getElementById('ifrm'))
    }
}
// x.setAttribute("src", "hourousha.mp3")


// vary startInterval and defaultFadeout (now 1000 and 3000)
//2000/3000 , 1000/2000, 500/1500
var changeDifficulty = function(event){
    var setting = parseInt(event.target.value);
    //defaults
    startInterval = 2000;
    defaultFadeout = 3000;
    if (setting === 1){
        startInterval = 2000;
        defaultFadeout = 3000;
    } else if (setting === 2){
        startInterval = 1250;
        defaultFadeout = 2500;
    } else if (setting === 3){
        startInterval = 750;
        defaultFadeout - 1500;
    }


}


//vary searchGrade with option selected (1-6, 8)
var changeGrade = function(event){
    //default
    searchGrade = 1;
    searchGrade = event.target.value;
}

var resetBoard = function(){
    divContainer.innerHTML = null;
    timer = 20;
    score = 0;
    getRandomKanji(); //added a makeDiv loop inside
    loopFakeDiv(); //getFakeKanji looped inside
    // pushScore();
    return;
}

//----------------score code
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

//--------------floating score code
var addScoreText = function(){
    let xcoord = previousCell.style.left;
    let ycoord = previousCell.style.top;
    let plusText = document.createElement('span');
    plusText.classList.add('floating-text');
    plusText.innerHTML = "+1!";
    plusText.style.position = 'absolute';
    plusText.style.left = `${xcoord}`;
    plusText.style.top = `${ycoord}`;
    divContainer.appendChild(plusText);
    // plusText.style.opacity = 0;
    // plusText.style.visibility = "hidden";
    setTimeout(function(){
        plusText.style.opacity = 0;
        plusText.style.visibility = "hidden";
    }, 100);
}

var minusScoreText = function(){
    let xcoord = previousFake.style.left;
    let ycoord = previousFake.style.top;
    let minusText = document.createElement('span');
    minusText.classList.add('floating-text');
    minusText.innerHTML = "-1!";
    minusText.style.position = 'absolute';
    minusText.style.left = `${xcoord}`;
    minusText.style.top = `${ycoord}`;
    divContainer.appendChild(minusText);
    // plusText.style.opacity = 0;
    // plusText.style.visibility = "hidden";
    setTimeout(function(){
        minusText.style.opacity = 0;
        minusText.style.visibility = "hidden";
    }, 100);
}



//----------------------------AJAX STUFF!

//site used: https://kanjiapi.dev/
//peculiarities: search by grades 1-6 (elementary, 1000+) and 8 (all of secondary, another 1000+)
//eg:"https://kanjiapi.dev/v1/kanji/grade-8"