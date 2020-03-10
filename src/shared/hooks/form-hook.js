import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        console.log(action);
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };

    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      break;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  console.log("sss", initialFormValidity);
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
  }, []);

  const setFormData = useCallback((inputData, formValidty) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidty
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
