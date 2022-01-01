import React from "react";
import { Formik } from "formik";
import { useCreateMessageMutation } from "../../generated/graphql";

import { EmojiIcon, PlusIcon, SolidPoll } from "../../icons";

interface Props {
  team: any;
  room: any;
}

const MessageInput: React.FC<Props> = ({ room, team }) => {
  const [createMessage] = useCreateMessageMutation();

  let input;

  if (!room?.ann || !room?.rules) {
    input = (
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
    );
  } else if ((room?.ann || room?.rules) && !team?.isAdmin) {
    input = (
      <div>
        <p>No allowed</p>
      </div>
    );
  } else if ((room?.ann || room?.rules) && team?.isAdmin) {
    input = (
      <div>
        <p>allowed</p>
      </div>
    );
  }

  return <div className="teamPageLayout__chatInput">{input}</div>;
};

export default MessageInput;
