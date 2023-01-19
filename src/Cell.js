import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just three props:
 *
 *  -coord - coordinate of the cell
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ coord, flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  function flipCells() {
    flipCellsAroundMe(coord);
  }
  return <td className={classes} onClick={flipCells} />;
}

export default Cell;
