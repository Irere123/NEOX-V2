import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

interface Props {}

export const RightSide: React.FC<Props> = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="homePage__layout_mainRightSide">
      <p>{t("pages.home.active_now")}</p>
      <div>
        <p>{t("pages.home.quite")}</p>
        <p>{t("pages.home.quite_text")}</p>
      </div>
    </div>
  );
};
