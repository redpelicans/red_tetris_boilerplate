import React from "react";
import { Link } from "react-router-dom";
import FlexBox from "components/flexbox/FlexBox";

export default function GameOverStats({ score, level, linesRemoved }) {
  return (
    <FlexBox direction="col" className="bg-white py-8 px-16 rounded space-y-3">
      <h2 className="text-2xl font-bold">Game Over</h2>

      <Score score={score} />
      <Level level={level} />
      <LinesRemoved lines={linesRemoved} />

      <Link
        to="/"
        className="self-center p-2 bg-red-500 rounded w-full text-center text-white font-semibold"
      >
        Main menu
      </Link>
    </FlexBox>
  );
}

const Score = ({ score }) => (
  <div>
    <h3 className="text-lg font-semibold">Score:</h3>
    <span className="flex justify-center">{score}</span>
  </div>
);

const Level = ({ level }) => (
  <div>
    <h3 className="text-lg font-semibold">Level:</h3>
    <span className="flex justify-center">{level}</span>
  </div>
);

const LinesRemoved = ({ lines }) => (
  <div>
    <h3 className="text-lg font-semibold">Lines removed:</h3>
    <span className="flex justify-center">{lines}</span>
  </div>
);
