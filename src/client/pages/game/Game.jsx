import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { useTetrisGame } from "hooks";
import { Link } from "react-router-dom";
import { GameContext } from "store";
import NextPieces from "./NextPieces";
import { getElapsedTime } from "helpers/common";
import useEventListener from "hooks/useEventListener";
import useThrottle from "hooks/useThrottle";
import {
  DEFAULT_REPEAT_TIMEOUT,
  COMBO_TEXT,
} from "hooks/tetris-game/constants";
import AudioTheme from "./AudioTheme";

export default function Game() {
  const { state, dispatch } = React.useContext(GameContext);
  const { movePiece } = useTetrisGame(10, 20);

  // Add keyboard event
  const throttledMove = useThrottle(movePiece, DEFAULT_REPEAT_TIMEOUT);
  useEventListener("keydown", throttledMove);

  return (
    <FlexBox
      direction="col"
      width={"full"}
      height={"full"}
      className="justify-center items-center"
    >
      <AudioTheme alive={state.alive} speedRate={state.speedRate} />
      <Link
        to="/"
        className="font-semibold border-2 p-2 mb-2 border-red-300 rounded"
      >
        Retour accueil
      </Link>
      <h1 className="font-bold">{state.alive ? "Still alive" : "GAME OVER"}</h1>
      <FlexBox direction="row" className="mt-4">
        <FlexBox
          direction="col"
          width={64}
          className="justify-center align-center"
        >
          <TetrisGrid grid={state.grid} rowHeight={6} colHeight={6} />
        </FlexBox>
        <FlexBox direction="col" className="items-center mx-4">
          <Timer />
          <Score score={state.score} />
          <Level level={state.level} />
          <LinesRemoved lines={state.rowsRemoved} />
          <NextPieces nextPieces={state.nextPieces} dispatch={dispatch} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

const Score = React.memo(({ score }) => {
  const [combo, setCombo] = React.useState(null);
  React.useEffect(() => {
    if (combo !== null) {
      setTimeout(() => setCombo(null), 750);
    }
  }, [combo]);

  React.useEffect(() => {
    const customEventHandler = (evt) => {
      console.log("custom event triggered", evt.detail, "removed");
      setCombo(COMBO_TEXT[evt.detail]);
    };
    window.addEventListener("custom", customEventHandler);

    return () => {
      window.removeEventListener("custom", customEventHandler);
    };
  }, []);

  return (
    <FlexBox direction="col" className="relative items-center">
      <h1 className="font-bold w-32 text-center">SCORE</h1>
      {combo && (
        <span className="absolute text-bold text-red-600 growing-text">
          {combo}
        </span>
      )}
      <span>{score}</span>
    </FlexBox>
  );
});

const LinesRemoved = React.memo(({ lines }) => <p>{lines} Lines removed</p>);

const Level = React.memo(({ level }) => (
  <h1 className="font-bold">Level {level}</h1>
));

const Timer = React.memo(() => {
  const startTime = new Date();

  const [elapsedTime, setElapsedTime] = React.useState("00:00");
  React.useEffect(() => {
    const formatTimeUnit = (timeUnit) =>
      timeUnit < 10 ? `0${timeUnit}` : timeUnit;

    const formatElapsedTime = (diffTime) => {
      const minutes = diffTime.getMinutes();
      const seconds = diffTime.getSeconds();

      return `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;
    };

    const getNewElapsedTime = () => {
      const newElapsedTime = new Date(getElapsedTime(startTime));
      const newElapsedTimeFormatted = formatElapsedTime(newElapsedTime);
      return newElapsedTimeFormatted;
    };

    setInterval(() => setElapsedTime(getNewElapsedTime()), 1000);
  }, []);

  return <p>{elapsedTime}</p>;
});
