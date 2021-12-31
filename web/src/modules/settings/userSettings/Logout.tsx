import React from "react";
import { useHistory } from "react-router-dom";

import { useLogoutMutation } from "../../../generated/graphql";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";

const Modal: React.FC = () => {
  const [logout] = useLogoutMutation();
  const { t } = useTypeSafeTranslation();
  const history = useHistory();

  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          logout();
          history.replace("/");
        }}
        className="bg-primary-900"
      >
        {t("common.yes")}
      </button>
    </div>
  );
};

export default Modal;
