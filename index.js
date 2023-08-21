const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".button");

let currentplayer;
let gamegrid;

const winningpositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// let create a function to inititlise a game

function initgame() {
  currentplayer = "X";
  gamegrid = ["", "", "", "", "", "", "", "", ""];

  // ui par bhi update karna pade ga
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // initilise boxes with css propert again
    box.classList = `box box${index + 1}`;
  });
  // newgamebtn.classList.add("active");

  gameinfo.innerText = `Current Player - ${currentplayer}`;
}

initgame();
function swapturn() {
  if (currentplayer === "X") {
    currentplayer = "0";
  } else {
    currentplayer = "X";
  }
  // ui update
  gameinfo.innerText = `Current Player - ${currentplayer}`;
}
function checkgameover() {
  let answer = "";
  winningpositions.forEach((position) => {
    // all the boxes are non empty and same in vaue
    if (
      (gamegrid[position[0]] !== "" ||
        gamegrid[position[1]] !== "" ||
        gamegrid[position[2]] !== "") &&
      gamegrid[position[0]] === gamegrid[position[1]] &&
      gamegrid[position[1]] === gamegrid[position[2]]
    ) {
      // check if winner is x
      if (gamegrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "0";
      }
      //disable pointer event
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      // now we set the x/0 as winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  // it means we have a winner
  if (answer != "") {
    gameinfo.innerText = `Winner Player - ${answer}`;
    newgamebtn.classList.add("active");
    return;
  }
  // let check for tie or when there is no winner
  let fillcount = 0;
  gamegrid.forEach((box) => {
    if (box !== "") {
      fillcount++;
    }
  });
  if (fillcount === 9) {
    gameinfo.innerText = "Game Tied !";
    newgamebtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gamegrid[index] === "") {
    boxes[index].innerText = currentplayer;
    gamegrid[index] = currentplayer;
    boxes[index].style.pointerEvents = "none";

    // swap turn
    swapturn();
    // check if someonewin
    checkgameover();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newgamebtn.addEventListener("click", initgame);
