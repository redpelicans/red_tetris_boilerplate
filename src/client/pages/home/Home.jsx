import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import Tetromino from "components/tetrominoes/Tetrominoes";
import { StoreContext } from "store";

export default function Home() {
  const { state, dispatch } = React.useContext(StoreContext);

  console.log(state.socket);

  return (
    <FlexBox height="full" className="items-center justify-center">
      <FlexBox direction="col" className="">
        <Tetromino shape="I" color="cyan" />
        <Tetromino shape="O" color="yellow" />
        <Tetromino shape="T" color="purple" />
        <Tetromino shape="L" color="orange" />
        <Tetromino shape="J" color="blue" />
        <Tetromino shape="Z" color="red" />
        <Tetromino shape="S" color="green" />
        <FlexBox className="">JE SUIS LA</FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
