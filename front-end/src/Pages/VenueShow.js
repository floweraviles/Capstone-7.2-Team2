import React, { useEffect, useState } from "react";
import "../Styling/UserIndex.css";
import axios from "axios";
import VenueList from "../Components/VenueList";
import NewVenueContainer from "../Containers/NewVenueContainer";
import { useSelector } from "react-redux";
import { apiURL } from "../util/apiURL";
import UploadForm from "../Components/UploadForm"

const API = apiURL();

const VenueShow = ({ venues, showAddVenue, setShowAddVenue, newVenueAdded, setNewVenueAdded }) => {
  const [showHideButton, setShowHideButton] = useState(null)
  return (
    <div className="user-show-container">
      <div>
        <h3>Venue Owner Details</h3>
        <VenueList venues={venues} />
        {/* <UploadForm /> */}
      </div>
      {showAddVenue ? <NewVenueContainer setShowHideButton={setShowHideButton} newVenueAdded={newVenueAdded} setNewVenueAdded={setNewVenueAdded}/> : null}
     {showHideButton? null: <button onClick={() => setShowAddVenue(true)}>Add Venue</button>}
      {showHideButton? <button onClick={() => {
        setShowAddVenue(false)
        setShowHideButton(false)
      }}>Hide</button> : null}
    </div>
  );
};

export default VenueShow;
