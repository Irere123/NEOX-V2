import React from "react";
import ReactModal from "react-modal";

import { CloseIcon, SearchIcon, SolidLink } from "../../icons";
import placeholder from "../../img/placeholder.jpg";

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

const InvitePeopleModal: React.FC<
  ReactModal["props"] & {
    variant?: keyof typeof customStyles;
    onRequestClose: any;
  }
> = ({ variant = "default", onRequestClose, ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles[variant]}
      {...props}
    >
      <div className="modalContainer">
        <div tabIndex={-1} className="focus:outline-none">
          <div className="MyCreateModal__header">
            <h4>Invite your people</h4>
            <span onClick={onRequestClose}>
              <CloseIcon fill="#4f5760" />
            </span>
          </div>
          <div className="MyCreateModal__content">
            <div className="MyCreateModal__contentHeader">
              <p
                style={{
                  color: "#060607",
                  marginBottom: "0",
                  textTransform: "uppercase",
                  fontSize: "12px",
                }}
              >
                invite your friends
              </p>
              <div className="MyCreateModal__contentHeader_Search">
                <input type="text" />
                <span>
                  <SearchIcon fill="#4f5760" />
                </span>
              </div>
              <div className="MyCreateModal__contentHeader_friends">
                <div>
                  <img src={placeholder} alt="a friend" />
                  <p
                    style={{
                      color: "#060607",
                    }}
                  >
                    Tech with Tim
                  </p>
                  <div>
                    <button>Invite</button>
                  </div>
                </div>
                <div>
                  <img src={placeholder} alt="a friend" />
                  <p
                    style={{
                      color: "#060607",
                    }}
                  >
                    John Doe
                  </p>
                  <div>
                    <button>Invite</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p
                style={{
                  color: "#060607",
                  marginBottom: "0",
                  textTransform: "uppercase",
                  fontSize: "12px",
                }}
              >
                Or generate an invite link
              </p>
              <div>
                <span>
                  <SolidLink />
                </span>
                <input type="text" />
                <button>Generate</button>
              </div>
              <span>
                the link will expire in <b>7 days</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default InvitePeopleModal;
