import React from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

function Profile(props) {
  const { id } = useParams();
  const username = id;

  // placeholder data
  const info = {
    username: username,
    profile_picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    wins: 563,
    losses: 482,
    level: 253,
  };


  return (
    <div className="h-screen w-screen flex flex-col py-10">
      {/* Box */}
      <ProfileHeader info={info} />
      <ProfileContent info={info} />
    </div>
  );
}

export default Profile;
