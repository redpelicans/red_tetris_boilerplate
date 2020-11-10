import React from "react";
import { Link } from "react-router-dom";
import FlexBox from "components/flexbox/FlexBox";
import { useTranslation } from "react-i18next";

export default function GameOverStats({ score, level, linesRemoved }) {
  const { t } = useTranslation();

  return (
    <FlexBox direction="col" className="bg-white py-8 px-16 rounded space-y-3">
      <h2 className="text-2xl font-bold">{t("pages.game.game_over")}</h2>

      <Score score={score} />
      <Level level={level} />
      <LinesRemoved lines={linesRemoved} />

      <Link
        to="/"
        className="self-center p-2 bg-red-500 rounded w-full text-center text-white font-semibold"
      >
        {t("pages.game.main_menu")}
      </Link>
    </FlexBox>
  );
}

const Score = ({ score }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold">{t("pages.game.score")}:</h3>
      <span className="flex justify-center">{score}</span>
    </div>
  );
};

const Level = ({ level }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold">{t("pages.game.level")}:</h3>
      <span className="flex justify-center">{level}</span>
    </div>
  );
};

const LinesRemoved = ({ lines }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold">
        {t("pages.game.lines_removed_plural")}:
      </h3>
      <span className="flex justify-center">{lines}</span>
    </div>
  );
};
