import React, { useState, useContext } from "react";

import "./PlaceItem.css";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/UIElements/Modal";
import Map from "../../shared/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

export const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openHandler = () => {
    setShowMap(!showMap);
  };

  const showDeleteModal = () => {
    setShowModal(!showModal);
    console.log("Delte", showModal);
  };
  return (
    <>
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
            <Button denger>Delete</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to Delete</p>
      </Modal>
      )
      <li className="place-item">
        <Card className="place-item__content">
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
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>Edit this Place</Button>
            )}
            {auth.isLoggedIn && (
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
