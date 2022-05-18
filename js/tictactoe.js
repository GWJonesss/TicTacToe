//track who's turn it is
let activePlater = 'X';
//stores an array of moves, to determine win conditions
let selectedSquares = [];



// function to place X or O
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
    // pay 'place' audio when clicked
    audio('./media/place.mp3');
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

// function to check all possible win conditions for both players

function checkWinConditions() {
    // 'X' win conditions
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100)}
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304)}
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508)}
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558)}
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558)}
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558)}
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90)}
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520)}
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558)}
    // 'O' Win conditions
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100)}
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304)}
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508)}
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558)}
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558)}
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558)}
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90)}
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520)}
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558)}

    //if none of the above conditions apply and all 9 squares are selected
    else if (selectedSquares.length>= 9) {
        audio('./media/tie.mp3');
        setTimeout(function () { resetGame();}, 1000)
    }
}

//function to check if the array includes 3 strings 

function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedSquares.includes(squareA)
    const b = selectedSquares.includes(squareB)
    const c = selectedSquares.includes(squareC)

    if (a === true && b === true && c === true) { return true }
}

//makes squares temp un-clickable
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}
///audio structure
function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

//use html canvas to draw win lines
function drawWinLine(coordX1 , coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines')
    const c =canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1, //temp x axis
        y = y1; //temp y axis


// this function interacts with the canvas
function animateLineDrawing() {
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608, 608)
    c.beginPath(); // start the path of the win line
    c.moveTo(x1, y1)
    c.lineTo(x, y)
    c.lineWidth = 10;
    c.strokeStyle = 'rgba(70 ,255, 33, .8)';
    c.stroke();
    // to check if we reached the end point
    if (x1 <= x2 && y1 <= y2) {
        if (x < x2) { x += 10; }
        if (y < y2) { y += 10; }
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    if (x1 <+ x2 && y1 >= y2){
        if ( x < x2) { x += 10;}
        if (y > y2) { y -= 10;}
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }

    }
}
//to clear the canvas once game is over
function clear() {
    const animationLoop = requestAnimationFrame(clear);
    c.clearRect(0, 0, 608, 608);
    cancelAnimationFrame(animationLoop);
}


//stops you from being able to click when the game is won before it is reset
disableClick();
audio('./media/winGame.mp3');
animateLineDrawing();
setTimeout(function () { clear(); resetGame(); }, 1000);
}

//function to reset game 
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
        square.style.backgroundImage = ''
    }

    //reset array so we can start game over
    selectedSquares = [];
}