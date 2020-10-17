import React from "react";
import FlexBox from "components/flexbox/FlexBox";

export default function ({ lobby, index }) {
  const [translate, setTranslate] = React.useState(false);

  return (
    <FlexBox
      direction="row"
      width="3.3/10"
      className={`absolute top-0 bottom-0 right-0 bg-red-500 transition-all duration-500 ease-in-out transform ${
        translate ? `translate-x-0` : `translate-x-9/10`
      }`}
    >
      <FlexBox
        direction="col"
        width="full"
        height="full"
        className="relative justify-center items-center"
      >
        <FlexBox
          width="10"
          height="10"
          className="absolute justify-center items-center rounded rounded-full bg-blue-500 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setTranslate((e) => !e)}
        >
          {translate ? `>` : `<`}
        </FlexBox>
        <span>You don't have any lobby yet :(</span>
      </FlexBox>
    </FlexBox>
  );
}
