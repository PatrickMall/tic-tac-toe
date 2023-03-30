//pseudoCode



//variables
const boardcell = document.querySelector('.board-container');
const messageText = document.querySelector('.message')
let currentPlayer = 1;
let playerPlaces= ['','','','','','','','','',];
const resetBtn = document.querySelector('.reset');
const allBoardSpaces = document.querySelectorAll('.board-space');
const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], ]



// click function to add the symbol to the board
boardcell.addEventListener('click', function(e) {
    addSymbol(e);
    });
// function that adds player choice to the array
const playerChoice = function(num) {
    if(currentPlayer === 0) {
        playerPlaces[num] = 'o';
        displayMessage(`You have picked square ${num +1} for your choice`)
    } else if (currentPlayer === 1) {
        playerPlaces[num] = 'x';
        displayMessage(`You have picked square ${num +1} for your choice`)
    }
    console.log(playerPlaces);
}

//reset button
resetBtn.addEventListener('click', function() {
    playerPlaces= ['','','','','','','','','',];
    console.log(playerPlaces);
    addSymbol('reset')
})
    





// function that adds the correct symbol to the board and checks if the 
//space is occupied based on currentPlayer variable
const addSymbol = function(e) {
    if (e === 'reset') {
        allBoardSpaces.forEach((element) => {
            element.classList.remove('x');
            element.classList.remove('o');
        })
    }
    else if (e.target.classList.contains('x') || e.target.classList.contains('o')) {
        displayMessage('This Space is already taken, pick another');
    } 
    else {
        if (currentPlayer === 0) {
        e.target.classList.add('o');
        } else if (currentPlayer === 1) {
        e.target.classList.add('x');
         }
        if (currentPlayer === 0) {
        currentPlayer = 1;
        }  else if (currentPlayer === 1) {
        currentPlayer = 0;
        }

}}

//display message function

const displayMessage = function(message) {
    messageText.innerText = message;
}
