
//variables
const boardcell = document.querySelector('.board-container');
const messageText = document.querySelector('.message')
let currentPlayer = 1;
let playerPlaces= ['','','','','','','','','',];
const resetBtn = document.querySelector('.reset');
const startBtn = document.querySelector('.start')
const allBoardSpaces = document.querySelectorAll('.board-space');
const mainSection = document.querySelector('main');
let squareSelected = 0;


// Start Button
startBtn.addEventListener('click', function(){
    allBoardSpaces.forEach(element => {
        element.classList.remove('hidden')});
    resetBtn.classList.remove('hidden');
    mainSection.style.display = 'grid';
    startBtn.classList.add('hidden')
})


// MAIN FUNCTION
const playerChoice = function(num) {
    squareSelected = num;
    if(currentPlayer === 0 && playerPlaces[num] === '') {
        playerPlaces[num] = 'o';
        checkWinner('o');
        checkTie();
    } else if (currentPlayer === 1 && playerPlaces[num] === '') {
        playerPlaces[num] = 'x';
        checkWinner('x');
        checkTie();
    }
}

//reset button
resetBtn.addEventListener('click', function() {
    playerPlaces= ['','','','','','','','','',];
    console.log(playerPlaces);
    addSymbol('reset')
})


// function that adds the correct symbol to the board and checks if the 
//space is occupied based on currentPlayer variable
boardcell.addEventListener('click',  function(e) {
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

}})

//display message function

const displayMessage = function(message) {
    messageText.innerText = message;
}


//check winner function

const checkWinner = function(symbol) {
    if ((playerPlaces[0] === symbol && playerPlaces[1] === symbol && playerPlaces[2] === symbol) || (playerPlaces[3] === symbol && playerPlaces[4] === symbol && playerPlaces[5] === symbol) || (playerPlaces[6] === symbol && playerPlaces[7] === symbol && playerPlaces[8] === symbol) || (playerPlaces[0] === symbol && playerPlaces[3] === symbol && playerPlaces[6] === symbol) || (playerPlaces[1] === symbol && playerPlaces[4] === symbol && playerPlaces[7] === symbol) || (playerPlaces[2] === symbol && playerPlaces[5] === symbol && playerPlaces[8] === symbol) || (playerPlaces[0] === symbol && playerPlaces[4] === symbol && playerPlaces[8] === symbol) || (playerPlaces[2] === symbol && playerPlaces[4] === symbol && playerPlaces[6] === symbol)){
        if (currentPlayer === 0) {
            displayMessage('🎉🎉🎉Player 2 has won the game!!🎉🎉🎉');
        } else {
            displayMessage('🎉🎉🎉Player 1 has won the game!!🎉🎉🎉');
        }
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');
            resetBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
            mainSection.style.display = 'block';
        })
    }  else {
        if (currentPlayer === 0) {
            displayMessage(`Player 2 has picked square ${squareSelected +1} for their choice, It's player 1's turn now.`);
        } else {
            displayMessage(`Player 1 has picked square ${squareSelected +1} for their choice, It's player 2's turn now.`);
        }
    }
}


// check tie function
const checkTie = function() {
    if (playerPlaces.includes('') === false) {
        displayMessage('Players have tied');
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');
            resetBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
            mainSection.style.display = 'block';
        })
    }
}
