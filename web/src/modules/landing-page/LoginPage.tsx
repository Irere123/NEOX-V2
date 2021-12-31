import React from "react";

import { apiBaseUrl } from "../../lib/constants";
import {
  Facebook,
  Github,
  Google,
  Instagram,
  Logo,
  Twitter,
} from "../../icons";

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  oauthUrl: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ oauthUrl, children }) => {
  return (
    <button
      className="loginPage__loginCard__button"
      onClick={() => {
        window.location.href = `${apiBaseUrl}${oauthUrl}`;
      }}
    >
      <span>{children[0]}</span>
      {children[1]}
    </button>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <div className="landingPage__layout">
      <div>
        <div className="landingPage__layout_top_logo">
          <Logo />
        </div>
      </div>
      <div className="landingPage__layout__Middle">
        <div className="landingPage__loginCard">
          <div>
            <h3>Welcome</h3>
            <p>
              By continuing you agree to the{" "}
              <a href="/terms-of-service.html">Terms of Service</a> and{" "}
              <a href="/privacy-policy.html">Privacy Policy</a> of NEOX
            </p>
          </div>
          <div className="landingPage__loginCard__buttons">
            <LoginButton oauthUrl="/auth/google">
              <Google className="loginPage__authIcon" />
              Login with Google
            </LoginButton>
            <LoginButton oauthUrl="/auth/github">
              <Github className="loginPage__authIcon" />
              Login with GitHub
            </LoginButton>
            <LoginButton oauthUrl="/auth/facebook">
              <Facebook fill="white" />
              Login with Facebook
            </LoginButton>
          </div>
        </div>
      </div>
      <div className="loginPage__layout__bottom">
        <div className="loginPage__layout__bottom_logo">
          <Logo />
        </div>
        <div className="loginPage__layout__bottom_links ">
          <a href="/features">Features</a>
          <a href="/report">Report a bug</a>
          <a href="https://twitter.com/neox_inc">
            <Twitter fill="#5d7290" />
          </a>
          <a href="https://instagram.com/neox_inc">
            <Instagram />
          </a>
        </div>
      </div>
    </div>
  );
};
