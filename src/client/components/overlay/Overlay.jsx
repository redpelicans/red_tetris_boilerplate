import React from "react";
import Modal from "components/modals/Modal";
import PropTypes from "prop-types";

export default function Overlay({ children, isOpen, close }) {
  React.useEffect(() => {
    const onEscape = (evt) => {
      if (isOpen && evt.keyCode === 27) {
        close();
      }
    };

    document.addEventListener("keydown", onEscape);

    return function cleanup() {
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return isOpen ? <Modal>{children}</Modal> : null;
}

Overlay.propTypes = {
  children: PropTypes.any,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
