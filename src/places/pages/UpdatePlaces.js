import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./NewPlace.css";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/util/validator";

import { useForm } from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u2"
  }
];

const UpdatePlaces = () => {
  const [isLoadinng, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    true
  );

  const identifiedPlaces = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlaces) {
      setFormData(
        {
          title: {
            value: identifiedPlaces.title,
            isValid: true
          },
          description: {
            value: identifiedPlaces.description,
            isValid: false
          }
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlaces]);

  const placeSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlaces) {
    return (
      <div className="center">
        <h2>Could Not find Place!</h2>
      </div>
    );
  }

  if (isLoadinng) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="text"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={"Please Enter a valid title"}
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={"Please Enter a valid Description"}
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlaces;
