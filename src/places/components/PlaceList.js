import React from "react";

import Card from "../../shared/UIElements/Card";
import "./PlaceList.css";
import { PlaceItem } from "./PlaceItem";

export const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found Create one??</h2>
          <button>Share place</button>
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
            image={place.imageUrl}
            title={place.title}
            description={place.desc}
            address={place.address}
            creatorId={place.creator}
            coordinated={place.location}
          />
        );
      })}
    </ul>
  );
};