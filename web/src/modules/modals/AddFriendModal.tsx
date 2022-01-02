import React from "react";
import { useTypeSafeTranslation } from "../../hooks/useTypeSafeTranslation";

const AddFriendModal: React.FC<{ closeModal: any }> = ({ closeModal }) => {
  const { t } = useTypeSafeTranslation();

  return (
    <div>
      <p style={{ textAlign: "center", color: "var(--color-primary-800)" }}>
        You can add friends with their username. it's cAsE sEnSiTive!
      </p>

      <input
        className="MyModal__input"
        type="text"
        name="name"
        spellCheck={false}
        autoCorrect="false"
        autoComplete="off"
      />

      <div className="MyModal__footer">
        <div>
          <button onClick={closeModal}>{t("common.cancel")}</button>
        </div>
        <div>
          <button type="submit">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
