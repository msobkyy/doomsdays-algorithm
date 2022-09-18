import React, { useContext, useState } from "react";
import classes from "./CalcForm.module.css";
import useInput from "./../../hooks/use-input";
import DoomsContext from "../../store/dooms-context";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import { useTranslation } from "react-i18next";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const CalcForm = () => {
  const { t } = useTranslation();

  const ctx = useContext(DoomsContext);
  const [showErToast, setshowErToast] = useState(false);
  const d = new Date();
  const toggleShowA = () => {
    setshowErToast(!showErToast);
  };

  const {
    value: enteredDay,
    isValid: enteredDayIsValid,
    hasError: dayInputHasError,
    vlaueChangeHandler: dayChangeHandler,
    inputChangeHandler: dayBlurHandler,
  } = useInput((value) => value <= 31 && value > 0, d.getDate().toString());

  const { value: enteredMonth, vlaueChangeHandler: monthChangeHandler } =
    useInput((value) => value, months[d.getMonth()]);

  const {
    value: enteredYear,
    isValid: enteredyearIsValid,
    hasError: yearInputHasError,
    vlaueChangeHandler: yearChangeHandler,
    inputChangeHandler: yearBlurHandler,
  } = useInput((value) => value > 100, d.getFullYear().toString());

  const calcFormHandler = (event) => {
    event.preventDefault();
    dayBlurHandler();
    yearBlurHandler();

    if (!enteredDayIsValid || !enteredyearIsValid) {
      toggleShowA();
    } else {
      ctx.DoomsData(enteredDay, enteredMonth, enteredYear);
    }
  };

  const dayinvalidClass = dayInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const yearinvalidClass = yearInputHasError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <React.Fragment>
      <form onSubmit={calcFormHandler}>
        <Container>
          <Row>
            <Col className="p-0">
              <Form.Group className={`${dayinvalidClass} mb-3`}>
                <Form.Label>{t("WORD_1")}</Form.Label>
                <Form.Control
                  type="number"
                  id="day"
                  onChange={(event) => dayChangeHandler(event.target.value)}
                  onBlur={dayBlurHandler}
                  value={enteredDay}
                  placeholder="Day"
                />
              </Form.Group>
            </Col>
            <Col className="p-0">
              <Form.Group className={`${dayinvalidClass} mb-3`}>
                <Form.Label>{t("WORD_2")}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="month"
                  onChange={(event) => monthChangeHandler(event.target.value)}
                  value={enteredMonth}
                >
                  {Object.keys(ctx.monthsObj).map((month, i) => (
                    <option key={[month]} value={[month]}>
                      {t([month])} - {[i+1]}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="p-0">
              <Form.Group className={`${yearinvalidClass} mb-3`}>
                <Form.Label>{t("WORD_3")}</Form.Label>
                <Form.Control
                  type="number"
                  id="year"
                  onChange={(event) => yearChangeHandler(event.target.value)}
                  onBlur={yearBlurHandler}
                  value={enteredYear}
                  placeholder="Year"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit" className="csbtn">
            {t("WORD_4")}
          </Button>
        </Container>
      </form>

      <Toast
        className={classes.toaster}
        show={showErToast}
        autohide
        delay={2800}
        onClose={toggleShowA}
        bg={"Warning"}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{t("WORD_5")}</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body className="Warning">{t("WORD_6")} </Toast.Body>
      </Toast>
    </React.Fragment>
  );
};

export default CalcForm;
