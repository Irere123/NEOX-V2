import React from "react";
import { Formik } from "formik";
import { useCreateMessageMutation } from "../../generated/graphql";

import { EmojiIcon, PlusIcon, SolidPoll } from "../../icons";

interface Props {
  room: any;
}

const MessageInput: React.FC<Props> = ({ room }) => {
  const [createMessage] = useCreateMessageMutation();

  return (
    <div className="teamPageLayout__chatInput">
      <div>
        <span>
          <PlusIcon fill="white" />
        </span>
        <Formik
          initialValues={{ text: "" }}
          onSubmit={(values, { resetForm }) => {
            createMessage({
              variables: {
                roomId: room?.id,
                text: values.text,
              },
            });
            resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
          }) => (
            <input
              type="text"
              name="text"
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e: any) => {
                if (e.keyCode === 13 && !isSubmitting) {
                  handleSubmit(e);
                }
              }}
              placeholder={`Message #${room?.name}`}
              spellCheck={false}
              autoCorrect="false"
              autoComplete="off"
            />
          )}
        </Formik>

        <span>
          <EmojiIcon />
        </span>
        <span>
          <SolidPoll />
        </span>
      </div>
    </div>
  );
};

export default MessageInput;
