import React, { ReactNode, useState } from "react";
import ReactModal from "react-modal";

import { CloseIcon } from "../../icons";
import { Page1, Page2, Page3, Page4 } from "./Pages";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { TemplateContext } from "../../hooks/useTemplate";

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
  const [template, setTemplate] = useState("study_group");
  const { t } = useTypeSafeTranslation();

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
  } else if (page === 3) {
    pageToRender = (
      <Page4 prevPage={prevPage} onRequestClose={onRequestClose} />
    );
  }

  let cardTitle: string | null = null;

  let title = null;

  if (template === "study_group") {
    title = "Customize your group";
  } else if (template === "school_club") {
    title = "Customize your club";
  } else if (template === "friends") {
    title = "Customize your group";
  }

  if (page === 0) {
    cardTitle = t("modals.createTeamModal.title");
  } else if (page === 1) {
    cardTitle = t("modals.createTeamModal.subtitle");
  } else if (page === 2) {
    cardTitle = title;
  } else if (page === 3) {
    cardTitle = "Join a team";
  }
  const value = { template, setTemplate };

  return (
    <TemplateContext.Provider value={value}>
      <ReactModal
        shouldCloseOnEsc
        shouldFocusAfterRender
        style={customStyles[variant]}
        {...props}
      >
        <div className="modalContainer">
          <div tabIndex={-1} className="focus:outline-none">
            <div className="MyCreateModal__header">
              <h4>{cardTitle}</h4>
              <span onClick={onRequestClose}>
                <CloseIcon fill="#4f5760" />
              </span>
            </div>
            <div className="MyCreateModal__content">{pageToRender}</div>
          </div>
        </div>
      </ReactModal>
    </TemplateContext.Provider>
  );
};

export default Modal;
