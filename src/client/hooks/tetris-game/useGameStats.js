import React from "react";
import { pipe } from "helpers/functional";
import { lowerOrEqualThan, divideBy } from "helpers/currying";

export default function useGameStats() {
  const [linesRemoved, setLinesRemoved] = React.useState(0);
  const addRemovedLines = React.useCallback((value) =>
    setLinesRemoved((oldValue) => oldValue + value),
  );

  const [level, setLevel] = React.useState(0);
  React.useEffect(() => {
    const newLevel = pipe(
      divideBy(10),
      Math.floor,
      lowerOrEqualThan(10),
    )(linesRemoved);

    setLevel(newLevel);
  }, [linesRemoved]);

  const [score, setScore] = React.useState(0);
  const addScore = React.useCallback(
    (value) => setScore((oldScore) => oldScore + value),
    [],
  );

  const [speedRate, setSpeedRate] = React.useState(1.0);
  React.useEffect(() => {
    setSpeedRate(1.0 + level * 0.05);
  }, [level]);

  return [linesRemoved, addRemovedLines, score, addScore, level, speedRate];
}
