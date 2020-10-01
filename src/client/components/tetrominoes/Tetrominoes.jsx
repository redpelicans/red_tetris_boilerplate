import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";

export default function Tetromino({ shape, color, size = 5, ...rest }) {
  switch (shape) {
    case "I":
      return <TetrominoI color={color} size={size} {...rest} />;
    case "O":
      return <TetrominoO color={color} size={size} {...rest} />;
    case "T":
      return <TetrominoT color={color} size={size} {...rest} />;
    case "L":
      return <TetrominoL color={color} size={size} {...rest} />;
    case "J":
      return <TetrominoJ color={color} size={size} {...rest} />;
    case "Z":
      return <TetrominoZ color={color} size={size} {...rest} />;
    case "S":
      return <TetrominoS color={color} size={size} {...rest} />;
    default:
      throw new Error("Tetromino's shape not recognized.");
  }
}

Tetromino.propTypes = {
  color: PropTypes.oneOf([
    "red",
    "green",
    "yellow",
    "orange",
    "blue",
    "purple",
    "cyan",
  ]),
  shape: PropTypes.oneOf(["I", "O", "T", "L", "J", "Z", "S"]).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// eslint-disable-next-line
function TetrominoI({ color, size, ...rest }) {
  return (
    <FlexBox {...rest}>
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoO({ color, size, ...rest }) {
  return (
    <FlexBox {...rest} direction="col">
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoT({ color, size, ...rest }) {
  return (
    <FlexBox {...rest} direction="col">
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
      <FlexBox>
        <FlexBox height={size} width={size} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoL({ color, size, ...rest }) {
  return (
    <FlexBox {...rest} direction="col">
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoJ({ color, size, ...rest }) {
  return (
    <FlexBox {...rest} direction="col">
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
      <FlexBox>
        <FlexBox height={size} width={size} />
        <FlexBox height={size} width={size} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoZ({ color, size, ...rest }) {
  return (
    <FlexBox {...rest} direction="col">
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
      <FlexBox>
        <FlexBox height={size} width={size} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoS({ color, size, ...rest }) {
  return (
    <FlexBox {...rest} direction="col">
      <FlexBox>
        <FlexBox height={size} width={size} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
      <FlexBox>
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
        <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      </FlexBox>
    </FlexBox>
  );
}
