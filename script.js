
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
const audio = document.createElement('audio');
let presetColorBoxes = document.querySelectorAll('.preset');
const colorPicker = ['#ffd319', '#ff901f', '#ff2975', '#f222ff', '#8c1eff', '#5edba5'];
const xBefore = document.querySelector('.x', ':before');
const xAfter = document.querySelector('.x', ':after');
const colorPickerContainer = document.querySelector('.color-picker-container');
const playerColorPicker = document.querySelectorAll('.player-color-picker');


// Start Button
startBtn.addEventListener('click', function(){
    allBoardSpaces.forEach(element => {
        element.classList.remove('hidden')});
    resetBtn.classList.remove('hidden');
    mainSection.style.display = 'grid';
    startBtn.classList.add('hidden');
    
    allBoardSpaces.forEach((element) => {
        element.classList.remove('x');
        element.classList.remove('o');
    })
    colorPickerContainer.classList.add('hidden');
    playerColorPicker.forEach((element) => {
        element.classList.add('hidden');})
    displayMessage('')
    playerPlaces= ['','','','','','','','','',];
    setTimeout(audioStart, 1000)
})


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


// function that adds the correct symbol to the board and checks if the 
//space is occupied based on currentPlayer variable
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
        if (currentPlayer === 0) {
            displayMessage('🎉🎉🎉  Player 2 has won the game!!  🎉🎉🎉');
            fadeOut();
            


        } else {
            displayMessage('🎉🎉🎉  Player 1 has won the game!!  🎉🎉🎉');
            fadeOut();
            
        }
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');
            
        })
        resetBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
            mainSection.style.display = 'block';
    }  else {
        if (currentPlayer === 0) {
            displayMessage(`It's x's turn now.`);
        } else {
            displayMessage(`It's o's turn now.`);
        }
    }
}


// check tie function
const checkTie = function() {
    if (playerPlaces.includes('') === false) {
        displayMessage('Players have tied');
        allBoardSpaces.forEach(element => {
            element.classList.add('hidden');     
        })
        resetBtn.classList.add('hidden');
            startBtn.classList.remove('hidden');
            mainSection.style.display = 'block';
    }
}
//Start Audio Function
const audioStart = function(){
    audio.classList.add('hidden');
    audio.setAttribute('src', './lady-of-the-80x27s-128379.mp3');
    audio.setAttribute('autoplay', '');
    
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
        audio.volume = 1;
        console.log(audio.volume)
    }
    
}
// color picker function
presetColorBoxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (e.target.id === 'player-1-box-1') {
            xBefore.style.borderLeft = `20px solid ${colorPicker[0]}`;
            xAfter.style.borderLeft = `20px solid ${colorPicker[0]}`;
        }
        console.log(`you've clicked ${e.target.id}`);
    })
})

    


