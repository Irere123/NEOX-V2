import React from "react";
import ReactModal from "react-modal";
import { CloseIcon } from "../../icons";

import "./modal.css";

const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 3,
      padding: "20px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
  userPreview: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: 0,
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-900)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 435,
    },
  },
  fullscreen: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "100vh",
      width: "100vw",
      maxWidth: "100vw",
      height: "100vh",
    },
  },
};

const Modal: React.FC<
  ReactModal["props"] & { variant?: keyof typeof customStyles }
> = ({ children, variant = "default", ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className="modalContainer">
        <div tabIndex={-1} className="focus:outline-none">
          <div className="MyModal__header">
            <span onClick={(e) => props.onRequestClose?.(e)}>
              <CloseIcon />
            </span>
          </div>
          {children}
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
