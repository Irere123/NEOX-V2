import React from "react";
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

interface Props {
  setPage?: (page: number) => void;
  prevPage?: (page: number) => void;
  onRequestClose?: () => void;
}

const testUsername = "IR123";

export const Page1: React.FC<Props> = ({ setPage }) => {
  return (
    <div>
      <p style={{ color: "#4f5660", textAlign: "center" }}>
        Your team is where you and your friends hangout Make yours and start
        talking.
      </p>
      <div className="createTeamChoices">
        <div className="createTeamChoice__card" onClick={() => setPage?.(1)}>
          <span className="createTeamChoice__card_iconNword">
            <span>
              <KeyIcon fill="#4f5760" />
            </span>
            <p>Create my own</p>
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
        start from a template
      </p>
      <div className="createTeamTemplate__choices">
        <div className="createTeamChoice__card" onClick={() => setPage?.(2)}>
          <span className="createTeamChoice__card_iconNword">
            <span>
              <BackpackIcon fill="#4f5760" />
            </span>
            <p>Study group</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
        <div className="createTeamChoice__card" onClick={() => setPage?.(2)}>
          <span className="createTeamChoice__card_iconNword">
            <span>
              <LightIcon fill="#4f5760" />
            </span>
            <p>School club</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
        <div className="createTeamChoice__card" onClick={() => setPage?.(2)}>
          <span className="createTeamChoice__card_iconNword">
            <span>
              <GroupIcon fill="#4f5760" />
            </span>
            <p>Friends</p>
          </span>
          <span>
            <ArrowLeft fill="#4f5760" />
          </span>
        </div>
        <div className="HaveAnInvite__button" onClick={() => setPage?.(3)}>
          <p>Already have an invite</p>
        </div>
      </div>
    </div>
  );
};

export const Page2: React.FC<Props> = ({ prevPage, onRequestClose }) => {
  const [createTeam] = useCreateTeamMutation();
  const history = useHistory();

  return (
    <div>
      <p style={{ color: "#4f5660", textAlign: "center" }}>
        Give your new team a personality with a name and online visibility you
        can always change it later.
      </p>
      <div className="Page2Content">
        <p style={{ color: "#060607" }}>Team name</p>
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
                    Back
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                  >
                    Create
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
  const [createTeam] = useCreateTeamByTemplateMutation();
  const history = useHistory();

  return (
    <div>
      <p style={{ color: "#4f5660", textAlign: "center" }}>
        Give your new team a personality with a name and online visibility you
        can always change it later.
      </p>
      <div className="Page2Content">
        <p style={{ color: "#060607" }}>Team name</p>
        <Formik
          initialValues={{ name: `${testUsername}'s team`, isPublic: false }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const resp = await createTeam({
              variables: {
                name: values.name,
                template: "study_group",
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
                    Back
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                  >
                    Create
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
