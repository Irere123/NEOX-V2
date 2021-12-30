import React from "react";

import placeholder from "../../img/placeholder.jpg";
import { Logo, SolidSearch } from "../../icons";
import { SingleUser } from "../UserAvatar";
import { Input } from "../Input";

export const TopHeader: React.FC = () => {
  return (
    <div className="flex h-7 w-full  border-primary-100 items-center">
      <div>
        <Logo />
      </div>
      <div className="flex flex-1 justify-center ">
        <div className="items-center flex w-2/4 px-2 bg-primary-700 text-primary-300 transition duration-200 ease-in-out focus-within:text-primary-100 rounded-lg">
          <SolidSearch fill="var(--color-primary-300)" />
          <Input autoFocus placeholder="Search for users, teams or messages" />
        </div>
      </div>
      <div className="flex  justify-end px-1">
        <SingleUser src={placeholder} username="Ben awad" size="md" />
      </div>
    </div>
  );
};
