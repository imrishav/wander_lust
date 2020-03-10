import React, { useReducer, useEffect } from "react";

import { validate } from "../util/validator";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouch: false,
    isValid: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = e => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH"
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouch &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
