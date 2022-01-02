import React from "react";
import ReactModal from "react-modal";
import { CloseIcon } from "../../icons";

import "./modal.css";

const customStyles = {
  default: {
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
      color: "var(--color-primary-900)",
      borderRadius: 6,
      padding: "20px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-button-text)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 400,
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
  ReactModal["props"] & { variant?: keyof typeof customStyles; title: string }
> = ({ children, variant = "default", title, ...props }) => {
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
            <h4>{title}</h4>
            <span onClick={(e) => props.onRequestClose?.(e)}>
              <CloseIcon fill="#4f5760" style={{ cursor: "pointer" }} />
            </span>
          </div>
          <div className="MyModal__content">{children}</div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
