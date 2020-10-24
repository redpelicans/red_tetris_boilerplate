import React from "react";
import PropTypes from "prop-types";
import "./ButtonSpecial.scss";
import Tetromino from "components/tetrominoes/Tetrominoes";
import { randomPick } from "helpers/common";
import { pieces } from "constants/tetrominoes";

export default function ButtonSpecial({ onClick, name, ...rest }) {
  const [tab, setTab] = React.useState([]);
  const [displayedAnimation, setDisplayedAnimation] = React.useState(false);
  const [playAnimation, setPlayAnimation] = React.useState(false);

  React.useEffect(() => {
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(RandomTetromino);
    }
    setTab(array);
  }, [playAnimation]);

  React.useEffect(() => {
    if (!playAnimation) return;
    setTimeout(() => setPlayAnimation(false), 2000);
  }, [playAnimation]);

  const getSize = () => {
    return Math.floor(Math.random() * 3 + 1);
  };

  const getCssProperties = () => {
    const x = Math.floor(Math.random() * (100 - -100) + -100);
    const y = Math.floor(Math.random() * (-20 - -125) + -125);
    const delay = Math.floor(Math.random() * (300 - 0) + 0);
    const duration = Math.floor(Math.random() * (2000 - 1000) + 1000);

    const res = {
      "--x": x,
      "--y": y,
      "--x2": x > 0 ? x + 15 : x - 15,
      "--x3": x > 0 ? x + 65 : x - 65,
      "--delay": delay,
      "--duration": duration,
    };
    return res;
  };

  return (
    <div className="wrapperButton">
      {displayedAnimation &&
        playAnimation &&
        tab.map((El, index) => {
          return (
            <El
              size={getSize()}
              style={getCssProperties()}
              className="tetromino"
              key={index + "tetromino"}
            />
          );
        })}
      <div
        className="button"
        onClick={() => {
          setDisplayedAnimation(true);
          setPlayAnimation(true);
        }}
      >
        {name}
      </div>
    </div>
  );
}

ButtonSpecial.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
};

const RandomTetromino = ({ size, ...rest }) => {
  const { color, shape } = randomPick(pieces);

  return <Tetromino shape={shape} color={color} size={size} {...rest} />;
};
