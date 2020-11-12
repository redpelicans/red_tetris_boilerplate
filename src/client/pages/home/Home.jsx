import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link, useLocation } from "react-router-dom";
import GamePad from "components/game-pad/GamePad";
import {
  gamePadMatrix,
  gamePadMatrixHover,
} from "components/game-pad/constants";
import Hoverable from "components/hoverable/Hoverable";
import Modal from "components/modals/Modal";
import AnimatedBackground from "./AnimatedBackground";
import { useTranslation } from "react-i18next";
import InputUserName from "./InputUserName";
import "./Home.scss";

export default function Home() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state === "forceRefresh") {
      document.location.reload();
    }
  }, []);

  return (
    <FlexBox height="full" width="full" className="overflow-hidden">
      <AnimatedBackground />
      <Modal className="home-modal">
        <h1>Red Tetris</h1>
        <Link to="/single-player[solo]/game" className="mb-10 cursor-pointer">
          <SinglePlayer />
        </Link>
        <MultiPlayer />
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
  const [hasClicked, setHasClicked] = React.useState(false);

  return hasClicked ? (
    <InputUserName />
  ) : (
    <MultiPlayerGamePad setHasClicked={setHasClicked} />
  );
};

const MultiPlayerGamePad = ({ setHasClicked }) => {
  const { t } = useTranslation();
  return (
    <Hoverable
      className="home-game-pad cursor-pointer"
      onClick={() => setHasClicked(true)}
    >
      <Hoverable.In className="flex flex-row">
        <GamePad className="mr-2" model={gamePadMatrixHover} size={2} />
        <GamePad model={gamePadMatrixHover} size={2} />
      </Hoverable.In>
      <Hoverable.Out className="flex-row">
        <GamePad className="mr-2" model={gamePadMatrix} size={2} />
        <GamePad model={gamePadMatrix} size={2} />
      </Hoverable.Out>
      <h2>{t("pages.home.multiplayer")}</h2>
    </Hoverable>
  );
};
