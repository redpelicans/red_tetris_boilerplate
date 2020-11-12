import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./Loose.scss";

function LooseTag({ fontSize }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="absolute bg-black opacity-75 inset-0 h-full w-full z-10" />
      <h3 className={`looser-tag text-${fontSize}`}>
        {t("pages.game.game_over")} !
      </h3>
    </>
  );
}

LooseTag.propTypes = {
  fontSize: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"])
    .isRequired,
};

export default LooseTag;
