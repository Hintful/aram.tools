import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useEffect } from "react";
import axios from "axios";
import { API_PORT } from "../../../common/var";

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

  async function getUserInfo() {
    // TODO: make ip address dynamic to switch between localhost and public ip addr
    // axios.get(`http://localhost.com:${API_PORT}/api/lol/summoner/${username}/info`)
    axios.get(`/api/lol/summoner/${username}/info`)
      .then(res => {
        setUserDetail(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    // const userInfo = getUserInfo(username)
    // console.log(userInfo)
    // setUserDetail(userInfo)
    getUserInfo();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col pt-10 undrag">
      {/* Box */}
      <ProfileHeader name={userDetail.name} level={userDetail.summonerLevel} icon={userDetail.profileIconId} wins={info.wins} losses={info.losses} />
      <ProfileContent userInfo={userDetail} />
    </div>
  );
}

export default Profile;
