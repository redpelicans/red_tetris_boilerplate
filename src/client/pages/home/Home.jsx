import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import CreatePlayer from "components/player/CreatePlayer";

export default function Home() {
  return (
    <FlexBox height="full" className="items-center justify-center">
      <CreatePlayer />
    </FlexBox>
  );
}
