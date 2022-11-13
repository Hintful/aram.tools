import React from "react";
import { useParams } from "react-router-dom";
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
    <div className="h-screen w-screen flex flex-col justify-center py-20">
      {/* Box */}
      <ProfileHeader info={info} />
      <div className="h-auto w-1/2 bg-white rounded-xl flex flex-col items-center shadow-xl min-w-max">
        {/* Top heading - Profile picture/name/Aggregate Stats */}

        {/* Bottom content - 2 col; Champ specific stats/match history */}
        <div className="">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
