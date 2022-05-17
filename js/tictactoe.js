//track who's turn it is
let activePlater = 'X';
//stores an array of moves, to determine win conditions
let selectedSquares = [];

function placeXOrO(squareNumber) {
// assure a square hasn't already been selected
if (!selectedSquares.some(element => element.includes(squareNumber))){
    let select = document.getElementById(squareNumber);
    if (activePlater === 'X') {
        select.style.backgroundImage = 'url("images/x.png")';
    } else {
        select.style.backgroundImage = 'url("images/o.png")';
    }
    selectedSquares.push(squareNumber + activePlater);
    checkWinConditions();
    if (activePlater ==='X') {
        activePlater = 'O';
    } else {
        activePlater = 'X';
    }
    Audio('./media/place.mp3');
    if(activePlater === 'O'){
        disableClick();
        setTimeout(function() {computersTurn();}, 1000)
    }
    return true;  
}
// random selection by computer
function computersTurn() {
    let success = false;
    let pickASquare;
    while(!success){
        pickASquare = String(Math.floor(Math.random() * 9));
        if (placeXOrO(pickASquare)){
            placeXOrO(pickASquare);
            success = true;
        }
    }
}

}