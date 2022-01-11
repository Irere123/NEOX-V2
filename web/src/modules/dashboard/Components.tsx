import React from "react";

import {
  useAddFriendMutation,
  useUpdateAcceptReqMutation,
  useCancelRequestMutation,
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
            friendId: r.sender.id,
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
  console.log(r);
  const [cancel] = useCancelRequestMutation({
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div
      onClick={async () => {
        const res = await cancel({
          variables: {
            id: r.id,
          },
          update: (store) => {
            store.evict({ fieldName: "me" });
          },
        });

        if (res.data?.CancelRequest.errors) {
          console.log(res.data.CancelRequest.errors);
        }
      }}
    >
      <CloseIcon />
    </div>
  );
};
