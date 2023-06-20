# Tic Tac Toe

## About this Project

Hello! I'm Patrick and I created this virtual Tic, Tac, Toe game.

I built this game as my first ever project as part of my software engineer course I am participating in at General assembly.

To build this project I used a mixture of HTML, CSS and Javascript to showcase the skills I have learnt so far. I decided that I wanted to give this project a very distinct theme, and for it to have a retro gaming feel. I am a big fan of the Synthwave, retrowave aesthetic so decided to theme my game in this style.

To build this project I first created a very basic wireframe using adobe XD. I have exported a png version of this which can be found [here](./Tic-Tac-Toe-Wireframe.png) in the repo.
There is also a copy of the adobe.xd file in the repo if anyone wants to see the original.

## User Stories

Below is a list of the user stories that the game was built to achieve:

- As a user, I should be able to start a new tic tac toe game
- As a user, I should be able to click on a square to add X first and then O, and so on
- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
- As a user, I should not be able to click the same square twice
- As a user, I should be shown a message when I win, lose or tie
- As a user, I should not be able to continue playing once I win, lose, or tie
- As a user, I should be able to play the game again without refreshing the page

## Features

Below is a list of the features I have added to the game which meet and add to the MVP list I was set by the General Assembly Course I am currently part of.

- 2 players can play against each other in games of tic tac toe.
- Their scores from each game are tallied up, including number of wins, losses and ties
- The game is also optimised to be able to play on mobile screen up to 480px in width
- Players can select a preset synthwave color from my colour palette
- Players can also select their own custom colour with the colour picker
- Players can reset the game at any point and start the game from the beginning whilst not loosing their score.
- The game has a retro wave video background to bring the overall synthwave aesthetic to life. The original video file can be found [here](https://pixabay.com/videos/wave-grid-mountains-rainbow-90073/)
- The game also has a synthwave sound track for in game entertainment which start upon clicking the game start button, once players have selected their piece colours. The audio file can be found[here](https://pixabay.com/music/synthwave-lady-of-the-80x27s-128379/)
- I used Classic streetfighter game samples for the start of the game, if somone wins and also when players make their move on the board.

## How to use the app

When loaded the app should look like this:
![Opening image of tic, tac, toe game](./Main-App.png)

When the app has loaded players will be asked to select a colour for the counter and then click the "start game" button.

Player can then select the spaces on the boardgame to place their marker (either x or o, depending on the player).

The game ends when either player get three in a row, either vertically, horizontally or diagonally.

Player can the play again and the win, loose or tie is recorded to their counter for future games.

## Game winning logic

To work out how the game is won, I built and array of the player places over the course of the game. This array consists of the players choices at the relevant indexes for the game spaces, e.g. 0 - 8 spaces running from top left to bottom right horizontally.

This array is then checked against the potential 8 winning space combinations everytime a player makes a move. When any of these conditions have become true, the game ends and the player gets the winning message.

## Challenges

Being my first ever project some of the technology I was using was quite new to me and took me a lot of time to really get my head around how to utilise it.

Writing the Javascript sections was probably the hardest part of this project as it was very new to me and took a lot of research to find the necessary methods and tools to make this work.

## My favourite bits on this project

I really love designing and working with css and I feel that it shows on the way this project looks and feels to play. I have learnt a lot of new skills with it too including using css color variables which I had never used before.

I am also really pleased with the colour picker feature and being able to work out how to have the UX I wanted, particulary the box shadow feature, indicates which colour has been selected for each player.

## Build

Below are two bits of code I would like to highlight as parts that I feel are some of the best features I built with this project.

### Music fade out on game ending.

i wanted the music to not abruptly cut out as soon as the winner won the game or when the game was reset as I was quite jolting and not a smooth transition. For this I looked into ways I could build a fade out on completion of the game.

```js
// Fade out function for music when player wins or ties
let interval;
const fadeOut = function () {
  interval = setInterval(volumeControl, 50);
};
// Volume controller for fade out function
const volumeControl = function () {
  if (audio.volume > 0.01) {
    audio.volume -= 0.01;
  } else {
    clearInterval(interval);
    audioStop();
    audio.volume = 0.5;
  }
};
```

### Color picker box shadow highlighter to show which color has been selected

This group of functions turned out to be one of the more complicated parts of my project as I had to work between not only the presets I had provided but also if some choose their own color from the color picker I needed to highlight that instead of the preset. I wanted to be able to write one function that would do this logic for both players, but I could not work out how to do this so I duplicated the code for each player.

here is the example of the color picker box shadow

```js
// Color picker function for player 1
presetColorBoxes1.forEach((box) => {
  box.addEventListener("click", (e) => {
    boxShadowClearer1();
    for (let i = 1; i <= colorPicker.length; i++) {
      if (e.target.id === `player-1-box-${i}`) {
        colorPickerAddColor(e, i - 1, 1);
        player1Color = colorPicker[i - 1];
      }
    }
  });
});

// Box shadow remover functions that clears all the shadows when player clicks on new color picker box
const boxShadowClearer1 = function () {
  const boxArray = Array.from(presetColorBoxes1);
  boxArray.forEach((element) => {
    element.style["boxShadow"] = "0 0 0 white";
  });
};
const boxShadowClearer2 = function () {
  const boxArray = Array.from(presetColorBoxes2);
  boxArray.forEach((element) => {
    element.style["boxShadow"] = "0 0 0 white";
  });
};

// Color picker function for player 2
presetColorBoxes2.forEach((box) => {
  box.addEventListener("click", (e) => {
    boxShadowClearer2();
    for (let i = 1; i <= colorPicker.length; i++) {
      if (e.target.id === `player-2-box-${i}`) {
        colorPickerAddColor(e, i - 1, 2);
        player2Color = colorPicker[i - 1];
      }
    }
  });
});

// Adds colors to player
const colorPickerAddColor = function (e, colorArr, player) {
  rootSelector.style.setProperty(
    `--pickedPlayer${player}`,
    colorPicker[colorArr]
  );
  e.target.style["boxShadow"] = `0 0 20px white`;
  if (player === 1) {
    customColor1.style["boxShadow"] = `0 0 0 white`;
  } else if (player === 2) {
    customColor2.style["boxShadow"] = `0 0 0 white`;
  }
};
// Player 1 custom color picker
player1customColorBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  boxShadowClearer1();
  player1Color = customColor1.value;
  rootSelector.style.setProperty(`--pickedPlayer1`, player1Color);
  customColor1.style["boxShadow"] = `0 0 20px white`;
  const submitBtn1 = document.querySelector(".color-select-1");
  submitBtn1.setAttribute("value", "Selected");
});

// Player 2 custom color picker
player2customColorBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  boxShadowClearer2();
  player2Color = customColor2.value;
  rootSelector.style.setProperty(`--pickedPlayer2`, player2Color);
  customColor2.style["boxShadow"] = `0 0 20px white`;
  const submitBtn2 = document.querySelector(".color-select-2");
  submitBtn2.setAttribute("value", "Selected");
});
```

As you can see from the code I had to add a clearer function that removed the box shadow from the previous choice as the array of presets and color picker where separate elements in my application.

## What I would improve in the future

I would like to improve the winning conditions feature as I know there is probably a much better way of writing these with an array which compares against my array of x's & o's, however I could not work out how to achieve this at the moment.

I would also like to try and build a AI player which people could then play against, so I may come back and try to imporve this game as my knowledge and skills progress.

I would like to write more stylesheets to optimise the game for all devices, including tablet.

### MIT License

Copyright (c) [2023] [Patrick Mallery]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
