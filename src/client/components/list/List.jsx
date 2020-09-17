import React from "react";

export function List({ object, name }) {
  const array = Object.entries(object || {});
  return (
    <ul>
      {array.map(([key, el], index) => (
        <li key={key}>{`${name} ${index + 1} : ${el.name}`}</li>
      ))}
    </ul>
  );
}
