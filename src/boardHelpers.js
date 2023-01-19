"use strict"

/**Checks if all cells on board are false and if so, returns true */
function hasWon(board) {
  // check the board in state to determine whether the player has won.
  return board.every(row => row.every(cell => cell === false));
}

/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
// should this move to helper file if relies on board component?
function createBoard(nrows, ncols, chanceLightStartsOn) {
  let initialBoard = [];
  for (let i = 0; i < nrows; i++) {
    const row = [];
    for (let j = 0; j < ncols; j++) {
      //don't need boolean since Math.random already returns a boolean
      let state = Math.random() < chanceLightStartsOn ? true : false;
      row.push(state);
    }
    initialBoard.push(row);
  }
  return initialBoard;
}


export {hasWon, createBoard};