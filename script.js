
//variables
// Query Selectors
const boardcell = document.querySelector('.board-container');
const messageText = document.querySelector('.message')
const resetBtn = document.querySelector('.reset');
const startBtn = document.querySelector('.start');
const againBtn = document.querySelector('.another');
const player1customColorBtn = document.querySelector('#player-1-custom');
const player2customColorBtn = document.querySelector('#player-2-custom');
const customColor1 = document.querySelector('#color-picker-1');
const customColor2= document.querySelector('#color-picker-2');
const allBoardSpaces = document.querySelectorAll('.board-space');
const mainSection = document.querySelector('main');
const audio = document.createElement('audio');
let presetColorBoxes1 = document.querySelectorAll('.preset-1');
let presetColorBoxes2 = document.querySelectorAll('.preset-2');
const colorPicker = ['#ffd319', '#ff901f', '#ff2975', '#f222ff', '#8c1eff'];
const rootSelector = document.querySelector(':root');
const colorPickerContainer = document.querySelector('.color-picker-container');
const playerColorPicker = document.querySelectorAll('.player-color-picker');
const perfect = document.querySelector('.perfect');
const fight = document.querySelector('.fight');
const winnerAudio = document.querySelector('.win');
// Internal JS variables
let player1Color = "";
let player2Color = "";
let playerWinsInFinalGo = false;
let player1Wins = 0;
let player1Lose = 0;
let player2Wins = 0;
let player2Lose = 0;
let playerTies = 0;
let currentPlayer = 1;
let playerPlaces= ['','','','','','','','','',];
let squareSelected = 0;

/* PseudoCode -   When clicked, display none for start button, toggle display of game board, stop players from having same colour, start music */
// Start Button click handler
startBtn.addEventListener('click', function(){
    if (player1Color === player2Color) {
        displayMessage(`You can't have the same colors, pick a different color`)
    } else {
        hideShowDivs();
        resetJS();
        clearBoardOfXAndO();
        mainSection.style.display = 'grid';
        startBtn.classList.add('hidden');
        displayMessage('')
        setTimeout(audioStart, 1000);
        fightSample();
    }})

// Call back functions for start button

const hideShowDivs = function() {
    playerColorPicker.forEach((element) => {
        element.classList.add('hidden');})
        allBoardSpaces.forEach(element => {
            element.classList.remove('hidden')});
        resetBtn.classList.remove('hidden');
        colorPickerContainer.classList.add('hidden');
}

const resetJS = function() {
    playerPlaces= ['','','','','','','','','',];
    currentPlayer = 1;
    playerWinsInFinalGo = false;
}

const clearBoardOfXAndO = function() {
    allBoardSpaces.forEach((element) => {
        element.classList.remove('x');
        element.classList.remove('o')});
}

//reset button
resetBtn.addEventListener('click', function() {
    clearBoardOfXAndO();
    displayMessage('');
    resetJS();
})

//play again Btn

againBtn.addEventListener('click', function(){
    startBtn.classList.remove('hidden');
    againBtn.classList.add('hidden');
    colorPickerContainer.classList.remove('hidden');
    playerColorPicker.forEach((element) => {
        element.classList.remove('hidden');})
    displayMessage("")
})

/* Pseudocode 
if player space === already taken space { display error}
check for winner
if winner == true { run winner function }
else check for tie
if tie === true {run ite function} */

/*MAIN FUNCTION - adds x or o to the board and checks for winner, tie - then switches player
else add o or x  to space and switch player */

boardcell.addEventListener('click',  function(e) {

     if (e.target.classList.contains('x') || e.target.classList.contains('o')) {
        displayMessage('This Space is already taken, pick another');
    } 
    else {
        if (currentPlayer === 0 && playerPlaces[e.target.id] === '') {
        e.target.classList.add('o');
        playerPlaces[e.target.id] = 'o';
        checkWinner('o');
        checkTie();
        switchPlayer()
        } else if (currentPlayer === 1 && playerPlaces[e.target.id] === '') {
        e.target.classList.add('x');
        playerPlaces[e.target.id] = 'x';
        checkWinner('x');
        checkTie();
        switchPlayer()
         }
}})

//Switch Player function
const switchPlayer = function() {
    if (currentPlayer === 0) {
        currentPlayer = 1;
        }  else if (currentPlayer === 1) {
        currentPlayer = 0;
        }
}

//Display message function

const displayMessage = function(message) {
    messageText.innerText = message;
}


//Check winner function

const checkWinner = function(symbol) {
    if ((playerPlaces[0] === symbol && playerPlaces[1] === symbol && playerPlaces[2] === symbol) || (playerPlaces[3] === symbol && playerPlaces[4] === symbol && playerPlaces[5] === symbol) || (playerPlaces[6] === symbol && playerPlaces[7] === symbol && playerPlaces[8] === symbol) || (playerPlaces[0] === symbol && playerPlaces[3] === symbol && playerPlaces[6] === symbol) || (playerPlaces[1] === symbol && playerPlaces[4] === symbol && playerPlaces[7] === symbol) || (playerPlaces[2] === symbol && playerPlaces[5] === symbol && playerPlaces[8] === symbol) || (playerPlaces[0] === symbol && playerPlaces[4] === symbol && playerPlaces[8] === symbol) || (playerPlaces[2] === symbol && playerPlaces[4] === symbol && playerPlaces[6] === symbol)){
        playerWinsInFinalGo = true;
        if (currentPlayer === 0) {
            displayMessage('🎉🎉🎉  Player 2 has won the game!!  🎉🎉🎉');
            winnerSample();
            playerScore();
            fadeOut();
        } else {
            displayMessage('🎉🎉🎉  Player 1 has won the game!!  🎉🎉🎉');
            winnerSample();
            playerScore();
            fadeOut();
            
        }
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');
            
        })
        endGameBtns();
    }  else {
        if (currentPlayer === 0) {
            displayMessage(`It's x's turn now.`);
            perfectSample();
        } else {
            displayMessage(`It's o's turn now.`);
            perfectSample();
        }
    }
}


