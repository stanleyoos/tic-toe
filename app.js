const player1 = "fa-circle";
const player2 = "fa-times";
let round = 1;

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxes = [...document.querySelectorAll(".box")];
boxes.forEach((box) => box.addEventListener("click", pick));

function pick(e) {
  const { row, column } = e.target.dataset;
  const turn = round % 2 === 0 ? player1 : player2;
  if (board[row][column] !== "") return;
  e.target.classList.add(turn);
  board[row][column] = turn;

  round++;

  console.log(check());
}

const check = () => {
  const result = board.reduce((total, row) => total.concat(row));
  console.log(result);
  let winner = null;
  let moves = {
    "fa-times": [],
    "fa-circle": [],
  };

  result.forEach((field, index) => {
    moves[field] ? moves[field].push(index) : null;
  });

  combinations.forEach((combination) => {
    if (combination.every((num) => moves[player1].indexOf(num) > -1)) {
      winner = player1;
    }

    if (combination.every((num) => moves[player2].indexOf(num) > -1)) {
      winner = player2;
    }
  });
  if (winner !== null) {
    boxes.forEach((box) => box.removeEventListener("click", pick, false));
  }
  return winner;
};
