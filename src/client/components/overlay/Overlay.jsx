import React from "react";
import Modal from "components/modals/Modal";
import PropTypes from "prop-types";

export default function Overlay({ children, open, close }) {
  React.useEffect(() => {
    const onEscape = (evt) => {
      if (open && evt.keyCode === 27) {
        close();
      }
    };

    document.addEventListener("keydown", onEscape);

    return function cleanup() {
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return open ? <Modal>{children}</Modal> : null;
}

Overlay.propTypes = {
  children: PropTypes.any,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
