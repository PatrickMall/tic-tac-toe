//pseudoCode



//variables
const boardcell = document.querySelector('.board-container');
const messageText = document.querySelector('.message')
let currentPlayer = 1;
let playerPlaces= ['','','','','','','','','',];
const resetBtn = document.querySelector('.reset');
const allBoardSpaces = document.querySelectorAll('.board-space');



// click function to add the symbol to the board
boardcell.addEventListener('click', function(e) {
    addSymbol(e);
    });
// function that adds player choice to the array
const playerChoice = function(num) {
 
    if(currentPlayer === 0 && playerPlaces[num] === '') {
        playerPlaces[num] = 'o';
        checkWinner('o');
        checkTie()
        // displayMessage(`Player 2 has picked square ${num +1} for their choice, It's player 1's turn now.`)
    } else if (currentPlayer === 1 && playerPlaces[num] === '') {
        playerPlaces[num] = 'x';
        checkWinner('x');
        checkTie();
        // displayMessage(`Player 1 has picked square ${num +1} for their choice, It's player 2's turn now.`)
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
            displayMessage('')
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


//check winner or tie function

const checkWinner = function(symbol) {
    if ((playerPlaces[0] === symbol && playerPlaces[1] === symbol && playerPlaces[2] === symbol) || (playerPlaces[3] === symbol && playerPlaces[4] === symbol && playerPlaces[5] === symbol) || (playerPlaces[6] === symbol && playerPlaces[7] === symbol && playerPlaces[8] === symbol) || (playerPlaces[0] === symbol && playerPlaces[3] === symbol && playerPlaces[6] === symbol) || (playerPlaces[1] === symbol && playerPlaces[4] === symbol && playerPlaces[7] === symbol) || (playerPlaces[2] === symbol && playerPlaces[5] === symbol && playerPlaces[8] === symbol) || (playerPlaces[0] === symbol && playerPlaces[4] === symbol && playerPlaces[8] === symbol) || (playerPlaces[2] === symbol && playerPlaces[4] === symbol && playerPlaces[6] === symbol)){
        if (currentPlayer === 0) {
            displayMessage('🎉🎉🎉Player 2 has won the game!!🎉🎉🎉');
        } else {
            displayMessage('🎉🎉🎉Player 1 has won the game!!🎉🎉🎉');
        }
    } 
}

const checkTie = function() {
    if (playerPlaces.includes('') === false) {
        displayMessage('Players have tied');
    }
}
