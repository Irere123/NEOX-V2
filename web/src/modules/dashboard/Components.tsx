import React from "react";

import {
  useAddFriendMutation,
  useUpdateAcceptReqMutation,
  useUpdateCancelReqMutation,
} from "../../generated/graphql";
import { CloseIcon, SolidDone } from "../../icons";

export const AcceptButton: React.FC<{ r: any }> = ({ r }) => {
  const [accept] = useUpdateAcceptReqMutation();
  const [addFriend] = useAddFriendMutation();

  return (
    <div
      onClick={async () => {
        await accept({
          variables: {
            id: r.id,
            value: true,
          },
          update: (store) => {
            store.evict({ fieldName: "me" });
          },
        });
        await addFriend({
          variables: {
            friendId: r.receiver.id,
          },
          update: (store) => {
            store.evict({ fieldName: "me" });
          },
        });
      }}
    >
      <SolidDone />
    </div>
  );
};

export const CancelButton: React.FC<{ r: any }> = ({ r }) => {
  const [cancel] = useUpdateCancelReqMutation();

  return (
    <div
      onClick={async () => {
        await cancel({
          variables: {
            id: r.id,
            value: true,
          },
          update: (store) => {
            store.evict({ fieldName: "me" });
          },
        });
      }}
    >
      <CloseIcon />
    </div>
  );
};
