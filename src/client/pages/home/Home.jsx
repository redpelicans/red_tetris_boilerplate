import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { grow } from "actions/store";
import { Link } from "react-router-dom";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const { state, dispatch } = React.useContext(StoreContext);

  const incrementAge = async () => {
    await timeout(1000);
    dispatch(grow(1));
  };

  console.log(state);
  return (
    <FlexBox height="full" className="items-center justify-center">
      <FlexBox direction="col" className="">
        <FlexBox className="">JE SUIS LA</FlexBox>
        <button onClick={incrementAge}>J'ai {state.age} ans</button>
        <Link to="/game">Click me</Link>
      </FlexBox>
    </FlexBox>
  );
}
