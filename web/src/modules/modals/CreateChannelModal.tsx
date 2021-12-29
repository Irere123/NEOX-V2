import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactModal from "react-modal";
import { Formik } from "formik";

import { CloseIcon, PodcastsIcon, SolidHashTag } from "../../icons";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import Switch from "../../ui/Switch";
import { useCreateChannelMutation } from "../../generated/graphql";
import { TeamPageParams } from "../../types/CustomTypes";

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

interface FormValues {
  name: string;
}

const CreateChannelModal: React.FC<
  ReactModal["props"] & {
    variant?: keyof typeof customStyles;
    onRequestClose: any;
  }
> = ({ variant = "default", onRequestClose, ...props }) => {
  const [checked, setChecked] = useState(false);
  const [channelType, setChannelType] = useState("text");
  const { t } = useTypeSafeTranslation();
  const [createChannel] = useCreateChannelMutation();
  const { teamId }: TeamPageParams = useParams();
  const history = useHistory();

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
            <h4>{t("modals.createChannelModal.title")}</h4>
            <span onClick={onRequestClose}>
              <CloseIcon fill="var(--color-primary-300)" />
            </span>
          </div>
          <div className="MyCreateTeamModal__content">
            <div className="channelTypes__buttons">
              <p
                style={{
                  color: "#060607",
                  marginBottom: "0",
                  textTransform: "uppercase",
                  fontSize: "12px",
                }}
              >
                Channel type
              </p>
              <div
                className={`channelTypes__buttonsBtn ${
                  channelType === "text" ? "checkedType " : ""
                }`}
                onClick={() => setChannelType("text")}
              >
                <SolidHashTag fill="#4f5760" />
                <p style={{ color: "#4f5760" }}>Text channel</p>
              </div>
              <div
                className={`channelTypes__buttonsBtn ${
                  channelType === "announcement" ? "checkedType " : ""
                }`}
                onClick={() => setChannelType("announcement")}
              >
                <PodcastsIcon fill="#4f5760" />
                <p style={{ color: "#4f5760" }}>Announcement channel</p>
              </div>
            </div>

            <Formik<FormValues>
              initialValues={{ name: "" }}
              onSubmit={async ({ name }) => {
                let ann = false;
                if (channelType === "text") {
                  ann = false;
                } else if (channelType === "announcement") {
                  ann = true;
                }

                const resp = await createChannel({
                  variables: {
                    ann,
                    name,
                    public: !checked,
                    teamId,
                  },
                  update: (store) => {
                    store.evict({ fieldName: "team" });
                  },
                });

                if (resp.data?.createRoom.ok) {
                  history.push(
                    `/team/${teamId}/${resp.data.createRoom.room?.id}`
                  );
                  onRequestClose();
                }
              }}
            >
              {({
                values,
                handleBlur,
                handleSubmit,
                handleChange,
                isSubmitting,
              }) => (
                <div className="Create__input">
                  <p
                    style={{
                      color: "#060607",
                      marginBottom: "0",
                      textTransform: "uppercase",
                      fontSize: "12px",
                    }}
                  >
                    Channel name
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    spellCheck={false}
                    autoCorrect="false"
                    autoComplete="off"
                  />
                  <div>
                    <div className="createChannelModal__footerPrivate">
                      <p
                        style={{
                          color: "#060607",
                          marginBottom: "0",
                          fontSize: "15px",
                        }}
                      >
                        Private
                      </p>
                      <div>
                        <Switch
                          checked={checked}
                          handleToogle={() => setChecked(!checked)}
                        />
                      </div>
                    </div>
                    <div className="Page2Content__footer">
                      <div onClick={onRequestClose}>
                        <button type="button">{t("common.cancel")}</button>
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onClick={() => handleSubmit()}
                        >
                          {t("common.create")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CreateChannelModal;
