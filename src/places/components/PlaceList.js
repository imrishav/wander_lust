import React from "react";

import Card from "../../shared/UIElements/Card";
import "./PlaceList.css";
import { PlaceItem } from "./PlaceItem";
import Button from "../../shared/FormElements/Button";

export const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found Create oness?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map(place => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.desc}
            address={place.address}
            creatorId={place.creator}
            coordinated={place.location}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
};
