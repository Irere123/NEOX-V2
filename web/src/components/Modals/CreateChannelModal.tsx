import React from "react";
import ReactModal from "react-modal";

import { CloseIcon } from "../../icons";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

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
      color: "var(--color-primary-200)",
      borderRadius: 6,
      padding: "20px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-700)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 400,
    },
  },
};

const CreateChannelModal: React.FC<
  ReactModal["props"] & {
    variant?: keyof typeof customStyles;
    onRequestClose: any;
  }
> = ({ variant = "default", onRequestClose, ...props }) => {
  const { t } = useTypeSafeTranslation();

  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className="modalContainer">
        <div tabIndex={-1} className="focus:outline-none">
          <div className="MyCreateTeamModal__header">
            <h4 style={{ color: "var(--color-primary-100)" }}>
              {t("modals.createChannelModal.title")}
            </h4>
            <span onClick={onRequestClose}>
              <CloseIcon fill="var(--color-primary-100)" />
            </span>
          </div>
          <div className="MyCreateTeamModal__content">
            <p style={{ textAlign: "center" }}>
              {t("modals.createChannelModal.text")}
            </p>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CreateChannelModal;
