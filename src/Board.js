import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { hasWon, createBoard } from "./boardHelpers.js";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.50 }) {
  const [board, setBoard] = useState(
    createBoard(nrows, ncols, chanceLightStartsOn));

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Makes a (deep) copy of the oldBoard
      const newBoard = [];
      for (let row of oldBoard) {
        const newRow = [...row];
        newBoard.push(newRow);
      }

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);

      // return the copy
      return newBoard;
    });
  }

  const won = hasWon(board);

  return (
    <main>
      <h1>Lights Out</h1>
      <h3>{won ? "You won!" : ""}</h3>
      <table className={`Board ${won ? "hidden" : ""}`}>
        <tbody>
          {board.map((row, y) => <tr key={y}>{row.map((cell, x) =>
            <Cell coord={`${y}-${x}`} key={`${y}-${x}`} flipCellsAroundMe={flipCellsAround} isLit={cell} />)}</tr>)}
        </tbody>
      </table>
    </main>
  );
}

export default Board;
