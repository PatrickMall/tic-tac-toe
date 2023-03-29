//variables
const boardcell = document.querySelector('.board-container');
const message = document.querySelector('.message')
let currentPlayer = 1;



// click function to recognise which box has been click
boardcell.addEventListener('click', function(e) {
    addSymbol(e);
    if (currentPlayer === 0) {
        currentPlayer = 1;
    }  else if (currentPlayer === 1) {
        currentPlayer = 0;
    }
});

// function that adds the correct symbol to the board and checks if the 
//space is occupied
const addSymbol = function(e) {
    if (e.target.classList.contains('x') || e.target.classList.contains('o')) {
        message.innerText = 'This Space is already taken, pick another';
    } else {
    if (currentPlayer === 0) {
        e.target.classList.add('x');
    } else if (currentPlayer === 1) {
        e.target.classList.add('o');
    }
}}