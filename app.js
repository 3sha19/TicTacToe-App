let userChoice;
let computerChoice;
let turnO;

let boxes = document.querySelectorAll('.box');
let gameContainer = document.querySelector('.game-container');

let resetbtn = document.querySelector('#reset');
let newgamebtn = document.querySelector('#new-btn');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let choiceContainer = document.querySelector('.choice-container');
let chooseXBtn = document.querySelector('#choose-x');
let chooseOBtn = document.querySelector('#choose-o');

const winConditions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

chooseXBtn.addEventListener('click', () => {
  userChoice = "X";
  computerChoice = "O";
  turnO = userChoice === "O";
  choiceContainer.classList.add('hide');
  gameContainer.classList.remove('hide'); // ✅ SHOW the game board
});

chooseOBtn.addEventListener('click', () => {
  userChoice = "O";
  computerChoice = "X";
  turnO = userChoice === "O";
  choiceContainer.classList.add('hide');
  gameContainer.classList.remove('hide'); // ✅ SHOW the game board
});

const resetGame = () => {
  enableBoxes();
  msgcontainer.classList.add("hide");
  gameContainer.classList.add("hide");      // ✅ HIDE game board
  choiceContainer.classList.remove("hide"); // ✅ SHOW choice again
};


boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;

        checkWinner();
        turnO = !turnO;
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText="Congratulations! " + winner + " is the winner!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
    let winnerFound = false;

    for (let pattern of winConditions) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winnerFound = true;
                showWinner(pos1);
                return;
            }
        }
    }
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (!winnerFound && allFilled) {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
};

newgamebtn.addEventListener('click',resetGame);
resetbtn.addEventListener('click',resetGame);