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

import { useForm } from "../../shared/hooks/form-hook";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [authState, setAuthState] = useState(false);
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
    if (authState) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
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
          }
        },
        false
      );
    }
    setAuthState(prevState => !prevState);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    auth.login();
    console.log(formState.inputs);
  };
  console.log("aa", authState);
  return (
    <Card className="authentication">
      <h2>{authState ? "Register" : "Login"}</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {authState && (
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
          {authState ? "Register Here" : "Login"}
        </Button>
      </form>
      <p onClick={handleAuthChange}>{!authState ? "Register Here" : "Login"}</p>
    </Card>
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
