import React, { useContext } from "react";
import DoomsContext from "../../store/dooms-context";
//import classes from "./InfoDooms.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

const InfoDooms = () => {
  const ctx = useContext(DoomsContext);
  const { t } = useTranslation();
  const algo_3 = ctx.algoData[3];
  const currentLang = cookies.get("i18next");
  let msmeClasses = "";
  if (currentLang == "ar" && ctx.darkmode == "dark") {
    msmeClasses = "me-2 ms-auto";
  } else {
    msmeClasses = "ms-2 me-auto";
  }
  return (
    <React.Fragment>
      <h1>{t("WORD_10")}</h1>
      <h5>{t("WORD_11")}</h5>
      <p>{t("WORD_12")}</p>

      {!ctx.isIt && (
        <h6 className="text-danger text-center">{t("WORD_13")} </h6>
      )}
      <ListGroup
        numbered
        variant="flush"
        className={`${ctx.isIt ? "" : "blured"} mb-2 cs p-1 shadow-sm rounded`}
      >
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>
              {t("WORD_14")} <strong>{t("WORD_15")}</strong>.
            </div>
          </div>
          <Badge bg="primary" pill>
            {ctx.algoData[1]}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>
              {t("WORD_17")} <strong>{t("WORD_15")}</strong> (
              <Badge bg="primary" pill>
                {ctx.algoData[1]}
              </Badge>
              ) {t("WORD_18")}{" "}
              {ctx.isIt && (
                <p className="text-success d-inline">
                  : {ctx.algoData[1]} / 4 = {ctx.algoData[1] / 4}
                </p>
              )}{" "}
              .
            </div>
          </div>
          <Badge bg="info" pill>
            {ctx.algoData[2]}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>
              {t("WORD_19")} (
              <Badge bg="info" pill>
                {ctx.algoData[2]}
              </Badge>
              ) {t("WORD_20")} <strong>{t("WORD_15")}</strong> :
              {ctx.isIt && (
                <p
                  className={`text-success d-inline ${
                    ctx.lang == "ar" ? "float-end" : "float-start"
                  }`}
                >
                  {ctx.algoData[2]} + {ctx.algoData[1]} = {ctx.algoData[3]}
                </p>
              )}{" "}
            </div>
          </div>
          <Badge bg="danger" pill>
            {ctx.algoData[3]}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>
              {t("WORD_21")} (
              <Badge bg="danger" pill>
                {ctx.algoData[3]}
              </Badge>
              ) {t("WORD_22")} <p className="text-success d-inline">7</p>
              <p className="text-secondary mt-1">
                ({t("WORD_23", { algo_3 })})
              </p>
            </div>
          </div>
          <Badge bg="success" pill>
            {ctx.algoData[4]}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div> {t("WORD_24")}</div>
            {ctx.isIt ? (
              <ul className="mt-2">
                <li className="text-secondary">
                  {ctx.DoomsDayCenu[0] - 100}-{ctx.DoomsDayCenu[0] - 1} -{" "}
                  {t(ctx.cenList[0])}
                </li>
                <li className="text-success fw-bold">
                  {ctx.DoomsDayCenu[0]}-{ctx.DoomsDayCenu[0] + 99} -{" "}
                  {t(ctx.cenList[1])}
                </li>
                <li className="text-secondary">
                  {ctx.DoomsDayCenu[0] + 100}-{ctx.DoomsDayCenu[0] + 199} -{" "}
                  {t(ctx.cenList[2])}
                </li>
                <li className="text-secondary">
                  {ctx.DoomsDayCenu[0] + 200}-{ctx.DoomsDayCenu[0] + 299} -{" "}
                  {t(ctx.cenList[3])}
                </li>
              </ul>
            ) : (
              <p className="text-danger"> {t("WORD_25")}</p>
            )}
            <p className="text-secondary">( {t("WORD_26")} )</p>
          </div>
          <Badge bg="dark" pill>
            {t(ctx.DoomsDayCenu[1])}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>
              {t("WORD_27")}{" "}
              <div className="text-dark fw-bold d-inline">
                {t(ctx.DoomsDayCenu[1])}
              </div>{" "}
              + (
              <Badge bg="success" pill>
                {ctx.algoData[4]}
              </Badge>
              ) = {t(ctx.DoomsDayCenu[2])}
            </div>
            <p className="text-secondary">
              ( {t("WORD_28")} {ctx.algoData[0] + ctx.algoData[1]})
            </p>
          </div>
          <Badge bg="secondary" pill>
            {t(ctx.DoomsDayCenu[2])}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div> {t("WORD_29")}</div>
            {ctx.isLeap && <p className="text-secondary">( {t("WORD_30")} )</p>}
            <ul className="">
              {Object.keys(ctx.monthsObj).map((month, i) => (
                <li
                  className={`${
                    ctx.enteredData[1] != [month]
                      ? "text-secondary"
                      : "text-success fw-bold"
                  }`}
                  value={[month]}
                  key={[month]}
                >
                  {t([month])} {ctx.monthsObj[month][1]}{" "}
                  {ctx.enteredData[1] != [month] ? (
                    ""
                  ) : (
                    <Badge bg="secondary" pill>
                      {t(ctx.DoomsDayCenu[2])}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {ctx.isIt && (
            <Badge className="text-dark" bg="light" pill>
              {t(ctx.enteredData[1])} {ctx.monthsObj[ctx.enteredData[1]][1]}
            </Badge>
          )}
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>{t("WORD_31")}</div>
            <ul>
              {Object(ctx.counterDays).map((date, i) => (
                <li
                  className={`${
                    i + 1 === ctx.counterDays.length
                      ? "text-success fw-bold"
                      : "text-secondary"
                  }`}
                  key={[i]}
                  value={[i]}
                >
                  {[ctx.counterDays[i][0]]} {[t(ctx.counterDays[i][1])]}{" "}
                  {[ctx.counterDays[i][2]]} - {[t(ctx.counterDays[i][3])]}
                </li>
              ))}
            </ul>
            <p className="text-secondary">( {t("WORD_32")} )</p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className={msmeClasses}>
            <div>
              {t("WORD_33")}{" "}
              <div className="text-success fw-bold d-inline">
                {t(ctx.result[0])}
              </div>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default InfoDooms;
