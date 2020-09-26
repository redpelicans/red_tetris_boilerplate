import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import GamePad from "components/game-pad/GamePad";
import {
  gamePadMatrix,
  gamePadMatrixHover,
} from "components/game-pad/constants";
import Hoverable from "components/hoverable/Hoverable";
import Modal from "components/modals/Modal";
import "./Home.scss";

export default function Home() {
  return (
    <FlexBox height="full" width="full">
      <Modal className="home-modal">
        <h1>Red Tetris</h1>
        <Link to="/game" className="mb-10">
          <SinglePlayer />
        </Link>
        <Link to="/game">
          <MultiPlayer />
        </Link>
      </Modal>
    </FlexBox>
  );
}

const SinglePlayer = () => (
  <Hoverable className="home-game-pad">
    <Hoverable.In className="hovered">
      <GamePad model={gamePadMatrixHover} size={2} />
      <h2>Solo</h2>
    </Hoverable.In>
    <Hoverable.Out>
      <GamePad model={gamePadMatrix} size={2} />
    </Hoverable.Out>
  </Hoverable>
);

const MultiPlayer = () => (
  <Hoverable className="home-game-pad">
    <Hoverable.In className="hovered">
      <FlexBox direction="row">
        <GamePad className="mr-2" model={gamePadMatrixHover} size={2} />
        <GamePad model={gamePadMatrixHover} size={2} />
      </FlexBox>
      <h2>Multijoueur</h2>
    </Hoverable.In>
    <Hoverable.Out className="flex flex-row">
      <GamePad className="mr-2" model={gamePadMatrix} size={2} />
      <GamePad model={gamePadMatrix} size={2} />
    </Hoverable.Out>
  </Hoverable>
);
