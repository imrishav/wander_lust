import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PlaceList } from "../components/PlaceList";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal.js";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner.js";

const DUMMY = [
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
export const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, sendRequest, error, clearError } = useHttp();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/api/places/user/${userId}`
        );
        console.log(responseData);

        setLoadedUsers(responseData.place);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest, userId]);

  const placeDeleteHandler = id => {
    setLoadedUsers(prevPlaces => prevPlaces.filter(place => place.id !== id));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <PlaceList items={loadedUsers} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};
