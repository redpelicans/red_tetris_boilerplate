import React from "react";
import FlexBox from "components/flexbox/FlexBox";

export default function ({ lobby, index }) {
  return (
    <FlexBox
      direction="row"
      width="3/4"
      className="rounded-lg shadow-lg p-3 mb-6 border border-grey-200"
    >
      <input placeholder="Search a lobby..." className="pl-8 w-full h-auto" />
    </FlexBox>
  );
}
