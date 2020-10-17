import React from "react";
import FlexBox from "components/flexbox/FlexBox";

const isFull = (lobby) => players.length >= maxPlayer;

export default function ({ lobby, index }) {
  const [hover, setHover] = React.useState(false);

  return (
    <FlexBox
      direction="row"
      width="3/4"
      className="border border-grey-200 justify-between items-center items-center rounded-lg shadow-lg p-3 mb-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FlexBox direction="col pl-8">
        <span className="text-base font-semibold">{lobby.name}</span>
        <span className="text-xs">{lobby.owner.name}</span>
      </FlexBox>

      {hover ? (
        <button>Join lobby</button>
      ) : (
        <FlexBox>
          <span className="mr-2">
            {lobby.players.length}/{lobby.maxPlayer}
          </span>
          {isFull ? (
            <div className="h-5 w-5 rounded-md bg-green-500 mr-2" />
          ) : (
            <div className="h-5 w-5 rounded-md bg-red-500 mr-2" />
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
}
