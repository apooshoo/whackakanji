//option to set numOfPanels with input prompt
var numOfPanels = 3
window.onload = function(){
    createBoard();
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
            col.textContent = "TEST";
            row.appendChild(col);
        }
    }
}
//when i run createBox();, it should create a 3 by 3 grid, and attach event listener for hit() on click to each

var hit = function(){
    console.log("hit!")
}

var popup = function(){
    var randomNum = Math.floor((Math.random() * 9) + 1);
    console.log(randomNum);
}