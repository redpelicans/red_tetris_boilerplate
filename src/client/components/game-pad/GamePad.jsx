import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";

export default function GamePad({ model, size, ...rest }) {
  const getTileColor = (tile) => {
    switch (tile) {
      case 0:
        return "opacity-0";
      case 1:
        return "bg-grey-300";
      case 2:
        return "bg-grey-700";
      default:
        return `bg-${tile}-600`;
    }
  };

  return (
    <div {...rest}>
      {model.map((row, idxRow) => (
        <FlexBox key={idxRow} flexDirection="row">
          {row.map((col, idxCol) => (
            <FlexBox
              flexDirection="col"
              key={(idxRow + 1) * idxCol}
              height={size}
              width={size}
              className={getTileColor(col)}
            />
          ))}
        </FlexBox>
      ))}
    </div>
  );
}

GamePad.propTypes = {
  model: PropTypes.arrayOf(PropTypes.array).isRequired,
  size: PropTypes.number.isRequired,
};
