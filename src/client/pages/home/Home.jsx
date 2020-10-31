import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import GamePad from "components/game-pad/GamePad";
import {
  gamePadMatrix,
  gamePadMatrixHover,
} from "components/game-pad/constants";
import LanguageSelection from "components/language/LanguageSelection";
import Hoverable from "components/hoverable/Hoverable";
import Modal from "components/modals/Modal";
import AnimatedBackground from "./AnimatedBackground";
import { useTranslation } from "react-i18next";
import "./Home.scss";

export default function Home() {
  return (
    <FlexBox height="full" width="full" className="overflow-hidden">
      <AnimatedBackground />
      <Modal className="home-modal">
        <LanguageSelection />
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

const SinglePlayer = () => {
  const { t } = useTranslation();

  return (
    <Hoverable className="home-game-pad">
      <Hoverable.In>
        <GamePad model={gamePadMatrixHover} size={2} />
      </Hoverable.In>
      <Hoverable.Out>
        <GamePad model={gamePadMatrix} size={2} />
      </Hoverable.Out>
      <h2>{t("pages.home.solo")}</h2>
    </Hoverable>
  );
};

const MultiPlayer = () => {
  const { t } = useTranslation();

  return (
    <Hoverable className="home-game-pad">
      <Hoverable.In className="flex-row">
        <GamePad className="mr-2" model={gamePadMatrixHover} size={2} />
        <GamePad model={gamePadMatrixHover} size={2} />
      </Hoverable.In>
      <Hoverable.Out className="flex-row">
        <GamePad className="mr-2" model={gamePadMatrix} size={2} />
        <GamePad model={gamePadMatrix} size={2} />
      </Hoverable.Out>
      <h2>{t("pages.home.multijoueur")}</h2>
    </Hoverable>
  );
};
