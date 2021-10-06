import React, { useState } from "react";
import { Formik } from "formik";

import {
  ArrowLeft,
  BackpackIcon,
  GroupIcon,
  KeyIcon,
  LightIcon,
} from "../../icons";
import Switch from "../../ui/Switch";
import { useCreateTeamMutation } from "../../generated/graphql";
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
        <div className="createTeamChoice__card">
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
        <div className="createTeamChoice__card">
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
        <div className="createTeamChoice__card">
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
      </div>
    </div>
  );
};

export const Page2: React.FC<Props> = ({ prevPage, onRequestClose }) => {
  const [createTeam] = useCreateTeamMutation();
  const [isPublic, setIsPublic] = useState(false);

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
            const isPub = (values.isPublic = isPublic);
            const resp = await createTeam({
              variables: {
                name: values.name,
                public: isPub,
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
              <div className="Page2Content__toggle">
                <p style={{ color: "#060607" }}>Public</p>
                <Switch
                  checked={isPublic}
                  handleToogle={() => setIsPublic(!isPublic)}
                />
              </div>

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

export const Page3: React.FC<Props> = () => {
  return (
    <div>
      <h4>Page3</h4>
    </div>
  );
};