import React, { useEffect, useContext } from "react";
import "./styles/App.scss";

import CalcForm from "./components/CalcForm/CalcForm";
import InfoDooms from "./components/InfoDooms/InfoDooms";
import HeadNav from "./components/Layout/HeadNav";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Result from "./components/Result/Result";
import Footer from "./components/Layout/Footer";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import DarkMode from "./components/DarkMode/DarkMode";
import DoomsContext from "./store/dooms-context";

function App() {
  const { t } = useTranslation();
  const ctx = useContext(DoomsContext);

  const currentLang = cookies.get("i18next");

  useEffect(() => {
    if (currentLang == "ar") {
      document.body.dir = "rtl";
      document.body.lang = "ar";
      document.title = t("Header");
      const head = document.head;
      const link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.rtl.min.css";
      head.appendChild(link);

      return () => {
        head.removeChild(link);
      };
    } else {
      document.body.dir = "ltr";
      document.body.lang = "en";
      document.title = t("Header");
    }
  }, [currentLang]);

  useEffect(() => {
    if (localStorage.getItem("darkmode") == "dark") {
      document.body.classList.add("dark");
      document.body.setAttribute("theme", "dark");
    }
  }, []);

  return (
    <React.Fragment>
      <HeadNav />
      <main>
        <Container fluid="lg">
          <Row className="mb-3 row-eq-height">
            <Col md={8} xs={12}>
              <Card className="cs shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{t("WORD_34")}</Card.Title>
                  <CalcForm />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} xs={12} className="mt-3 mt-md-0">
              <Card className="cs shadow-sm text-center h-100 ">
                <Card.Body>
                  <Card.Title>{t("WORD_35")}</Card.Title>
                  <Result />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Card className="cs shadow-sm ">
                <Card.Body>
                  <InfoDooms />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Card className="cs shadow-sm ">
                <Card.Body>
                  <Card.Title>{t("WORD_36")}</Card.Title>
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://en.wikipedia.org/wiki/Doomsday_rule"
                        className="text-decoration-none"
                      >
                        Doomsday rule
                      </a>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
      <DarkMode />
    </React.Fragment>
  );
}

export default App;
