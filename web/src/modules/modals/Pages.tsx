import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

import {
  ArrowLeft,
  BackpackIcon,
  GroupIcon,
  KeyIcon,
  LightIcon,
} from "../../icons";
import {
  useCreateTeamByTemplateMutation,
  useCreateTeamMutation,
} from "../../generated/graphql";
import toErrorMap from "../../lib/toErrorMap";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import { TemplateContext } from "../../hooks/useTemplate";

interface Props {
  setPage?: (page: number) => void;
  prevPage?: (page: number) => void;
  onRequestClose?: () => void;
}

const testUsername = "IR123";

export const Page1: React.FC<Props> = ({ setPage }) => {
  const { setTemplate } = useContext(TemplateContext);
  const { t } = useTypeSafeTranslation();

  return (
    <div>
      <p style={{ color: "#4f5660", textAlign: "center" }}>
        {t("modals.createTeamModal.text")}
      </p>
      <div className="createTeamChoices">
        <div className="createTeamChoice__card" onClick={() => setPage?.(1)}>
          <span className="createTeamChoice__card_iconNword">
            <span>
              <KeyIcon fill="#4f5760" />
            </span>
            <p>{t("modals.createTeamModal.create_my_own")}</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
      </div>
      <p
        style={{
          color: "#4f5660",
          textTransform: "uppercase",
          fontSize: "12px",
        }}
      >
        {t("modals.createTeamModal.start_from_template")}
      </p>
      <div className="createTeamTemplate__choices">
        <div className="createTeamChoice__card" onClick={() => setPage?.(2)}>
          <span
            className="createTeamChoice__card_iconNword"
            onClick={() => setTemplate("study_group")}
          >
            <span>
              <BackpackIcon fill="#4f5760" />
            </span>
            <p>{t("modals.createTeamModal.study_group")}</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
        <div className="createTeamChoice__card" onClick={() => setPage?.(2)}>
          <span
            className="createTeamChoice__card_iconNword"
            onClick={() => setTemplate("school_club")}
          >
            <span>
              <LightIcon fill="#4f5760" />
            </span>
            <p>{t("modals.createTeamModal.school_club")}</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
        <div className="createTeamChoice__card" onClick={() => setPage?.(2)}>
          <span
            className="createTeamChoice__card_iconNword"
            onClick={() => setTemplate("friends")}
          >
            <span>
              <GroupIcon fill="#4f5760" />
            </span>
            <p>{t("modals.createTeamModal.friends")}</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
        <div className="HaveAnInvite__button" onClick={() => setPage?.(3)}>
          <p>{t("modals.createTeamModal.already_have_invite")}</p>
        </div>
      </div>
    </div>
  );
};

export const Page2: React.FC<Props> = ({ prevPage, onRequestClose }) => {
  const [createTeam] = useCreateTeamMutation();
  const { t } = useTypeSafeTranslation();
  const history = useHistory();

  return (
    <div>
      <p style={{ color: "#4f5660", textAlign: "center" }}>
        {t("modals.createTeamModal.text2")}
      </p>
      <div className="Page2Content">
        <p style={{ color: "#060607" }}>
          {t("modals.createTeamModal.team_name")}
        </p>
        <Formik
          initialValues={{ name: `${testUsername}'s team`, isPublic: false }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const resp = await createTeam({
              variables: {
                name: values.name,
                public: values.isPublic,
              },
              update: (store) => {
                store.evict({ fieldName: "me" });
              },
            });
            if (resp.data?.createTeam.errors) {
              setErrors(toErrorMap(resp.data.createTeam.errors));
              return;
            } else if (resp.data?.createTeam.ok) {
              setSubmitting(false);
              onRequestClose!();
              history.push(`/team/${resp.data.createTeam.team?.id}`);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <>
              <div className="Page2Content__input">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  spellCheck={false}
                  autoCorrect="false"
                  autoComplete="off"
                />
              </div>
              {errors ? <span>{errors.name}</span> : null}

              <div className="Page2Content__footer">
                <div>
                  <button type="button" onClick={() => prevPage?.(1)}>
                    {t("common.back")}
                  </button>
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
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export const Page3: React.FC<Props> = ({ onRequestClose, prevPage }) => {
  const { template } = useContext(TemplateContext);
  const [createTeam] = useCreateTeamByTemplateMutation();
  const { t } = useTypeSafeTranslation();
  const history = useHistory();

  return (
    <div>
      <p style={{ color: "#4f5660", textAlign: "center" }}>
        {t("modals.createTeamModal.text2")}
      </p>
      <div className="Page2Content">
        <p style={{ color: "#060607" }}>
          {t("modals.createTeamModal.team_name")}
        </p>
        <Formik
          initialValues={{ name: `${testUsername}'s team`, isPublic: false }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const resp = await createTeam({
              variables: {
                name: values.name,
                template: template,
              },
              update: (store) => {
                store.evict({ fieldName: "me" });
              },
            });
            if (resp.data?.createTeamByTemplate.errors) {
              setErrors(toErrorMap(resp.data.createTeamByTemplate.errors));
              return;
            } else if (resp.data?.createTeamByTemplate.ok) {
              setSubmitting(false);
              onRequestClose!();
              history.push(`/team/${resp.data.createTeamByTemplate.team?.id}`);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <>
              <div className="Page2Content__input">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  spellCheck={false}
                  autoCorrect="false"
                  autoComplete="off"
                />
              </div>
              {errors ? <span>{errors.name}</span> : null}

              <div className="Page2Content__footer">
                <div>
                  <button type="button" onClick={() => prevPage?.(1)}>
                    {t("common.back")}
                  </button>
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
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export const Page4: React.FC<Props> = () => {
  return (
    <div>
      <h4>Join a server</h4>
    </div>
  );
};
