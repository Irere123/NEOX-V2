import React, { useState } from "react";

import "./avatar.css";
import { Google, SolidMoon } from "../../icons";

export const avatarSizeMap = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xs: "20px",
  xxs: "30px",
};

export const onlineIndicatorStyleMap = {
  default: {
    width: "15px",
    height: "15px",
    right: "2px",
    bottom: "-4px",
    borderWidth: "4px",
  },
  lg: {
    width: "12px",
    height: "12px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  md: {
    width: "10px",
    height: "10px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  sm: {
    width: "8px",
    height: "8px",
    right: "2px",
    bottom: "-2px",
    borderWidth: "2px",
  },
  xs: {
    width: "4px",
    height: "4px",
    right: "0px",
    bottom: "-1px",
    borderWidth: "1px",
  },
  xxs: {
    width: "6px",
    height: "6px",
    right: "1px",
    bottom: "-1px",
    borderWidth: "1px",
  },
};

export interface AvatarProps {
  src: string;
  size?: keyof typeof onlineIndicatorStyleMap;
  className?: string;
  status?: "Online" | "Offline" | "Busy";
  username?: string;
  isDeveloper?: boolean;
}

export const SingleUser: React.FC<AvatarProps> = ({
  src,
  size = "default",
  className = "",
  status = "Offline",
  username,
  isDeveloper,
}) => {
  const [isError, setError] = useState(false);
  const sizeStyle = onlineIndicatorStyleMap[size];
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <img
        alt={username ? `${username}-s-avatar` : "your-avatar"}
        className={`rounded-full w-full h-full object-cover `}
        onError={() => setError(true)}
        src={
          isError
            ? `https://ui-avatars.com/api/${
                username ? `&name=${username}` : "&name"
              }&rounded=true&background=B23439&bold=true&color=FFFFFF`
            : src
        }
      />

      {status === "Online" && (
        <span
          className={
            "rounded-full absolute box-content bg-green border-primary-800"
          }
          style={sizeStyle}
        ></span>
      )}
      {status === "Busy" && (
        <span
          className={
            "rounded-full absolute box-content bg-primary-800 border-primary-800 text-secondary items-center justify-center"
          }
          style={{
            ...sizeStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SolidMoon width={sizeStyle.width} height={sizeStyle.width} />
        </span>
      )}
      {isDeveloper && (
        <span
          className={
            "rounded-full absolute box-content bg-primary-800 border-primary-800 text-secondary items-center justify-center"
          }
          style={{ ...sizeStyle, padding: 2, top: -2 }}
        >
          <Google width={sizeStyle.width} height={sizeStyle.width} />
        </span>
      )}
    </div>
  );
};
