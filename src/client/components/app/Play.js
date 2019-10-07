import React from 'react';
import PlayButton from './HomeButton';

const ButtonStyle = {
  padding: "10px",
  marginTop: "5px",
  marginBottom: "5px"
}

const Play = () => {
  return (
    <div><PlayButton style={ButtonStyle}>Play</PlayButton></div>
  )
}

export default Play;
