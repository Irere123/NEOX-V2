import React from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";

import { CloseIcon } from "../../../icons";
import { useLogoutMutation } from "../../../generated/graphql";

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
      color: "var(--color-primary-200)",
      borderRadius: 6,
      padding: "15px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-700)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 400,
    },
  },
};

const Modal: React.FC<
  ReactModal["props"] & {
    variant?: keyof typeof customStyles;
    onRequestClose: any;
  }
> = ({ variant = "default", onRequestClose, ...props }) => {
  const [logout] = useLogoutMutation();
  const history = useHistory();

  return (
    <ReactModal
      appElement={document.getElementById("#root") as HTMLElement}
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className="modalContainer">
        <div tabIndex={-1} className="focus:outline-none">
          <div className="MyCreateTeamModal__header">
            <h4>Are you sure?</h4>
            <span onClick={onRequestClose}>
              <CloseIcon fill="var(--color-primary-100)" />
            </span>
          </div>
          <div className="MyCreateTeamModal__content">
            <button>Go back</button>
            <button
              onClick={() => {
                logout();
                history.push("/");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
