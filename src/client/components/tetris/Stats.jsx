import React from "react";
import { useTranslation } from "react-i18next";
import { getElapsedTime } from "helpers/common";
import FlexBox from "components/flexbox/FlexBox";
import { GameContext } from "store";

export const Score = React.memo(({ score }) => {
  const { t } = useTranslation();

  return (
    <FlexBox direction="col" className="relative items-center">
      <h1 className="font-bold w-32 text-center text-lg">
        {t("pages.game.score")}
      </h1>
      <span>{score}</span>
    </FlexBox>
  );
});

export const LinesRemoved = React.memo(({ lines }) => {
  const { t } = useTranslation();

  return <p>{t("pages.game.lines_removed", { count: lines })}</p>;
});

export const Level = React.memo(({ level }) => {
  const { t } = useTranslation();

  return (
    <h1 className="font-bold text-lg">
      {t("pages.game.level")} {level}
    </h1>
  );
});

export const Timer = React.memo(() => {
  const { state } = React.useContext(GameContext);
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

    if (state.alive) {
      const timerInterval = setInterval(
        () => setElapsedTime(getNewElapsedTime()),
        1000,
      );

      return () => clearInterval(timerInterval);
    }
  }, [state.alive]);

  return <p>{elapsedTime}</p>;
});
