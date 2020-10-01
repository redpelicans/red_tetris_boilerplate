import React from "react";
import ReactDOM from "react-dom";

export default function useMouseHover() {
  const [mouseHover, setMouseHover] = React.useState(false);
  const nodeSearchGroup = React.useRef(null);

  React.useEffect(() => {
    const domNode = ReactDOM.findDOMNode(nodeSearchGroup.current);

    function mouseIn() {
      setMouseHover(true);
    }

    function mouseOut() {
      setMouseHover(false);
    }

    domNode.addEventListener("mouseenter", mouseIn);
    domNode.addEventListener("mouseleave", mouseOut);

    return function cleanup() {
      domNode.removeEventListener("mouseenter", mouseIn);
      domNode.removeEventListener("mouseleave", mouseOut);
    };
  }, [nodeSearchGroup.current]);

  return [nodeSearchGroup, mouseHover];
}
