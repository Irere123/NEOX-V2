import React, { DetailedHTMLProps } from "react";

import "./avatar.css";

const variantClassnames = {
  normal: "avatar-normal",
  rounded: "avatar-rounded",
};

const sizeClassnames = {
  large: "avatar-large",
  medium: "avatar-medium",
};

type AvatarProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  variant?: keyof typeof variantClassnames;
  size?: keyof typeof sizeClassnames;
};

export const Avatar: React.FC<AvatarProps> = ({
  variant = "normal",
  size = "medium",
  children,
}) => {
  return (
    <div
      className={`avatar ${variantClassnames[variant]} ${sizeClassnames[size]}`}
    >
      {children}
    </div>
  );
};
