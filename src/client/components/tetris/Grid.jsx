import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";
import { GameContext } from "store";
import "./Grid.scss";

const TetrisGrid = React.memo(({ grid }) => <TetrisRows rows={grid} />);

export default TetrisGrid;

TetrisGrid.propTypes = {
  grid: PropTypes.array.isRequired,
};

const TetrisRows = ({ rows }) =>
  rows.map((row, idx) => (
    <FlexBox key={`row-${idx}`} direction="row" height={6}>
      <TetrisCols cols={row} rowIdx={idx} />
    </FlexBox>
  ));

const TetrisCols = ({ cols, rowIdx }) => {
  const {
    state: { currentPiece },
  } = React.useContext(GameContext);
  const nbCol = cols.length;

  return cols.map((col, idx) => (
    <FlexBox
      key={`row-${rowIdx}/col-${idx}`}
      direction="col"
      height={6}
      width={`1/${nbCol}`}
      className={
        col === 1 ? `tetromino-${currentPiece.color}` : `tetromino-${col}`
      }
    />
  ));
};
