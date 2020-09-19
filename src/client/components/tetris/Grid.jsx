import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";
import { GameContext } from "store";
import { CURRENT_PIECE, SHADOW_PIECE } from "hooks/tetris-game/constants";
import "./Grid.scss";

const TetrisGrid = React.memo(({ grid, rowHeight, colWidth, colHeight }) => (
  <TetrisRows
    rows={grid}
    rowHeight={rowHeight}
    colWidth={colWidth}
    colHeight={colHeight}
  />
));

export default TetrisGrid;

TetrisGrid.propTypes = {
  grid: PropTypes.array.isRequired,
};

const TetrisRows = ({ rows, rowHeight, colWidth, colHeight }) =>
  rows.map((row, idx) => (
    <FlexBox key={`row-${idx}`} direction="row" height={rowHeight}>
      <TetrisCols
        cols={row}
        rowIdx={idx}
        colWidth={colWidth}
        colHeight={colHeight}
      />
    </FlexBox>
  ));

const TetrisCols = ({ cols, rowIdx, colHeight }) => {
  const {
    state: { currentPiece },
  } = React.useContext(GameContext);
  const nbCol = cols.length;

  return cols.map((col, idx) => (
    <FlexBox
      key={`row-${rowIdx}/col-${idx}`}
      direction="col"
      height={colHeight}
      width={`1/${nbCol}`}
      className={getTetroColor(col, currentPiece)}
    />
  ));
};

const getTetroColor = (col, currentPiece) => {
  switch (col) {
    case CURRENT_PIECE:
      return `tetromino-${currentPiece.color}`;
    case SHADOW_PIECE:
      return `tetromino-${currentPiece.color} opacity-50`;
    default:
      return `tetromino-${col}`;
  }
};
