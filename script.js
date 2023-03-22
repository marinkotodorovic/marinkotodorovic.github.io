const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const humanPlayer = "X";
const computerPlayer = "O";

function makeMove(x, y) {
  if (board[x][y] === "") {
    board[x][y] = humanPlayer;
    updateBoard();
    if (!isGameOver()) {
      computerMove();
      updateBoard();
    }
  }
}

function updateBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.querySelector(`.cell[onclick='makeMove(${i}, ${j})']`);
      cell.textContent = board[i][j];
    }
  }

  if (isGameOver()) {
    setTimeout(() => {
      alert("Game over!");
      resetBoard();
    }, 500);
  }
}

function isGameOver() {
  const lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line.every(cell => cell === humanPlayer) || line.every(cell => cell === computerPlayer)) {
      return true;
    }
  }

  return board.every(row => row.every(cell => cell !== ""));
}

function computerMove() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 3);
    y = Math.floor(Math.random() * 3);
  } while (board[x][y] !== "");

  board[x][y] = computerPlayer;
}

function resetBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
    }
  }
  updateBoard();
}
