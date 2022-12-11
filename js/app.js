/*-------------------------------- Constants --------------------------------*/
//
const squareEls = document.querySelectorAll('div');
// console.log(squareEls);
const messageEls = document.getElementById('message');
// console.log(messageEls);
const resetBtnEl = document.querySelector('button');

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;
let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;

/*------------------------ Cached Element References ------------------------*/

document.getElementById("message");

document.querySelectorAll(".sqr");

document.querySelector(".board");

/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('.board').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
init()

function render () {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach(function(square, idx) {
        if (square === 1) {
        return squareEls[idx].innerHTML = "X";
        }else if (square === -1) {
            squareEls[idx].innerHTML = "O";
        }else {
            squareEls[idx].innerHTML = "";
        }
    })
}

function updateMessage() {
    if(winner === false && tie === false) {
        messageEls.textContent = `player ${turn === 1? 'X' : 'O'} turn`;
    } else if (winner === false && tie === true) {
        messageEls.textContent = `${1 === -1? 'X' : 'O'} it's a tie`;
    } else {
        messageEls.textContent = `Yay player ${turn === -1? 'O' : 'X'} wins!`;
    }
}

function placePiece(idx) {
    board[idx] = turn;
    console.log(board)
  }

function handleClick(evt) {
    if (winner === true) {
      return
    }
    console.log(evt.target)
    const sqIdx = evt.target.id
    let sliced = sqIdx.slice(sqIdx.length - 1)
    console.log(sliced)
    if (board[sliced] === null) {
      placePiece(sliced)
      checkForWinner()
      checkForTie()
      switchPlayerTurn()
      render()
    } 
    }

function checkForTie() {
    tie = board.every(function(sqr) {
        return sqr !== null
    })
    console.log(tie);
}

      
function checkForWinner() {
     winningCombos.forEach(function(arr){
     let winning = 0
     arr.forEach(function(el){
         winning += board[el]
    })
          console.log('check winner', winning)
          if (Math.abs(winning) === 3) { 
              winner = true
          }
        })
      }
      
      function switchPlayerTurn() {
        if (winner === true){
          return
        } else {
          turn = turn * -1
        }
      }

      //Reset game board 
