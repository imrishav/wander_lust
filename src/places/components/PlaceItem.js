import React, { useState, useContext } from "react";

import "./PlaceItem.css";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/UIElements/Modal";
import Map from "../../shared/UIElements/Map";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

export const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, clearError, error, sendRequest } = useHttp();

  const openHandler = () => {
    setShowMap(!showMap);
  };

  const showDeleteModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async () => {
    setShowModal(false);

    try {
      await sendRequest(
        `http://localhost:3001/api/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (error) {}
    console.log("Delte", showModal);
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={openHandler}
        header={props.address}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions"}
        footer={<Button onClick={openHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinated} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showModal}
        header={"Are u sure??"}
        footerClass={"place-item__modal-actions"}
        footer={
          <React.Fragment>
            <Button inverse onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button danger onClick={handleDelete}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to Delete</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openHandler}>
              View On Map
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit this Place</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteModal}>
                Delete this place
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};
