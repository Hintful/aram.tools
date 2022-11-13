import React from "react";
import { useParams } from "react-router-dom";

function Profile(props) {
  const { id } = useParams();
  const username = id;

  return (
    <div className="h-screen flex">
      <h2>{id}</h2>
    </div>
  );
}

export default Profile;
