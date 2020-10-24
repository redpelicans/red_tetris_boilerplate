import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";
import { CURRENT_PIECE, SHADOW_PIECE } from "constants/tetris";

const TetrisGrid = ({
  grid,
  currentPieceColor,
  rowHeight,
  colHeight,
  ...rest
}) => (
  <TetrisRows
    rows={grid}
    currentPieceColor={currentPieceColor}
    rowHeight={rowHeight}
    colHeight={colHeight}
    {...rest}
  />
);

export default TetrisGrid;

TetrisGrid.propTypes = {
  grid: PropTypes.array.isRequired,
  currentPieceColor: PropTypes.string.isRequired,
  rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  colHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

const TetrisRows = ({
  rows,
  currentPieceColor,
  rowHeight,
  colHeight,
  ...rest
}) =>
  rows.map((row, idx) => (
    <FlexBox key={`row-${idx}`} direction="row" height={rowHeight} {...rest}>
      <TetrisCols
        cols={row}
        currentPieceColor={currentPieceColor}
        rowIdx={idx}
        colHeight={colHeight}
      />
    </FlexBox>
  ));

const TetrisCols = ({ cols, currentPieceColor, rowIdx, colHeight }) => {
  const nbCol = cols.length;

  return cols.map((col, idx) => (
    <FlexBox
      key={`row-${rowIdx}/col-${idx}`}
      direction="col"
      height={colHeight}
      width={`1/${nbCol}`}
      className={getTetroColor(col, currentPieceColor)}
    />
  ));
};

const getTetroColor = (col, currentPieceColor) => {
  switch (col) {
    case CURRENT_PIECE:
      return `tetromino-${currentPieceColor}`;
    case SHADOW_PIECE:
      return `tetromino-${currentPieceColor} opacity-50`;
    default:
      return `tetromino-${col}`;
  }
};
