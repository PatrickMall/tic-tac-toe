
//variables
const boardcell = document.querySelector('.board-container');
const messageText = document.querySelector('.message')
let currentPlayer = 1;
let playerPlaces= ['','','','','','','','','',];
const resetBtn = document.querySelector('.reset');
const startBtn = document.querySelector('.start');
const againBtn = document.querySelector('.another');
const player1customColorBtn = document.querySelector('#player-1-custom');
const player2customColorBtn = document.querySelector('#player-2-custom');
const customColor1 = document.querySelector('#color-picker-1');
const customColor2= document.querySelector('#color-picker-2');
const allBoardSpaces = document.querySelectorAll('.board-space');
const mainSection = document.querySelector('main');
let squareSelected = 0;
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
let player1Color = "";
let player2Color = "";
let playerWinsInFinalGo = false;

// Start Button
startBtn.addEventListener('click', function(){
    if (player1Color === player2Color) {
        displayMessage(`you can't have the same colors, pick a different color`)
    } else {
    allBoardSpaces.forEach(element => {
        element.classList.remove('hidden')});
    allBoardSpaces.forEach((element) => {
        element.classList.remove('x');
        element.classList.remove('o')});
    resetBtn.classList.remove('hidden');
    mainSection.style.display = 'grid';
    startBtn.classList.add('hidden');
    colorPickerContainer.classList.add('hidden');
    playerColorPicker.forEach((element) => {
        element.classList.add('hidden');})
    displayMessage('')
    playerPlaces= ['','','','','','','','','',];
    setTimeout(audioStart, 1000);
    currentPlayer = 1;
    fightSample();
    playerWinsInFinalGo = false;
    
}})

//reset button
resetBtn.addEventListener('click', function() {
    console.log('clicked')
    allBoardSpaces.forEach((element) => {
        element.classList.remove('x');
        element.classList.remove('o');
        displayMessage('')
    })
    playerPlaces= ['','','','','','','','','',];
    console.log(playerPlaces);
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


//MAIN FUNCTION
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
        } else if (currentPlayer === 1 && playerPlaces[e.target.id] === '') {
        e.target.classList.add('x');
        playerPlaces[e.target.id] = 'x';
        checkWinner('x');
        checkTie();
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
        playerWinsInFinalGo = true;
        if (currentPlayer === 0) {
            displayMessage('🎉🎉🎉  Player 2 has won the game!!  🎉🎉🎉');
            winnerSample();
            fadeOut();
        } else {
            displayMessage('🎉🎉🎉  Player 1 has won the game!!  🎉🎉🎉');
            winnerSample();
            fadeOut();
            
        }
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');
            
        })
        resetBtn.classList.add('hidden');
        againBtn.classList.remove('hidden');
        mainSection.style.display = 'block';
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


// check tie function
const checkTie = function() {
    if (playerPlaces.includes('') === false && playerWinsInFinalGo === false) {
        displayMessage('Players have tied');
        fadeOut();
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');     
        })
        startBtn.classList.add('hidden');
        resetBtn.classList.add('hidden');
        againBtn.classList.remove('hidden');
        
        mainSection.style.display = 'block';
    }
}
//Start Audio Function
const audioStart = function(){
    audio.classList.add('hidden');
    audio.setAttribute('src', './lady-of-the-80x27s-128379.mp3');
    audio.setAttribute('autoplay', '');
    audio.volume = 0.5;
    mainSection.appendChild(audio); 
    
}
//Stop Audio Function
const audioStop = function(){
    audio.classList.add('hidden');
    audio.removeAttribute('src', './lady-of-the-80x27s-128379.mp3');
    audio.removeAttribute('autoplay', '');
    
    mainSection.removeChild(audio);   
}

// fade out function for music when player wins
let interval;
const fadeOut =function() {
    interval = setInterval(volumeControl, 50);
   
}
//volume controller
const volumeControl = function() {
    if (audio.volume > 0.1) {
        audio.volume -= 0.01;
        console.log(audio.volume)
    } else {
        clearInterval(interval);
        audioStop()
        audio.volume = 0.5;
        console.log(audio.volume)
    }   
}

// color picker function for player 1
presetColorBoxes1.forEach((box) => {
    box.addEventListener('click', (e) => {
        //resets all box shadows to none
        boxShadowClearer1();
        for (let i = 1; i<=colorPicker.length; i++){
            if (e.target.id === `player-1-box-${i}`) {
            colorPickerAddColor(e,(i-1), 1);
            player1Color = colorPicker[i-1];
        }}})});

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

// color picker function for player 2
presetColorBoxes2.forEach((box) => {
    box.addEventListener('click', (e) => {
        //resets all box shadows to none
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
        customColor1.style["boxShadow"] = `0 0 0 white`;
        customColor2.style["boxShadow"] = `0 0 0 white`;
}
//player 1 custom color picker
player1customColorBtn.addEventListener('submit', function(e) {
    e.preventDefault();
    boxShadowClearer1();
    player1Color = customColor1.value;
    rootSelector.style.setProperty(`--pickedPlayer1`, player1Color);
    customColor1.style["boxShadow"] = `0 0 20px white`;
})

//player 2 custom color picker
player2customColorBtn.addEventListener('submit', function(e) {
    e.preventDefault();
    boxShadowClearer2();
    player2Color = customColor2.value;
    rootSelector.style.setProperty(`--pickedPlayer2`, player2Color);
    customColor2.style["boxShadow"] = `0 0 20px white`;
})
// street fighter sample functions
const perfectSample = function() {
    perfect.play();
}
const fightSample = function() {
    fight.play();
}
const winnerSample = function() {
    winnerAudio.play();
}   