// Check tie function
const checkTie = function() {
    if (playerPlaces.includes('') === false && playerWinsInFinalGo === false) {
        displayMessage('Players have tied');
        fadeOut();
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');     
        })
        endGameBtns();
        tiedGameCounter();
    }
}

// General clean up function that adds/ removes start, reset, play again buttons
const endGameBtns = function() {
    startBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');
    againBtn.classList.remove('hidden');
    mainSection.style.display = 'block';
}
// Start Audio Function
const audioStart = function(){
    audio.classList.add('hidden');
    audio.setAttribute('src', './lady-of-the-80x27s-128379.mp3');
    audio.setAttribute('autoplay', '');
    audio.setAttribute('loop', '');
    audio.volume = 0.5;
    mainSection.appendChild(audio); 
    
}
// Stop Audio Function
const audioStop = function(){
    audio.classList.add('hidden');
    audio.removeAttribute('src', './lady-of-the-80x27s-128379.mp3');
    audio.removeAttribute('autoplay', '');
    
    mainSection.removeChild(audio);   
}

// Fade out function for music when player wins or ties
let interval;
const fadeOut =function() {
    interval = setInterval(volumeControl, 50);
   
}
// Volume controller for fade out function
const volumeControl = function() {
    if (audio.volume > 0.01) {
        audio.volume -= 0.01;
    } else {
        clearInterval(interval);
        audioStop()
        audio.volume = 0.5;
    }   
}

// Color picker function for player 1
presetColorBoxes1.forEach((box) => {
    box.addEventListener('click', (e) => {
        boxShadowClearer1();
        for (let i = 1; i<=colorPicker.length; i++){
            if (e.target.id === `player-1-box-${i}`) {
            colorPickerAddColor(e,(i-1), 1);
            player1Color = colorPicker[i-1];
        }}})});

// Box shadow remover functions that clears all the shadows when player clicks on new color picker box
const boxShadowClearer1 = function() { 
    const boxArray = Array.from(presetColorBoxes1);
    boxArray.forEach((element) => {
        element.style["boxShadow"] = "0 0 0 white";
    })}
const boxShadowClearer2 = function() { 
        const boxArray = Array.from(presetColorBoxes2);
        boxArray.forEach((element) => {
            element.style["boxShadow"] = "0 0 0 white";
        })}

// Color picker function for player 2
presetColorBoxes2.forEach((box) => {
    box.addEventListener('click', (e) => {
        boxShadowClearer2();
        for (let i = 1; i<=colorPicker.length; i++){
            if (e.target.id === `player-2-box-${i}`) {
            colorPickerAddColor(e,(i-1), 2);
            player2Color = colorPicker[i-1];
        }}})});

// Adds colors to player
const colorPickerAddColor = function(e, colorArr, player) {
    rootSelector.style.setProperty(`--pickedPlayer${player}`, colorPicker[colorArr]);
        e.target.style["boxShadow"] = `0 0 20px white`;
        if (player === 1) {customColor1.style["boxShadow"] = `0 0 0 white`;
} else if (player === 2) {
        customColor2.style["boxShadow"] = `0 0 0 white`;
}}
// Player 1 custom color picker
player1customColorBtn.addEventListener('submit', function(e) {
    e.preventDefault();
    boxShadowClearer1();
    player1Color = customColor1.value;
    rootSelector.style.setProperty(`--pickedPlayer1`, player1Color);
    customColor1.style["boxShadow"] = `0 0 20px white`;
    const submitBtn1 = document.querySelector('.color-select-1');
    submitBtn1.setAttribute('value', 'Selected');
})

// Player 2 custom color picker
player2customColorBtn.addEventListener('submit', function(e) {
    e.preventDefault();
    boxShadowClearer2();
    player2Color = customColor2.value;
    rootSelector.style.setProperty(`--pickedPlayer2`, player2Color);
    customColor2.style["boxShadow"] = `0 0 20px white`;
    const submitBtn2 = document.querySelector('.color-select-2');
    submitBtn2.setAttribute('value', 'Selected');
})
// Street fighter sample functions
const perfectSample = function() {
    perfect.play();
}
const fightSample = function() {
    fight.play();
}
const winnerSample = function() {
    winnerAudio.play();
}   


// Player ongoing score updater function for win
const playerScore = function() {
  if (currentPlayer === 0) {
    const playerWin = document.querySelector('#player-2-wins');
    const playerLose = document.querySelector('#player-1-lose');
    player2Wins ++;
    playerWin.innerText = player2Wins;
    player1Lose ++;
    playerLose.innerText = player1Lose;
  }  else if (currentPlayer === 1) {
    const playerWin = document.querySelector('#player-1-wins');
    const playerLose = document.querySelector('#player-2-lose');
    player1Wins ++;
    playerWin.innerText = player1Wins;
    player2Lose ++;
    playerLose.innerText = player2Lose;
  }
}

//Tied game counter and display updater
 const tiedGameCounter = function() {
   
    playerTies ++;
    const player1Ties = document.querySelector('#player-1-ties');
    player1Ties.innerText = playerTies;
    const player2Ties = document.querySelector('#player-2-ties');
    player2Ties.innerText = playerTies;
 }

