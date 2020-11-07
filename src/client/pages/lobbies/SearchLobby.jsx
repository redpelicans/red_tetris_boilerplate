import React from "react";
import FlexBox from "components/flexbox/FlexBox";

export default function SearchLobby({ searchedValue, setSearchedValue }) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchedValue(newValue);
  };

  return (
    <FlexBox
      direction="row"
      className="rounded-lg shadow-lg p-3 border border-grey-200"
    >
      <input
        placeholder="Search a lobby..."
        className="pl-8 w-full h-auto"
        value={searchedValue}
        onChange={handleChange}
      />
    </FlexBox>
  );
}
