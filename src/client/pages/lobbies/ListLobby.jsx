import React from "react";

export function ListLobby({ object, name }) {
  const array = Object.entries(object || {});
  console.log(array);
  return (
    <ul>
      {array.map(([key, el], index) => (
        <div key={key}>
          <li>{`${name} ${index + 1} : ${el?.player.name} : ${el?.ready} `}</li>
        </div>
      ))}
    </ul>
  );
}
