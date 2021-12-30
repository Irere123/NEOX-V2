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
    <a href={`${apiBaseUrl}${oauthUrl}`}>
      <button className="loginPage__loginCard__button">
        <span>{children[0]}</span>
        {children[1]}
      </button>
    </a>
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
              <a href="http://localhost:3000/terms-of-service.html">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="http://localhost:3000/privacy-policy.html">
                Privacy Policy
              </a>{" "}
              of NEOX
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
        <div className="loginPage__layout__bottom_links">
          <a href="http://localhost:3000/privacy-policy.html">Privacy policy</a>
          <a href="/about">Report a bug</a>
          <Twitter fill="#5d7290" />
          <Instagram />
        </div>
      </div>
    </div>
  );
};
