import React, { useState, useContext } from "react";

import "./Auth.css";
import "../../places/pages/NewPlace.css";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from "../.././shared/util/validator";

import { AuthContext } from "../../shared/context/auth-context";

import Input from "../../shared/FormElements/Input";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/FormElements/ImageUpload";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";

const Auth = () => {
  const auth = useContext(AuthContext);
  // const [authState, setAuthState] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const handleAuthChange = () => {
    // if (!authState) {
    //   setFormData(
    //     {
    //       ...formState.inputs,
    //       name: undefined
    //     },

    //     formState.inputs.email.isValid && formState.inputs.password.isValid
    //   );
    // } else {
    //   setFormData(
    //     {
    //       ...formState.inputs,
    //       name: {
    //         value: "",
    //         isValid: false
    //       }
    //     },
    //     false
    //   );
    // }
    // setAuthState(prevState => !prevState);
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    // event.preventDefault();
    // setIsLoading(true);

    // if (authState) {
    //   try {
    //     const response = await fetch("http://localhost:3001/api/users/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         name: formState.inputs.name.value,
    //         email: formState.inputs.email.value,
    //         password: formState.inputs.password.value
    //       })
    //     });

    //     const responseData = await response.json();
    //     if (!response.ok) {
    //       throw new Error(responseData.message);
    //     }
    //     setIsLoading(false);
    //     auth.login();
    //   } catch (error) {
    //     console.log("error", error);
    //     setIsLoading(false);
    //     setError(error.message || "Something Went Wrong");
    //   }
    // } else {
    //   console.log("hit");
    //   try {
    //     const response = await fetch("http://localhost:3001/api/users/signup", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         name: formState.inputs.name.value,
    //         email: formState.inputs.email.value,
    //         password: formState.inputs.password.value
    //       })
    //     });

    //     const responseData = await response.json();
    //     if (!response.ok) {
    //       throw new Error(responseData.message);
    //     }
    //     console.log(responseData);
    //     setIsLoading(false);
    //     auth.login();
    //   } catch (error) {
    //     console.log(error);
    //     setIsLoading(false);
    //     setError(error.message || "Something Went Wrong");
    //   }
    // }
    event.preventDefault();
    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:3001/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:3001/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            "Content-Type": "application/json"
          }
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <>
      <Card className="authentication">
        <ErrorModal error={error} onClear={clearError} />
        {/* <LoadingSpinner asOverlay /> */}
        {isLoading && <LoadingSpinner asOverlay />}
        {/* <h2>{authState ? "Register" : "Login"}</h2> */}
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="name"
              label="Username"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a valid Username."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {!isLoginMode ? "Register Here" : "Login"}
          </Button>
        </form>
        <p onClick={handleAuthChange}>
          {isLoginMode ? "Register Here" : "Login"}
        </p>
      </Card>
    </>
  );
};

export default Auth;

// import React, { Component } from "react";

// export default class Auth extends Component {
//     const [formState, inputHandler] = useForm(
//         {
//           title: {
//             value: "",
//             isValid: false
//           },
//           description: {
//             value: "",
//             isValid: false
//           },
//           address: {
//             value: "",
//             isValid: false
//           }
//         },
//         false
//       );
//   render() {
//     return (

//     );
//   }
// }
