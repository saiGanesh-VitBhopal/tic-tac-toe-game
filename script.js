const board = document.getElementById("board");
const reset = document.getElementById("reset");
const turnDisplay = document.getElementById("turnDisplay");
const lastMove = document.getElementById("lastMove");


let currentPlayer = "X";
let cells = Array(9).fill("");
let gameOver = false;


function renderBoard() {
  board.innerHTML = "";
  cells.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = val;
    cell.onclick = () => makeMove(i);
    board.appendChild(cell);
  });
}


function makeMove(i) {
  if (cells[i] !== "" || gameOver) return;


  // Set player move
  cells[i] = currentPlayer;


  // Show last move
  lastMove.innerText =
    currentPlayer === "X"
      ? `Player 1 chose cell ${i + 1}`
      : `Player 2 chose cell ${i + 1}`;


  // Check winner
  if (checkWinner()) {
    gameOver = true;
    turnDisplay.innerText =
      currentPlayer === "X"
        ? "Player 1 (X) Wins! 🎉"
        : "Player 2 (O) Wins! 🎉";
    return renderBoard();
  }


  // Check draw
  if (cells.every(c => c !== "")) {
    gameOver = true;
    turnDisplay.innerText = "It's a Draw! 🤝";
    return;
  }


  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";


  turnDisplay.innerText =
    currentPlayer === "X" ? "Player 1 (X) Turn" : "Player 2 (O) Turn";


  renderBoard();
}


function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];


  return wins.some(([a, b, c]) => {
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}


reset.onclick = () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  turnDisplay.innerText = "Player 1 (X) Turn";
  lastMove.innerText = "";
  renderBoard();
};


renderBoard();
