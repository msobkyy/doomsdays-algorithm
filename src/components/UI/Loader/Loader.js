import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import classes from "./Loader.module.css";
const Loader = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);
  return (
    <React.Fragment>
      <div className={`${classes.back} ${isLoading ? "" : classes.hidden}`}>
        <div className={classes.con}>
          <Spinner className={classes.spin} animation="border" />
        </div>
      </div>
      {props.children}
    </React.Fragment>
  );
};

export default Loader;
