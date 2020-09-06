import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";
import "./Tetrominoes.scss";

export default function Tetromino({ shape, color, size = "10" }) {
  switch (shape) {
    case "I":
      return <TetrominoI color={color} size={size} />;
    case "O":
      return <TetrominoO color={color} size={size} />;
    case "T":
      return <TetrominoT color={color} size={size} />;
    case "L":
      return <TetrominoL color={color} size={size} />;
    case "J":
      return <TetrominoJ color={color} size={size} />;
    case "Z":
      return <TetrominoZ color={color} size={size} />;
    case "S":
      return <TetrominoS color={color} size={size} />;
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
  size: PropTypes.string,
};

// eslint-disable-next-line
function TetrominoI({ color, size }) {
  return (
    <FlexBox>
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
      <FlexBox height={size} width={size} className={`tetromino-${color}`} />
    </FlexBox>
  );
}

// eslint-disable-next-line
function TetrominoO({ color, size }) {
  return (
    <FlexBox direction="col">
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
function TetrominoT({ color, size }) {
  return (
    <FlexBox direction="col">
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
function TetrominoL({ color, size }) {
  return (
    <FlexBox direction="col">
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
function TetrominoJ({ color, size }) {
  return (
    <FlexBox direction="col">
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
function TetrominoZ({ color, size }) {
  return (
    <FlexBox direction="col">
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
function TetrominoS({ color, size }) {
  return (
    <FlexBox direction="col">
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
