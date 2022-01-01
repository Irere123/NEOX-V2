/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";
import {
  MessageDocument,
  MessageSubscription,
  useMessagesQuery,
} from "../../generated/graphql";
import { MessagesLoadingScreen } from "../../shared-components/LoadingScreens";
import { PodcastsIcon, SolidBook, SolidHashTag, SolidLock } from "../../icons";
import { TextParser } from "../display/TextParser";
import { TeamPageParams } from "../../types/CustomTypes";

interface Props {
  room: any;
}

interface MessageSub {
  subscriptionData: { data: MessageSubscription };
}

const MessagesContainer: React.FC<Props> = ({ room }) => {
  const { roomId }: TeamPageParams = useParams();
  const roomIdInt = parseInt(roomId, 10);

  const { data, loading, subscribeToMore } = useMessagesQuery({
    variables: {
      roomId: room?.id,
    },
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    subscribeToMore({
      document: MessageDocument,
      variables: {
        roomId: roomIdInt,
      },
      updateQuery: (prev, { subscriptionData }: MessageSub) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.newMessage;
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
        };
      },
    });
  }, [subscribeToMore, roomIdInt]);
  const { t } = useTypeSafeTranslation();

  if (loading) {
    return <MessagesLoadingScreen />;
  }

  let icon;

  if (room?.ann) {
    icon = <PodcastsIcon />;
  } else if (room?.rules) {
    icon = <SolidBook />;
  } else if (!room?.public) {
    icon = <SolidLock />;
  } else {
    icon = <SolidHashTag />;
  }

  return (
    <>
      {data?.messages.map((message, idx) => (
        <div className="MessageContainer__message" key={idx}>
          <div className="MessageContainer__messageAvatar">
            <img src={message.user.pictureUrl!} alt={message.user.username} />
          </div>
          <div className="MessageContainer__messageContent">
            <div>
              <p>{message.user.username}</p>
              <p>{dayjs(message.createdAt).format("DD/MM/YY")}</p>
            </div>
            <p>
              <TextParser>{message.text || ""}</TextParser>
            </p>
          </div>
        </div>
      ))}
      {!data?.messages.length! ? (
        <div>
          <span
            style={{
              backgroundColor: "var(--color-primary-300)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          >
            {icon}
          </span>
          <h3 style={{ margin: "0" }}>
            {t("pages.team.channelEmptyWelcome", { channel: room?.name })}
          </h3>
          <p style={{ margin: "0" }}>
            {t("pages.team.channelEmptyWelcomeTXt", { channel: room?.name })}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default MessagesContainer;
