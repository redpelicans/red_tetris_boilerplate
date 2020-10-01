/*
 ** This file uses the "Compound Component" pattern.
 ** More info:
 **   - https://kentcdodds.com/blog/compound-components-with-react-hooks/
 */

import React from "react";
import useMouseHover from "hooks/useMouseHover";
import PropTypes from "prop-types";

const HoverableContext = React.createContext(null);

function Hoverable({ children, ...rest }) {
  const [nodeSearchGroup, mouseIn] = useMouseHover();
  const ctx = React.useMemo(() => ({ mouseIn }));

  return (
    <HoverableContext.Provider value={ctx}>
      <div ref={nodeSearchGroup} {...rest}>
        {children}
      </div>
    </HoverableContext.Provider>
  );
}

function In({ children, ...rest }) {
  const { mouseIn } = React.useContext(HoverableContext);

  return mouseIn && <div {...rest}>{children}</div>;
}

function Out({ children, ...rest }) {
  const { mouseIn } = React.useContext(HoverableContext);

  return !mouseIn && <div {...rest}>{children}</div>;
}

Hoverable.In = In;
Hoverable.Out = Out;
export default Hoverable;

Hoverable.propTypes = {
  children: PropTypes.any,
};
