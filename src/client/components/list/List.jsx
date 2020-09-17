import React from "react";

export function List({ object, name, onClick, buttonText }) {
  const array = Object.entries(object || {});
  return (
    <ul>
      {array.map(([key, el], index) => (
        <div key={key}>
          <li>{`${name} ${index + 1} : ${el.name}`}</li>
          {onClick && (
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
              type="button"
              onClick={() => onClick(el)}
            >
              {buttonText}
            </button>
          )}
        </div>
      ))}
    </ul>
  );
}
