import React, { ReactNode, useState } from "react";
import ReactModal from "react-modal";

import { CloseIcon } from "../../icons";
import { Page1, Page2, Page3 } from "./Pages";

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
};

const Modal: React.FC<
  ReactModal["props"] & {
    variant?: keyof typeof customStyles;
    onRequestClose: any;
  }
> = ({ variant = "default", onRequestClose, ...props }) => {
  const [page, setPage] = useState(0);

  const setNewPage = (page: number) => {
    setPage(page);
  };

  const prevPage = (page: number) => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  let pageToRender: ReactNode;

  if (page === 0) {
    pageToRender = (
      <Page1 setPage={setNewPage} onRequestClose={onRequestClose} />
    );
  } else if (page === 1) {
    pageToRender = (
      <Page2 prevPage={prevPage} onRequestClose={onRequestClose} />
    );
  } else if (page === 2) {
    pageToRender = (
      <Page3 prevPage={prevPage} onRequestClose={onRequestClose} />
    );
  }

  let cardTitle: string | null = null;

  if (page === 0) {
    cardTitle = "Create a team";
  } else if (page === 1) {
    cardTitle = "Customize your team";
  } else if (page === 2) {
    cardTitle = "Create a study group";
  }

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
            <h4>{cardTitle}</h4>
            <span onClick={onRequestClose}>
              <CloseIcon fill="#4f5760" />
            </span>
          </div>
          <div className="MyCreateTeamModal__content">{pageToRender}</div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
