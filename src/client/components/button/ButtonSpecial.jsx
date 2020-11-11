import React from "react";
import PropTypes from "prop-types";
import "./ButtonSpecial.scss";
import "./Button.scss";
import Tetromino from "components/tetrominoes/Tetrominoes";
import { randomPick, randomRangeNumber } from "helpers/common";
import { pieces } from "constants/tetrominoes";
import { nanoid } from "nanoid";

const count = {};

export default function ButtonSpecial({ onClick, className, children }) {
  const [obj, setObj] = React.useState({});

  const newAnim = (numberPieces) => {
    const array = [];
    for (let i = 0; i < numberPieces; i++) {
      const { color, shape } = randomPick(pieces);
      array.push({
        size: randomRangeNumber(1, 3),
        style: getCssProperties(),
        color,
        shape,
      });
    }
    setObj((obj) => ({
      ...obj,
      [nanoid()]: array,
    }));
  };

  const getCssProperties = () => {
    const x = randomRangeNumber(-150, 150);
    const y = randomRangeNumber(-150, -60);
    const delay = randomRangeNumber(0, 150);
    const duration = randomRangeNumber(800, 1500);

    const cssProperties = {
      "--x": x,
      "--y": y,
      "--x2": x > 0 ? x + 15 : x - 15,
      "--x3": x > 0 ? x + 65 : x - 65,
      "--delay": delay,
      "--duration": duration,
    };
    return cssProperties;
  };

  const deleteKey = (key) => {
    const oldObj = { ...obj };
    oldObj[key] = undefined;
    delete count[key];
    setObj(oldObj);
  };

  const countKey = (key) => {
    if (count[key]) {
      count[key]++;
    } else {
      count[key] = 1;
    }

    if (count[key] === obj[key].length) {
      deleteKey(key);
    }
  };

  return (
    <div className="button-special-wrapper">
      {Object.entries(obj).map(([key, tab]) =>
        tab?.map((el, index) => (
          <RandomTetromino
            countKey={() => countKey(key)}
            size={el.size}
            style={el.style}
            color={el.color}
            shape={el.shape}
            key={key + index}
          />
        )),
      )}
      <button
        className={`${className} on-top`}
        onClick={() => {
          newAnim(randomRangeNumber(5, 10));
          if (onClick) {
            onClick();
          }
        }}
        onMouseEnter={() => newAnim(randomRangeNumber(1, 2))}
      >
        {children}
      </button>
    </div>
  );
}

ButtonSpecial.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
  children: PropTypes.any,
};

const RandomTetromino = ({ size, style, color, shape, countKey, ...rest }) => {
  const [explosion, setExplosion] = React.useState(1);
  return (
    <Tetromino
      shape={shape}
      style={style}
      color={color}
      size={size}
      className="button-special-tetro"
      explosion={explosion}
      onAnimationEnd={() => {
        setExplosion(0);
        countKey();
      }}
      {...rest}
    />
  );
};
