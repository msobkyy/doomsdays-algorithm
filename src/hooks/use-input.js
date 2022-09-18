import { useState } from "react";

const useInput = (validateVal, inval) => {
  const [enteredValue, setEnteredValue] = useState(inval);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateVal(enteredValue);
  const hasError = !valueIsValid & isTouched;

  const vlaueChangeHandler = (event) => {
    setEnteredValue(event);
  };

  const inputChangeHandler = () => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    vlaueChangeHandler,
    inputChangeHandler,
  };
};

export default useInput;
