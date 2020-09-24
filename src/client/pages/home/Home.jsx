import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import { StoreContext } from "store";

export default function Home() {
  const { state, dispatch } = React.useContext(StoreContext);

  console.log(state.socket);

  return (
    <FlexBox height="full" className="items-center justify-center">
      <FlexBox direction="col" className="">
        <Link
          to="/game"
          className="font-semibold text-xl border-2 p-4 border-red-300 rounded"
        >
          Jouer a Tetris
        </Link>
      </FlexBox>
    </FlexBox>
  );
}
