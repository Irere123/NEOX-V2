import React, {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import "./button.css";

const sizeClassnames = {
  custom: "button-custom",
  big: "button-big",
  small: "button-small",
  tiny: "button-tiny",
};

const colorClassnames = {
  primary: "button-primary",
  secondary: "button-secondary",
};

const variantClassnames = {
  normal: "button-normal",
  curved: "button-curved",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  variant?: keyof typeof variantClassnames;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  size = "big",
  color = "primary",
  variant = "normal",
  ...props
}) => {
  return (
    <button
      className={`${
        variant === "normal" ? `button` : ` ${variantClassnames[variant]}`
      } ${sizeClassnames[size]} ${colorClassnames[color]}`}
      {...props}
    >
      <span>
        {icon ? <span>{icon}</span> : null}
        {children}
      </span>
    </button>
  );
};

export default Button;
