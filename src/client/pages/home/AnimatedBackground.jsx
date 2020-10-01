import React from "react";
import Tetromino from "components/tetrominoes/Tetrominoes";
import FlexBox from "components/flexbox/FlexBox";
import { randomPick } from "helpers/common";
import { pieces } from "constants/tetrominoes";

const BG_LAYER_SEQUENCE = [4, 6, 10, 8, 5, 7, 3, 9, 7, 6];
const MID_LAYER_SEQUENCE = [5, 8, 4, 6, 9, 3, 6, 5, 4, 10];
const FG_LAYER_SEQUENCE = [2, 3, 7, 5, 4, 6, 5, 8, 9, 7];

export default function AnimatedBackground() {
  return (
    <FlexBox className="absolute h-full w-full overflow-hidden">
      <Layer className="-ml-5">
        {BG_LAYER_SEQUENCE.map((duration, idx) => (
          <RandomTetromino
            key={`bg-layer-${idx}`}
            duration={duration}
            size={4}
          />
        ))}
      </Layer>
      <Layer className="z-10">
        {MID_LAYER_SEQUENCE.map((duration, idx) => (
          <RandomTetromino
            key={`bg-layer-${idx}`}
            duration={duration}
            size={5}
          />
        ))}
      </Layer>
      <Layer className="z-20 ml-5">
        {FG_LAYER_SEQUENCE.map((duration, idx) => (
          <RandomTetromino
            key={`bg-layer-${idx}`}
            duration={duration}
            size={6}
          />
        ))}
      </Layer>
    </FlexBox>
  );
}

const Layer = ({ children, className = "" }) => (
  <FlexBox
    className={
      "absolute h-full w-full overflow-hidden justify-between " + className
    }
  >
    {children}
  </FlexBox>
);

const RandomTetromino = ({ duration, size }) => {
  const { color, shape } = randomPick(pieces);

  return (
    <Tetromino
      shape={shape}
      color={color}
      size={size}
      className={`relative animation-duration-${duration} drop-animation`}
    />
  );
};
