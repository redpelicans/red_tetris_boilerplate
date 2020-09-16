import React from "react";

export function List({ object, type }) {
  const array = Object.entries(object?.[type] || {});
  //   const name = "salut";
  const name = type
    .split("")
    .splice(0, type.length - 1)
    .join("");
  return (
    <ul>
      {array.map(([key, el], index) => {
        return <li key={key}>{`${name} ${index + 1} : ${el.name}`}</li>;
      })}
    </ul>
  );
}
