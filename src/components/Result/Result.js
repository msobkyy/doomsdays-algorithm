import React, { useContext } from "react";
import DoomsContext from "../../store/dooms-context";
import { useTranslation } from "react-i18next";

const Result = () => {
  const ctx = useContext(DoomsContext);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div>
        {ctx.isIt ? (
          <div>
            <p>{t("WORD_7")}</p>
            <h1>{t(ctx.result[0])}</h1>
            <p className="text-secondary mt-4">
            {t("WORD_8")} {t(ctx.result[1])}
            </p>
          </div>
        ) : (
          <h3 className="mt-4">{t("WORD_9")}</h3>
        )}
      </div>
    </React.Fragment>
  );
};

export default Result;
