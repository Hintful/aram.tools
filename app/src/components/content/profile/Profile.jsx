import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import axios from 'axios';
import { useEffect } from "react";

function Profile(props) {
  const { id } = useParams();
  const username = id;

  const [userDetail, setUserDetail] = useState([]);

  // placeholder data
  const info = {
    username: username,
    profile_picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    wins: 563,
    losses: 482,
    level: 253,
  };

  async function getUserData() {
    // user data
    axios.get(`http://localhost:3000/api/lol/summoner/info/${username}`)
      .then(res => {
        setUserDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col py-10">
      {/* Box */}
      <ProfileHeader name={userDetail.name} level={userDetail.summonerLevel} icon={userDetail.profileIconId} wins={info.wins} losses={info.losses} />
      <ProfileContent info={userDetail} />
    </div>
  );
}

export default Profile;
